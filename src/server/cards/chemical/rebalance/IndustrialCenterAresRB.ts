import {CardName} from '../../../../common/cards/CardName';
import {SpaceBonus} from '../../../../common/boards/SpaceBonus';
import {IndustrialCenter} from '../../base/IndustrialCenter';
import {TileType} from '../../../../common/TileType';
import {CardRenderer} from '../../render/CardRenderer';

export class IndustrialCenterRebalance extends IndustrialCenter {
  constructor() {
    super(
      CardName.INDUSTRIAL_CENTER_RB,
      {bonus: [SpaceBonus.STEEL]},
      {
        cardNumber: 'A101',
        renderData: CardRenderer.builder((b) => {
          b.action('Spend 6 M€ to increase your steel production 1 step.', (eb) => {
            eb.megacredits(6).startAction.production((pb) => pb.steel(1));
          }).br;
          b.tile(TileType.INDUSTRIAL_CENTER, false, true).asterix();
        }),
        description: 'Place this tile adjacent to a city tile. This tile grants an ADJACENCY BONUS of 1 steel.',
      });
  }
}
