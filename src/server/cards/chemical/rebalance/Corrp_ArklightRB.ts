import {CorporationCard} from '../../corporation/CorporationCard';
import {IPlayer} from '../../../IPlayer';
import {Tag} from '../../../../common/cards/Tag';
import {CardResource} from '../../../../common/CardResource';
import {IProjectCard} from '../../IProjectCard';
import {CardName} from '../../../../common/cards/CardName';
import {CardRenderer} from '../../render/CardRenderer';

export class ArklightRebalance extends CorporationCard {
  constructor() {
    super({
      name: CardName.ARKLIGHT_RB,
      tags: [Tag.ANIMAL],
      startingMegaCredits: 50,
      resourceType: CardResource.ANIMAL,
      victoryPoints: {resourcesHere: {}, per: 2},

      behavior: {
       addResources: 1,
      },

      metadata: {
        cardNumber: 'R04',
        description: 'You start with 50 M€. 1 VP per 2 animals on this card.',
        renderData: CardRenderer.builder((b) => {
          b.megacredits(50);
          b.corpBox('effect', (ce) => {
            ce.effect('When you play an animal or plant tag, including this, gain add 1M€ production and add 1 animal to this card.', (eb) => {
              eb.tag(Tag.ANIMAL).slash().tag(Tag.PLANT).startEffect.production((pb) => pb.megacredits(1)).resource(CardResource.ANIMAL);
            });
            ce.vSpace(); // to offset the description to the top a bit so it can be readable
          });
        }),
      },
    });
  }

  public onCardPlayed(player: IPlayer, card: IProjectCard): void {
    if (player.isCorporation(CardName.ARKLIGHT)) {
      player.addResourceTo(this, {qty: card.tags.filter((cardTag) => cardTag === Tag.ANIMAL || cardTag === Tag.PLANT).length, log: true});      
    }
    const count = player.tags.cardTagCount(card, Tag.ANIMAL || Tag.PLANT);
    if (count > 0) {
      player.addResourceTo(this, count);
    }
  }



}
