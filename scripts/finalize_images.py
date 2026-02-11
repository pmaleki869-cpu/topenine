"""
Clean mapping: only keep good matches and update products.json properly.
Also update the primary_image_url and images array to use local paths.
"""
import json, re
from pathlib import Path
from difflib import SequenceMatcher

BASE = Path(__file__).resolve().parent.parent
PRODUCTS_JSON = BASE / "frontend" / "src" / "data" / "exports" / "products.json"
IMG_DIR = BASE / "frontend" / "public" / "images" / "products"

with open(PRODUCTS_JSON, "r", encoding="utf-8") as f:
    products = json.load(f)

local_images = [f.name for f in IMG_DIR.iterdir() if f.is_file() and f.suffix in ('.jpg', '.jpeg', '.png', '.webp')]
print(f"Local images: {len(local_images)}")

def normalize(text):
    text = text.lower()
    text = re.sub(r'[^a-z0-9]', ' ', text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text

img_normalized = {img: normalize(img.rsplit('.', 1)[0]) for img in local_images}

def find_best_image(product_name, product_slug):
    pname_norm = normalize(product_name)
    pslug_norm = normalize(product_slug) if product_slug else pname_norm
    best_match = None
    best_score = 0
    for img_file, img_norm in img_normalized.items():
        score_name = SequenceMatcher(None, pname_norm, img_norm).ratio()
        score_slug = SequenceMatcher(None, pslug_norm, img_norm).ratio()
        score = max(score_name, score_slug)
        pname_words = set(pname_norm.split())
        img_words = set(img_norm.split())
        common = pname_words & img_words
        if len(common) >= 2:
            score += 0.1 * len(common)
        if score > best_score:
            best_score = score
            best_match = img_file
    return best_match, best_score

# ONLY keep matches with score >= 0.65 (truly good matches)
THRESHOLD = 0.65
mapped = 0
unmapped = 0

for i, p in enumerate(products):
    name = p.get("name", "")
    slug = p.get("slug", "")
    
    # Clear any previous mapping
    products[i].pop("local_image", None)
    products[i].pop("image_source", None)
    
    best_img, score = find_best_image(name, slug)
    
    if best_img and score >= THRESHOLD:
        local_path = f"/images/products/{best_img}"
        # Update primary_image_url to local path
        products[i]["primary_image_url"] = local_path
        # Update first image in images array
        if products[i].get("images"):
            products[i]["images"][0]["src"] = local_path
        mapped += 1
    else:
        # Set to empty string to trigger placeholder
        products[i]["primary_image_url"] = ""
        # Clear images array srcs
        for img in products[i].get("images", []):
            img["src"] = ""
        unmapped += 1

print(f"\nRESULTS (threshold={THRESHOLD}):")
print(f"  Mapped with good images: {mapped} ({100*mapped/len(products):.1f}%)")
print(f"  Using placeholder: {unmapped} ({100*unmapped/len(products):.1f}%)")

# Save
with open(PRODUCTS_JSON, "w", encoding="utf-8") as f:
    json.dump(products, f, indent=2, ensure_ascii=False)
print(f"\nSaved products.json")

# Show sample mappings
print(f"\nSample good mappings:")
count = 0
for p in products:
    if p.get("primary_image_url", "").startswith("/images/"):
        print(f"  '{p['name'][:50]}' -> {p['primary_image_url']}")
        count += 1
        if count >= 10:
            break
