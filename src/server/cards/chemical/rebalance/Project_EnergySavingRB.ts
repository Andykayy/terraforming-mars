import {Card} from '../../Card';
import {CardType} from '../../../../common/cards/CardType';
import {Tag} from '../../../../common/cards/Tag';
import {IProjectCard} from '../../IProjectCard';
import {CardName} from '../../../../common/cards/CardName';
import {Size} from '../../../../common/cards/render/Size';
import {CardRenderer} from '../../render/CardRenderer';
import {all} from '../../Options';

export class EnergySavingRebalance extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.ENERGY_SAVING_RB,
      tags: [Tag.POWER, Tag.BUILDING],
      cost: 16,

      behavior: {
        production: {energy: {cities: {}}},
      },

      metadata: {
        cardNumber: '1891',
        description: 'Increase your energy production 1 step for each city tile in play.',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.energy(1).slash().city({size: Size.SMALL, all}));
        }),
      },
    });
  }
}
