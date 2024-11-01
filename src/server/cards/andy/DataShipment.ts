import {IProjectCard} from '../IProjectCard';
import {CardType} from '../../../common/cards/CardType';
import {IPlayer} from '../../IPlayer';
import {CardName} from '../../../common/cards/CardName';
import {Card} from '../Card';
import {CardRenderer} from '../render/CardRenderer';
import {SelectColony} from '../../inputs/SelectColony';
import {IColony} from '../../colonies/IColony';
import {Tag} from '../../../common/cards/Tag';
import {ColoniesHandler} from '../../colonies/ColoniesHandler';
import {CardResource} from '../../../common/CardResource';

export class DataShipment extends Card implements IProjectCard {
  constructor() {
    super({
      cost: 4,
      name: CardName.DATA_SHIPMENT_ANDY,
      type: CardType.EVENT,
      tags: [Tag.MARS, Tag.SPACE],
      requirements: {tag: Tag.SCIENCE, count: 2},

      behavior: {
        addResourcesToAnyCard: {count: 3, type: CardResource.DATA},
      },

      metadata: {
        cardNumber: 'x314',
        renderData: CardRenderer.builder((b) => b.trade().br.resource(CardResource.DATA, 3).asterix()),    
        description: 'Trade for free. Add 3 data to any card.',
      },
    });
  }

  public override bespokeCanPlay(player: IPlayer): boolean {
    return player.colonies.getFleetSize() > player.colonies.tradesThisGeneration;
  }

  public override bespokePlay(player: IPlayer) {
    const tradeableColonies = ColoniesHandler.tradeableColonies(player.game);
    return new SelectColony('Select colony tile for trade', 'trade', tradeableColonies)
      .andThen((colony: IColony) => {
        colony.trade(player);
        return undefined;
      });
  }
}
