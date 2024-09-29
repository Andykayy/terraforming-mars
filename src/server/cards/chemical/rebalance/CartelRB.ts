
import {IProjectCard} from '../../IProjectCard';
import {Tag} from '../../../../common/cards/Tag';
import {Card} from '../../Card';
import {CardType} from '../../../../common/cards/CardType';
import {CardName} from '../../../../common/cards/CardName';
import {CardRenderer} from '../../render/CardRenderer';

export class CartelRebalance extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.CARTEL_RB,
      tags: [Tag.EARTH],
      cost: 10,

      behavior: {
        production: {megacredits: {tag: Tag.EARTH}},
      },

      metadata: {
        cardNumber: '1371',
        description: 'Increase your M€ production 1 step for each Earth tag you have, including this.',
        renderData: CardRenderer.builder((b) => b.production((pb) => {
          pb.megacredits(1).slash().tag(Tag.EARTH);
        })),
      },
    });
  }
}