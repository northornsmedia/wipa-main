declare module 'country-telephone-data' {
  export const allCountries: Array<{
    name: string;
    iso2: string;
    dialCode: string;
    priority: number;
    format?: string;
  }>;
  export const iso2Lookup: Record<string, any>;
  export const dialCodeLookup: Record<string, any>;
}
