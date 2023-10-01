import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import BigNumber from 'bignumber.js';
import { ChipCountContext } from '~/grammar/IgnitionParser';
import { IgnitionVisitor } from '~/grammar/IgnitionVisitor';
import { NotImplementedError } from './types';

// TODO: we're assuming commas are always thousands separators, but that may depend on locale
const parseNumber = (num: string) => new BigNumber(num.replace(',', ''));

export class IgnitionChipCountVisitor
  extends AbstractParseTreeVisitor<BigNumber>
  implements IgnitionVisitor<BigNumber>
{
  protected defaultResult(): BigNumber {
    throw new NotImplementedError();
  }

  visitChipCount(ctx: ChipCountContext): BigNumber {
    return parseNumber(ctx.value().text);
  }
}
