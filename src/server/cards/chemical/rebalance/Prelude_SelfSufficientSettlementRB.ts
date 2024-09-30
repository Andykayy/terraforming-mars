import {Tag} from '../../../../common/cards/Tag';
import {PreludeCard} from '../../prelude/PreludeCard';
import {IProjectCard} from '../../IProjectCard';
import {CardName} from '../../../../common/cards/CardName';
import {CardRenderer} from '../../render/CardRenderer';

export class SelfSufficientSettlementRebalance extends PreludeCard implements IProjectCard {
  constructor() {
    super({
      name: CardName.SELF_SUFFICIENT_SETTLEMENT_RB,
      tags: [Tag.BUILDING, Tag.CITY],

      behavior: {
        production: {megacredits: 2},
        city: {},
        stock: {megacredits: 3},
      },

      metadata: {
        cardNumber: 'P29',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.megacredits(2)).megacredits(3).br.city();
        }),
        description: 'Increase your M€ production 2 steps. Gain 3 M€. Place a city tile.',
      },
    });
  }
}
