import {CorporationCard} from '../../corporation/CorporationCard';
import {Tag} from '../../../../common/cards/Tag';
import {CardName} from '../../../../common/cards/CardName';
import {CardRenderer} from '../../render/CardRenderer';
import {IPlayer} from '../../../IPlayer';
import {IProjectCard} from '../../IProjectCard';
import {AltSecondaryTag} from '../../../../common/cards/render/AltSecondaryTag';
import {Size} from '../../../../common/cards/render/Size';

export class InventrixRebalance extends CorporationCard {
  constructor() {
    super({
      name: CardName.INVENTRIX_RB,
      tags: [Tag.SCIENCE],
      startingMegaCredits: 45,
      globalParameterRequirementBonus: {steps: 2},

      firstAction: {
        text: 'Draw 3 cards',
        drawCard: 3,
      },

      metadata: {
        cardNumber: 'R43',
        description: 'As your first action in the game, draw 3 cards. Start with 45 M€.',
        renderData: CardRenderer.builder((b) => {
          b.br;         
          b.megacredits(45).nbsp.cards(3);
          b.corpBox('effect', (ce) => {
            ce.vSpace(Size.LARGE);
            ce.effect('Your temperature, oxygen, ocean, and Venus requirements are +2 or -2 steps, your choice in each case.', (eb) => {
              eb.plate('Global requirements').startEffect.text('+/- 2');
            });
            b.effect('Cards with req cost 1 M€ less.', (eb) => {
              eb.cards(1, {secondaryTag: AltSecondaryTag.REQ}).startEffect.megacredits(-2); 
            });
          });
        }),
      },
    });
  }

  public override getCardDiscount(_player: IPlayer, card: IProjectCard) {
    return card.requirements.length > 0 ? 1 : 0;
  }
}

