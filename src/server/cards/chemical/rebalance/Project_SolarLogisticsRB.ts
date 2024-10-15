import {Card} from '../../Card';
import {CardType} from '../../../../common/cards/CardType';
import {IPlayer} from '../../../IPlayer';
import {CardName} from '../../../../common/cards/CardName';
import {CardRenderer} from '../../render/CardRenderer';
import {Tag} from '../../../../common/cards/Tag';
import {IProjectCard} from '../../IProjectCard';
import {CardResource} from '../../../../common/CardResource';
import {SelectOption} from '../../../inputs/SelectOption';
import {OrOptions} from '../../../inputs/OrOptions';
import {Priority} from '../../../deferredActions/Priority';


export class SolarLogisticsRebalance extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.ACTIVE,
      name: CardName.SOLAR_LOGISTICS_RB,
      cost: 20,
      tags: [Tag.EARTH, Tag.SPACE],
      resourceType: CardResource.ASTEROID,
      behavior: {
        stock: {titanium: 2},      
        addResources: 1,  
      },
      victoryPoints: 1,
      cardDiscount: {tag: Tag.EARTH, amount: 2},
      metadata: {
        cardNumber: '',
        renderData: CardRenderer.builder((b) => {
          b.effect('When you play an Earth tag, you pay 2 M€ less.', (eb) => {
            eb.tag(Tag.EARTH).startEffect.megacredits(-2);
          });
          b.br;
          b.effect('When any player plays a space event, add 1 asteroid here or remove 1 to draw a card.', (eb) => {
            eb.tag(Tag.SPACE).tag(Tag.EVENT).startEffect;
            eb.resource(CardResource.ASTEROID).or().minus().resource(CardResource.ASTEROID).plus().cards(1);
          });
          b.br;
          b.titanium(2).resource(CardResource.ASTEROID);
        }),
        description: 'Gain 2 titanium. Add one asteroid here.',
      },
    });
  }

  public onCardPlayedFromAnyPlayer(thisCardOwner: IPlayer, _playedCardOwner: IPlayer, card: IProjectCard) {
    if (card.type === CardType.EVENT && card.tags.includes(Tag.SPACE)) {
      thisCardOwner.defer(() => {
        if (this.resourceCount === 0) {
          thisCardOwner.addResourceTo(this, 1);
          return undefined;
        }
        const options = new OrOptions(
          new SelectOption('Remove an asteroid resource from this card to draw a card', 'Remove resource').andThen(() => {
            thisCardOwner.removeResourceFrom(this);
            thisCardOwner.drawCard();
            return undefined;
          }),
          new SelectOption('Add an asteroid to this card', 'Add resource').andThen(() => {
            thisCardOwner.addResourceTo(this, 1);
            return undefined;
          }),
        );
        options.title = 'Select an option for Solar Logistics';
        return options;
      },
      Priority.BACK_OF_THE_LINE); // Changed priority
    }
    return undefined;
  }
}



