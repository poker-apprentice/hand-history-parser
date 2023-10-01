import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { SiteBovadaContext } from '~/grammar/SiteParser';
import { SiteVisitor } from '~/grammar/SiteVisitor';
import { Site } from '~/types';

export class SiteSwitchVisitor
  extends AbstractParseTreeVisitor<Site | undefined>
  implements SiteVisitor<Site | undefined>
{
  protected defaultResult(): undefined {
    return undefined;
  }

  visitSiteBovada(ctx: SiteBovadaContext): Site {
    const site = ctx.bovadaSite().text;
    switch (site) {
      case 'Bodog':
        return 'bodog';
      case 'Bovada':
        return 'bovada';
      case 'Ignition':
        return 'ignition';
      default:
        throw new Error(`Unexpected site: "${ctx.text}"`);
    }
  }
}
