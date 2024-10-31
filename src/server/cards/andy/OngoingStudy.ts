import {IProjectCard} from '../IProjectCard';
import {IPlayer} from '../../IPlayer';
import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {Tag} from '../../../common/cards/Tag';
import {CardResource} from '../../../common/CardResource';
import {Phase} from '../../../common/Phase';
import {AddResourcesToCard } from '../../deferredActions/AddResourcesToCard';

export class OngoingStudy extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.ACTIVE,
      name: CardName.ONGOING_STUDY_ANDY,
      cost: 12,
      tags: [Tag.SCIENCE, Tag.MARS, Tag.BUILDING],
      resourceType: CardResource.DATA,
      victoryPoints: {resourcesHere: {}, per: 3},     

      metadata: {
        cardNumber: 'Pf28',
        renderData: CardRenderer.builder((b) => {
          b.effect('Each step your TR is raised, add 1 data to ANY CARD.', (b) => {
            b.tr(1).startEffect.resource(CardResource.DATA).asterix();
          });                  
        }),    
        description: '1 VP for every 3 data here.',    
      },
    });
  }

  public onIncreaseTerraformRating(player: IPlayer, cardOwner: IPlayer, steps: number) {
    if (cardOwner === player) {
      const phase = player.game.phase;
      if (phase === Phase.ACTION || phase === Phase.PRELUDES) {
        player.game.defer(new AddResourcesToCard(player, CardResource.DATA, {count: 1 * steps}));
      }
    }
  }
}
