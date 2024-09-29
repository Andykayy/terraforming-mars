import {IProjectCard} from '../../IProjectCard';
import {Tag} from '../../../../common/cards/Tag';
import {Card} from '../../Card';
import {CardType} from '../../../../common/cards/CardType';
import {CardName} from '../../../../common/cards/CardName';
import {CardRenderer} from '../../render/CardRenderer';

export class SoilFactoryRebalance extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.SOIL_FACTORY_RB,
      tags: [Tag.BUILDING],
      cost: 10,

      behavior: {
        production: {energy: -1, plants: 2},
      },
      victoryPoints: 1,

      metadata: {
        cardNumber: '1791',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => {
            pb.minus().energy(1).br;
            pb.plus().plants(2);
          });
        }),
        description: 'Decrease your energy production 1 step and increase your plant production 2 steps.',
      },
    });
  }
}
