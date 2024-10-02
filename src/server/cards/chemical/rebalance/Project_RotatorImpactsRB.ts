import {IActionCard} from '../../ICard';
import {Tag} from '../../../../common/cards/Tag';
import {CardType} from '../../../../common/cards/CardType';
import {IPlayer} from '../../../IPlayer';
import {CardResource} from '../../../../common/CardResource';
import {OrOptions} from '../../../inputs/OrOptions';
import {SelectOption} from '../../../inputs/SelectOption';
import {CardName} from '../../../../common/cards/CardName';
import {SelectPaymentDeferred} from '../../../deferredActions/SelectPaymentDeferred';
import {CardRenderer} from '../../render/CardRenderer';
import {Card} from '../../Card';
import {max} from '../../Options';
import {TITLES} from '../../../inputs/titles';
import {SelectCard} from '../../../inputs/SelectCard';
import {ICard} from '../../ICard';


export class RotatorImpactsRebalance extends Card implements IActionCard {
  constructor() {
    super({
      name: CardName.ROTATOR_IMPACTS_RB,
      type: CardType.ACTIVE,
      tags: [Tag.SPACE],
      cost: 6,
      resourceType: CardResource.ASTEROID,

      requirements: {venus: 14, max},
      metadata: {
        cardNumber: '2431',
        renderData: CardRenderer.builder((b) => {
          b.action('Spend 6 M€ to add an asteroid resource to ANY card [TITANIUM MAY BE USED].', (eb) => {
            eb.megacredits(6).super((b) => b.titanium(1)).startAction.resource(CardResource.ASTEROID).asterix;
          }).br;
          b.action('Spend 1 resource from this card to increase Venus 1 step.', (eb) => {
            eb.or().resource(CardResource.ASTEROID).startAction.venus(1);
          });
        }),
        description: 'Venus must be 14% or lower',
      },
    });
  }

  public canAct(player: IPlayer): boolean {
    return player.canAfford({cost: 6, titanium: true}) || (this.resourceCount > 0 && player.canAfford({cost: 0, tr: {venus: 1}}));
  }

  public action(player: IPlayer) {
    const asteroidCards = player.getResourceCards(CardResource.ASTEROID);
    const opts: Array<SelectOption> = [];

    const addResource = new SelectOption('Pay 6 M€ to add 1 asteroid to any card', 'Pay').andThen( () => this.addResource(player, asteroidCards) );
    const spendResource = new SelectOption('Remove 1 asteroid to raise venus 1 step', 'Remove asteroid').andThen( () => this.spendResource(player) );

    if (this.resourceCount > 0) {
      opts.push(spendResource);
    } else {
      return this.addResource(player, asteroidCards);
    }

    if (player.canAfford({cost: 6, titanium: true})) {
      opts.push(addResource);
    } else {
      return this.spendResource(player);
    }

    return new OrOptions(...opts);
  }

  private addResource(player: IPlayer, asteroidCards: ICard[]) {
    player.game.defer(new SelectPaymentDeferred(player, 6, {canUseTitanium: true, title: TITLES.payForCardAction(this.name)}));

    if (asteroidCards.length === 1) {
      player.addResourceTo(this, {log: true});
      return undefined;
    }

    return new SelectCard(
      'Select card to add 1 asteroid',
      'Add asteroid',
      asteroidCards).andThen( ([card]) => {
      player.addResourceTo(card, {log: true});
      return undefined;
    },
    );
  }

  private spendResource(player: IPlayer) {
    player.removeResourceFrom(this);
    player.game.increaseVenusScaleLevel(player, 1);
    player.game.log('${0} removed an asteroid resource to increase Venus 1 step', (b) => b.player(player));
    return undefined;
  }
}