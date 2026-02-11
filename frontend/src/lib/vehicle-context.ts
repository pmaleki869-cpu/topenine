/**
 * Vehicle context — localStorage persistence for the user's
 * selected vehicle (Make > Model > Engine).
 *
 * Used to:
 * - Pre-fill WhatsApp messages with vehicle context
 * - Show "Your vehicle" indicator in header
 * - Filter search results by relevance
 */

export interface VehicleSelection {
  make: string;       // slug
  makeName: string;   // display name
  model: string;      // slug
  modelName: string;  // display name
  engine?: string;    // engine code (e.g. "1GD-FTV")
}

const STORAGE_KEY = "topengine_vehicle";

/**
 * Save the user's vehicle selection to localStorage.
 */
export function saveVehicle(vehicle: VehicleSelection): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(vehicle));
  } catch {
    // localStorage may be unavailable (private browsing, full, etc.)
  }
}

/**
 * Load the user's saved vehicle selection from localStorage.
 * Returns null if no vehicle is saved or if storage is unavailable.
 */
export function loadVehicle(): VehicleSelection | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored) as VehicleSelection;
  } catch {
    return null;
  }
}

/**
 * Clear the user's saved vehicle selection.
 */
export function clearVehicle(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

/**
 * Format the vehicle selection as a human-readable string.
 * e.g. "Toyota Hilux (1GD-FTV)"
 */
export function formatVehicle(vehicle: VehicleSelection | null): string {
  if (!vehicle) return "";
  const parts = [vehicle.makeName, vehicle.modelName];
  if (vehicle.engine) parts.push(`(${vehicle.engine})`);
  return parts.join(" ");
}
