"""
Extract product images from Google's cached thumbnails.
Google Image Search returns base64-encoded JPEG thumbnails for indexed pages.
Since topengine.ae is completely down, these are the only remaining copies.
"""
import json, os, sys, base64, re, time, hashlib
from pathlib import Path
from urllib.parse import quote

try:
    import requests
except ImportError:
    os.system(f"{sys.executable} -m pip install requests")
    import requests

ROOT = Path(__file__).resolve().parent.parent
PRODUCTS_JSON = ROOT / "frontend" / "src" / "data" / "exports" / "products.json"
OUTPUT_DIR = ROOT / "frontend" / "public" / "images" / "products"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

session = requests.Session()
session.headers.update({
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept-Language": "en-US,en;q=0.9",
})

def get_products():
    with open(PRODUCTS_JSON, "r", encoding="utf-8") as f:
        return json.load(f)

def search_google_images(product_name, slug):
    """Search Google Images for a product and extract base64 thumbnails"""
    query = quote(f"topengine.ae {product_name}")
    url = f"https://www.google.com/search?q={query}&tbm=isch&num=5"
    
    try:
        r = session.get(url, timeout=15)
        if r.status_code != 200:
            return None
        
        # Extract base64 image data from Google's response
        # Google embeds thumbnails as data:image/jpeg;base64,... in the HTML
        b64_pattern = r'data:image/(jpeg|png);base64,([A-Za-z0-9+/=]{200,})'
        matches = re.findall(b64_pattern, r.text)
        
        if matches:
            # Take the first real image (skip tiny icons)
            for fmt, data in matches:
                try:
                    img_bytes = base64.b64decode(data)
                    if len(img_bytes) > 2000:  # At least 2KB = real image
                        return img_bytes, fmt
                except:
                    continue
        return None
    except Exception as e:
        print(f"    Error: {e}")
        return None

def main():
    print("=" * 60)
    print("Google Cache Image Extractor for TopEngine")
    print("=" * 60)
    
    products = get_products()
    
    # Get unique products by primary_image_url (avoid duplicates)
    seen_urls = set()
    unique_products = []
    for p in products:
        img_url = p.get("primary_image_url", "")
        if img_url and img_url.startswith("http") and img_url not in seen_urls:
            seen_urls.add(img_url)
            unique_products.append(p)
    
    total = len(unique_products)
    print(f"Found {total} products with unique images to search for")
    print(f"Total products: {len(products)}")
    print()
    
    downloaded = 0
    failed = 0
    url_mapping = {}  # original_url -> local_path
    
    for i, p in enumerate(unique_products, 1):
        name = p["name"]
        slug = p["slug"]
        img_url = p["primary_image_url"]
        
        outfile = OUTPUT_DIR / f"{slug}.jpg"
        
        # Skip if already downloaded
        if outfile.exists() and outfile.stat().st_size > 1000:
            rel = "/" + str(outfile.relative_to(ROOT / "frontend" / "public")).replace("\\", "/")
            url_mapping[img_url] = rel
            downloaded += 1
            continue
        
        print(f"[{i}/{total}] {name[:50]}...")
        
        result = search_google_images(name, slug)
        if result:
            img_bytes, fmt = result
            ext = "jpg" if fmt == "jpeg" else "png"
            outfile = OUTPUT_DIR / f"{slug}.{ext}"
            with open(outfile, "wb") as f:
                f.write(img_bytes)
            
            rel = "/" + str(outfile.relative_to(ROOT / "frontend" / "public")).replace("\\", "/")
            url_mapping[img_url] = rel
            downloaded += 1
            print(f"    -> Saved {len(img_bytes):,} bytes as {outfile.name}")
        else:
            failed += 1
            print(f"    -> No image found")
        
        # Rate limit to avoid Google blocking
        time.sleep(3)
        
        # Show progress every 20
        if i % 20 == 0:
            print(f"\n--- Progress: {downloaded} saved, {failed} failed, {i}/{total} processed ---\n")
    
    print(f"\n{'=' * 60}")
    print(f"RESULTS: {downloaded} saved, {failed} failed out of {total}")
    print(f"{'=' * 60}")
    
    # Now update products.json with local paths
    if url_mapping:
        print(f"\nUpdating {len(url_mapping)} image references in products.json...")
        
        # Also map gallery images that share the same URL
        all_urls = set()
        for p in products:
            if p.get("primary_image_url"):
                all_urls.add(p["primary_image_url"])
            for img in p.get("images", []):
                if img.get("src"):
                    all_urls.add(img["src"])
        
        for p in products:
            if p.get("primary_image_url") in url_mapping:
                p["primary_image_url"] = url_mapping[p["primary_image_url"]]
            for img in p.get("images", []):
                if img.get("src") in url_mapping:
                    img["src"] = url_mapping[img["src"]]
        
        with open(PRODUCTS_JSON, "w", encoding="utf-8") as f:
            json.dump(products, f, indent=2, ensure_ascii=False)
        print("Done! Products data updated.")
    
    # Save mapping
    with open(OUTPUT_DIR / "_mapping.json", "w") as f:
        json.dump({
            "url_mapping": url_mapping,
            "total": total,
            "downloaded": downloaded,
            "failed": failed
        }, f, indent=2)

if __name__ == "__main__":
    main()
