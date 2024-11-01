import {IProjectCard} from '../IProjectCard';
import {Tag} from '../../../common/cards/Tag';
import {CardType} from '../../../common/cards/CardType';
import {IPlayer} from '../../IPlayer';
import {CardResource} from '../../../common/CardResource';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {Card} from '../Card';


export class Araneiforms extends Card implements IProjectCard {
  constructor() {
    super({
      name: CardName.ARANEIFORMS_ANDY,
      type: CardType.ACTIVE,
      tags: [Tag.MICROBE, Tag.MARS],
      cost: 8,
      resourceType: CardResource.MICROBE,
      requirements: {temperature: -20},
      victoryPoints: {resourcesHere: {}, per: 2},

      metadata: {
        cardNumber: 'x264',
        renderData: CardRenderer.builder((b) => {
          b.effect('Every time you play an event, add a microbe to this card.', (eb) => {
            eb.tag(Tag.EVENT).startEffect.resource(CardResource.MICROBE);
          }).br;
          b.vpText('1 VP per 2 microbes on this card.').br;
        }),
        description: 'Requires 2 science tags.',
      },
    });
  }

  public onCardPlayed(player: IPlayer, card: IProjectCard) {
    if (card.type === CardType.EVENT) {
      player.addResourceTo(this, {log: true});
    }
    return undefined;
  }
}


