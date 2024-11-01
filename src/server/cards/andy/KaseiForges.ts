import {IProjectCard} from '../IProjectCard';
import {Tag} from '../../../common/cards/Tag';
import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {Resource} from '../../../common/Resource';

export class KaseiForges extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.KASEI_FORGES_ANDY,
      tags: [Tag.BUILDING, Tag.MARS],
      cost: 14,
      requirements: {production: Resource.HEAT, count: 1},

      behavior: {
        production: {titanium: 1, steel: 1,},
      },

      metadata: {
        cardNumber: '144',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.titanium(1).steel(1));
        }),
        description: 'Requires one heat production. Increase your titanium and steel production 1 step.',
      },
    });
  }
}
