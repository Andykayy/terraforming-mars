import {CorporationCard} from '../../corporation/CorporationCard';
import {Tag} from '../../../../common/cards/Tag';
import {IPlayer} from '../../../IPlayer';
import {CardName} from '../../../../common/cards/CardName';
import {CardRenderer} from '../../render/CardRenderer';
import {Size} from '../../../../common/cards/render/Size';

export class HelionRebalance extends CorporationCard {
  constructor() {
    super({
      name: CardName.HELION_RB,
      tags: [Tag.SPACE],
      startingMegaCredits: 40,

      behavior: {
        production: {heat: 4},
        heatDiscount: 1,
      },

      metadata: {
        cardNumber: 'R18',
        description: 'You start with 4 heat production and 40 M€.',
        renderData: CardRenderer.builder((b) => {
          b.br;
          b.production((pb) => pb.heat(4).nbsp).megacredits(40);
          b.corpBox('action', (ce) => {
            ce.vSpace(Size.LARGE);
            ce.effect('You may use heat as M€. You may not use M€ as heat.', (eb) => {
              eb.startEffect.text('x').heat(1).equals().megacredits(1, {text: 'x'});
              ce.effect('Using the RAISE TEMPERATURE action costs 1 less heat.', (eb) => eb.temperature(1).asterix().startEffect.minus().heat(1.)).br;              
            });
          });
        }),
      },
    });
  }
  public override bespokePlay(player: IPlayer) {
    player.canUseHeatAsMegaCredits = true;
    return undefined;
  }
}
