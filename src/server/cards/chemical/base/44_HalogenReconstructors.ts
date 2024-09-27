import {IProjectCard} from '../../IProjectCard';
import {Tag} from '../../../../common/cards/Tag';
import {ActionCard} from '../../ActionCard';
import {CardType} from '../../../../common/cards/CardType';
import {CardResource} from '../../../../common/CardResource';
import {CardName} from '../../../../common/cards/CardName';
import {CardRenderer} from '../../render/CardRenderer';

export class HalogenReconstructors extends ActionCard implements IProjectCard {
  constructor() {
    super({
      type: CardType.ACTIVE,
      name: CardName.HALOGEN_RECONSTRUCTORS,
      tags: [Tag.SCIENCE, Tag.MICROBE],
      cost: 7,
      resourceType: CardResource.MICROBE,

      action: {
        or: {
          autoSelect: true,
          behaviors: [{
            title: 'Spend 2 microbes to increase the temperature 1 step',
            spend: {resourcesHere: 2},
            global: {temperature: 1},
          },
          {
            title: 'Spend 1 M€ to add 1 microbe to this card',
            spend: {megacredits: 1},
            addResources: 1,
          }],
        },
      },

      metadata: {
        cardNumber: 'xB44',
        renderData: CardRenderer.builder((b) => {
          b.action('Spend 1 M€ to add 1 microbe to this card.', (eb) => {
            eb.megacredits(1).startAction.resource(CardResource.MICROBE);
          }).br;
          b.or().br;
          b.action('Remove 2 microbes from this card to raise the temperature 1 step.', (eb) => {
            eb.resource(CardResource.MICROBE, 2).startAction.temperature(1);
          }).br;
        }),
      },
    });
  }
}
