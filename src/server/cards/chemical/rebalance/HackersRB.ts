import {IProjectCard} from '../../IProjectCard';
import {Card} from '../../Card';
import {CardType} from '../../../../common/cards/CardType';
import {IPlayer} from '../../../IPlayer';
import {Resource} from '../../../../common/Resource';
import {CardName} from '../../../../common/cards/CardName';
import {PlayerInput} from '../../../PlayerInput';
import {CardRenderer} from '../../render/CardRenderer';
import {all} from '../../Options';

export class HackerRebalance extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.HACKERS_RB,
      cost: 3,
      victoryPoints: -1,

      behavior: {
        production: {energy: -1, megacredits: 2},
      },

      metadata: {
        cardNumber: '1251',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => {
            pb.minus().energy(1).megacredits(1, {all}).br;
            pb.plus().megacredits(3);
          });
        }),
        description: 'Decrease your energy production 1 step and EACH OPPONENTS M€ 1 step. Increase your M€ production 3 steps.',
      },
    });
  }

  public override bespokePlay(player: IPlayer): PlayerInput | undefined {
    player.game.getPlayers().filter((p) => p.id !== player.id).forEach((opponent) => {
      opponent.production.add(Resource.MEGACREDITS, -1, {log: true});
    });
    return undefined;
  }
}

