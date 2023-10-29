import { ParserRuleContext } from 'antlr4ts';
import { Interval } from 'antlr4ts/misc/Interval';

export const getParserContextSubstring = (ctx: ParserRuleContext): string => {
  const { start, stop } = ctx;
  if (!start.inputStream || !stop || start.startIndex < 0 || stop.stopIndex < 0) {
    return start.text ?? '';
  }
  return start.inputStream.getText(Interval.of(start.startIndex, stop.stopIndex));
};
