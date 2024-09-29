import {IActionCard} from '../../ICard';
import {Tag} from '../../../../common/cards/Tag';
import {CardType} from '../../../../common/cards/CardType';
import {IPlayer} from '../../../IPlayer';
import {CardResource} from '../../../../common/CardResource';
import {OrOptions} from '../../../inputs/OrOptions';
import {SelectOption} from '../../../inputs/SelectOption';
import {MAX_VENUS_SCALE} from '../../../../common/constants';
import {CardName} from '../../../../common/cards/CardName';
import {SelectPaymentDeferred} from '../../../deferredActions/SelectPaymentDeferred';
import {CardRenderer} from '../../render/CardRenderer';
import {Card} from '../../Card';
import {max} from '../../Options';
import {TITLES} from '../../../inputs/titles';
import {LogHelper} from '../../../LogHelper';
import {SelectCard} from '../../../inputs/SelectCard';


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
    const venusMaxed = player.game.getVenusScaleLevel() === MAX_VENUS_SCALE;
    const canSpendResource = this.resourceCount > 0 && !venusMaxed;
    

    return player.canAfford({cost: 6, titanium: true}) || (canSpendResource && player.canAfford({cost: 0, tr: {venus: 1}}));
  }

  public action(player: IPlayer) {
    const asteroidCards = player.getResourceCards(CardResource.ASTEROID);

    const addAsteroidToSelf = function() {
      player.game.defer(new SelectPaymentDeferred(player, 6, {canUseTitanium: true}));
      player.addResourceTo(asteroidCards[0], {log: true});
      return undefined;
    };

    const addAsteroidToCard = new SelectCard(
      'Select card to add 1 asteroid',
      'Add asteroid',
      asteroidCards)
      .andThen(([card]) => {
        player.game.defer(new SelectPaymentDeferred(player, 6, {canUseTitanium: true, title: TITLES.payForCardAction(this.name)}));
        player.addResourceTo(card, {log: true});
        return undefined;
      });

    const spendAsteroidResource = () => {
      this.resourceCount--;
      LogHelper.logRemoveResource(player, this, 1, 'raise venus 1 step');
      player.game.increaseVenusScaleLevel(player, 1);
      return undefined;
    };

    if (this.resourceCount === 0) {
      if (asteroidCards.length === 1) return addAsteroidToSelf();
      return addAsteroidToCard;
    }    

    const availableActions = [];

    if (player.game.getVenusScaleLevel() === MAX_VENUS_SCALE) {
      availableActions.push(new SelectOption('Remove an asteroid resource to raise Venus 1 step', 'Remove asteroid').andThen(spendAsteroidResource));
    }

    if (asteroidCards.length === 1) {
      availableActions.push(new SelectOption('Spend 6MC (titanium may be used) to gain 1 asteroid resource', 'Spend MC/Titanium').andThen(addAsteroidToSelf));
    } else {
      availableActions.push(addAsteroidToCard);
    }

    if (availableActions.length === 1) {
      const action = availableActions[0];

      if (action instanceof SelectOption) return action.cb(undefined);
      return availableActions[0]; // SelectCard
    }

    return new OrOptions(...availableActions);
  }
}
