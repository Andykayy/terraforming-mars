import {IProjectCard} from '../IProjectCard';
import {Card} from '../Card';
import {CardName} from '../../../common/cards/CardName';
import {CardType} from '../../../common/cards/CardType';
import {CardRenderer} from '../render/CardRenderer';

export class NeutralTraders extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.NEUTRAL_TRADERS_ANDY,      
      cost: 14,      

      behavior: {
        production: {megacredits: 4},
        stock: {
          megacredits: {
            colonies: {colonies: {}},
            each: 2,
          },
        },
      },

      metadata: {
        cardNumber: 'P87',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.megacredits(4)).megacredits(2).slash().colonies();
        }),
        description: 'Raise your M€ production 4 steps. Gain 2 M€ per colony you have.',
      },
    });
  }
}
