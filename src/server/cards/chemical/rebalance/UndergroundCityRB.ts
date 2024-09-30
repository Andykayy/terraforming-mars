import {IProjectCard} from '../../IProjectCard';
import {Tag} from '../../../../common/cards/Tag';
import {Card} from '../../Card';
import {CardType} from '../../../../common/cards/CardType';
import {CardName} from '../../../../common/cards/CardName';
import {CardRenderer} from '../../render/CardRenderer';

export class UndergroundCityRebalance extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.UNDERGROUND_CITY_RB,
      tags: [Tag.CITY, Tag.BUILDING],
      cost: 18,

      behavior: {
        production: {energy: -1, steel: 2},
        city: {},
      },

      metadata: {
        cardNumber: '032',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => {
            pb.minus().energy(1).br;
            pb.plus().steel(2);
          }).nbsp.city();
        }),
        description: 'Place a city tile. Decrease your energy production 1 step and increase your steel production 2 steps.',
      },
    });
  }
}