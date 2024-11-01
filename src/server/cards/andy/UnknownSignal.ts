import {CardName} from '../../../common/cards/CardName';
import {CardType} from '../../../common/cards/CardType';
import {IProjectCard} from '../IProjectCard';
import {Tag} from '../../../common/cards/Tag';
import {CardRenderer} from '../render/CardRenderer';
import {CardResource} from '../../../common/CardResource';
import {ActionCard} from '../ActionCard';

export class UnknownSignal extends ActionCard implements IProjectCard {
  constructor() {
    super({
      name: CardName.UNKNOWN_SIGNAL_ANDY,
      type: CardType.ACTIVE,      
      cost:6,
      requirements: {tag: Tag.SCIENCE, count: 3},
      resourceType: CardResource.DATA,
       

      action: {
        addResourcesToAnyCard: {type: CardResource.DATA, count: 2},
      },

      metadata: {
        cardNumber: 'Pf54',
        renderData: CardRenderer.builder((b) => {
          b.action('Add 2 data to ANY card.', (ab) => {
            ab.empty().startAction.resource(CardResource.DATA, 2).asterix();
          }).br;
          b.resource(CardResource.DATA, 2).asterix();
        }),
        description: 'Requires 3 science tags.',
      },
    });
  }
}
