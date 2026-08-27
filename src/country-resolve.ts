import type { GetCountryShapeOptions, ShapeVariant } from './types.js';
import type { IsoCode } from './world.generated.js';
import { WORLD_COUNTRIES } from './world.generated.js';

const DEFAULT_VARIANT: ShapeVariant = 'default';

function getWorldAssetDirectory(variant: ShapeVariant): string {
  return variant === 'theme' ? 'assets/world-theme' : 'assets/world';
}

export function resolveCountryShapePath(
  code: IsoCode,
  options: GetCountryShapeOptions = {}
): string {
  const variant = options.variant ?? DEFAULT_VARIANT;
  const region = WORLD_COUNTRIES[code];

  if (!region) {
    throw new Error(`Unknown country code: ${code}`);
  }

  return `${getWorldAssetDirectory(variant)}/${region.slug}.svg`;
}
