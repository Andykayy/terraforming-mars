import {Tag} from '../../../../common/cards/Tag';
import {CardType} from '../../../../common/cards/CardType';
import {CardName} from '../../../../common/cards/CardName';
import {CardRenderer} from '../../render/CardRenderer';
import {Card} from '../../Card';
import {IProjectCard} from '../../IProjectCard';

export class GHGImportFromVenusRebalance extends Card implements IProjectCard {
  constructor() {
    super({
      name: CardName.GHG_IMPORT_FROM_VENUS_RB,
      type: CardType.EVENT,
      tags: [Tag.SPACE, Tag.VENUS],
      cost: 20,

      behavior: {
        production: {heat: 3},
        global: {venus: 1},
      },

      metadata: {
        description: 'Raise Venus 1 step. Increase your heat production 3 steps.',
        cardNumber: '2281',
        renderData: CardRenderer.builder((b) => {
          b.venus(1).production((pb) => {
            pb.heat(3);
          });
        }),
      },
    });
  }
}