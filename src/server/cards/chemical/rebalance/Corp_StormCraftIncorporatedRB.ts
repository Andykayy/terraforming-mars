import {ActiveCorporationCard} from '../../corporation/CorporationCard';
import {IPlayer} from '../../../IPlayer';
import {Tag} from '../../../../common/cards/Tag';
import {CardResource} from '../../../../common/CardResource';

import {CardName} from '../../../../common/cards/CardName';
import {CardRenderer} from '../../render/CardRenderer';
import {Size} from '../../../../common/cards/render/Size';

import {Resource} from '../../../../common/Resource';

import {floaterCards} from '../../venusNext/floaterCards';
import {ICard} from '../../ICard';

import {OrOptions} from '../../../inputs/OrOptions';
import {SelectOption} from '../../../inputs/SelectOption';
import {AltSecondaryTag} from '../../../../common/cards/render/AltSecondaryTag';

export class StormCraftIncorporated extends ActiveCorporationCard {
  constructor() {
    super({
      name: CardName.STORMCRAFT_INCORPORATED,
      tags: [Tag.JOVIAN],
      startingMegaCredits: 50,
      resourceType: CardResource.FLOATER,

      action: {
        addResourcesToAnyCard: {type: CardResource.FLOATER, count: 1, autoSelect: true},
      },

      metadata: {
        cardNumber: 'R29',
        description: 'You start with 50 M€.',
        renderData: CardRenderer.builder((b) => {
          b.br.br.br;
          b.megacredits(50).nbsp.cards(1, {secondaryTag: AltSecondaryTag.FLOATER});
          b.corpBox('action', (ce) => {
            ce.effect('When you gain a floater to ANY CARD, also gain 1MC or 1 Energy.', (eb) => {
              eb.resource(CardResource.FLOATER).asterix().startEffect.megacredits(1).slash().energy(1);
            });
            ce.vSpace();
          });
        }),
      },
    });
  }

  public initialAction(player: IPlayer) {
    player.drawCard(1, {
      include: (card) => floaterCards.has(card.name) || card.resourceType === CardResource.FLOATER,
    });
    return undefined;
  }

  public onResourceAdded(player: IPlayer, card: ICard) {
  
      const gainMC = new SelectOption('Gain 1 M€', 'Gain M€').andThen(() => {
        player.stock.add(Resource.MEGACREDITS, 1, {log: true})
        return undefined;
      });

      const gainEnergy = new SelectOption('Gain 1 energy', 'Gain energy').andThen(() => {
        player.stock.add(Resource.ENERGY, 1, {log: true})
        return undefined;
      });

    if (card.resourceType === CardResource.FLOATER) {
      player.defer(new OrOptions(gainEnergy, gainMC));
    } 
    }        
}
