import {PreludeCard} from '../../prelude/PreludeCard';
import {IProjectCard} from '../../IProjectCard';
import {CardName} from '../../../../common/cards/CardName';
import {CardRenderer} from '../../render/CardRenderer';

export class LoanRebalance extends PreludeCard implements IProjectCard {
  constructor() {
    super({
      name: CardName.LOAN_RB,

      behavior: {
        production: {megacredits: -2},
        stock: {megacredits: 32},
      },

      metadata: {
        cardNumber: 'P17',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.minus().megacredits(2)).br;
          b.megacredits(32);
        }),
        description: 'Gain 32 M€. Decrease your M€ production 2 steps.',
      },
    });
  }
}

