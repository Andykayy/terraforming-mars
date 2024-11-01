import {IActionCard} from '../ICard';
import {IProjectCard} from '../IProjectCard';
import {Tag} from '../../../common/cards/Tag';
import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {IPlayer} from '../../IPlayer';
import {CardResource} from '../../../common/CardResource';
import {CardName} from '../../../common/cards/CardName';
import {SelectPaymentDeferred} from '../../deferredActions/SelectPaymentDeferred';
import {CardRenderer} from '../render/CardRenderer';
import {max} from '../Options';
import {TITLES} from '../../inputs/titles';

export class Astrobiology extends Card implements IActionCard, IProjectCard {
  constructor() {
    super({
      type: CardType.ACTIVE,
      name: CardName.ASTROBIOLOGY_ANDY,
      tags: [Tag.SCIENCE, Tag.MARS],
      cost: 4,

      resourceType: CardResource.SCIENCE,
      victoryPoints: {resourcesHere: {}, each: 2},

      requirements: {temperature: -18, max},
      metadata: {
        cardNumber: '005',
        description: 'Temperature must be -18°C or colder.',
        renderData: CardRenderer.builder((b) => {
          b.action('Spend 1 M€ to reveal the top card of the draw deck. If that card has an animal tag, add a science resource here.', (eb) => {
            eb.megacredits(1).startAction.tag(Tag.MICROBE).asterix().nbsp.colon().nbsp.resource(CardResource.SCIENCE);
          }).br;
          b.vpText('2 VPs per science resource here.');
        }),        
      },
    });
  }
  
  public canAct(player: IPlayer): boolean {
    if (!player.game.projectDeck.canDraw(1)) {
      this.warnings.add('deckTooSmall');
    }
    return player.canAfford(1);
  }
  public action(player: IPlayer) {
    player.game.defer(new SelectPaymentDeferred(player, 1, {title: TITLES.payForCardAction(this.name)}))
      .andThen(() => {
        const card = player.game.projectDeck.draw(player.game);
        if (card === undefined) {
          return;
        }
        player.game.log('${0} revealed and discarded ${1}', (b) => b.player(player).card(card, {tags: true}));
        if (card.tags.includes(Tag.ANIMAL)) {
          player.addResourceTo(this, 1);
          player.game.log('${0} found life!', (b) => b.player(player));
        }

        player.game.projectDeck.discard(card);
      });

    return undefined;
  }
}
