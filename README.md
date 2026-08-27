# df-state-shapes

SVG shapes for US states and world countries — with a typed lookup API.

US state icons are 128×128 with a single path. World country icons are 205×205 with multiple paths. Shapes are normalized for UI use (not geographic projections).

## Install

```bash
npm install df-state-shapes
```

## Quick start

### US states

```ts
import { getStateShape, dfStateShapes } from 'df-state-shapes';

const california = getStateShape('CA');
// {
//   code: 'CA',
//   slug: 'california',
//   name: 'California',
//   path: 'assets/us/california.svg'
// }

const themed = getStateShape('CA', { variant: 'theme' });
// path → assets/us-theme/california.svg

dfStateShapes.list(); // 52 shapes
```

### World countries

```ts
import { getCountryShape, dfCountryShapes } from 'df-state-shapes';

const canada = getCountryShape('CA');
// {
//   code: 'CA',
//   slug: 'ca',
//   name: 'Canada',
//   path: 'assets/world/ca.svg'
// }

const themed = getCountryShape('JP', { variant: 'theme' });
// path → assets/world-theme/jp.svg

dfCountryShapes.list(); // 242 countries
```

## Code collisions

Some ISO codes overlap with US state abbreviations. Use the right API:

| Code | `getStateShape` | `getCountryShape` |
|------|-----------------|-------------------|
| `CA` | California | Canada |
| `US` | US outline (128×128, `assets/us/united-states.svg`) | United States (205×205, `assets/world/us.svg`) |
| `GA` | Georgia (state) | Gabon (country) |

## API

### US subdivisions — `getStateShape(code, options?)`

| Option | Default | Values |
|--------|---------|--------|
| `country` | `'us'` | `'us'` (more subdivision regions planned) |
| `variant` | `'default'` | `'default'` or `'theme'` |

**Codes:** USPS abbreviations (`CA`, `NY`, …), plus `DC` and `US`.

Also: `listStateShapes()`, `dfStateShapes`, `resolveStateShapePath()`.

### World countries — `getCountryShape(code, options?)`

| Option | Default | Values |
|--------|---------|--------|
| `variant` | `'default'` | `'default'` or `'theme'` |

**Codes:** ISO 3166-1 alpha-2 (`CA`, `JP`, `GB`, …) — 242 countries and territories.

Also: `listCountryShapes()`, `dfCountryShapes`, `resolveCountryShapePath()`.

## Direct SVG imports

```ts
import californiaUrl from 'df-state-shapes/assets/us/california.svg?url';
import canadaUrl from 'df-state-shapes/assets/world/ca.svg?url';

// With SVGR (React):
import California from 'df-state-shapes/assets/us/california.svg?react';
import Canada from 'df-state-shapes/assets/world/ca.svg?react';
```

## Theming

Default shapes use `#030712`. Theme variants use `currentColor`:

```ts
getStateShape('CA', { variant: 'theme' });   // assets/us-theme/california.svg
getCountryShape('CA', { variant: 'theme' }); // assets/world-theme/ca.svg
```

```css
.shape-icon {
  color: #2563eb;
}
```

## CDN

```
https://cdn.jsdelivr.net/npm/df-state-shapes@2/assets/us/california.svg
https://cdn.jsdelivr.net/npm/df-state-shapes@2/assets/world/ca.svg
https://cdn.jsdelivr.net/npm/df-state-shapes@2/assets/world-theme/jp.svg
```

## Manifest

```ts
import manifest from 'df-state-shapes/manifest.json';
// manifest.us — 52 US shapes
// manifest.world — 242 countries
```

## US code → slug reference

| Code | Slug | Name |
|------|------|------|
| AL | alabama | Alabama |
| AK | alaska | Alaska |
| AZ | arizona | Arizona |
| AR | arkansas | Arkansas |
| CA | california | California |
| CO | colorado | Colorado |
| CT | connecticut | Connecticut |
| DE | delaware | Delaware |
| DC | district-of-columbia | District of Columbia |
| FL | florida | Florida |
| GA | georgia | Georgia |
| HI | hawaii | Hawaii |
| ID | idaho | Idaho |
| IL | illinois | Illinois |
| IN | indiana | Indiana |
| IA | iowa | Iowa |
| KS | kansas | Kansas |
| KY | kentucky | Kentucky |
| LA | louisiana | Louisiana |
| ME | maine | Maine |
| MD | maryland | Maryland |
| MA | massachusetts | Massachusetts |
| MI | michigan | Michigan |
| MN | minnesota | Minnesota |
| MS | mississippi | Mississippi |
| MO | missouri | Missouri |
| MT | montana | Montana |
| NE | nebraska | Nebraska |
| NV | nevada | Nevada |
| NH | new-hampshire | New Hampshire |
| NJ | new-jersey | New Jersey |
| NM | new-mexico | New Mexico |
| NY | new-york | New York |
| NC | north-carolina | North Carolina |
| ND | north-dakota | North Dakota |
| OH | ohio | Ohio |
| OK | oklahoma | Oklahoma |
| OR | oregon | Oregon |
| PA | pennsylvania | Pennsylvania |
| RI | rhode-island | Rhode Island |
| SC | south-carolina | South Carolina |
| SD | south-dakota | South Dakota |
| TN | tennessee | Tennessee |
| TX | texas | Texas |
| US | united-states | United States |
| UT | utah | Utah |
| VT | vermont | Vermont |
| VA | virginia | Virginia |
| WA | washington | Washington |
| WV | west-virginia | West Virginia |
| WI | wisconsin | Wisconsin |
| WY | wyoming | Wyoming |

World countries use lowercase ISO slugs (`CA` → `ca.svg`, `JP` → `jp.svg`). Use `listCountryShapes()` or the manifest for the full list.

## Asset layout

```
assets/
├── us/           # US subdivisions (default fills)
├── us-theme/     # US theme variants (generated at build)
├── world/        # World countries (default fills)
└── world-theme/  # World theme variants (generated at build)
```

Future subdivision regions (e.g. Canadian provinces) will follow the US pattern under `assets/ca/`, using `getStateShape('ON', { country: 'ca' })`.

## Migration from v1

- US API unchanged — `getStateShape('CA')` still returns California
- New country API — `getCountryShape('CA')` returns Canada
- CDN URLs: pin `@2` for world assets

SVGs previously lived at `states/california.svg`. They now live at `assets/us/california.svg`.

## Development

```bash
npm install
npm run build              # normalize world SVGs, codegen, theme, compile, manifest
npm run normalize:world    # Figma names → ISO slugs (first run only)
npm run generate:world-ts  # regenerate src/world.generated.ts
npm run generate:theme     # regenerate theme SVGs
```

## License

MIT
