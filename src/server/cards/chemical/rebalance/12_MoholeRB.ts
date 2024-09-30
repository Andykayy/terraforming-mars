import {Tag} from '../../../../common/cards/Tag';
import {PreludeCard} from '../../prelude/PreludeCard';
import {IProjectCard} from '../../IProjectCard';
import {CardName} from '../../../../common/cards/CardName';
import {CardRenderer} from '../../render/CardRenderer';

export class MoholeRebalance extends PreludeCard implements IProjectCard {
  constructor() {
    super({
      name: CardName.MOHOLE_RB,
      tags: [Tag.BUILDING],

      behavior: {
        production: {heat: 2, energy: 1},
        stock: {energy: 3, heat: 5},
      },

      metadata: {
        cardNumber: 'P22',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.heat(2).energy(1)).br;
          b.heat(5).br;
          b.energy(3);
        }),
        description: 'Increase your heat production 2 steps and your energy production 1 step. Gain 5 heat and 3 energy.',
      },
    });
  }
}
