import {IProjectCard} from '../../IProjectCard';
import {Tag} from '../../../../common/cards/Tag';
import {Card} from '../../Card';
import {CardType} from '../../../../common/cards/CardType';
import {CardName} from '../../../../common/cards/CardName';
import {CardRenderer} from '../../render/CardRenderer';

export class EarthCatapultRebalance extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.ACTIVE,
      name: CardName.EARTH_CATAPULT_RB,
      tags: [Tag.EARTH],
      cost: 26,
      victoryPoints: 1,

      requirements: {tag: Tag.EARTH, count: 2},
      cardDiscount: {amount: 2},
      metadata: {
        cardNumber: '0701',
        renderData: CardRenderer.builder((b) => {
          b.effect('When you play a card, you pay 2 M€ less for it.', (eb) => {
            eb.empty().startEffect.megacredits(-2);
          });
        }),
      },
    });
  }
}
