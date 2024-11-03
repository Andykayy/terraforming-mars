import {IProjectCard} from '../IProjectCard';
import {Tag} from '../../../common/cards/Tag';
import {Card} from '../Card';
import {CardName} from '../../../common/cards/CardName';
import {CardType} from '../../../common/cards/CardType';
import {IPlayer} from '../../IPlayer';
import {CardRenderer} from '../render/CardRenderer';
import {ICard} from '../ICard';
import {CardResource} from '../../../common/CardResource';

export class TrackingCookies extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.ACTIVE,
      name: CardName.TOPSOIL_CONTRACT,
      tags: [Tag.MARS],
      cost: 9,
      victoryPoints: 1,

     

      metadata: {
        cardNumber: 'X30',
        renderData: CardRenderer.builder((b) => {
          b.effect('When you add any amount of data to ANY CARD, add an additional data.', (eb) => {
            eb.resource(CardResource.DATA).asterix().resource(CardResource.DATA);
          }).br;          
        }),        
      },
    });
  }

  public onResourceAdded(player: IPlayer, card: ICard) {
    if (card.resourceType === CardResource.DATA) {
      player.addResourceTo(card, {qty: 1, log: true});      
    }
  }
}
