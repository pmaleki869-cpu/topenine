"""
Aggressive image downloader for topengine.ae
Uses session with cookies, multiple URL patterns, and retries.
"""
import json, os, sys, time, hashlib, re
from pathlib import Path
from urllib.parse import urlparse

import requests

ROOT = Path(__file__).resolve().parent.parent
PRODUCTS_JSON = ROOT / "frontend" / "src" / "data" / "exports" / "products.json"
OUTPUT_DIR = ROOT / "frontend" / "public" / "images" / "products"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# Create a session that persists cookies
session = requests.Session()
session.headers.update({
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
    "Accept-Encoding": "gzip, deflate, br",
    "Connection": "keep-alive",
    "Upgrade-Insecure-Requests": "1",
    "Sec-Fetch-Dest": "document",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-Site": "none",
    "Sec-Fetch-User": "?1",
    "Cache-Control": "max-age=0",
})

def get_unique_image_urls():
    with open(PRODUCTS_JSON, "r", encoding="utf-8") as f:
        products = json.load(f)
    urls = {}
    for p in products:
        primary = p.get("primary_image_url", "")
        if primary and primary.startswith("http"):
            urls[primary] = p["slug"]
        for img in p.get("images", []):
            src = img.get("src", "")
            if src and src.startswith("http"):
                urls.setdefault(src, p["slug"])
    return urls, products

def url_to_filename(url):
    parsed = urlparse(url)
    filename = os.path.basename(parsed.path)
    filename = re.sub(r'[^\w\-_.]', '_', filename)
    if len(filename) > 100:
        h = hashlib.md5(url.encode()).hexdigest()[:8]
        ext = os.path.splitext(filename)[1]
        filename = f"{h}{ext}"
    return filename

def try_download(url, output_path):
    """Try downloading with full session"""
    try:
        r = session.get(url, timeout=15, allow_redirects=True)
        ct = r.headers.get("content-type", "")
        if r.status_code == 200 and ("image" in ct or "octet" in ct):
            with open(output_path, "wb") as f:
                f.write(r.content)
            size = os.path.getsize(output_path)
            if size > 500:
                return True, size
            os.remove(output_path)
        return False, r.status_code
    except Exception as e:
        return False, str(e)

def generate_url_variants(url):
    """Generate all possible URL variants to try"""
    variants = [url]
    
    # Without www
    variants.append(url.replace("://www.", "://"))
    
    # Different date folders
    for ym in ["2025/11", "2025/10", "2026/01", "2026/02"]:
        v = re.sub(r'uploads/\d{4}/\d{2}/', f'uploads/{ym}/', url)
        if v != url:
            variants.append(v)
    
    # Without date folder entirely
    v = re.sub(r'uploads/\d{4}/\d{2}/', 'uploads/', url)
    if v != url:
        variants.append(v)
    
    # Photon CDN
    parsed = urlparse(url)
    for i in range(4):
        variants.append(f"https://i{i}.wp.com/{parsed.hostname}{parsed.path}")
    
    # Wayback Machine
    variants.append(f"https://web.archive.org/web/2025/{url}")
    variants.append(f"https://web.archive.org/web/2024/{url}")
    
    # Size variants
    base, ext = os.path.splitext(url)
    for suffix in ["-scaled", "-1024x1024", "-768x768", "-300x300"]:
        variants.append(f"{base}{suffix}{ext}")
    
    return variants

def main():
    print("=" * 60)
    print("TopEngine Image Downloader v2")
    print("=" * 60)
    
    # First, establish a session by visiting the homepage
    print("\nEstablishing session with topengine.ae...")
    try:
        r = session.get("https://www.topengine.ae/", timeout=15)
        print(f"  Homepage: {r.status_code} (cookies: {len(session.cookies)})")
    except Exception as e:
        print(f"  Homepage failed: {e}")
    
    urls, products = get_unique_image_urls()
    total = len(urls)
    print(f"\nFound {total} unique image URLs across {len(products)} products")
    
    downloaded = 0
    failed = 0
    url_mapping = {}
    
    for i, (url, slug) in enumerate(sorted(urls.items()), 1):
        filename = url_to_filename(url)
        output_path = OUTPUT_DIR / filename
        
        if output_path.exists() and output_path.stat().st_size > 500:
            rel = "/" + str(output_path.relative_to(ROOT / "frontend" / "public")).replace("\\", "/")
            url_mapping[url] = rel
            downloaded += 1
            if i <= 5 or i % 50 == 0:
                print(f"[{i}/{total}] SKIP {filename}")
            continue
        
        success = False
        variants = generate_url_variants(url)
        
        for vi, variant in enumerate(variants):
            ok, info = try_download(variant, output_path)
            if ok:
                rel = "/" + str(output_path.relative_to(ROOT / "frontend" / "public")).replace("\\", "/")
                url_mapping[url] = rel
                downloaded += 1
                success = True
                print(f"[{i}/{total}] OK ({info:,} bytes) via variant {vi}: {filename}")
                break
        
        if not success:
            failed += 1
            if i <= 10 or i % 100 == 0:
                print(f"[{i}/{total}] FAIL {filename}")
        
        # Small delay every 5 requests
        if i % 5 == 0:
            time.sleep(0.3)
    
    print(f"\n{'=' * 60}")
    print(f"RESULTS: {downloaded} downloaded, {failed} failed, {total} total")
    print(f"{'=' * 60}")
    
    if url_mapping:
        print(f"\nUpdating products.json with {len(url_mapping)} local paths...")
        for p in products:
            if p.get("primary_image_url") in url_mapping:
                p["primary_image_url"] = url_mapping[p["primary_image_url"]]
            for img in p.get("images", []):
                if img.get("src") in url_mapping:
                    img["src"] = url_mapping[img["src"]]
        
        with open(PRODUCTS_JSON, "w", encoding="utf-8") as f:
            json.dump(products, f, indent=2, ensure_ascii=False)
        print("Products data updated!")
    
    # Save mapping
    with open(OUTPUT_DIR / "_url_mapping.json", "w") as f:
        json.dump({
            "downloaded": url_mapping,
            "total": total,
            "downloaded_count": downloaded,
            "failed_count": failed
        }, f, indent=2)

if __name__ == "__main__":
    main()
