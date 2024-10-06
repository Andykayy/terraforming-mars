import {CorporationCard} from '../../corporation/CorporationCard';
import {IPlayer} from '../../../IPlayer';
import {CardResource} from '../../../../common/CardResource';
import {CardName} from '../../../../common/cards/CardName';
import {CardRenderer} from '../../render/CardRenderer';
import {Size} from '../../../../common/cards/render/Size';
import {Turmoil} from '../../../turmoil/Turmoil';
import {Resource} from '../../../../common/Resource';


export class PristarRebalance extends CorporationCard {

  private hasTemporaryInfluence: boolean = false;

  constructor() {
    super({
      name: CardName.PRISTAR_RB,
      startingMegaCredits: 53,
      resourceType: CardResource.PRESERVATION,

      victoryPoints: {resourcesHere: {}},

      metadata: {
        cardNumber: 'R07',
        description: 'You start with 53 M€. Decrease your TR 2 steps. 1 VP per preservation resource here.',

        renderData: CardRenderer.builder((b) => {
          b.br.br.br;
          b.megacredits(53).nbsp.nbsp.minus().tr(2, {size: Size.SMALL});
          b.corpBox('effect', (ce) => {
            ce.effect('During production phase, if you did not get TR so far this generation, add one preservation resource here and gain 6 M€.', (eb) => {
              eb.tr(1, {size: Size.SMALL, cancelled: true}).startEffect.resource(CardResource.PRESERVATION).megacredits(6).influence;
            });
          });
        }),
      },
    });
  }

  public override bespokePlay(player: IPlayer) {
    player.decreaseTerraformRating(2);
    return undefined;
  }

  public onProductionPhase(player: IPlayer) {
    if (this.hasTemporaryInfluence) {
      Turmoil.ifTurmoil(player.game, (turmoil) => {
        turmoil.addInfluenceBonus(player, -1);
      });
      this.hasTemporaryInfluence = false;
      player.game.log('${0} lost 1 temporary influence from ${1}', (b) => b.player(player).card(this));
    }

    if (!player.generationData.hasRaisedTR) {
      player.stock.add(Resource.MEGACREDITS, 6, {log: true, from: this});
      player.addResourceTo(this, 1);
      
      Turmoil.ifTurmoil(player.game, (turmoil) => {
        turmoil.addInfluenceBonus(player, 1);
      });
      this.hasTemporaryInfluence = true;
      player.game.log('${0} gained 1 temporary influence from ${1}', (b) => b.player(player).card(this));
    }

    return undefined;
  }
}

