import {CorporationCard} from '../../corporation/CorporationCard';
import {Tag} from '../../../../common/cards/Tag';
import {CardName} from '../../../../common/cards/CardName';
import {CardRenderer} from '../../render/CardRenderer';
import {GlobalParameter} from '../../../../common/GlobalParameter';
import {Size} from '../../../../common/cards/render/Size';

export class MorningStarIncRebalance extends CorporationCard {
  constructor() {
    super({
      name: CardName.MORNING_STAR_INC_RB,
      tags: [Tag.VENUS],
      startingMegaCredits: 50,
      globalParameterRequirementBonus: {steps: 3, parameter: GlobalParameter.VENUS},
      cardDiscount: {tag: Tag.VENUS, amount: 2},

      firstAction: {
        text: 'Draw 3 cards with a Venus tag',
        drawCard: {count: 3, tag: Tag.VENUS},        
      },

      metadata: {
        cardNumber: 'R06',
        description: 'You start with 50 M€. Draw 3 Venus cards.',
        renderData: CardRenderer.builder((b) => {
          b.megacredits(50).nbsp.cards(3, {secondaryTag: Tag.VENUS});
          b.corpBox('effect', (ce) => {
            ce.vSpace(Size.LARGE);
            ce.effect('Your Venus requirements are +/- 3 steps, your choice in each case.', (eb) => {
              eb.plate('Venus requirements').startEffect.text('+/- 3');
            });
            ce.effect('When you play a Venus tag, you pay 2 M€ less for it.', (eb)=> {
              eb.venus(1).startEffect.megacredits(-2);
            });
          });
        }),
      },
    });
  }
}
