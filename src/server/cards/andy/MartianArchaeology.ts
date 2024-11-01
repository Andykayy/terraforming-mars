import {IProjectCard} from '../IProjectCard';
import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {Tag} from '../../../common/cards/Tag';
import {IPlayer} from '../../IPlayer';
import {BoardType} from '../../boards/BoardType';
import {Space} from '../../boards/Space';
import {SpaceType} from '../../../common/boards/SpaceType';
import {Phase} from '../../../common/Phase';

export class MartianArchaeology extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.ACTIVE,
      name: CardName.MARTIAN_ARCHAEOLOGY_ANDY,
      cost: 18,
      tags: [Tag.MARS, Tag.SCIENCE],
      victoryPoints: 1,

      metadata: {
        cardNumber: 'Pf17',
        renderData: CardRenderer.builder((b) => {
          b.effect('When you place a tile ON MARS draw a card ', (eb) => {
            eb.emptyTile().startEffect.plus().cards(1);
          }).br;
        }),
      },
    });
  }

  public onTilePlaced(cardOwner: IPlayer, activePlayer: IPlayer, space: Space, boardType: BoardType) {
    if (boardType !== BoardType.MARS || space.spaceType === SpaceType.COLONY) return;
    if (cardOwner !== activePlayer) return;
    if (cardOwner.game.phase === Phase.SOLAR) return;
    // Don't grant bonuses when overplacing.
    if (space.tile?.covers !== undefined) return;
    cardOwner.drawCard();    
}
}
