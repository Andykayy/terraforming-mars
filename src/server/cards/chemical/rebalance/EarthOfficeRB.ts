import {IProjectCard} from '../../IProjectCard';
import {Tag} from '../../../../common/cards/Tag';
import {Card} from '../../Card';
import {CardType} from '../../../../common/cards/CardType';
import {CardName} from '../../../../common/cards/CardName';
import {CardRenderer} from '../../render/CardRenderer';

export class EarthOfficeRebalance extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.ACTIVE,
      name: CardName.EARTH_OFFICE_RB,
      tags: [Tag.EARTH],
      cost: 4,

      cardDiscount: {tag: Tag.EARTH, amount: 3},
      metadata: {
        cardNumber: '1051',
        renderData: CardRenderer.builder((b) => {
          b.effect('When you play an Earth tag, you pay 3 M€ less for it.', (eb) => {
            eb.tag(Tag.EARTH).startEffect.megacredits(-3);
          });
        }),
      },
    });
  }
}
