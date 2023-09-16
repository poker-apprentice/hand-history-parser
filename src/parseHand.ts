import assertNever from 'assert-never';
import { parseSite } from './sites/all/parseSite';
import { Site } from './types';

const getParser = async (site: Site) => {
  switch (site) {
    case 'bovada':
      return (await import('./sites/bovada/parseHand')).parseHand;
    default:
      return assertNever(site);
  }
};

export const parseHand = async (hand: string) => {
  const site = parseSite(hand);
  const parse = await getParser(site);
  return parse(hand);
};
