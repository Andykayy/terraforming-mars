import {IProjectCard} from '../IProjectCard';
import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {Tag} from '../../../common/cards/Tag';

export class MiningCoop extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.ACTIVE,
      name: CardName.MINING_COOP_ANDY,
      cost: 16,
      tags: [Tag.JOVIAN, Tag.MARS, Tag.SPACE],
      victoryPoints: 1,

      behavior: {
        production: {titanium: 1},
      },

      cardDiscount: [{tag: Tag.JOVIAN, amount: 2}, {tag: Tag.MARS, amount: 2}],
      metadata: {
        cardNumber: 'Pf12',
        renderData: CardRenderer.builder((b) => {
          b.effect('When you play a Jovian or Mars tag, pay 2 M€ less.', (eb) => {
            eb.tag(Tag.JOVIAN).slash().tag(Tag.MARS).startEffect.megacredits(-2);
          });
          b.production((pb) => pb.titanium(1));
        }),
        description: 'Gain one titanium production.',
      },
    });
  }
}

