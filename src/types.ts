export type StateCode =
  | 'AL'
  | 'AK'
  | 'AZ'
  | 'AR'
  | 'CA'
  | 'CO'
  | 'CT'
  | 'DE'
  | 'FL'
  | 'GA'
  | 'HI'
  | 'ID'
  | 'IL'
  | 'IN'
  | 'IA'
  | 'KS'
  | 'KY'
  | 'LA'
  | 'ME'
  | 'MD'
  | 'MA'
  | 'MI'
  | 'MN'
  | 'MS'
  | 'MO'
  | 'MT'
  | 'NE'
  | 'NV'
  | 'NH'
  | 'NJ'
  | 'NM'
  | 'NY'
  | 'NC'
  | 'ND'
  | 'OH'
  | 'OK'
  | 'OR'
  | 'PA'
  | 'RI'
  | 'SC'
  | 'SD'
  | 'TN'
  | 'TX'
  | 'UT'
  | 'VT'
  | 'VA'
  | 'WA'
  | 'WV'
  | 'WI'
  | 'WY'
  | 'DC'
  | 'US';

export type StateSlug =
  | 'alabama'
  | 'alaska'
  | 'arizona'
  | 'arkansas'
  | 'california'
  | 'colorado'
  | 'connecticut'
  | 'delaware'
  | 'district-of-columbia'
  | 'florida'
  | 'georgia'
  | 'hawaii'
  | 'idaho'
  | 'illinois'
  | 'indiana'
  | 'iowa'
  | 'kansas'
  | 'kentucky'
  | 'louisiana'
  | 'maine'
  | 'maryland'
  | 'massachusetts'
  | 'michigan'
  | 'minnesota'
  | 'mississippi'
  | 'missouri'
  | 'montana'
  | 'nebraska'
  | 'nevada'
  | 'new-hampshire'
  | 'new-jersey'
  | 'new-mexico'
  | 'new-york'
  | 'north-carolina'
  | 'north-dakota'
  | 'ohio'
  | 'oklahoma'
  | 'oregon'
  | 'pennsylvania'
  | 'rhode-island'
  | 'south-carolina'
  | 'south-dakota'
  | 'tennessee'
  | 'texas'
  | 'united-states'
  | 'utah'
  | 'vermont'
  | 'virginia'
  | 'washington'
  | 'west-virginia'
  | 'wisconsin'
  | 'wyoming';

export type CountryCode = 'us';

export type ShapeVariant = 'default' | 'theme';

export type StateShape = {
  code: StateCode;
  slug: StateSlug;
  name: string;
  path: string;
};

export type GetStateShapeOptions = {
  country?: CountryCode;
  variant?: ShapeVariant;
};

export type StateRegion = {
  slug: StateSlug;
  name: string;
};
