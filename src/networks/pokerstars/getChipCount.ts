import BigNumber from 'bignumber.js';
import { CurrencyValueContext } from '~/grammar/PokerStarsParser';

// TODO: we're assuming commas are always thousands separators, but that may depend on locale
export const getChipCount = (ctx: CurrencyValueContext): BigNumber =>
  new BigNumber(ctx.text.replace(',', ''));
