import assertNever from 'assert-never';
import { InvalidHandError } from './errors/InvalidHandError';
import { parseSite } from './sites/all/parseSite';
import { HandHistory, Site } from './types';

const getParser = async (site: Site) => {
  switch (site) {
    case 'bovada':
      return (await import('./sites/bovada/parseHand')).parseHand;
    default:
      return assertNever(site);
  }
};

export const parseHand = async (hand: string): Promise<HandHistory> => {
  const site = parseSite(hand);
  try {
    const parse = await getParser(site);
    return parse(hand);
  } catch (err) {
    throw new InvalidHandError();
  }
};
