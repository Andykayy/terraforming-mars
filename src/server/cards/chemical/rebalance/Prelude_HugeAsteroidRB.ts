import {IPlayer} from '../../../IPlayer';
import {PreludeCard} from '../../prelude/PreludeCard';
import {CardName} from '../../../../common/cards/CardName';
import {SelectPaymentDeferred} from '../../../deferredActions/SelectPaymentDeferred';
import {CardRenderer} from '../../render/CardRenderer';

export class HugeAsteroidRebalance extends PreludeCard {
  constructor() {
    super({
      name: CardName.HUGE_ASTEROID_RB,

      startingMegacredits: -2,

      behavior: {
        global: {temperature: 3},
      },

      metadata: {
        cardNumber: 'P15',
        renderData: CardRenderer.builder((b) => {
          b.temperature(3).br;
          b.megacredits(-2);
        }),
        description: 'Increase temperature 3 steps. Pay 2 M€.',
      },
    });
  }
  public override bespokeCanPlay(player: IPlayer) {
    return player.canAfford(2);
  }
  public override bespokePlay(player: IPlayer) {
    player.game.defer(new SelectPaymentDeferred(player, 2));
    return undefined;
  }
}
