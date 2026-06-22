import type { CountryCode, GetStateShapeOptions, ShapeVariant, StateCode } from './types.js';
import { US_REGIONS } from './us.js';

const DEFAULT_COUNTRY: CountryCode = 'us';
const DEFAULT_VARIANT: ShapeVariant = 'default';

function getAssetDirectory(country: CountryCode, variant: ShapeVariant): string {
  if (country !== 'us') {
    throw new Error(`Unsupported country: ${country}`);
  }

  return variant === 'theme' ? 'assets/us-theme' : 'assets/us';
}

export function resolveStateShapePath(
  code: StateCode,
  options: GetStateShapeOptions = {}
): string {
  const country = options.country ?? DEFAULT_COUNTRY;
  const variant = options.variant ?? DEFAULT_VARIANT;

  if (country !== 'us') {
    throw new Error(`Unsupported country: ${country}`);
  }

  const region = US_REGIONS[code];

  if (!region) {
    throw new Error(`Unknown state code: ${code}`);
  }

  return `${getAssetDirectory(country, variant)}/${region.slug}.svg`;
}
