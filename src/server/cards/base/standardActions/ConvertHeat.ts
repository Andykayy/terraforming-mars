import {StandardActionCard} from '../../StandardActionCard';
import {CardName} from '../../../../common/cards/CardName';
import {CardRenderer} from '../../render/CardRenderer';
import {IPlayer} from '../../../IPlayer';
import {MAX_TEMPERATURE} from '../../../../common/constants';
import {Units} from '../../../../common/Units';
import {message} from '../../../logs/MessageBuilder';
import {SelectOption} from '../../../inputs/SelectOption';



export class ConvertHeat extends StandardActionCard {
  constructor() {
    super({
      name: CardName.CONVERT_HEAT,
      metadata: {
        cardNumber: 'SA2',
        renderData: CardRenderer.builder((b) =>
          b.standardProject('Spend 8 heat to raise temperature 1 step.', (eb) => {
            eb.heat(8).startAction.temperature(1);
          }),
        ),
      },
    });
  }

  public canAct(player: IPlayer): boolean {
    if (player.game.getTemperature() === MAX_TEMPERATURE) {
      this.warnings.add('maxtemp');
    }

    // Strictly speaking, this conditional is not necessary, because canAfford manages reserveUnits.
    if (player.availableHeat() < player.heatNeededForTemperature) {
      return false;
    }

    return player.canAfford({
      cost: 0,
      tr: {temperature: 1},
      reserveUnits: Units.of({heat: player.heatNeededForTemperature}),
    });
  }

  public action(player: IPlayer) {
    player.heatNeededForTemperature = player.heatNeededForTemperature - player.heatDiscount;
    return new SelectOption(
      message('Spend ${0} heat to raise temperature', (b) => b.number(player.heatNeededForTemperature)),
      'Confirm'
    ).andThen(() => {
      return player.spendHeat(player.heatNeededForTemperature, () => {
        this.actionUsed(player);
        player.game.increaseTemperature(player, 1);
        return undefined;
      });
    });
  }
}
