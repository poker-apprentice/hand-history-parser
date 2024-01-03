import BigNumber from 'bignumber.js';
import { ChipCountContext } from '~/grammar/IgnitionParser';

// TODO: we're assuming commas are always thousands separators, but that may depend on locale
export const getChipCount = (ctx: ChipCountContext) =>
  new BigNumber(ctx.value().text.replace(',', '')).toString();
