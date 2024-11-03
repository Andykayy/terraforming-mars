import {IProjectCard} from '../IProjectCard';
import {IPlayer} from '../../IPlayer';
import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {IActionCard} from '../ICard';
import {Resource} from '../../../common/Resource';
import {Tag} from '../../../common/cards/Tag';
import {CardResource} from '../../../common/CardResource';
import {SelectOption} from '../../inputs/SelectOption';
import {OrOptions} from '../../inputs/OrOptions';
import {SelectAmount} from '../../inputs/SelectAmount';
import {message} from '../../logs/MessageBuilder';

export class ThermalBatteries extends Card implements IProjectCard, IActionCard {
  constructor() {
    super({
      type: CardType.ACTIVE,
      name: CardName.THERMAL_BATTERIES_ANDY,
      cost: 6,
      tags: [Tag.POWER],
      resourceType: CardResource.DATA,

      metadata: {
        cardNumber: 'Pf51',
        renderData: CardRenderer.builder((b) => {
          b.action('Spend X heat to add X data to this card.', (eb) => {
            eb.text('x').heat(1).startAction.text('x').resource(CardResource.DATA).or();
          }).br;
          b.action('Remove all data from this card to gain 3M€ per data removed.', (eb) => {
            eb.text('x').resource(CardResource.DATA).startAction.text('x').megacredits(3);
          });
        }),
      },
    });
  }

  public canAct(player: IPlayer) {
    return this.resourceCount > 0 || player.stock.heat > 0;
  }


  private getHeatOption(player: IPlayer) {
    const max = Math.min(player.stock.heat);
    return new SelectAmount(
      message('Spend up to ${1} heat to add ${1} data to this card.', (b) => b.number(max)),
      'Spend heat', 1, max, false)
      .andThen((amount) => {
        player.stock.deduct(Resource.HEAT, amount);
        player.addResourceTo(this, {qty: amount, log: true});
        player.game.log('${0} spent ${1} heat to place ${1} data.', (b) => b.player(player).number(amount));
        return undefined;
      });
  }

  private spendDataOption(player: IPlayer){
    const max = Math.min(this.resourceCount);
    return new SelectAmount(
      message('Spend up to ${1} data from this card to gain 3M€ per data removed.', (b) => b.number(max)),
      'Spend data', 1, max, false)
      .andThen((amount) => {
        this.resourceCount -= amount;
        player.addResourceTo(this, {qty: amount, log: true});
        player.stock.add(Resource.MEGACREDITS, 3 * amount, {log: true});
        return undefined;
      });
  }

  public action(player: IPlayer) {
    const availableHeat = Math.min(player.stock.heat);
    if (availableHeat >= 1 && this.resourceCount >= 1) {
      return new OrOptions(
        new SelectOption('Spend X heat to add X data to this card', 'Spend heat').andThen(() => {
          return this.getHeatOption(player);
        }),
        new SelectOption('Spend X data from this card to gain 3M€ per data removed.', 'Spend data').andThen(() => {
          return this.spendDataOption(player);
        }),
      );
    } else if (availableHeat >= 1) {
      return this.getHeatOption(player);
    } else if (this.resourceCount >= 1) {
      return this.spendDataOption(player);
    }
    return undefined;
  }
}

