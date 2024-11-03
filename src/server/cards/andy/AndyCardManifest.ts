import {CardName} from '../../../common/cards/CardName';
import {ModuleManifest} from '../ModuleManifest';
import { MartianResearch } from './Martian Research';
import { OngoingStudy } from './OngoingStudy';
import { RareMaterialExtraction } from './RareMaterials';
import { DataShipment } from './DataShipment';
import { OlympusFunding } from './OlympusFunding';
import { Araneiforms } from './Araneiforms';
import { KaseiForges } from './KaseiForges';
import { MartianArchaeology } from './MartianArchaeology';
import { SearchForRelics } from './SearchForRelics';
import { UnknownSignal } from './UnknownSignal';
import { ThermalBatteries } from './ThermalBatteries';
import { TrackingCookies } from './TrackingCookies';


export const ANDY_CARD_MANIFEST = new ModuleManifest({
  module: 'andy',
  projectCards: {
       [CardName.RARE_MATERIAL_EXTRACTION_ANDY]: {Factory: RareMaterialExtraction, compatibility: 'turmoil'},
       [CardName.ONGOING_STUDY_ANDY]: {Factory: OngoingStudy, compatibility: 'pathfinders'},
       [CardName.MARTIAN_RESEARCH_ANDY]: {Factory: MartianResearch, compatibility: 'pathfinders'},
       [CardName.DATA_SHIPMENT_ANDY]: {Factory: DataShipment, compatibility: 'pathfinders'},
       [CardName.OLYMPUS_FUNDING_ANDY]: {Factory: OlympusFunding, compatibility: 'pathfinders'},
       [CardName.ARANEIFORMS_ANDY]: {Factory: Araneiforms, compatibility: 'pathfinders'},
       [CardName.KASEI_FORGES_ANDY]: {Factory: KaseiForges, compatibility: 'pathfinders'},
       [CardName.MARTIAN_ARCHAEOLOGY_ANDY]: {Factory: MartianArchaeology, compatibility: 'pathfinders'},
       [CardName.SEARCH_FOR_RELICS_ANDY]: {Factory: SearchForRelics, compatibility: 'pathfinders'},
       [CardName.UNKNOWN_SIGNAL_ANDY]: {Factory: UnknownSignal, compatibility: 'pathfinders'},
       [CardName.THERMAL_BATTERIES_ANDY]: {Factory: ThermalBatteries, compatibility: 'pathfinders'},
       [CardName.TRACKING_COOKIES_ANDY]: {Factory: TrackingCookies, compatibility: 'pathfinders'},
  },

  preludeCards: {
    
  },

  corporationCards: {
    
  },
});
