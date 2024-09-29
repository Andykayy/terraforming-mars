import {IProjectCard} from '../../IProjectCard';
import {CardName} from '../../../../common/cards/CardName';
import {CardType} from '../../../../common/cards/CardType';
import {IPlayer} from '../../../IPlayer';
import {CardRenderer} from '../../render/CardRenderer';
import {Card} from '../../Card';
import {all, nextTo} from '../../Options';
import {Board} from '../../../boards/Board';

export class OutdoorSportsRebalance extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.OUTDOOR_SPORTS_RB,
      cost: 8,
      victoryPoints: 1,

      behavior: {
        production: {megacredits: 3},
      },

      requirements: [{cities: 1, all, nextTo}, {oceans: 1}],
      metadata: {
        cardNumber: 'X381',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => {
            pb.megacredits(3);
          });
        }),
        description: 'Requires any city adjacent to an ocean. Increase your M€ production 3 steps.',
      },
    });
  }

  public override bespokeCanPlay(player: IPlayer) {
    const board = player.game.board;
    const oceans = board.getOceanSpaces({upgradedOceans: true, wetlands: true});
    return oceans.some((ocean) => board.getAdjacentSpaces(ocean).some((space) => Board.isCitySpace(space)));
  }
}
