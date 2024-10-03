import {CorporationCard} from '../../corporation/CorporationCard';
import {CardName} from '../../../../common/cards/CardName';
import {CardRenderer} from '../../render/CardRenderer';
import {all} from '../../Options';
import {IPlayer} from '../../../IPlayer';
import {Resource} from '../../../../common/Resource';

export class PoseidonRebalance extends CorporationCard {
  constructor() {
    super({
      name: CardName.POSEIDON_RB,
      startingMegaCredits: 40,

      firstAction: {
        text: 'Place a colony',
        // title: 'Poseidon first action - Select where to build colony
        colonies: {buildColony: {}},
      },
      metadata: {
        cardNumber: 'R02',
        description: 'You start with 40 M€. As your first action, place a colony.',
        renderData: CardRenderer.builder((b) => {
          b.br.br;
          b.megacredits(40).nbsp.colonies(1);
          b.corpBox('effect', (ce) => {
            ce.effect('When YOU place a colony, including this, raise your M€ production 2 step.', (eb) => {
              eb.colonies(1, {all}).startEffect.production((pb) => pb.megacredits(2));
            });
          });
        }),
      },
    });
  }

  public onColonyAdded(_player: IPlayer, cardOwner: IPlayer) {
    if (_player === cardOwner) {
      cardOwner.production.add(Resource.MEGACREDITS, 2, {log: true});
    }    
  }
}
