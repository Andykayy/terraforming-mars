import {IProjectCard} from '../../IProjectCard';
import {Tag} from '../../../../common/cards/Tag';
import {CardType} from '../../../../common/cards/CardType';
import {CardName} from '../../../../common/cards/CardName';
import {CardRenderer} from '../../render/CardRenderer';

import {IPlayer} from '../../../IPlayer';
import {Resource} from '../../../../common/Resource';
import {SelectPaymentDeferred} from '../../../deferredActions/SelectPaymentDeferred';
import {TITLES} from '../../../inputs/titles';
import { Card } from '../../Card';


export class UndergroundDetonationsRebalance extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.ACTIVE,
      name: CardName.UNDERGROUND_DETONATIONS_RB,
      tags: [Tag.BUILDING],
      cost: 2,    

      metadata: {
        cardNumber: '202',
        renderData: CardRenderer.builder((b) => {
          b.action('Spend 8M€ to increase your heat production 2 steps. STEEL MAY BE USED', (eb) => {
            eb.megacredits(8).super((b) => b.steel(1)).startAction.production((pb)=>pb.heat(2));
          });
        }),
      },
    });
  }
  public canAct(player: IPlayer): boolean {
    return player.canAfford({cost: 8, steel: true});
  }
  public action(player: IPlayer) {
    player.game.defer(new SelectPaymentDeferred(player, 8, {canUseSteel: true, title: TITLES.payForCardAction(this.name)}))
      .andThen(() => player.production.add(Resource.HEAT, 2));
    return undefined;
  }
}