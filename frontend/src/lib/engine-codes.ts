/**
 * Engine code extraction — regex-based extraction of engine codes
 * from product names and descriptions.
 *
 * Common patterns: 1GD-FTV, YD25, 4D56, WL, WE, P4AT, P5AT,
 * 2TR-FE, V35A-FTS, 1VD-FTV, 1HZ, 1HD-T, ZD30, 2GD-FTV, etc.
 */

/** Known engine codes from our vehicle hierarchy */
const KNOWN_ENGINE_CODES = [
  "1GD-FTV",
  "2GD-FTV",
  "1KD-FTV",
  "2KD-FTV",
  "2TR-FE",
  "V35A-FTS",
  "1VD-FTV",
  "1HZ",
  "1HD-T",
  "YD25",
  "ZD30",
  "WL",
  "WE",
  "P4AT",
  "P5AT",
  "4D56",
  "4N15",
] as const;

/**
 * Regex pattern to match common engine code formats:
 * - Letter(s)+Digit(s)+optional(-Letter(s)+Digit(s)) e.g. 1GD-FTV, 2TR-FE
 * - Short codes like YD25, ZD30, 4D56, 4N15
 * - Two-letter codes: WL, WE
 * - Alphanumeric: P4AT, P5AT
 * - Complex: V35A-FTS
 */
const ENGINE_CODE_REGEX =
  /\b(V?[0-9]{0,2}[A-Z]{1,3}[0-9]{0,2}[A-Z]?-[A-Z]{1,4}|[0-9][A-Z]{1,2}[0-9]{1,2}|[A-Z]{2,4}[0-9]{1,2}[A-Z]?|P[0-9][A-Z]{2}|[A-Z]{2})\b/g;

/**
 * Extract engine codes from a product name/description string.
 * First tries exact matches against known codes, then falls back to regex.
 * Returns deduplicated array of matched codes.
 */
export function extractEngineCodes(text: string): string[] {
  if (!text) return [];

  const upper = text.toUpperCase();
  const found = new Set<string>();

  // Phase 1: Exact match against known engine codes
  for (const code of KNOWN_ENGINE_CODES) {
    if (upper.includes(code)) {
      found.add(code);
    }
  }

  // Phase 2: Regex extraction for codes not in known list
  const matches = upper.match(ENGINE_CODE_REGEX);
  if (matches) {
    for (const match of matches) {
      // Filter out common false positives (short words, generic terms)
      if (match.length >= 2 && !FALSE_POSITIVES.has(match)) {
        found.add(match);
      }
    }
  }

  return Array.from(found);
}

/** Words that look like engine codes but aren't */
const FALSE_POSITIVES = new Set([
  "OEM",
  "UAE",
  "GCC",
  "AED",
  "NEW",
  "SET",
  "KIT",
  "TOP",
  "FOR",
  "ALL",
  "THE",
  "AND",
  "WITH",
  "FROM",
  "PUMP",
  "SEAL",
  "BELT",
  "HEAD",
  "DISC",
  "RING",
  "BOLT",
  "PIPE",
  "HOSE",
  "ASSY",
  "AUTO",
  "PART",
  "TYPE",
  "SIZE",
  "UNIT",
  "BODY",
  "CASE",
  "SIDE",
  "LEFT",
  "RH",
  "LH",
  "NO",
  "OR",
  "IN",
  "TO",
  "VIN",
]);

/**
 * Check if a product name contains a specific engine code.
 */
export function hasEngineCode(productName: string, engineCode: string): boolean {
  return productName.toUpperCase().includes(engineCode.toUpperCase());
}

/**
 * Get all known engine codes as an array.
 */
export function getKnownEngineCodes(): readonly string[] {
  return KNOWN_ENGINE_CODES;
}
