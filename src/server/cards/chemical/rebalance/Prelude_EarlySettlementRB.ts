import {Tag} from '../../../../common/cards/Tag';
import {PreludeCard} from '../../prelude/PreludeCard';
import {CardName} from '../../../../common/cards/CardName';
import {CardRenderer} from '../../render/CardRenderer';

export class EarlySettlementRebalance extends PreludeCard {
  constructor() {
    super({
      name: CardName.EARLY_SETTLEMENT_RB,
      tags: [Tag.BUILDING, Tag.CITY],

      behavior: {
        production: {plants: 1},
        stock: {plants: 3},
        city: {},
      },

      metadata: {
        cardNumber: 'P09',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.plants(1)).city();
          b.plants(3);
        }),
        description: 'Increase your plant production 1 step. Gain three plants. Place a city tile.',
      },
    });
  }
}
