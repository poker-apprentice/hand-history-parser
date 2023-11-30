import { InvalidSiteError } from './errors/InvalidSiteError';
import { Site } from './types';

const getFirstLine = (str: string) => {
  const [firstLine] = str.replace(/^\s+/g, '').split(/[\r\n]+/g, 2);
  return firstLine;
};

export const parseSite = (hand: string): Site => {
  const siteMeta = getFirstLine(hand);

  if (siteMeta.match(/^Bodog\b/)) {
    return 'bodog';
  }
  if (siteMeta.match(/^Bovada\b/)) {
    return 'bovada';
  }
  if (siteMeta.match(/^Ignition\b/)) {
    return 'ignition';
  }

  throw new InvalidSiteError(siteMeta);
};
