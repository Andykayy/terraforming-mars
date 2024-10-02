import {IPlayer} from '../../../IPlayer';
import {Tag} from '../../../../common/cards/Tag';
import {CardResource} from '../../../../common/CardResource';
import {CorporationCard} from '../../corporation/CorporationCard';
import {IActionCard} from '../../ICard';
import {CardName} from '../../../../common/cards/CardName';
import {CardRenderer} from '../../render/CardRenderer';
import {AltSecondaryTag} from '../../../../common/cards/render/AltSecondaryTag';
import {floaterCards} from '../../venusNext/floaterCards';
import {SelectCard} from '../../../inputs/SelectCard';


export class Celestic extends CorporationCard implements IActionCard {
  constructor() {
    super({
      name: CardName.CELESTIC,
      tags: [Tag.VENUS],
      startingMegaCredits: 42,
      resourceType: CardResource.FLOATER,
      initialActionText: 'Draw 2 cards with a floater icon on it',
      victoryPoints: {resourcesHere: {}, per: 3},
      
      metadata: {
        cardNumber: 'R05',
        description: 'You start with 42 M€. As your first action, reveal cards from the deck until you have revealed 2 cards with a floater icon on it. Take them into hand and discard the rest.',
        renderData: CardRenderer.builder((b) => {
          b.megacredits(42).nbsp.cards(2, {secondaryTag: AltSecondaryTag.FLOATER});
          b.corpBox('action', (ce) => {
            ce.action('Add a floater to ANY card. 1 VP per 3 floaters on this card.', (eb) => {
              eb.empty().startAction.resource(CardResource.FLOATER).asterix();
            });
            ce.vSpace(); // to offset the description to the top a bit so it can be readable
          });
        }),
      },
    });
  }


  public initialAction(player: IPlayer) {
    player.drawCard(2, {
      include: (card) => floaterCards.has(card.name) || card.resourceType === CardResource.FLOATER,
    });
    return undefined;
  }

  public canAct(): boolean {
    return true;
  }

  public action(player: IPlayer) {
    const floaterCards = player.getResourceCards(CardResource.FLOATER);
    
    if (floaterCards.length === 0) {
      return undefined;
    }
  
    if (floaterCards.length === 1) {
      player.addResourceTo(floaterCards[0], {qty: 1, log: true});
      return undefined;
    }
  
    return new SelectCard(
      'Select up to 2 different cards to add 1 floater each',
      'Add floater(s)',
      floaterCards,
      {
        min: 1,
        max: 2,
      }
    ).andThen((selectedCards) => {
      selectedCards.forEach((card) => {
        player.addResourceTo(card, {qty: 1, log: true});
      });
      return undefined;
    });
  }
}
