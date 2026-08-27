import { resolveCountryShapePath } from './country-resolve.js';
import { resolveStateShapePath } from './resolve.js';
import { US_REGIONS } from './us.js';
import { WORLD_COUNTRIES } from './world.generated.js';
import type {
  CountryShape,
  GetCountryShapeOptions,
  GetStateShapeOptions,
  ShapeVariant,
  StateCode,
  StateShape,
  StateSlug,
  SubdivisionRegion,
} from './types.js';
import type { CountrySlug, IsoCode } from './world.generated.js';

export type {
  CountryShape,
  CountrySlug,
  GetCountryShapeOptions,
  GetStateShapeOptions,
  IsoCode,
  ShapeVariant,
  StateCode,
  StateShape,
  StateSlug,
  SubdivisionRegion,
};

/** @deprecated Use SubdivisionRegion */
export type CountryCode = SubdivisionRegion;

export { US_REGIONS } from './us.js';
export { WORLD_COUNTRIES } from './world.js';
export { resolveStateShapePath } from './resolve.js';
export { resolveCountryShapePath } from './country-resolve.js';

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
    throw new Error(`Unsupported subdivision region: ${country}`);
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
    throw new Error(`Unsupported subdivision region: ${country}`);
  }

  return (Object.keys(US_REGIONS) as StateCode[]).map((code) =>
    getStateShape(code, { country })
  );
}

export const dfStateShapes = {
  get: getStateShape,
  list: listStateShapes,
};

export function getCountryShape(
  code: IsoCode,
  options: GetCountryShapeOptions = {}
): CountryShape {
  const region = WORLD_COUNTRIES[code];

  if (!region) {
    throw new Error(`Unknown country code: ${code}`);
  }

  return {
    code,
    slug: region.slug,
    name: region.name,
    path: resolveCountryShapePath(code, options),
  };
}

export function listCountryShapes(): CountryShape[] {
  return (Object.keys(WORLD_COUNTRIES) as IsoCode[]).map((code) =>
    getCountryShape(code)
  );
}

export const dfCountryShapes = {
  get: getCountryShape,
  list: listCountryShapes,
};
