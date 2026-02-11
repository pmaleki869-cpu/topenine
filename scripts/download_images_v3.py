"""
TopEngine Image Recovery v3 - Multi-Strategy Approach
Tries: cloudscraper (Cloudflare bypass), direct requests with browser headers,
and Google/Bing image proxy extraction
"""
import json, os, re, time, hashlib, sys
from pathlib import Path
from urllib.parse import quote, urlparse

# Try cloudscraper first
try:
    import cloudscraper
    HAS_CLOUDSCRAPER = True
except ImportError:
    HAS_CLOUDSCRAPER = False

import requests

BASE = Path(__file__).resolve().parent.parent
PRODUCTS_JSON = BASE / "frontend" / "src" / "data" / "exports" / "products.json"
IMG_DIR = BASE / "frontend" / "public" / "images" / "products"
IMG_DIR.mkdir(parents=True, exist_ok=True)

# Already downloaded files
already_downloaded = {f.stem for f in IMG_DIR.iterdir() if f.is_file()}
print(f"Already have {len(already_downloaded)} images downloaded")

# Load products
with open(PRODUCTS_JSON, "r", encoding="utf-8") as f:
    products = json.load(f)

# Collect all unique image URLs with product info
image_map = {}  # url -> product_name
for p in products:
    name = p.get("name", "unknown")
    url = p.get("primary_image_url", "")
    if url and url.startswith("http"):
        if url not in image_map:
            image_map[url] = name
    for img in p.get("images", []):
        src = img.get("src", "")
        if src and src.startswith("http"):
            if src not in image_map:
                image_map[src] = name

print(f"Total unique image URLs to try: {len(image_map)}")

# Strategy 1: CloudScraper session (bypasses Cloudflare)
def try_cloudscraper(url):
    if not HAS_CLOUDSCRAPER:
        return None
    try:
        scraper = cloudscraper.create_scraper(
            browser={'browser': 'chrome', 'platform': 'windows', 'mobile': False}
        )
        resp = scraper.get(url, timeout=15)
        if resp.status_code == 200 and len(resp.content) > 1000:
            content_type = resp.headers.get('content-type', '')
            if 'image' in content_type or resp.content[:4] in [b'\x89PNG', b'\xff\xd8\xff\xe0', b'\xff\xd8\xff\xe1']:
                return resp.content
    except Exception:
        pass
    return None

# Strategy 2: Direct requests with various browser-like headers
def try_direct_download(url, session):
    headers_list = [
        {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
            'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9',
            'Referer': 'https://www.topengine.ae/',
            'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'image',
            'sec-fetch-mode': 'no-cors',
            'sec-fetch-site': 'same-origin',
        },
        {
            'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
            'Accept': '*/*',
        },
    ]
    for headers in headers_list:
        try:
            resp = session.get(url, headers=headers, timeout=15)
            if resp.status_code == 200 and len(resp.content) > 1000:
                content_type = resp.headers.get('content-type', '')
                if 'image' in content_type or resp.content[:4] in [b'\x89PNG', b'\xff\xd8\xff\xe0', b'\xff\xd8\xff\xe1']:
                    return resp.content
        except Exception:
            pass
    return None

# Strategy 3: Try URL variations
def get_url_variants(url):
    variants = [url]
    # Try without www
    variants.append(url.replace('www.topengine.ae', 'topengine.ae'))
    # Try http instead of https
    variants.append(url.replace('https://', 'http://'))
    # Try different date folders
    for month in ['10', '11', '01', '02', '03']:
        for year in ['2025', '2024', '2026']:
            variants.append(url.replace('/2025/12/', f'/{year}/{month}/'))
    # Try without date folder
    filename = url.split('/')[-1]
    variants.append(f'https://www.topengine.ae/wp-content/uploads/{filename}')
    # Try with resized version removed (-scaled, size suffixes)
    base = url.rsplit('.', 1)
    if len(base) == 2:
        clean = re.sub(r'-\d+x\d+$', '', base[0])
        if clean != base[0]:
            variants.append(f'{clean}.{base[1]}')
    return list(dict.fromkeys(variants))  # unique, ordered

def url_to_filename(url):
    """Convert URL to a clean filename"""
    name = url.split('/')[-1]
    name = re.sub(r'[^\w\-.]', '-', name)
    name = re.sub(r'-+', '-', name).strip('-')
    if len(name) > 100:
        name = name[:100]
    return name

# Main download loop
session = requests.Session()
# First, visit homepage to get cookies
try:
    session.get('https://www.topengine.ae/', timeout=10, headers={
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    })
except:
    pass

saved = 0
failed = 0
skipped = 0

# Test with first 5 URLs to see which strategy works
print("\n--- Testing strategies with first 5 URLs ---")
test_urls = list(image_map.keys())[:5]
strategy_works = {'cloudscraper': False, 'direct': False}

for url in test_urls:
    # Test cloudscraper
    data = try_cloudscraper(url)
    if data:
        print(f"  CloudScraper WORKS for {url[:60]}...")
        strategy_works['cloudscraper'] = True
        break
    
    # Test direct with variants
    for variant in get_url_variants(url)[:3]:
        data = try_direct_download(variant, session)
        if data:
            print(f"  Direct download WORKS for {variant[:60]}...")
            strategy_works['direct'] = True
            break
    if strategy_works['direct']:
        break

if not any(strategy_works.values()):
    print("  Neither strategy works for direct downloads.")
    print("  The website images are genuinely unavailable (404 from server).")
    print("  Will try to get more from Google Image Search...")
    print()

# If direct methods don't work, try Google with longer delays and Bing
print("\n--- Searching Google & Bing for product images ---")

# Get unique product names that don't have images yet
# Group products by their primary_image_url to avoid searching for the same product name
url_to_products = {}
for p in products:
    url = p.get("primary_image_url", "")
    if url:
        if url not in url_to_products:
            url_to_products[url] = []
        url_to_products[url].append(p)

# Check which images are already downloaded
existing_files = {f.name for f in IMG_DIR.iterdir() if f.is_file()}
print(f"Already have {len(existing_files)} images locally")

# For each unique image URL, check if we already have a file for it
urls_needing_images = []
for url, prods in url_to_products.items():
    filename = url_to_filename(url)
    if filename in existing_files:
        continue
    # Use first product's name for searching
    urls_needing_images.append((url, prods[0].get("name", "unknown"), filename))

print(f"Still need images for {len(urls_needing_images)} unique URLs")

# Strategy: Search Bing (less aggressive rate limiting than Google)
def search_bing_image(query):
    """Search Bing Images and extract image URLs"""
    search_url = f"https://www.bing.com/images/search?q={quote(query)}&first=1"
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
    }
    try:
        resp = requests.get(search_url, headers=headers, timeout=15)
        if resp.status_code != 200:
            return None
        
        # Extract image URLs from Bing results
        # Bing embeds image URLs in data attributes
        # Look for murl (media URL) in the response
        murls = re.findall(r'"murl"\s*:\s*"(https?://[^"]+)"', resp.text)
        for murl in murls:
            # Skip non-image URLs
            if any(ext in murl.lower() for ext in ['.jpg', '.jpeg', '.png', '.webp']):
                return murl
        
        # Also try to find base64 images
        b64_matches = re.findall(r'data:image/(?:jpeg|png|webp);base64,([A-Za-z0-9+/=]{100,})', resp.text)
        if b64_matches:
            import base64
            return ('base64', base64.b64decode(b64_matches[0]))
    except Exception:
        pass
    return None

def download_image_url(url):
    """Download an image from a URL"""
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Accept': 'image/*,*/*;q=0.8',
        }
        resp = requests.get(url, headers=headers, timeout=15)
        if resp.status_code == 200 and len(resp.content) > 500:
            ct = resp.headers.get('content-type', '')
            if 'image' in ct or resp.content[:4] in [b'\x89PNG', b'\xff\xd8\xff\xe0', b'\xff\xd8\xff\xe1']:
                return resp.content
    except:
        pass
    return None

def search_google_image(query):
    """Search Google Images for base64 thumbnails"""
    search_url = f"https://www.google.com/search?tbm=isch&q={quote(query)}"
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
    }
    try:
        resp = requests.get(search_url, headers=headers, timeout=15)
        if resp.status_code != 200:
            return None
        import base64
        b64_matches = re.findall(r'data:image/(?:jpeg|png|webp);base64,([A-Za-z0-9+/=]{100,})', resp.text)
        if b64_matches:
            return ('base64', base64.b64decode(b64_matches[0]))
    except:
        pass
    return None

# Process remaining products
new_saved = 0
new_failed = 0

for i, (url, name, filename) in enumerate(urls_needing_images):
    short_name = name[:60] + "..." if len(name) > 60 else name
    print(f"[{i+1}/{len(urls_needing_images)}] {short_name}")
    
    found = False
    
    # Search query
    search_query = f"topengine.ae {name}"
    
    # Try Bing first (less rate limiting)
    result = search_bing_image(search_query)
    if result:
        if isinstance(result, tuple) and result[0] == 'base64':
            # Save base64 data
            ext = '.jpg'
            save_path = IMG_DIR / filename
            if not str(save_path).endswith(('.jpg', '.jpeg', '.png', '.webp')):
                save_path = IMG_DIR / (filename + ext)
            save_path.write_bytes(result[1])
            print(f"    -> Bing: Saved {len(result[1]):,} bytes as {save_path.name}")
            new_saved += 1
            found = True
        elif isinstance(result, str):
            # Download from URL
            img_data = download_image_url(result)
            if img_data:
                save_path = IMG_DIR / filename
                if not str(save_path).endswith(('.jpg', '.jpeg', '.png', '.webp')):
                    ext = '.jpg' if img_data[:2] == b'\xff\xd8' else '.png'
                    save_path = IMG_DIR / (filename + ext)
                save_path.write_bytes(img_data)
                print(f"    -> Bing: Saved {len(img_data):,} bytes as {save_path.name}")
                new_saved += 1
                found = True
    
    if not found:
        # Try Google
        result = search_google_image(search_query)
        if result and isinstance(result, tuple):
            save_path = IMG_DIR / filename
            if not str(save_path).endswith(('.jpg', '.jpeg', '.png', '.webp')):
                save_path = IMG_DIR / (filename + '.jpg')
            save_path.write_bytes(result[1])
            print(f"    -> Google: Saved {len(result[1]):,} bytes as {save_path.name}")
            new_saved += 1
            found = True
    
    if not found:
        print(f"    -> No image found")
        new_failed += 1
    
    # Progress update every 20
    if (i + 1) % 20 == 0:
        print(f"\n--- Progress: {new_saved} new saved, {new_failed} failed, {i+1}/{len(urls_needing_images)} processed ---\n")
    
    # Rate limiting - vary delay
    time.sleep(2 + (i % 3))  # 2-4 second delay, varying

print(f"\n{'='*60}")
print(f"FINAL RESULTS:")
print(f"  Previously downloaded: {len(existing_files)}")
print(f"  Newly saved: {new_saved}")
print(f"  Failed: {new_failed}")
print(f"  Total images now: {len(list(IMG_DIR.iterdir()))}")
print(f"{'='*60}")
