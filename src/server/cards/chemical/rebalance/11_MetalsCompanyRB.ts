import {PreludeCard} from '../../prelude/PreludeCard';
import {IProjectCard} from '../../IProjectCard';
import {CardName} from '../../../../common/cards/CardName';
import {CardRenderer} from '../../render/CardRenderer';

export class MetalsCompanyRebalance extends PreludeCard implements IProjectCard {
  constructor() {
    super({
      name: CardName.METALS_COMPANY_RB,

      behavior: {
        production: {megacredits: 1, steel: 1, titanium: 1},
        stock: {megacredits: 2},
      },

      metadata: {
        cardNumber: 'P20',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.megacredits(1).steel(1).titanium(1));
          b.megacredits(2);
        }),
        description: 'Increase your M€, steel and titanium production 1 step. Gain 2M€',
      },
    });
  }
}
