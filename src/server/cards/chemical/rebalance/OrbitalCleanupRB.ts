import {IProjectCard} from '../../IProjectCard';
import {ActionCard} from '../../ActionCard';
import {CardName} from '../../../../common/cards/CardName';
import {CardType} from '../../../../common/cards/CardType';
import {Tag} from '../../../../common/cards/Tag';
import {CardRenderer} from '../../render/CardRenderer';

export class OrbitalCleanupRebalance extends ActionCard implements IProjectCard {
  constructor() {
    super({
      type: CardType.ACTIVE,
      name: CardName.ORBITAL_CLEANUP_RB,
      tags: [Tag.EARTH, Tag.SPACE],
      cost: 14,
      victoryPoints: 2,    

      action: {
        stock: {megacredits: {tag: Tag.SCIENCE, per: 2}},
      },

      metadata: {
        cardNumber: 'X081',

        renderData: CardRenderer.builder((b) => {
          b.action('Gain 1 M€ per every two Science tag you have.', (eb) => {
            eb.empty().startAction.megacredits(1).slash().tag(Tag.SCIENCE, 2);
          }).br;     
        }), 
      },
    });
  }
}
