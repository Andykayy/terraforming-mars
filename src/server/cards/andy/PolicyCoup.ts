import {IProjectCard} from '../IProjectCard';
import {CardType} from '../../../common/cards/CardType';
import {IPlayer} from '../../IPlayer';
import {CardName} from '../../../common/cards/CardName';
import {Card} from '../Card';
import {CardRenderer} from '../render/CardRenderer';
import {Tag} from '../../../common/cards/Tag';
import {Turmoil} from '../../turmoil/Turmoil';
import {IGlobalEvent} from '../../turmoil/globalEvents/IGlobalEvent';
import {SelectGlobalEvent} from '../../inputs/SelectGlobalEvent';
import {SendDelegateToArea} from '../../deferredActions/SendDelegateToArea';

export class PolicyCoup extends Card implements IProjectCard {
  constructor() {
    super({
      cost: 11,
      name: CardName.POLICY_COUP_ANDY,
      type: CardType.EVENT,
      tags: [Tag.MARS, Tag.SPACE],
      requirements: {chairman: 1},

      metadata: {
        cardNumber: 'x314',
        renderData: CardRenderer.builder((b) => {
          b.text('PLAY').globalEvent().asterix();
          b.br.br.br;
          b.delegates(2).br.br;
        }),  
        description: 'Requires that you are the chairman. Draw 4 global events. Play 1 as the COMING GLOBAL EVENT and discard the rest. Place 2 delegates in any party.',
      },
    });
  }

  public override bespokePlay(player: IPlayer) {    
    const turmoil = Turmoil.getTurmoil(player.game);
    const globalEvents: IGlobalEvent[] = [];

    for (let i = 0; i < 4; i++) {
      const event = turmoil.globalEventDealer.draw();
      if (event !== undefined) {
        globalEvents.push(event);
      }
    }

    return new SelectGlobalEvent(globalEvents)
      .andThen((event) => {
        player.game.log('${0} selected Global Event ${1} for the current global event', (b) => b.player(player).globalEvent(event));
        turmoil.comingGlobalEvent = event;
        turmoil.sendDelegateToParty('NEUTRAL', event.currentDelegate, player.game);
        player.game.log('Neutral delegate added to ${0}', (b) => b.partyName(event.currentDelegate));

        globalEvents.forEach((ge) => {
          if (ge.name !== event.name) {
            turmoil.globalEventDealer.discard(ge);
          }
        });

        player.game.defer(new SendDelegateToArea(player, 'Select where to send 2 delegates', {count: 2}));
        return undefined;
      });
  }
}

