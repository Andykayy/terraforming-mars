import {Tag} from '../../../../common/cards/Tag';
import {CorporationCard} from '../../corporation/CorporationCard';
import {CardName} from '../../../../common/cards/CardName';
import {CardRenderer} from '../../render/CardRenderer';
import {IProjectCard} from '../../IProjectCard';
import {IPlayer} from '../../../IPlayer';
import {Resource} from '../../../../common/Resource';

export class CheungShingMARSRebalance extends CorporationCard {
  constructor() {
    super({
      name: CardName.CHEUNG_SHING_MARS_RB,
      tags: [Tag.BUILDING],
      startingMegaCredits: 44,

      behavior: {
        production: {megacredits: 3},
      },

      
      metadata: {
        cardNumber: 'R16',
        description: 'You start with 3M€ production and 44 M€.',
        renderData: CardRenderer.builder((b) => {
          b.br.br;
          b.production((pb) => pb.megacredits(3)).nbsp.megacredits(44);
          b.corpBox('effect', (ce) => {
            ce.effect('When you play a building tag, you gain 3M€.', (eb) => {
              eb.tag(Tag.BUILDING).startEffect.megacredits(3);
            });
          });
        }),
      },
    });
  }
  public onCardPlayed(player: IPlayer, card: IProjectCard) {
    if (card.tags.includes(Tag.BUILDING)) {
      player.stock.add(Resource.MEGACREDITS, 3, {log: true, from: this});      
    }
  }
}
