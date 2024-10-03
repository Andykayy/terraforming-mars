import {Tag} from '../../../../common/cards/Tag';
import {IPlayer} from '../../../IPlayer';
import {CorporationCard} from '../../corporation/CorporationCard';
import {Phase} from '../../../../common/Phase';
import {Space} from '../../../boards/Space';
import {SpaceBonus} from '../../../../common/boards/SpaceBonus';
import {Resource} from '../../../../common/Resource';
import {CardName} from '../../../../common/cards/CardName';
import {GainProduction} from '../../../deferredActions/GainProduction';
import {CardRenderer} from '../../render/CardRenderer';
import {BoardType} from '../../../boards/BoardType';
import {digit} from '../../Options';
import {AresHandler} from '../../../ares/AresHandler';
import {Size} from '../../../../common/cards/render/Size';

export class MiningGuildRebalance extends CorporationCard {
  constructor() {
    super({
      name: CardName.MINING_GUILD_RB,
      tags: [Tag.BUILDING, Tag.BUILDING],
      startingMegaCredits: 36,

      behavior: {
        production: {steel: 1},
        stock: {steel: 2},
      },

      metadata: {
        cardNumber: 'R24',
        hasExternalHelp: true,
        description: 'You start with 36 M€, 2 steel and 1 steel production.',
        renderData: CardRenderer.builder((b) => {
          b.br.br;
          b.megacredits(36).nbsp.steel(2, {digit}).nbsp.production((pb) => pb.steel(1));
          b.corpBox('effect', (ce) => {
            ce.effect('Each time you get any steel as a placement bonus on the map, increase your steel production 1 step. Same for titanium', (eb) => {
              eb.steel(1).asterix().colon();
              eb.production((pb) => pb.steel(1)).or(Size.TINY);
              eb.titanium(1).asterix();
              eb.startEffect.production((pb) => pb.titanium(1));
            });
          });
        }),
      },
    });
  }

  public onTilePlaced(cardOwner: IPlayer, activePlayer: IPlayer, space: Space, boardType: BoardType) {
    // Nerfing on The Moon.
    if (boardType !== BoardType.MARS) {
      return;
    }
    if (cardOwner.id !== activePlayer.id || cardOwner.game.phase === Phase.SOLAR) {
      return;
    }
    // Don't grant a bonus if the card is overplaced (like Ares Ocean City)
    if (space.tile?.covers !== undefined) {
      return;
    }
    const board = cardOwner.game.board;
    const grantSteel = space.bonus.some((bonus) => bonus === SpaceBonus.STEEL ||
      AresHandler.anyAdjacentSpaceGivesBonus(board, space, SpaceBonus.STEEL));
    if (grantSteel) {
      cardOwner.game.defer(new GainProduction(cardOwner, Resource.STEEL));

    const grantTitanium = space.bonus.some((bonus) => bonus === SpaceBonus.TITANIUM) ||      
      AresHandler.anyAdjacentSpaceGivesBonus(board, space, SpaceBonus.TITANIUM);
    if (grantTitanium) {
      cardOwner.game.defer(new GainProduction(cardOwner, Resource.TITANIUM));
    }
    }
  }
}
