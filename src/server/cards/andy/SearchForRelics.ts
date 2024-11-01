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

export class SearchForRelics extends Card implements IActionCard, IProjectCard {
  constructor() {
    super({
      type: CardType.ACTIVE,
      name: CardName.SEARCH_FOR_RELICS_ANDY,
      tags: [Tag.SCIENCE, Tag.MARS],
      cost: 3,

      resourceType: CardResource.SCIENCE,
      victoryPoints: {resourcesHere: {}, each: 2},

      requirements: {temperature: -12, max},
      metadata: {
        cardNumber: '005',
        description: 'Temperature must be -12°C or colder.',
        renderData: CardRenderer.builder((b) => {
          b.action('Spend 1 M€ to reveal the top card of the draw deck. If that card has a Mars tag, add a science resource here.', (eb) => {
            eb.megacredits(1).startAction.tag(Tag.MARS).asterix().nbsp.colon().nbsp.resource(CardResource.SCIENCE);
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
        if (card.tags.includes(Tag.MARS)) {
          player.addResourceTo(this, 1);
          player.game.log('${0} found a relic!', (b) => b.player(player));
        }

        player.game.projectDeck.discard(card);
      });

    return undefined;
  }
}
