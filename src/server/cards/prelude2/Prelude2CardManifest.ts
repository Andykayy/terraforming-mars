import {CardName} from '../../../common/cards/CardName';
import {ModuleManifest} from '../ModuleManifest';
import {AppliedScience} from './AppliedScience';
import {AtmosphericEnhancers} from './AtmosphericEnhancers';
import {CeresTechMarket} from './CeresTechMarket';
import {CloudTourism} from './CloudTourism';
import {ColonialEnvoys } from './ColonialEnvoys';
import {ColonialRepresentation} from './ColonialRepresentation';
import {ColonyTradeHub} from './ColonyTradeHub';
import {CorridorsOfPower} from './CorridorsOfPower';
import {EarlyColonization} from './EarlyColonization';
import {Ecotec} from './Ecotec';
import {EnvoysFromVenus} from './EnvoysFromVenus';
import {FloatingRefinery} from './FloatingRefinery';
import {FloatingTradeHub} from './FloatingTradeHub';
import {FocusedOrganization} from './FocusedOrganization';
import {FrontierTown} from './FrontierTown';
import {GhgShipment} from './GhgShipment';
import {HighCircles} from './HighCircles';
import {IshtarExpedition} from './IshtarExpedition';
import {JovianEnvoys} from './JovianEnvoys';
import {L1TradeTerminal} from './L1TradeTerminal';
import {NirgalEnterprises} from './NirgalEnterprises';
import {NobelPrize} from './NobelPrize';
import {OldMiningColony} from './OldMiningColony';
import {PalladinShipping} from './PalladinShipping';
import {RedAppeasement} from './RedAppeasement';
import {SagittaFrontierServices} from './SagittaFrontierServices';
import {SpaceCorridors} from './SpaceCorridors';
import {Spire} from './Spire';
import {SponsoringNation} from './SponsoringNation';
import {SummitLogistics} from './SummitLogistics';

export const PRELUDE2_CARD_MANIFEST = new ModuleManifest({
  module: 'prelude2',
  projectCards: {

  
    [CardName.CERES_TECH_MARKET]: {Factory: CeresTechMarket, compatibility: 'colonies'},
    [CardName.CLOUD_TOURISM]: {Factory: CloudTourism, compatibility: 'venus'},
    [CardName.COLONIAL_ENVOYS]: {Factory: ColonialEnvoys, compatibility: ['colonies', 'turmoil']},
    [CardName.COLONIAL_REPRESENTATION]: {Factory: ColonialRepresentation, compatibility: ['colonies', 'turmoil']},    
    [CardName.ENVOYS_FROM_VENUS]: {Factory: EnvoysFromVenus, compatibility: ['turmoil', 'venus']},
    [CardName.L1_TRADE_TERMINAL]: {Factory: L1TradeTerminal, compatibility: 'colonies'},
    [CardName.FLOATING_REFINERY]: {Factory: FloatingRefinery, compatibility: 'colonies'},
    [CardName.FRONTIER_TOWN]: {Factory: FrontierTown, compatibility: 'turmoil'},
    // [CardName.VENUS_TRADE_HUB]: {Factory: VenusTradeHub, compatibility: 'colonies'},
    [CardName.GHG_SHIPMENT]: {Factory: GhgShipment, compatibility: 'turmoil'},
    [CardName.ISHTAR_EXPEDITION]: {Factory: IshtarExpedition, compatibility: 'venus'},
    [CardName.JOVIAN_ENVOYS]: {Factory: JovianEnvoys, compatibility: 'turmoil'},
    [CardName.RED_APPEASEMENT]: {Factory: RedAppeasement, compatibility: 'turmoil'},
    [CardName.SPONSORING_NATION]: {Factory: SponsoringNation, compatibility: 'turmoil'},
    [CardName.SUMMIT_LOGISTICS]: {Factory: SummitLogistics, compatibility: 'turmoil'},
  },

  preludeCards: {
    [CardName.APPLIED_SCIENCE]: {Factory: AppliedScience},
    [CardName.ATMOSPHERIC_ENHANCERS]: {Factory: AtmosphericEnhancers, compatibility: 'venus'},
    [CardName.CORRIDORS_OF_POWER]: {Factory: CorridorsOfPower, compatibility: 'turmoil'},
    [CardName.EARLY_COLONIZATION]: {Factory: EarlyColonization, compatibility: 'colonies'},
    [CardName.FLOATING_TRADE_HUB]: {Factory: FloatingTradeHub, compatibility: 'venus'},
    [CardName.HIGH_CIRCLES]: {Factory: HighCircles, compatibility: 'turmoil'},
    [CardName.NOBEL_PRIZE]: {Factory: NobelPrize},
    [CardName.COLONY_TRADE_HUB]: {Factory: ColonyTradeHub, compatibility: 'colonies'},
    [CardName.OLD_MINING_COLONY]: {Factory: OldMiningColony, compatibility: 'colonies'},
    [CardName.FOCUSED_ORGANIZATION]: {Factory: FocusedOrganization},
    [CardName.SPACE_CORRIDORS]: {Factory: SpaceCorridors},
    // [CardName.BOARD_OF_DIRECTORS]: {Factory: BoardOfDirectors},
    
    
  },

  corporationCards: {
    [CardName.NIRGAL_ENTERPRISES]: {Factory: NirgalEnterprises},
    [CardName.PALLADIN_SHIPPING]: {Factory: PalladinShipping},
    [CardName.SAGITTA_FRONTIER_SERVICES]: {Factory: SagittaFrontierServices},
    [CardName.ECOTEC]: {Factory: Ecotec},
    [CardName.SPIRE]: {Factory: Spire},
  },
});
