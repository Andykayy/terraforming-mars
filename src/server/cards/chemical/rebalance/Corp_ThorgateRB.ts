import {Tag} from '../../../../common/cards/Tag';
import {CorporationCard} from '../../corporation/CorporationCard';
import {CardName} from '../../../../common/cards/CardName';
import {CardRenderer} from '../../render/CardRenderer';
import {IActionCard} from '../../ICard';
import {IPlayer} from '../../../IPlayer';
import {Behavior} from '../../../behavior/Behavior';
import {getBehaviorExecutor} from '../../../behavior/BehaviorExecutor';

export class ThorgateRebalance extends CorporationCard implements IActionCard {
  constructor() {
    super({
      name: CardName.THORGATE_RB,
      tags: [Tag.POWER],
      startingMegaCredits: 40,

      behavior: {
        production: {energy: 1},
      },

      cardDiscount: {tag: Tag.POWER, amount: 3},
      metadata: {
        cardNumber: 'R13',
        description: 'You start with 1 energy production and 40 M€.',
        renderData: CardRenderer.builder((b) => {
          b.br;
          b.production((pb) => pb.energy(1)).nbsp.megacredits(40);
          b.corpBox('effect', (ce) => {
            b.action('Decrease energy production 1 step to gain 6 M€.', (eb) => {
              eb.production((pb) => pb.energy(1)).startAction.megacredits(6);
            });
            ce.effect('When playing a power card, THE SP POWER PLANT, OR THE KELVINIST RULING POLICY ACTION, pay 3M€ less.', (eb) => {
              eb.tag(Tag.POWER).asterix().startEffect.megacredits(-3);
            });
          });
        }),
      },
    });
  }
  public canAct(player: IPlayer): boolean {
    return player.production.energy >= 1;
  }

  private static actionBehavior: Behavior = {
    production: {energy: -1},
    stock: {megacredits: 6},
  };

  public action(player: IPlayer) {
    getBehaviorExecutor().execute(ThorgateRebalance.actionBehavior, player, this);
    return undefined;
  }
}

