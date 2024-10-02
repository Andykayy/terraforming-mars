import {Tag} from '../../../../common/cards/Tag';
import {CardType} from '../../../../common/cards/CardType';
import {SpaceName} from '../../../SpaceName';
import {CardResource} from '../../../../common/CardResource';
import {CardName} from '../../../../common/cards/CardName';
import {CardRenderer} from '../../render/CardRenderer';
import {ActionCard} from '../../ActionCard';

export class StratopolisRebalance extends ActionCard {
  constructor() {
    super({
      name: CardName.STRATOPOLIS_RB,
      type: CardType.ACTIVE,
      tags: [Tag.CITY, Tag.VENUS],
      cost: 20,

      resourceType: CardResource.FLOATER,
      victoryPoints: {resourcesHere: {}, per: 2},
      requirements: {tag: Tag.SCIENCE, count: 2},

      behavior: {
        production: {megacredits: 2},
        city: {space: SpaceName.STRATOPOLIS},
      },

      action: {
        addResourcesToAnyCard: {
          count: 2,
          tag: Tag.VENUS,
          type: CardResource.FLOATER,
          autoSelect: true,
        },
      },

      metadata: {
        cardNumber: '248',
        renderData: CardRenderer.builder((b) => {
          b.action('Add 2 floaters to ANY VENUS CARD.', (eb) => {
            eb.empty().startAction.resource(CardResource.FLOATER, {amount: 2, secondaryTag: Tag.VENUS});
          }).br;
          b.production((pb) => pb.megacredits(2)).city().asterix();
          b.vpText('1 VP for every 2nd Floater on this card.');
        }),
        description: {
          text: 'Requires 2 science tags. Increase your M€ production 2 steps. Place a city tile ON THE RESERVED AREA',
          align: 'left',
        },
      },
    });
  }
}