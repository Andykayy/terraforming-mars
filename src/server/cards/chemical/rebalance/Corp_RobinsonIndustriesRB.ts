import {IActionCard} from '../../ICard';
import {IPlayer} from '../../../IPlayer';
import {CorporationCard} from '../../corporation/CorporationCard';
import {OrOptions} from '../../../inputs/OrOptions';
import {SelectOption} from '../../../inputs/SelectOption';
import {ALL_RESOURCES} from '../../../../common/Resource';
import {CardName} from '../../../../common/cards/CardName';
import {CardRenderer} from '../../render/CardRenderer';
import {SelectPaymentDeferred} from '../../../deferredActions/SelectPaymentDeferred';
import {TITLES} from '../../../inputs/titles';
import {Tag} from '../../../../common/cards/Tag';

export class RobinsonIndustriesRebalance extends CorporationCard implements IActionCard {
  constructor() {
    super({
      name: CardName.ROBINSON_INDUSTRIES_RB,
      tags: [Tag.WILD],
      startingMegaCredits: 40,

      metadata: {
        cardNumber: 'R27',
        description: 'You start with 40 M€ and 2 M€ production. When you perform an action the wild tag acts as any tag.',
        renderData: CardRenderer.builder((b) => {
          b.br.br.br;
          b.megacredits(40).nbsp.production((pb) => pb.megacredits(2));
          b.corpBox('action', (ce) => {
            ce.action('Spend 4 M€ to increase (one of) your LOWEST production 1 step.', (eb) => {
              eb.megacredits(4).startAction.production((pb) => pb.wild(1).asterix());
            });
          });
        }),
      },
    });
  }
  public canAct(player: IPlayer): boolean {
    return player.canAfford(4);
  }

  public action(player: IPlayer) {
    let minimum = player.production.megacredits;
    let lowest: Array<SelectOption> = [];

    ALL_RESOURCES.forEach((resource) => {
      const option = new SelectOption('Increase ' + resource + ' production 1 step').andThen(() => {
        player.game.defer(new SelectPaymentDeferred(player, 4, {title: TITLES.payForCardAction(this.name)}))
          // Add production after payment, to prevent Manutech from being in the way.
          .andThen(() => player.production.add(resource, 1, {log: true}));
        return undefined;
      });

      if (player.production[resource] < minimum) {
        lowest = [];
        minimum = player.production[resource];
      }
      if (player.production[resource] === minimum) lowest.push(option);
    });

    const result = new OrOptions();
    result.options = lowest;
    return result;
  }
}