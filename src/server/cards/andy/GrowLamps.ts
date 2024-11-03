import {IProjectCard} from '../IProjectCard';
import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {Tag} from '../../../common/cards/Tag';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {IPlayer} from '../../IPlayer';
import {PartyName} from '../../../common/turmoil/PartyName';

export class GrowLamps extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.GROW_LAMPS_ANDY,
      tags: [Tag.PLANT, Tag.MARS],
      cost: 11,
      requirements: {party: PartyName.KELVINISTS},

      behavior: {
        greenery: {},
      },

      requirements: {tag: Tag.SCIENCE, count: 2},
      metadata: {
        cardNumber: '193',
        renderData: CardRenderer.builder((b) => {
          b.greenery();
        }),
        description: 'Spend 3 heat. Place a greenery tile and raise oxygen 1 step.',
      },
    });
  }

  public override bespokeCanPlay(player: IPlayer): boolean {
    const hastEnougHeat = player.heat >= 3;
    return hastEnougHeat;
  }

  public override bespokePlay(player: IPlayer) {
    player.plants -= 2;
    return undefined;
  }
}
