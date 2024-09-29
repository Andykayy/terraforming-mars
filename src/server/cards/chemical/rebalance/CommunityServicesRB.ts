import {IProjectCard} from '../../IProjectCard';
import {CardType} from '../../../../common/cards/CardType';
import {IPlayer} from '../../../IPlayer';
import {CardName} from '../../../../common/cards/CardName';
import {Resource} from '../../../../common/Resource';
import {Card} from '../../Card';
import {CardRenderer} from '../../render/CardRenderer';

export class CommunityServicesRebalance extends Card implements IProjectCard {
  constructor() {
    super({
      cost: 11,
      name: CardName.COMMUNITY_SERVICES_RB,
      type: CardType.AUTOMATED,
      victoryPoints: 1,

      metadata: {
        cardNumber: 'C041',
        description: 'Increase your M€ production 1 step per CARD WITH NO TAGS, including this.',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => {
            pb.megacredits(1);
          }).slash().noTags();
        }),
      },
    });
  }

  public override bespokePlay(player: IPlayer) {
    player.production.add(Resource.MEGACREDITS, player.tags.numberOfCardsWithNoTags() + 1, {log: true});
    return undefined;
  }
}
