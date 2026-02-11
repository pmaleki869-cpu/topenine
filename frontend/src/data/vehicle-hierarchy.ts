/**
 * Vehicle hierarchy mapping for the redesigned IA.
 * Maps the current flat WooCommerce categories into a
 * Make → Model → Engine structure.
 */
import type { VehicleMake } from "@/types";

export const VEHICLE_HIERARCHY: VehicleMake[] = [
  {
    slug: "toyota",
    name: "Toyota",
    models: [
      {
        slug: "hilux",
        name: "Hilux",
        engines: [
          { code: "1GD-FTV", displacement: "2.8L", fuel: "diesel", categoryIds: [817, 871] },
          { code: "2GD-FTV", displacement: "2.4L", fuel: "diesel", categoryIds: [817] },
          { code: "1KD-FTV", displacement: "3.0L", fuel: "diesel", categoryIds: [817] },
          { code: "2KD-FTV", displacement: "2.5L", fuel: "diesel", categoryIds: [817] },
          { code: "2TR-FE",  displacement: "2.7L", fuel: "petrol", categoryIds: [825] },
        ],
      },
      {
        slug: "fortuner",
        name: "Fortuner",
        engines: [
          { code: "1GD-FTV", displacement: "2.8L", fuel: "diesel", categoryIds: [817] },
          { code: "2GD-FTV", displacement: "2.4L", fuel: "diesel", categoryIds: [817] },
          { code: "2TR-FE",  displacement: "2.7L", fuel: "petrol", categoryIds: [825] },
        ],
      },
      {
        slug: "land-cruiser-prado",
        name: "Land Cruiser Prado",
        engines: [
          { code: "1GD-FTV", displacement: "2.8L", fuel: "diesel", categoryIds: [828, 938] },
          { code: "2TR-FE",  displacement: "2.7L", fuel: "petrol", categoryIds: [826] },
        ],
      },
      {
        slug: "land-cruiser-300",
        name: "Land Cruiser 300",
        engines: [
          { code: "V35A-FTS", displacement: "3.5L", fuel: "petrol", categoryIds: [818] },
        ],
      },
      {
        slug: "hiace",
        name: "Hiace",
        engines: [
          { code: "1GD-FTV", displacement: "2.8L", fuel: "diesel", categoryIds: [827] },
        ],
      },
      {
        slug: "land-cruiser",
        name: "Land Cruiser (70/200 Series)",
        engines: [
          { code: "1VD-FTV", displacement: "4.5L", fuel: "diesel", categoryIds: [816] },
          { code: "1HZ",     displacement: "4.2L", fuel: "diesel", categoryIds: [816] },
          { code: "1HD-T",   displacement: "4.2L", fuel: "diesel", categoryIds: [816] },
        ],
      },
    ],
  },
  {
    slug: "nissan",
    name: "Nissan",
    models: [
      {
        slug: "navara",
        name: "Navara",
        engines: [
          { code: "YD25",  displacement: "2.5L", fuel: "diesel", categoryIds: [823] },
        ],
      },
      {
        slug: "patrol",
        name: "Patrol",
        engines: [
          { code: "ZD30",  displacement: "3.0L", fuel: "diesel", categoryIds: [824] },
        ],
      },
    ],
  },
  {
    slug: "ford",
    name: "Ford",
    models: [
      {
        slug: "ranger",
        name: "Ranger / Mazda BT-50",
        engines: [
          { code: "WL",    displacement: "2.5L", fuel: "diesel", categoryIds: [814] },
          { code: "WE",    displacement: "2.5L", fuel: "diesel", categoryIds: [814] },
          { code: "P4AT",  displacement: "2.2L", fuel: "diesel", categoryIds: [814] },
          { code: "P5AT",  displacement: "3.2L", fuel: "diesel", categoryIds: [814] },
        ],
      },
    ],
  },
  {
    slug: "mitsubishi",
    name: "Mitsubishi",
    models: [
      {
        slug: "l200-triton",
        name: "L200 / Triton / Pajero Sport",
        engines: [
          { code: "4D56",  displacement: "2.5L", fuel: "diesel", categoryIds: [815] },
          { code: "4N15",  displacement: "2.4L", fuel: "diesel", categoryIds: [815] },
        ],
      },
    ],
  },
];

/**
 * Part-type classification derived from product name patterns.
 * Used for the "Shop by Part Type" facet.
 */
export const PART_TYPES = [
  { slug: "engine-assy",        name: "Engine Assemblies",         keywords: ["engine assy", "engine assembly"] },
  { slug: "ecu",                name: "ECU / Engine Control",      keywords: ["computer engine control", "ecu", "engine control"] },
  { slug: "turbo",              name: "Turbochargers",             keywords: ["turbo charger", "turbocharger"] },
  { slug: "transmission",       name: "Transmission",              keywords: ["manual transmission", "automatic transmission"] },
  { slug: "alternator-starter", name: "Alternators & Starters",    keywords: ["alternator", "starter"] },
  { slug: "injector-fuel",      name: "Injectors & Fuel System",   keywords: ["injector", "diesel pump", "fuel pump", "fuel filter"] },
  { slug: "cooling",            name: "Cooling System",            keywords: ["radiator", "water pump", "fan", "fluid coupling", "thermostat"] },
  { slug: "belts-tensioners",   name: "Belts & Tensioners",        keywords: ["belt", "tensioner", "timing chain"] },
  { slug: "clutch",             name: "Clutch & Flywheel",         keywords: ["clutch disc", "clutch cover", "flywheel"] },
  { slug: "filters",            name: "Filters",                   keywords: ["oil filter", "air filter", "fuel filter"] },
  { slug: "gaskets-seals",      name: "Gaskets & Seals",           keywords: ["gasket", "oil seal", "head gasket"] },
  { slug: "pistons-crank",      name: "Pistons & Crankshafts",     keywords: ["piston", "crankshaft", "connecting rod", "bearing", "ring set"] },
  { slug: "sensors-electrical", name: "Sensors & Electrical",      keywords: ["sensor", "glow plug", "relay"] },
  { slug: "mounting",           name: "Engine Mounting",            keywords: ["mounting", "insulator", "bracket"] },
  { slug: "steering",           name: "Steering & Power Pump",     keywords: ["power pump", "steering"] },
  { slug: "cylinder-head",      name: "Cylinder Heads",            keywords: ["cylinder head"] },
  { slug: "other",              name: "Other Parts",               keywords: [] },
] as const;

export type PartTypeSlug = (typeof PART_TYPES)[number]["slug"];
