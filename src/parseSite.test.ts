import { HAND as HAND_BODOG } from './__fixtures__/hands/bodog';
import { HAND_ALL_IN as HAND_BOVADA } from './__fixtures__/hands/bovada';
import { HAND as HAND_IGNITION } from './__fixtures__/hands/ignition';
import { HAND_CASH_NO_SHOWDOWN as HAND_POKERSTARS } from './__fixtures__/hands/pokerstars';
import { InvalidSiteError } from './errors/InvalidSiteError';
import { parseSite } from './parseSite';

describe('parseSite', () => {
  it('parses bodog hand', () => {
    expect(parseSite(HAND_BODOG)).toEqual('bodog');
  });

  it('parses bovada hand', () => {
    expect(parseSite(HAND_BOVADA)).toEqual('bovada');
  });

  it('parses bovada hand', () => {
    expect(parseSite(HAND_IGNITION)).toEqual('ignition');
  });

  it('parses pokerstars hand', () => {
    expect(parseSite(HAND_POKERSTARS)).toEqual('pokerstars');
  });

  it('throws unrecognized hand', () => {
    expect(() => parseSite('something random and unknown\r\nline two')).toThrow(InvalidSiteError);
  });
});
