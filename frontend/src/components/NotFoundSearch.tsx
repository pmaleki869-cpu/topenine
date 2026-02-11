"use client";

import { UnifiedSearch } from "./UnifiedSearch";

/**
 * NotFoundSearch — thin client wrapper so the server-rendered not-found page
 * can include the unified search component.
 */
export function NotFoundSearch() {
  return <UnifiedSearch variant="header" />;
}
