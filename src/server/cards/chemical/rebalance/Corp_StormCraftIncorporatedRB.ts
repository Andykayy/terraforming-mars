import {CorporationCard} from '../../corporation/CorporationCard';
import {IPlayer} from '../../../IPlayer';
import {Tag} from '../../../../common/cards/Tag';
import {CardResource} from '../../../../common/CardResource';

import {CardName} from '../../../../common/cards/CardName';
import {CardRenderer} from '../../render/CardRenderer';

import {Resource} from '../../../../common/Resource';

import {floaterCards} from '../../venusNext/floaterCards';
import {ICard} from '../../ICard';

import {OrOptions} from '../../../inputs/OrOptions';
import {SelectOption} from '../../../inputs/SelectOption';
import {AltSecondaryTag} from '../../../../common/cards/render/AltSecondaryTag';
import {message} from '../../../logs/MessageBuilder';

export class StormCraftIncorporatedRebalance extends CorporationCard {
  constructor() {
    super({
      name: CardName.STORMCRAFT_INCORPORATED_RB,
      tags: [Tag.JOVIAN],
      startingMegaCredits: 50,    

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

  public onResourceAdded(player: IPlayer, card: ICard, count: number) {
  
      const gainMC = new SelectOption(
        message('Gain ${0} M€', (b) => b.number(count)),
        'Gain M€').andThen(() => {
        player.stock.add(Resource.MEGACREDITS, count, {log: true})
        return undefined;
      });

      const gainEnergy = new SelectOption(
        message('Gain ${0} energy', (b) => b.number(count)),
        'Gain M€').andThen(() => {
        player.stock.add(Resource.ENERGY, count, {log: true})
        return undefined;
      });

    if (card.resourceType === CardResource.FLOATER) {
      player.defer(new OrOptions(gainEnergy, gainMC));
    } 
    }        
}