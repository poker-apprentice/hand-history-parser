import { InvalidSiteError } from './errors/InvalidSiteError';
import { Site } from './types';

const invert = <T extends PropertyKey, U extends PropertyKey>(input: Record<T, U>) =>
  Object.fromEntries(Object.entries(input).map(([key, value]) => [value, key])) as Record<U, T>;

const SITE_STRINGS: Record<Site, string> = {
  bodog: 'Bodog',
  bovada: 'Bovada',
  ignition: 'Ignition',
  pokerstars: 'PokerStars',
} as const;

const SITE_LOOKUP = invert(SITE_STRINGS);

export const parseSite = (hand: string): Site => {
  const regex = new RegExp(`(?<site>${Object.values(SITE_STRINGS).join('|')})`, 'm');
  const groups = hand.match(regex)?.groups ?? {};
  const site: Site | undefined = SITE_LOOKUP[groups.site];

  if (!site) {
    throw new InvalidSiteError(hand);
  }
  return site;
};
