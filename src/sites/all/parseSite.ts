import { InvalidSiteError } from '~/errors/InvalidSiteError';
import { SiteLexer } from '~/grammar/SiteLexer';
import { SiteParser } from '~/grammar/SiteParser';
import { Site } from '~/types';
import { getParser } from '~/utils/getParser';
import { SiteSwitchVisitor } from './SiteSwitchVisitor';

const getFirstLine = (str: string) => {
  const [firstLine] = str.replace(/^\s+/g, '').split(/[\r\n]+/g, 2);
  return firstLine;
};

export const parseSite = (hand: string): Site => {
  const siteMeta = getFirstLine(hand);
  const parser = getParser(siteMeta, { lexer: SiteLexer, parser: SiteParser });

  try {
    const context = parser.site();
    const visitor = new SiteSwitchVisitor();
    const site = visitor.visit(context);
    if (site === undefined) {
      throw new Error();
    }
    return site;
  } catch (err) {
    throw new InvalidSiteError(siteMeta);
  }
};
