import { HAND as HAND_BODOG } from './__fixtures__/hands/bodog';
import { HAND_ALL_IN as HAND_BOVADA } from './__fixtures__/hands/bovada';
import { HAND as HAND_IGNITION } from './__fixtures__/hands/ignition';
import { parseHand } from './parseHand';
import { Site } from './types';

describe('parseHand', () => {
  const parseSiteFromHand = async (hand: string): Promise<Site> => {
    const { info } = await parseHand({ hand });
    return info.site;
  };

  it.each([
    ['bodog', HAND_BODOG],
    ['bovada', HAND_BOVADA],
    ['ignition', HAND_IGNITION],
  ])('parses %s hands', async (site, handHistoryContent) => {
    expect(await parseSiteFromHand(handHistoryContent)).toEqual(site);
  });
});
