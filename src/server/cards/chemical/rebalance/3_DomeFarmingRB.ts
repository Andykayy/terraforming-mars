import {Tag} from '../../../../common/cards/Tag';
import {PreludeCard} from '../../prelude/PreludeCard';
import {CardName} from '../../../../common/cards/CardName';
import {CardRenderer} from '../../render/CardRenderer';

export class DomeFarmingRebalance extends PreludeCard {
  constructor() {
    super({
      name: CardName.DOME_FARMING_RB,
      tags: [Tag.PLANT, Tag.BUILDING],

      behavior: {
        production: {megacredits: 3, plants: 1},
      },

      metadata: {
        cardNumber: 'P07',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.megacredits(3).plants(1));
        }),
        description: 'Increase your M€ production 3 steps and plant production 1 step.',
      },
    });
  }
}
