import {PreludeCard} from '../../prelude/PreludeCard';
import {IProjectCard} from '../../IProjectCard';
import {CardName} from '../../../../common/cards/CardName';
import {CardRenderer} from '../../render/CardRenderer';
import {Tag} from '../../../../common/cards/Tag';

export class NitrogenShipmentRebalance extends PreludeCard implements IProjectCard {
  constructor() {
    super({
      name: CardName.NITROGEN_SHIPMENT_RB,
      tags: [Tag.EARTH],

      behavior: {        
        tr: 2,
        stock: {plants: 5},
      },

      metadata: {
        cardNumber: 'P24',
        renderData: CardRenderer.builder((b) => {
          b.tr(2).br;
          b.plants(5);
        }),
        description: 'Increase your TR 2 steps. Gain 5 plants.',
      },
    });
  }
}
