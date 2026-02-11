"""
Download product images from topengine.ae with multiple fallback strategies.
Saves images locally to frontend/public/images/products/
"""

import json, os, sys, time, hashlib, re
from pathlib import Path
from urllib.parse import urlparse, quote

try:
    import requests
except ImportError:
    print("Installing requests...")
    os.system(f"{sys.executable} -m pip install requests")
    import requests

ROOT = Path(__file__).resolve().parent.parent
PRODUCTS_JSON = ROOT / "frontend" / "src" / "data" / "exports" / "products.json"
OUTPUT_DIR = ROOT / "frontend" / "public" / "images" / "products"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
    "Referer": "https://www.topengine.ae/",
}

def get_unique_image_urls():
    """Extract all unique image URLs from products.json"""
    with open(PRODUCTS_JSON, "r", encoding="utf-8") as f:
        products = json.load(f)

    urls = set()
    url_to_products = {}
    for p in products:
        primary = p.get("primary_image_url", "")
        if primary:
            urls.add(primary)
            url_to_products.setdefault(primary, []).append(p["slug"])
        for img in p.get("images", []):
            src = img.get("src", "")
            if src:
                urls.add(src)
                url_to_products.setdefault(src, []).append(p["slug"])
    return urls, url_to_products, products

def url_to_filename(url):
    """Convert URL to safe filename"""
    parsed = urlparse(url)
    path = parsed.path
    filename = os.path.basename(path)
    # Clean filename
    filename = re.sub(r'[^\w\-_.]', '_', filename)
    if len(filename) > 100:
        h = hashlib.md5(url.encode()).hexdigest()[:8]
        ext = os.path.splitext(filename)[1]
        filename = f"{h}{ext}"
    return filename

def try_download(url, output_path, attempt_name="direct"):
    """Try to download an image, return True if successful"""
    try:
        r = requests.get(url, headers=HEADERS, timeout=15, stream=True)
        if r.status_code == 200:
            content_type = r.headers.get("content-type", "")
            if "image" in content_type or "octet-stream" in content_type:
                with open(output_path, "wb") as f:
                    for chunk in r.iter_content(8192):
                        f.write(chunk)
                size = os.path.getsize(output_path)
                if size > 1000:  # Min 1KB to be a real image
                    print(f"  [OK] Downloaded via {attempt_name}: {os.path.basename(output_path)} ({size:,} bytes)")
                    return True
                else:
                    os.remove(output_path)
        return False
    except Exception as e:
        return False

def download_image(url):
    """Try multiple strategies to download an image"""
    filename = url_to_filename(url)
    output_path = OUTPUT_DIR / filename

    if output_path.exists() and output_path.stat().st_size > 1000:
        print(f"  [SKIP] Already exists: {filename}")
        return str(output_path), True

    # Strategy 1: Direct download
    if try_download(url, output_path, "direct"):
        return str(output_path), True

    # Strategy 2: Try without www
    url_no_www = url.replace("://www.", "://")
    if try_download(url_no_www, output_path, "no-www"):
        return str(output_path), True

    # Strategy 3: Try Jetpack/Photon CDN
    parsed = urlparse(url)
    photon_url = f"https://i0.wp.com/{parsed.hostname}{parsed.path}"
    if try_download(photon_url, output_path, "photon-cdn"):
        return str(output_path), True

    # Strategy 4: Try with different size suffixes
    base, ext = os.path.splitext(url)
    for suffix in ["-scaled", "-1024x1024", "-768x768", "-600x600"]:
        alt_url = f"{base}{suffix}{ext}"
        if try_download(alt_url, output_path, f"size-variant{suffix}"):
            return str(output_path), True

    # Strategy 5: Try Wayback Machine
    wb_url = f"https://web.archive.org/web/2025/{url}"
    if try_download(wb_url, output_path, "wayback"):
        return str(output_path), True

    # Strategy 6: Try different date folders (2025/11, 2026/01, 2026/02)
    for year_month in ["2025/11", "2025/10", "2026/01", "2026/02"]:
        alt_url = re.sub(r'uploads/\d{4}/\d{2}/', f'uploads/{year_month}/', url)
        if alt_url != url and try_download(alt_url, output_path, f"date-{year_month}"):
            return str(output_path), True

    return None, False

def main():
    print("=" * 60)
    print("TopEngine Image Downloader")
    print("=" * 60)

    urls, url_to_products, products = get_unique_image_urls()
    print(f"\nFound {len(urls)} unique image URLs across {len(products)} products")

    downloaded = 0
    failed = 0
    url_mapping = {}  # old_url -> new_local_path

    for i, url in enumerate(sorted(urls), 1):
        print(f"\n[{i}/{len(urls)}] {os.path.basename(urlparse(url).path)[:60]}")
        local_path, success = download_image(url)
        if success:
            downloaded += 1
            # Convert to web-relative path
            rel_path = os.path.relpath(local_path, ROOT / "frontend" / "public").replace("\\", "/")
            url_mapping[url] = f"/{rel_path}"
        else:
            failed += 1
            print(f"  [FAIL] All strategies failed")

        # Rate limit
        if i % 10 == 0:
            time.sleep(0.5)

    print(f"\n{'=' * 60}")
    print(f"Results: {downloaded} downloaded, {failed} failed out of {len(urls)} total")
    print(f"{'=' * 60}")

    # Update products.json if any images were downloaded
    if url_mapping:
        print(f"\nUpdating products.json with {len(url_mapping)} local image paths...")
        for p in products:
            if p.get("primary_image_url") in url_mapping:
                p["primary_image_url"] = url_mapping[p["primary_image_url"]]
            for img in p.get("images", []):
                if img.get("src") in url_mapping:
                    img["src"] = url_mapping[img["src"]]

        with open(PRODUCTS_JSON, "w", encoding="utf-8") as f:
            json.dump(products, f, indent=2, ensure_ascii=False)

        # Also update root data copy
        root_products = ROOT / "data" / "products.json"
        if root_products.exists():
            with open(root_products, "w", encoding="utf-8") as f:
                json.dump(products, f, indent=2, ensure_ascii=False)

        print("[OK] Products data updated with local image paths")
    else:
        print("\n[WARN] No images could be downloaded from any source.")
        print("The topengine.ae website appears to be completely down.")
        print("All image URLs return 404 and no cached versions were found.")

    # Save mapping for reference
    mapping_file = OUTPUT_DIR / "_url_mapping.json"
    with open(mapping_file, "w") as f:
        json.dump({"downloaded": url_mapping, "total_urls": len(urls), "failed": failed}, f, indent=2)
    print(f"\nMapping saved to {mapping_file}")

if __name__ == "__main__":
    main()
