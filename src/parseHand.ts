import assertNever from 'assert-never';
import { InvalidHandError } from './errors/InvalidHandError';
import { InvalidSiteError } from './errors/InvalidSiteError';
import { parseSite } from './parseSite';
import { HandHistory, ParseHandOptions, Site } from './types';

const getParser = async (site: Site) => {
  switch (site) {
    case 'bodog':
    case 'bovada':
    case 'ignition':
      return (await import('./networks/ignition/parseHand')).parseHand;
    default:
      return assertNever(site);
  }
};

/**
 * Parses a hand of poker into a {@link HandHistory} object.
 * @param {object} options The required options for parsing the poker hand.
 * @param {string} options.hand The contents of the hand history for an individual hand of poker.
 * @param {string|undefined} options.filename The hand history filename.
 * @returns {Promise<HandHistory>} A promise
 * @throws {InvalidHandError} if the hand cannot be parsed for the determined poker site.
 * @throws {InvalidSiteError} if the poker site cannot be determined.
 */
export const parseHand = async ({ hand, filename }: ParseHandOptions): Promise<HandHistory> => {
  const site = parseSite(hand);
  try {
    const parse = await getParser(site);
    return parse({ hand, filename });
  } catch (err) {
    throw new InvalidHandError();
  }
};
