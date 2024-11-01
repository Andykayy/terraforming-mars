import {IProjectCard} from '../IProjectCard';
import {Tag} from '../../../common/cards/Tag';
import {ActionCard} from '../ActionCard';
import {CardType} from '../../../common/cards/CardType';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {CardResource} from '../../../common/CardResource';


//not sure how strong this one is. Will require some balancing
export class RareMaterialExtraction extends ActionCard implements IProjectCard {
  constructor() {
    super({
      type: CardType.ACTIVE,
      name: CardName.RARE_MATERIAL_EXTRACTION_ANDY,
      tags: [Tag.SPACE, Tag.MARS],
      cost: 8,
      resourceType: CardResource.ASTEROID,

      action: {
        or: {
          autoSelect: true,
          behaviors: [{
            title: 'Add 1 asteroid to this card.',            
            addResources: 1,
          },
          {
            title: 'Spend 1 asteroid here to add a resource to any card THAT ALREADY HAS A RESOURCE.',
            spend: {resourcesHere: 1},
            addResourcesToAnyCard: {
              count: 1,
              min: 1,
              mustHaveCard: true,
              robotCards: true,
            },
          }],
        },
      },      

      metadata: {
        cardNumber: 'xB32',
        renderData: CardRenderer.builder((b) => {
          b.action('Add 1 asteroid to this card.', (eb) => {
            eb.startAction.resource(CardResource.ASTEROID);
          }).br;
          b.or().br;
          b.action('Remove 1 asteroid from here to add a resource to any card THAT ALREADY HAS A RESOURCE.', (eb) => {
            eb.resource(CardResource.ASTEROID, 1).startAction.wild(1).asterix();
          }).br;
        }),
      },
    });
  }

}
