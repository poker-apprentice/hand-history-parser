import assertNever from 'assert-never';
import { Site } from './types';

export interface ParseHandOptions {
  hand: string;
  site: Site;
}

const getParser = async (site: Site) => {
  switch (site) {
    case 'bovada':
      return (await import('./sites/bovada/parseHand')).parseHand;
    default:
      return assertNever(site);
  }
};

export const parseHand = async ({ hand, site }: ParseHandOptions) => {
  const parse = await getParser(site);
  return parse(hand);
};
