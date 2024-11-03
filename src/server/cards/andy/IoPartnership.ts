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

export class IoPartnership extends Card implements IProjectCard {
  private addingResource = false;
  
  constructor() {
    super({
      type: CardType.ACTIVE,
      name: CardName.IO_PARTNERSHIP_ANDY,
      tags: [Tag.MARS, Tag.JOVIAN],
      cost: 9,     
      victoryPoints: 1,
      requirements: {venus: 10},
     

      metadata: {
        cardNumber: 'X30',
        renderData: CardRenderer.builder((b) => {
          b.effect('When you add any number of floaters to ANY CARD, add an additional floater.', (eb) => {
            eb.text('x').resource(CardResource.FLOATER).asterix().startEffect.resource(CardResource.FLOATER);
          }).br;          
        }),        
      },
    });
  }

  
  public onResourceAdded(player: IPlayer, card: ICard, count: number): void {
    if (card.resourceType === CardResource.FLOATER && 
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