import {IProjectCard} from '../IProjectCard';
import {Tag} from '../../../common/cards/Tag';
import {Card} from '../Card';
import {CardName} from '../../../common/cards/CardName';
import {CardType} from '../../../common/cards/CardType';
import {IPlayer} from '../../IPlayer';
import {CardRenderer} from '../render/CardRenderer';
import {ICard} from '../ICard';
import {CardResource} from '../../../common/CardResource';
import {SimpleDeferredAction} from '../../deferredActions/DeferredAction';

export class TrackingCookies extends Card implements IProjectCard {
  private addingResource = false;
  
  constructor() {
    super({
      type: CardType.ACTIVE,
      name: CardName.TRACKING_COOKIES_ANDY,
      tags: [Tag.MARS],
      cost: 9,
      victoryPoints: 1,

     

      metadata: {
        cardNumber: 'X30',
        renderData: CardRenderer.builder((b) => {
          b.effect('When you add any amount of data to ANY CARD, add an additional data.', (eb) => {
            eb.text('x').resource(CardResource.DATA).asterix().startEffect.resource(CardResource.DATA);
          }).br;          
        }),        
      },
    });
  }

  
  public onResourceAdded(player: IPlayer, card: ICard, count: number): void {
    if (card.resourceType === CardResource.DATA && 
        count > 0 && 
        !this.addingResource) {
      this.addingResource = true;
      player.game.defer(new SimpleDeferredAction(
        player,
        () => {
          player.addResourceTo(card, {qty: 1, log: true});
          this.addingResource = false;
          return undefined;
        }
      ));
    }
  }
}