import {Tag} from '../../../../common/cards/Tag';
import {PreludeCard} from '../../prelude/PreludeCard';
import {CardName} from '../../../../common/cards/CardName';
import {CardRenderer} from '../../../cards/render/CardRenderer';

export class GalileanMiningRebalance extends PreludeCard {
  constructor() {
    super({
      name: CardName.GALILEAN_MINING_RB,
      tags: [Tag.JOVIAN],

      behavior: {
        production: {titanium: 2},
      },      

      metadata: {
        cardNumber: 'P13',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => {
            pb.titanium(2);
          }).br;          
        }),
        description: 'Increase your titanium production 2 steps.',
      },
    });
  }  
}
