# df-state-shapes

SVG shapes for US states, DC, and the United States — with a typed lookup API.

Each shape is a 128×128 icon with a single path. Shapes are normalized for UI use (not geographic projections).

## Install

```bash
npm install df-state-shapes
```

## Quick start

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

const all = dfStateShapes.list(); // 52 shapes
```

## API

### `getStateShape(code, options?)`

Returns metadata and a package-relative asset path for a state code.

| Option | Default | Values |
|--------|---------|--------|
| `country` | `'us'` | `'us'` (more countries planned) |
| `variant` | `'default'` | `'default'` (fill `#030712`) or `'theme'` (`currentColor`) |

**Codes:** standard USPS abbreviations (`CA`, `NY`, …), plus `DC` and `US` (whole-country outline).

### `listStateShapes(options?)`

Returns all shapes for a country. Currently 52 entries: 50 states + DC + US.

### `dfStateShapes`

Namespace object with `.get()` and `.list()` — same as the functions above.

### `resolveStateShapePath(code, options?)`

Returns only the asset path string when you don't need full metadata.

## Direct SVG imports

Import SVG files directly in bundlers that support it (Vite, Webpack 5+, etc.):

```ts
import californiaUrl from 'df-state-shapes/assets/us/california.svg?url';

// With SVGR (React):
import California from 'df-state-shapes/assets/us/california.svg?react';
```

## Theming

Default shapes use a fixed near-black fill (`#030712`). Themeable variants use `currentColor`:

```ts
import { getStateShape } from 'df-state-shapes';

const { path } = getStateShape('CA', { variant: 'theme' });
// assets/us-theme/california.svg
```

```css
.state-icon {
  color: #2563eb;
}
```

Or import directly:

```ts
import 'df-state-shapes/assets/us-theme/california.svg';
```

## CDN

Serve assets without npm via jsDelivr:

```
https://cdn.jsdelivr.net/npm/df-state-shapes@1/assets/us/california.svg
https://cdn.jsdelivr.net/npm/df-state-shapes@1/assets/us-theme/california.svg
```

## Manifest

Non-TypeScript consumers can use the generated manifest:

```ts
import manifest from 'df-state-shapes/manifest.json';
```

## Code → slug reference

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

## Asset layout

```
assets/
├── us/           # default fills
└── us-theme/     # currentColor fills (generated at build)
```

Future regions (e.g. Canadian provinces) will follow the same pattern under `assets/ca/`, using `getStateShape('ON', { country: 'ca' })`.

## Migration from `states/`

SVGs previously lived at `states/california.svg`. They now live at `assets/us/california.svg`. Update any raw GitHub or CDN links accordingly.

## Development

```bash
npm install
npm run build        # generate theme SVGs, compile TS, write manifest
npm run generate:theme
```

## License

MIT
