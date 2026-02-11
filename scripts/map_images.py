"""
Map downloaded Google thumbnail images to products in products.json.
- Match by product name / slug similarity
- Assign each local image to the best-matching product
- For products sharing the same original image URL, reuse the same local image
- Update products.json with local image paths
- Report statistics
"""
import json, os, re
from pathlib import Path
from difflib import SequenceMatcher

BASE = Path(__file__).resolve().parent.parent
PRODUCTS_JSON = BASE / "frontend" / "src" / "data" / "exports" / "products.json"
IMG_DIR = BASE / "frontend" / "public" / "images" / "products"

# Load products
with open(PRODUCTS_JSON, "r", encoding="utf-8") as f:
    products = json.load(f)

# List local images
local_images = [f.name for f in IMG_DIR.iterdir() if f.is_file() and f.suffix in ('.jpg', '.jpeg', '.png', '.webp')]
print(f"Local images: {len(local_images)}")
print(f"Products: {len(products)}")

# Normalize text for comparison
def normalize(text):
    text = text.lower()
    text = re.sub(r'[^a-z0-9]', ' ', text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text

# Build index of image names -> normalized
img_normalized = {}
for img in local_images:
    name = img.rsplit('.', 1)[0]  # remove extension
    img_normalized[img] = normalize(name)

# For each product, try to find best matching local image
def find_best_image(product_name, product_slug):
    """Find best matching local image for a product"""
    pname_norm = normalize(product_name)
    pslug_norm = normalize(product_slug) if product_slug else pname_norm
    
    best_match = None
    best_score = 0
    
    for img_file, img_norm in img_normalized.items():
        # Score against product name
        score_name = SequenceMatcher(None, pname_norm, img_norm).ratio()
        # Score against slug
        score_slug = SequenceMatcher(None, pslug_norm, img_norm).ratio()
        # Take the better score
        score = max(score_name, score_slug)
        
        # Boost if key words match
        pname_words = set(pname_norm.split())
        img_words = set(img_norm.split())
        common = pname_words & img_words
        if len(common) >= 2:
            score += 0.1 * len(common)
        
        if score > best_score:
            best_score = score
            best_match = img_file
    
    return best_match, best_score

# Map images to products
THRESHOLD = 0.45  # minimum similarity score

# First pass: direct mapping by image filename match
mapped_products = 0
unmapped_products = 0
mapping_details = []

# Group products by shared image URL to reuse mappings
url_groups = {}
for i, p in enumerate(products):
    url = p.get("primary_image_url", "")
    if url not in url_groups:
        url_groups[url] = []
    url_groups[url].append(i)

# For each product, find best image
for i, p in enumerate(products):
    name = p.get("name", "")
    slug = p.get("slug", "")
    
    best_img, score = find_best_image(name, slug)
    
    if best_img and score >= THRESHOLD:
        local_path = f"/images/products/{best_img}"
        products[i]["local_image"] = local_path
        products[i]["image_source"] = "google_cache"
        mapped_products += 1
        if score >= 0.6:
            mapping_details.append(f"  GOOD  [{score:.2f}] '{name[:50]}' -> {best_img}")
        else:
            mapping_details.append(f"  WEAK  [{score:.2f}] '{name[:50]}' -> {best_img}")
    else:
        products[i]["local_image"] = ""
        products[i]["image_source"] = "none"
        unmapped_products += 1

# Print mapping details (good matches first)
print(f"\n--- MAPPING RESULTS ---")
print(f"Mapped: {mapped_products}")
print(f"Unmapped: {unmapped_products}")

# Show some good matches
good = [d for d in mapping_details if d.startswith("  GOOD")]
weak = [d for d in mapping_details if d.startswith("  WEAK")]
print(f"\nGood matches (>= 0.6): {len(good)}")
for d in good[:20]:
    print(d)
if len(good) > 20:
    print(f"  ... and {len(good)-20} more")

print(f"\nWeak matches (0.45-0.6): {len(weak)}")
for d in weak[:10]:
    print(d)

# Better approach: use image URL sharing
# Many products share the same original image URL. If one product in a group
# gets a good match, apply it to all products with the same URL.
print(f"\n--- SHARED URL OPTIMIZATION ---")
# Find groups where at least one product has a GOOD match (>= 0.6)
shared_improvements = 0
for url, indices in url_groups.items():
    if not url:
        continue
    # Find best match in this group
    best_local = None
    for idx in indices:
        if products[idx].get("local_image") and products[idx].get("image_source") == "google_cache":
            # Check if this is a good match by looking at mapping_details
            best_local = products[idx]["local_image"]
            break
    
    if best_local:
        for idx in indices:
            if not products[idx].get("local_image"):
                products[idx]["local_image"] = best_local
                products[idx]["image_source"] = "shared_url"
                shared_improvements += 1

print(f"Additional products mapped via shared URLs: {shared_improvements}")

# Count final stats
final_mapped = sum(1 for p in products if p.get("local_image"))
final_unmapped = sum(1 for p in products if not p.get("local_image"))
print(f"\nFINAL STATS:")
print(f"  With images: {final_mapped} ({100*final_mapped/len(products):.1f}%)")
print(f"  Without images: {final_unmapped} ({100*final_unmapped/len(products):.1f}%)")

# Save updated products.json
with open(PRODUCTS_JSON, "w", encoding="utf-8") as f:
    json.dump(products, f, indent=2, ensure_ascii=False)
print(f"\nSaved updated products.json")

# Also count unique image URLs
unique_urls = set(p.get("primary_image_url", "") for p in products if p.get("primary_image_url"))
unique_local = set(p.get("local_image", "") for p in products if p.get("local_image"))
print(f"Unique original URLs: {len(unique_urls)}")
print(f"Unique local images used: {len(unique_local)}")
