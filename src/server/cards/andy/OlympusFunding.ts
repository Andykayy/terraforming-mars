import {IProjectCard} from '../IProjectCard';
import {Tag} from '../../../common/cards/Tag';
import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';

export class OlympusFunding extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.OLYMPUS_FUNDING_ANDY,
      tags: [Tag.MARS],
      cost: 8,
      requirements: {tag: Tag.MARS, count: 1},
      victoryPoints: 1,

      behavior: {
        production: {megacredits: 2},
      },

      metadata: {
        cardNumber: 'x361',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.megacredits(2));
        }),
        description: 'Requires 1 Mars tag. Increase your M€ production 2 steps.',
      },
    });
  }
}
