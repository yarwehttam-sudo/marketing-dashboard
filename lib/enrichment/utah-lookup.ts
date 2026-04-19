/**
 * Utah-only county assessor, utility, and Zillow URL resolvers.
 * Covers Salt Lake County (840–841) and Utah County (843–847).
 * Step 9 will expand this to additional Utah counties and other states.
 */

/**
 * Returns the county assessor search URL for the given ZIP, or null if outside
 * the Utah-only initial scope.
 */
export function resolveCountyAssessorUrl(zip: string): string | null {
  const prefix = parseInt(zip.slice(0, 3), 10);
  if (prefix >= 840 && prefix <= 841) {
    return 'https://slco.org/assessor/new/query/';
  }
  if (prefix >= 843 && prefix <= 847) {
    return 'https://maps.utahcounty.gov/parcel/';
  }
  return null;
}

/**
 * Returns the Rocky Mountain Power rate schedule URL for Utah ZIPs (840–847),
 * or null for non-Utah ZIPs.
 */
export function resolveUtilityRateUrl(zip: string): string | null {
  const prefix = parseInt(zip.slice(0, 3), 10);
  if (prefix >= 840 && prefix <= 847) {
    return 'https://www.rockymountainpower.net/savings-energy-choices/pricing-fees/rate-schedules.html';
  }
  return null;
}

/**
 * Builds a Zillow search URL for a given address and ZIP.
 * Uses Zillow's standard /homes/ search format.
 */
export function buildZillowSearchUrl(address: string, zip: string): string {
  const encoded = address.trim().replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '');
  return `https://www.zillow.com/homes/${encoded}-${zip}_rb/`;
}
