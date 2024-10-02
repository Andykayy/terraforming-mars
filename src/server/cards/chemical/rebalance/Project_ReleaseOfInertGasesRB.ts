import {IProjectCard} from '../../IProjectCard';
import {Card} from '../../Card';
import {CardType} from '../../../../common/cards/CardType';
import {CardName} from '../../../../common/cards/CardName';
import {CardRenderer} from '../../render/CardRenderer';

export class ReleaseOfInertGasesRebalance extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.EVENT,
      name: CardName.RELEASE_OF_INERT_GASES_RB,
      cost: 13,

      behavior: {
        tr: 2,
      },

      metadata: {
        cardNumber: '0361',
        renderData: CardRenderer.builder((b) => {
          b.tr(2);
        }),
        description: 'Raise your terraforming rating 2 steps.',
      },
    });
  }
}
