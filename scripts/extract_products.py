"""
TopEngine.ae — Full Product Catalog Extraction
================================================
Pulls all 619 products from the WC Store API v1,
along with categories, tags, and attribute terms.

Outputs:
  data/products.json      — full product objects
  data/products.csv       — flattened one-row-per-product
  data/categories.json    — category list
  data/tags.json          — tag list
  data/attributes.json    — attribute + terms
  data/export_report.md   — completeness statistics
"""

import json, csv, time, re, os, sys
from pathlib import Path
from html import unescape

import requests

# ─── Config ──────────────────────────────────────────────────────────────────
BASE      = "https://www.topengine.ae/wp-json/wc/store/v1"
PER_PAGE  = 100
DELAY     = 1.5          # seconds between paginated requests
OUT_DIR   = Path(__file__).resolve().parent.parent / "data"
HEADERS   = {"User-Agent": "TopEngine-Export/1.0"}

# ─── Helpers ─────────────────────────────────────────────────────────────────
def strip_html(html: str) -> str:
    """Remove HTML tags and decode entities."""
    text = re.sub(r"<[^>]+>", "", html or "")
    return unescape(text).strip()

def minor_to_aed(value: str) -> float:
    """WC Store API prices are in minor units (fils). 280000 → 2800.00"""
    try:
        return int(value) / 100
    except (ValueError, TypeError):
        return 0.0

def fetch_json(url: str, params: dict | None = None) -> list | dict:
    """GET JSON with retries."""
    for attempt in range(3):
        try:
            r = requests.get(url, params=params, headers=HEADERS, timeout=30)
            r.raise_for_status()
            return r.json()
        except Exception as e:
            print(f"  ⚠ Attempt {attempt+1} failed: {e}")
            time.sleep(2 ** attempt)
    print(f"  ✖ Gave up on {url}")
    return []

# ─── Fetch all products (paginated) ─────────────────────────────────────────
def fetch_all_products() -> list[dict]:
    products = []
    page = 1
    while True:
        print(f"  Fetching products page {page} …")
        batch = fetch_json(f"{BASE}/products", {"per_page": PER_PAGE, "page": page})
        if not batch:
            break
        products.extend(batch)
        if len(batch) < PER_PAGE:
            break
        page += 1
        time.sleep(DELAY)
    return products

# ─── Fetch categories / tags / attributes ────────────────────────────────────
def fetch_categories() -> list[dict]:
    print("  Fetching categories …")
    return fetch_json(f"{BASE}/products/categories", {"per_page": 100})

def fetch_tags() -> list[dict]:
    print("  Fetching tags …")
    return fetch_json(f"{BASE}/products/tags", {"per_page": 100})

def fetch_attributes() -> list[dict]:
    print("  Fetching attributes …")
    attrs = fetch_json(f"{BASE}/products/attributes")
    # For each attribute, try to get its terms
    for attr in attrs:
        terms_url = f"{BASE}/products/attributes/{attr['id']}/terms"
        terms = fetch_json(terms_url, {"per_page": 100})
        attr["terms"] = terms if isinstance(terms, list) else []
        time.sleep(0.5)
    return attrs

# ─── Transform a product into clean export format ───────────────────────────
def clean_product(raw: dict) -> dict:
    prices = raw.get("prices", {})
    images = raw.get("images", [])
    cats   = raw.get("categories", [])
    tags   = raw.get("tags", [])

    return {
        "id":                raw.get("id"),
        "name":              raw.get("name", "").strip(),
        "slug":              raw.get("slug", ""),
        "type":              raw.get("type", "simple"),
        "permalink":         raw.get("permalink", ""),
        "sku":               raw.get("sku", ""),
        "short_description": strip_html(raw.get("short_description", "")),
        "description_raw":   strip_html(raw.get("description", "")),
        "on_sale":           raw.get("on_sale", False),
        "price_aed":         minor_to_aed(prices.get("price", "0")),
        "regular_price_aed": minor_to_aed(prices.get("regular_price", "0")),
        "sale_price_aed":    minor_to_aed(prices.get("sale_price", "0")),
        "currency":          prices.get("currency_code", "AED"),
        "is_purchasable":    raw.get("is_purchasable", False),
        "is_in_stock":       raw.get("is_in_stock", False),
        "average_rating":    raw.get("average_rating", "0"),
        "review_count":      raw.get("review_count", 0),
        "image_count":       len(images),
        "images":            [{"id": i["id"], "src": i["src"], "alt": i.get("alt", "")} for i in images],
        "primary_image_url": images[0]["src"] if images else "",
        "categories":        [{"id": c["id"], "name": c["name"], "slug": c.get("slug", "")} for c in cats],
        "tags":              [{"id": t["id"], "name": t["name"], "slug": t.get("slug", "")} for t in tags],
        "brands":            raw.get("brands", []),
        "attributes":        raw.get("attributes", []),
        "variations":        raw.get("variations", []),
        "has_options":       raw.get("has_options", False),
        "add_to_cart_text":  raw.get("add_to_cart", {}).get("text", ""),
        "add_to_cart_url":   raw.get("add_to_cart", {}).get("url", ""),
    }

# ─── CSV export ──────────────────────────────────────────────────────────────
CSV_COLUMNS = [
    "id", "name", "slug", "type", "permalink", "sku",
    "on_sale", "price_aed", "regular_price_aed", "sale_price_aed",
    "is_purchasable", "is_in_stock", "average_rating", "review_count",
    "image_count", "primary_image_url",
    "category_ids", "category_names",
    "tag_ids", "tag_names",
    "has_options", "add_to_cart_text",
]

def product_to_csv_row(p: dict) -> dict:
    return {
        "id":                p["id"],
        "name":              p["name"],
        "slug":              p["slug"],
        "type":              p["type"],
        "permalink":         p["permalink"],
        "sku":               p["sku"],
        "on_sale":           p["on_sale"],
        "price_aed":         p["price_aed"],
        "regular_price_aed": p["regular_price_aed"],
        "sale_price_aed":    p["sale_price_aed"],
        "is_purchasable":    p["is_purchasable"],
        "is_in_stock":       p["is_in_stock"],
        "average_rating":    p["average_rating"],
        "review_count":      p["review_count"],
        "image_count":       p["image_count"],
        "primary_image_url": p["primary_image_url"],
        "category_ids":      "|".join(str(c["id"]) for c in p["categories"]),
        "category_names":    "|".join(c["name"] for c in p["categories"]),
        "tag_ids":           "|".join(str(t["id"]) for t in p["tags"]),
        "tag_names":         "|".join(t["name"] for t in p["tags"]),
        "has_options":       p["has_options"],
        "add_to_cart_text":  p["add_to_cart_text"],
    }

# ─── Completeness Report ────────────────────────────────────────────────────
def generate_report(products: list[dict], categories: list, tags: list) -> str:
    total = len(products)
    if total == 0:
        return "# Export Report\n\nNo products found.\n"

    has_sku          = sum(1 for p in products if p["sku"])
    has_description  = sum(1 for p in products if p["description_raw"] and "wishlist" not in p["description_raw"].lower()[:50])
    has_price        = sum(1 for p in products if p["price_aed"] > 0)
    purchasable      = sum(1 for p in products if p["is_purchasable"])
    has_images       = sum(1 for p in products if p["image_count"] > 0)
    has_categories   = sum(1 for p in products if len(p["categories"]) > 0)
    has_tags         = sum(1 for p in products if len(p["tags"]) > 0)
    has_attributes   = sum(1 for p in products if len(p["attributes"]) > 0)
    has_brands       = sum(1 for p in products if len(p["brands"]) > 0)
    has_reviews      = sum(1 for p in products if p["review_count"] > 0)
    on_sale          = sum(1 for p in products if p["on_sale"])
    simple           = sum(1 for p in products if p["type"] == "simple")
    variable         = sum(1 for p in products if p["type"] == "variable")

    def pct(n): return f"{n}/{total} ({n*100//total}%)"

    # Price distribution for priced products
    priced = [p["price_aed"] for p in products if p["price_aed"] > 0]
    price_stats = ""
    if priced:
        price_stats = f"""
### Price Distribution (priced products only)
| Stat | Value |
|---|---|
| Min | {min(priced):,.2f} AED |
| Max | {max(priced):,.2f} AED |
| Average | {sum(priced)/len(priced):,.2f} AED |
| Median | {sorted(priced)[len(priced)//2]:,.2f} AED |
"""

    # Category breakdown
    cat_lines = []
    for c in sorted(categories, key=lambda x: x.get("count", 0), reverse=True):
        cat_lines.append(f"| {c['id']} | {c['name']} | {c.get('count', 0)} |")
    cat_table = "\n".join(cat_lines)

    # Duplicate slug detection
    slug_counts = {}
    for p in products:
        base = re.sub(r"-\d+$", "", p["slug"])
        slug_counts.setdefault(base, []).append(p["id"])
    duplicates = {k: v for k, v in slug_counts.items() if len(v) > 1}
    dup_lines = []
    for slug, ids in sorted(duplicates.items()):
        dup_lines.append(f"| {slug} | {', '.join(str(i) for i in ids)} | {len(ids)} |")
    dup_table = "\n".join(dup_lines) if dup_lines else "| (none) | — | — |"

    return f"""# TopEngine.ae — Product Export Report
> Generated: {time.strftime('%Y-%m-%d %H:%M:%S UTC')}

## Summary
| Metric | Value |
|---|---|
| Total Products Extracted | **{total}** |
| Categories | {len(categories)} |
| Tags | {len(tags)} |
| Simple Products | {simple} |
| Variable Products | {variable} |

## Data Completeness
| Field | Filled | Fill Rate |
|---|---|---|
| SKU | {pct(has_sku)} | {'🔴' if has_sku/total < 0.3 else '🟡' if has_sku/total < 0.7 else '🟢'} |
| Description (real) | {pct(has_description)} | {'🔴' if has_description/total < 0.3 else '🟡' if has_description/total < 0.7 else '🟢'} |
| Price > 0 AED | {pct(has_price)} | {'🔴' if has_price/total < 0.3 else '🟡' if has_price/total < 0.7 else '🟢'} |
| Is Purchasable | {pct(purchasable)} | {'🔴' if purchasable/total < 0.3 else '🟡' if purchasable/total < 0.7 else '🟢'} |
| Has Images | {pct(has_images)} | {'🔴' if has_images/total < 0.3 else '🟡' if has_images/total < 0.7 else '🟢'} |
| In Categories | {pct(has_categories)} | {'🔴' if has_categories/total < 0.3 else '🟡' if has_categories/total < 0.7 else '🟢'} |
| Has Tags | {pct(has_tags)} | {'🔴' if has_tags/total < 0.3 else '🟡' if has_tags/total < 0.7 else '🟢'} |
| Has Attributes | {pct(has_attributes)} | {'🔴' if has_attributes/total < 0.3 else '🟡' if has_attributes/total < 0.7 else '🟢'} |
| Has Brands | {pct(has_brands)} | {'🔴' if has_brands/total < 0.3 else '🟡' if has_brands/total < 0.7 else '🟢'} |
| Has Reviews | {pct(has_reviews)} | {'🔴' if has_reviews/total < 0.3 else '🟡' if has_reviews/total < 0.7 else '🟢'} |
| On Sale | {pct(on_sale)} | ℹ️ |

{price_stats}

## Category Breakdown
| ID | Name | Product Count |
|---|---|---|
{cat_table}

## Potential Duplicates (by base slug)
| Base Slug | Product IDs | Count |
|---|---|---|
{dup_table}

## Critical Issues Summary
1. **SKU fill rate: {has_sku*100//total}%** — {'Good coverage' if has_sku/total > 0.7 else 'Most products lack a part number'}
2. **Description fill rate: {has_description*100//total}%** — Nearly all descriptions are empty or only contain Wishlist widget HTML
3. **Price fill rate: {has_price*100//total}%** — The vast majority of products show 0.00 AED
4. **Purchasable rate: {purchasable*100//total}%** — Only a fraction of products can actually be added to cart
5. **Attributes fill rate: {has_attributes*100//total}%** — Engine Code taxonomy exists (186 terms) but is never applied
6. **Brands fill rate: {has_brands*100//total}%** — Brand taxonomy is completely unused

## Files Generated
- `products.json` — {total} products, full structured data
- `products.csv` — {total} rows, flattened for spreadsheet use
- `categories.json` — {len(categories)} categories
- `tags.json` — {len(tags)} tags
- `attributes.json` — Attribute definitions + terms
- `export_report.md` — This file
"""

# ─── Main ────────────────────────────────────────────────────────────────────
def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    print("=" * 60)
    print("TopEngine.ae Product Export")
    print("=" * 60)

    # 1. Fetch all data
    print("\n📦 Fetching products …")
    raw_products = fetch_all_products()
    print(f"   → {len(raw_products)} products fetched")

    print("\n📂 Fetching taxonomy data …")
    categories = fetch_categories()
    tags       = fetch_tags()
    attributes = fetch_attributes()
    print(f"   → {len(categories)} categories, {len(tags)} tags, {len(attributes)} attributes")

    # 2. Clean products
    print("\n🧹 Cleaning product data …")
    products = [clean_product(p) for p in raw_products]

    # 3. Write JSON files
    print("\n💾 Writing JSON files …")
    with open(OUT_DIR / "products.json", "w", encoding="utf-8") as f:
        json.dump(products, f, indent=2, ensure_ascii=False)
    print(f"   → products.json ({len(products)} products)")

    with open(OUT_DIR / "categories.json", "w", encoding="utf-8") as f:
        json.dump(categories, f, indent=2, ensure_ascii=False)
    print(f"   → categories.json ({len(categories)} categories)")

    with open(OUT_DIR / "tags.json", "w", encoding="utf-8") as f:
        json.dump(tags, f, indent=2, ensure_ascii=False)
    print(f"   → tags.json ({len(tags)} tags)")

    with open(OUT_DIR / "attributes.json", "w", encoding="utf-8") as f:
        json.dump(attributes, f, indent=2, ensure_ascii=False)
    print(f"   → attributes.json ({len(attributes)} attributes)")

    # 4. Write CSV
    print("\n📊 Writing CSV …")
    with open(OUT_DIR / "products.csv", "w", newline="", encoding="utf-8-sig") as f:
        writer = csv.DictWriter(f, fieldnames=CSV_COLUMNS)
        writer.writeheader()
        for p in products:
            writer.writerow(product_to_csv_row(p))
    print(f"   → products.csv ({len(products)} rows)")

    # 5. Completeness report
    print("\n📋 Generating completeness report …")
    report = generate_report(products, categories, tags)
    with open(OUT_DIR / "export_report.md", "w", encoding="utf-8") as f:
        f.write(report)
    print("   → export_report.md")

    print("\n" + "=" * 60)
    print(f"✅ Export complete! {len(products)} products → {OUT_DIR}")
    print("=" * 60)

if __name__ == "__main__":
    main()
