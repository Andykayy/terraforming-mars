import {Tag} from '../../../../common/cards/Tag';
import {CorporationCard} from '../../corporation/CorporationCard';
import {CardName} from '../../../../common/cards/CardName';
import {CardRenderer} from '../../render/CardRenderer';
import {Size} from '../../../../common/cards/render/Size';
import {digit} from '../../Options';

export class PhoboLogRebalance extends CorporationCard {
  constructor() {
    super({
      name: CardName.PHOBOLOG_RB,
      tags: [Tag.SPACE],
      startingMegaCredits: 30,

      behavior: {
        stock: {titanium: 8},
        titanumValue: 1,
      },

      firstAction: {
        text: 'Draw 2 cards with a space tag',
        drawCard: {count: 2, tag: Tag.SPACE},        
      },

      metadata: {
        cardNumber: 'R09',
        description: 'You start with 10 titanium and 23 M€.',
        renderData: CardRenderer.builder((b) => {
          b.br.br;
          b.megacredits(23).nbsp.titanium(10, {digit});
          b.corpBox('effect', (ce) => {
            ce.effect('Your titanium resources are each worth 1 M€ extra.', (eb) => {
              eb.titanium(1).startEffect.plus(Size.SMALL).megacredits(1);
            });
          });
        }),
      },
    });
  }
}
