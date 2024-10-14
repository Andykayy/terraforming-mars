import {COLONIES_CARD_MANIFEST} from './cards/colonies/ColoniesCardManifest';
import {PRELUDE_CARD_MANIFEST} from './cards/prelude/PreludeCardManifest';
import {PROMO_CARD_MANIFEST} from './cards/promo/PromoCardManifest';
import {BASE_CARD_MANIFEST, CORP_ERA_CARD_MANIFEST} from './cards/StandardCardManifests';
import {TURMOIL_CARD_MANIFEST} from './cards/turmoil/TurmoilCardManifest';
import {VENUS_CARD_MANIFEST} from './cards/venusNext/VenusCardManifest';
import {COMMUNITY_CARD_MANIFEST} from './cards/community/CommunityCardManifest';
import {ARES_CARD_MANIFEST} from './cards/ares/AresCardManifest';
import {MOON_CARD_MANIFEST} from './cards/moon/MoonCardManifest';
import {PATHFINDERS_CARD_MANIFEST} from './cards/pathfinders/PathfindersCardManifest';
import {CEO_CARD_MANIFEST} from './cards/ceos/CeoCardManifest';
import {CardManifest, ModuleManifest} from './cards/ModuleManifest';
import {CardName} from '../common/cards/CardName';
import {ICard} from './cards/ICard';
import {isCompatibleWith} from './cards/ICardFactory';
import {GameOptions} from './game/GameOptions';
import {ICorporationCard} from './cards/corporation/ICorporationCard';
import {isIProjectCard, IProjectCard} from './cards/IProjectCard';
import {IStandardProjectCard} from './cards/IStandardProjectCard';
import {newCard} from './createCard';
import {IPreludeCard} from './cards/prelude/IPreludeCard';
import {ICeoCard} from './cards/ceos/ICeoCard';
import {PRELUDE2_CARD_MANIFEST} from './cards/prelude2/Prelude2CardManifest';
import {STAR_WARS_CARD_MANIFEST} from './cards/starwars/StarwarsCardManifest';
import {UNDERWORLD_CARD_MANIFEST} from './cards/underworld/UnderworldCardManifest';
import {CHEMICAL_CARD_MANIFEST} from './cards/chemical/ChemicalCardManifest';


/**
 * Returns the cards available to a game based on its `GameOptions`.
 *
 * It only includes manifests appropriate to the modules for the game,
 * and considers the banned cards, and extra-module compatibility
 * (e.g. cards in one module that can't be played without another one.)
 *
 * Therefore, this is only used when constructing a brand new instance.
 *
 * ... and one other place. When trying to determine the available standard
 * projects for a game. This is just done on the fly all the time, rather
 * that store them. (We should fix that.)
 */
export class GameCards {
  private readonly gameOptions: GameOptions;
  private readonly moduleManifests: Array<ModuleManifest>;

  public constructor(gameOptions: GameOptions) {
    this.gameOptions = gameOptions;

    const manifests: Array<[boolean, ModuleManifest]> = [
      [true, BASE_CARD_MANIFEST],
      [gameOptions.corporateEra, CORP_ERA_CARD_MANIFEST],
      [gameOptions.preludeExtension, PRELUDE_CARD_MANIFEST],
      [gameOptions.prelude2Expansion, PRELUDE2_CARD_MANIFEST],
      [gameOptions.venusNextExtension, VENUS_CARD_MANIFEST],
      [gameOptions.coloniesExtension, COLONIES_CARD_MANIFEST],
      [gameOptions.turmoilExtension, TURMOIL_CARD_MANIFEST],
      [gameOptions.aresExtension, ARES_CARD_MANIFEST],
      [gameOptions.promoCardsOption, PROMO_CARD_MANIFEST],
      [gameOptions.communityCardsOption, COMMUNITY_CARD_MANIFEST],
      [gameOptions.moonExpansion, MOON_CARD_MANIFEST],
      [gameOptions.pathfindersExpansion, PATHFINDERS_CARD_MANIFEST],
      [gameOptions.ceoExtension, CEO_CARD_MANIFEST],
      [gameOptions.starWarsExpansion, STAR_WARS_CARD_MANIFEST],
      [gameOptions.underworldExpansion, UNDERWORLD_CARD_MANIFEST],
      [gameOptions.chemicalExpansion, CHEMICAL_CARD_MANIFEST],
    ];
    this.moduleManifests = manifests
      .filter(([option, _manifest]) => option === true)
      .map(([_option, manifest]) => manifest);
  }

  private instantiate<T extends ICard>(manifest: CardManifest<T>): Array<T> {
    return CardManifest.values(manifest)
      .filter((factory) => factory.instantiate !== false)
      .filter((factory) => isCompatibleWith(factory, this.gameOptions))
      .map((factory) => new factory.Factory());
  }

  public getProjectCards() {
    const cards = this.getCards<IProjectCard>('projectCards');
    const cardsWithIncludedCards = this.addCustomCards(
      cards,
      this.gameOptions.includedCards,
    );
    return cardsWithIncludedCards.filter(isIProjectCard);
  }
  public getStandardProjects() {
    return this.getCards<IStandardProjectCard>('standardProjects');
  }
  
  public getCorporationCards(): Array<ICorporationCard> {
    console.log("Starting getCorporationCards");
    let cards = this.getCards<ICorporationCard>('corporationCards')
      .filter((card) => card.name !== CardName.BEGINNER_CORPORATION);
    
    console.log("Initial corporation cards:", cards.map(card => card.name));
    console.log("Chemical Expansion active:", this.gameOptions.chemicalExpansion);
  
    const cardsToRemove = this.getCardsToRemove();
    console.log("Cards to remove:", cardsToRemove);
  
    const removeCards = (cardList: Array<ICorporationCard>) => 
      cardList.filter((card) => !cardsToRemove.includes(card.name));
  
    cards = removeCards(cards);
    console.log("Corporation cards after removal:", cards.map(card => card.name));
  
    const customCards = this.addCustomCards(cards, this.gameOptions.customCorporationsList);
    console.log("Cards after custom additions:", customCards.map(card => card.name));
  
    // Apply removal again to ensure removed cards are not added back
    const finalCards = removeCards(customCards);
    console.log("Final corporation cards:", finalCards.map(card => card.name));
    
    return finalCards;
  }


  public getPreludeCards() {
    let preludes = this.getCards<IPreludeCard>('preludeCards');
    // https://github.com/terraforming-mars/terraforming-mars/issues/2833
    // Make Valley Trust playable even when Preludes is out of the game
    // by preparing a deck of preludes.
    if (preludes.length === 0) {
      preludes = this.instantiate(PRELUDE_CARD_MANIFEST.preludeCards);
    }
    preludes = this.addCustomCards(preludes, this.gameOptions.customPreludes);

    if (this.gameOptions.twoCorpsVariant) {
      // As each player who doesn't have Merger is dealt Merger in SelectInitialCards.ts,
      // remove it from the deck to avoid possible conflicts (e.g. Valley Trust / New Partner)
      preludes = preludes.filter((c) => c.name !== CardName.MERGER);
    }

    //Andy Removes duplicate preludes from Pathfinders that the manifest doesn't seem to
    if (this.gameOptions.pathfindersExpansion) {
    preludes = preludes.filter((c) => c.name !== CardName.VALUABLE_GASES);
    preludes = preludes.filter((c) => c.name !== CardName.RESEARCH_GRANT);
    }

    //Andy Removes duplicate preludes from Andy's chemical expansion
    if (this.gameOptions.chemicalExpansion) {
      preludes = preludes.filter((c) => c.name !== CardName.BIOFUELS);
      preludes = preludes.filter((c) => c.name !== CardName.BIOSPHERE_SUPPORT);
      preludes = preludes.filter((c) => c.name !== CardName.DOME_FARMING);
      preludes = preludes.filter((c) => c.name !== CardName.EARLY_SETTLEMENT);
      preludes = preludes.filter((c) => c.name !== CardName.ECCENTRIC_SPONSOR);
      preludes = preludes.filter((c) => c.name !== CardName.GALILEAN_MINING);
      preludes = preludes.filter((c) => c.name !== CardName.HUGE_ASTEROID);
      preludes = preludes.filter((c) => c.name !== CardName.IO_RESEARCH_OUTPOST);
      preludes = preludes.filter((c) => c.name !== CardName.LOAN);
      preludes = preludes.filter((c) => c.name !== CardName.MARTIAN_INDUSTRIES);
      preludes = preludes.filter((c) => c.name !== CardName.METALS_COMPANY);
      preludes = preludes.filter((c) => c.name !== CardName.MOHOLE);
      preludes = preludes.filter((c) => c.name !== CardName.MOHOLE_EXCAVATION);
      preludes = preludes.filter((c) => c.name !== CardName.NITROGEN_SHIPMENT);
      preludes = preludes.filter((c) => c.name !== CardName.ORBITAL_CONSTRUCTION_YARD);
      preludes = preludes.filter((c) => c.name !== CardName.POLAR_INDUSTRIES);
      preludes = preludes.filter((c) => c.name !== CardName.SELF_SUFFICIENT_SETTLEMENT);
      preludes = preludes.filter((c) => c.name !== CardName.SMELTING_PLANT);
      preludes = preludes.filter((c) => c.name !== CardName.SOCIETY_SUPPORT);
      preludes = preludes.filter((c) => c.name !== CardName.NITROGEN_SHIPMENT);
      preludes = preludes.filter((c) => c.name !== CardName.NITROGEN_SHIPMENT);
      preludes = preludes.filter((c) => c.name !== CardName.NITROGEN_SHIPMENT);

      
        }

    return preludes;
  }

  public getCeoCards() {
    let ceos = this.getCards<ICeoCard>('ceoCards');
    ceos = this.addCustomCards(ceos, this.gameOptions.customCeos);
    return ceos;
  }

  private getCardsToRemove(): Array<CardName> {
    if (this.gameOptions.chemicalExpansion) {
      return [
        CardName.POINT_LUNA,
        CardName.APHRODITE,
        CardName.ARCADIAN_COMMUNITIES,
        CardName.ARKLIGHT,
        CardName.ASTRODRILL,
        CardName.CELESTIC,
        CardName.CHEUNG_SHING_MARS,
        CardName.FACTORUM,
        CardName.HELION,
        CardName.INTERPLANETARY_CINEMATICS,
        CardName.INVENTRIX,
        CardName.MINING_GUILD,
        CardName.MORNING_STAR_INC,
        CardName.PHOBOLOG,
        CardName.POINT_LUNA,
        CardName.POLYPHEMOS,
        CardName.POSEIDON,
        CardName.PRISTAR,
        CardName.RECYCLON,
        CardName.ROBINSON_INDUSTRIES,
        CardName.SPLICE,
        CardName.STORMCRAFT_INCORPORATED,
        CardName.TERRALABS_RESEARCH,
        // Add more CardNames here as needed
        // For example:
        // CardName.ANOTHER_CORPORATION,
        // CardName.YET_ANOTHER_CORPORATION,
      ];
    }
    return [];
  }

  private addCustomCards<T extends ICard>(cards: Array<T>, customList: Array<CardName> = []): Array<T> {
    const cardsToRemove = this.getCardsToRemove();
    for (const cardName of customList) {
      if (cardsToRemove.includes(cardName)) {
        console.log(`Skipping ${cardName} in custom additions due to removal list`);
        continue;
      }
      const idx = cards.findIndex((c) => c.name === cardName);
      if (idx === -1) {
        const card = newCard(cardName);
        if (card === undefined) {
          console.warn(`Unknown card: ${cardName}`);
        } else {
          cards.push(<T>card);
        }
      }
    }
    return cards;
  }

  private getCards<T extends ICard>(cardManifestName: keyof ModuleManifest) : Array<T> {
    let cards: Array<T> = [];
    for (const moduleManifest of this.moduleManifests) {
      // a bit of a hack, but since this is a private API, this is reasonable.
      const cardManifest: CardManifest<T> = moduleManifest[cardManifestName] as CardManifest<T>;
      cards.push(...this.instantiate(cardManifest));
    }

    cards = this.filterBannedCards(cards);
    cards = this.filterReplacedCards(cards);
    return cards;
  }

  /* Remove cards excluded by choice in game options */
  private filterBannedCards<T extends ICard>(cards: Array<T>): Array<T> {
    return cards.filter((card) => {
      return this.gameOptions.bannedCards.includes(card.name) !== true;
    });
  }
  /* Remove cards that are replaced by new versions in other manifests */
  private filterReplacedCards<T extends ICard>(cards: Array<T>): Array<T> {
    return cards.filter((card) => {
      for (const manifest of this.moduleManifests) {
        if (manifest.cardsToRemove.has(card.name)) return false;
      }
      return true;
    });
  }
}
