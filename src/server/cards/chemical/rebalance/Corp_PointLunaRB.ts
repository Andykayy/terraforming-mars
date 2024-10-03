import {Tag} from '../../../../common/cards/Tag';
import {IPlayer} from '../../../IPlayer';
import {ICorporationCard} from '../../corporation/ICorporationCard';
import {CorporationCard} from '../../corporation/CorporationCard';
import {ICard} from '../../ICard';
import {CardName} from '../../../../common/cards/CardName';
import {CardRenderer} from '../../render/CardRenderer';

import {OrOptions} from '../../../inputs/OrOptions';
import {SelectCard} from '../../../inputs/SelectCard';
import {SelectOption} from '../../../inputs/SelectOption';
import {Priority} from '../../../deferredActions/Priority';

export class PointLunaRebalance extends CorporationCard {
  constructor() {
    super({
      name: CardName.POINT_LUNA_RB,
      tags: [Tag.SPACE, Tag.EARTH],
      startingMegaCredits: 45,

      behavior: {
        production: {titanium: 1},
        drawCard: 1,   
      },

      metadata: {
        cardNumber: 'R10',
        description: 'You start with 1 titanium production and 45 M€. Draw a card',
        renderData: CardRenderer.builder((b) => {
          b.br;
          b.production((pb) => pb.titanium(1)).nbsp.megacredits(45).cards(1);
          b.corpBox('effect', (ce) => {
            ce.effect('When you play an Earth tag, including this, draw a card then discard a card.', (eb) => {
              eb.tag(Tag.EARTH).startEffect.plus().cards(1).minus().cards(1);
            });
          });
        }),
      },
    });
  }
  public onCorpCardPlayed(player: IPlayer, card: ICorporationCard) {
    return this.onCardPlayed(player, card);
  }

  public onCardPlayed(player: IPlayer, card: ICard) {
    if (player.isCorporation(this.name)) {
      const earthTags = player.tags.cardTagCount(card, Tag.EARTH);
      this.onEarthTagAdded(player, earthTags);
    }
  }

  public onEarthTagAdded(player: IPlayer, count: number) {
    for (let i = 0; i < count; i++) {
      player.defer(() => {
        // No card to discard
        if (player.cardsInHand.length === 0) {
          return undefined;
        }
        return new OrOptions(
          new SelectCard('Select a card to discard', 'Discard', player.cardsInHand)
            .andThen(([card]) => {
              player.game.log('${0} is using their ${1} effect to draw a card by discarding a card.', (b) => b.player(player).card(this));
              player.discardCardFromHand(card, {log: true});
              player.drawCard();
              return undefined;
            }),
          new SelectOption('Do nothing'),
        );
      },
      Priority.DISCARD_AND_DRAW);
    }
    return undefined;
  }
}
