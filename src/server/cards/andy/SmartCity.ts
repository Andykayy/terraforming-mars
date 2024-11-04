import {IProjectCard} from '../IProjectCard';
import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {Tag} from '../../../common/cards/Tag';
import {CardResource} from '../../../common/CardResource';

export class SmartCity extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.SMART_CITY_ANDY,
      tags: [Tag.CITY, Tag.MARS],
      cost: 23,
      requirements: {tag: Tag.SCIENCE, count: 7},
      victoryPoints: {tag: Tag.MARS, per: 1},

      behavior: {
        production: {megacredits: 5, energy: -2},
        addResourcesToAnyCard: {count: 4, type: CardResource.DATA},
        city: {},
      },

      metadata: {
        cardNumber: 'x281',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => {
            pb.minus().energy(2).br;
            pb.plus().megacredits(5);
          });
          b.city().asterix();
          b.vpText('1 VP for every Mars tag you have.').br;
        }),
        description: 'Requires 7 science tags. Decrease your energy production 2 steps and increase your M€ production 5 steps. Place a city tile. Add 4 data to any card.',
      },
    });
  }
}
