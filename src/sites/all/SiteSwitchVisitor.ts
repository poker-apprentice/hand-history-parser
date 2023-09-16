import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { SiteVisitor } from '~/grammar/SiteVisitor';
import { Site } from '~/types';

export class SiteSwitchVisitor
  extends AbstractParseTreeVisitor<Site | undefined>
  implements SiteVisitor<Site | undefined>
{
  protected defaultResult(): undefined {
    return undefined;
  }

  visitSiteBovada(): Site {
    return 'bovada';
  }
}
