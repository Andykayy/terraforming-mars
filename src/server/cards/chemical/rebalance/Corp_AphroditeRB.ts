import {CorporationCard} from '../../corporation/CorporationCard';
import {Tag} from '../../../../common/cards/Tag';
import {CardName} from '../../../../common/cards/CardName';
import {CardRenderer} from '../../render/CardRenderer';
import {all} from '../../Options';



export class AphroditeRebalanced extends CorporationCard {
  constructor() {
    super({
      name: CardName.APHRODITE_RB,
      tags: [Tag.PLANT, Tag.VENUS],
      startingMegaCredits: 50,

      behavior: {
        production: {plants: 2},
      },

      metadata: {
        cardNumber: 'R01',
        description: 'You start with 2 plant production and 50 M€.',
        renderData: CardRenderer.builder((b) => {
          b.br;
          b.production((pb) => pb.plants(2)).nbsp.megacredits(50);
          b.corpBox('effect', (ce) => {
            ce.effect('Whenever Venus is terraformed 1 step, you gain 3M€, and the player who raised it (NOT WGT) gains 2M€', (eb) => {
              eb.venus(1, {all}).startEffect.megacredits(3).asterix().megacredits(2);
            });
          });
        }),
      },
    });
  }
}
