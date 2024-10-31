import {CardType} from '../../../common/cards/CardType';
import {IProjectCard} from '../IProjectCard';
import {Tag} from '../../../common/cards/Tag';
import {Card} from '../Card';
import {CardName} from '../../../common/cards/CardName';
import {CardResource} from '../../../common/CardResource';
import {CardRenderer} from '../render/CardRenderer';

export class MartianResearch extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.MARTIAN_RESEARCH_ANDY,
      tags: [Tag.WILD, Tag.MARS],
      cost: 7,

      behavior: {
        addResourcesToAnyCard: {count: 2, type: CardResource.DATA},
      },

      metadata: {
        cardNumber: 'P40',
        description: 'After being played, when you perform an action, the wild tag counts as any tag of your choice. Add 2 data to any card.',
        renderData: CardRenderer.builder((b) => b.resource(CardResource.DATA, 2).asterix()),              
      },
    });
  }
}
