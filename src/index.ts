import { resolveStateShapePath } from './resolve.js';
import { US_REGIONS } from './us.js';
import type {
  CountryCode,
  GetStateShapeOptions,
  ShapeVariant,
  StateCode,
  StateShape,
  StateSlug,
} from './types.js';

export type {
  CountryCode,
  GetStateShapeOptions,
  ShapeVariant,
  StateCode,
  StateShape,
  StateSlug,
};

export { US_REGIONS } from './us.js';
export { resolveStateShapePath } from './resolve.js';

export function getStateShape(
  code: StateCode,
  options: GetStateShapeOptions = {}
): StateShape {
  const country = options.country ?? 'us';
  const region = US_REGIONS[code];

  if (!region) {
    throw new Error(`Unknown state code: ${code}`);
  }

  if (country !== 'us') {
    throw new Error(`Unsupported country: ${country}`);
  }

  return {
    code,
    slug: region.slug,
    name: region.name,
    path: resolveStateShapePath(code, options),
  };
}

export function listStateShapes(
  options: Pick<GetStateShapeOptions, 'country'> = {}
): StateShape[] {
  const country = options.country ?? 'us';

  if (country !== 'us') {
    throw new Error(`Unsupported country: ${country}`);
  }

  return (Object.keys(US_REGIONS) as StateCode[]).map((code) =>
    getStateShape(code, { country })
  );
}

export const dfStateShapes = {
  get: getStateShape,
  list: listStateShapes,
};
