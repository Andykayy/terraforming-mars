import {CorporationCard} from '../../corporation/CorporationCard';
import {Tag} from '../../../../common/cards/Tag';
import {IPlayer} from '../../../IPlayer';
import {CardName} from '../../../../common/cards/CardName';
import {CardRenderer} from '../../render/CardRenderer';
import {digit} from '../../Options';
import {Size} from '../../../../common/cards/render/Size';

export class HelionRebalance extends CorporationCard {
  constructor() {
    super({
      name: CardName.HELION_RB,
      tags: [Tag.SPACE],
      startingMegaCredits: 40,

      behavior: {
        production: {heat: 4},
      },

      metadata: {
        cardNumber: 'R18',  
        renderData: CardRenderer.builder((b) => {
          b.br;
          b.production((pb) => pb.heat(5, {digit}).nbsp).megacredits(40);
          b.text('(You start with 4 heat production and 40 M€.)', Size.TINY, false, false);
          b.corpBox('effect', (ce) => {
            ce.vSpace(Size.LARGE);
            ce.effect('You may use heat as M€. You may not use M€ as heat.', (eb) => {
              eb.startEffect.text('x').heat(1).equals().megacredits(1, {text: 'x'});
              ce.effect('Using the RAISE TEMPERATURE action costs 1 less heat.', (eb) => eb.temperature(1).asterix().startEffect.minus().heat(1, {text: '1'})).br;              
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
