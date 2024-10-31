import {CardName} from '../../../common/cards/CardName';
import {ModuleManifest} from '../ModuleManifest';
import { MartianResearch } from './Martian Research';
import { OngoingStudy } from './OngoingStudy';
import { RareMaterialExtraction } from './RareMaterials';
import { DataShipment } from './DataShipment';


export const ANDY_CARD_MANIFEST = new ModuleManifest({
  module: 'andy',
  projectCards: {
       [CardName.RARE_MATERIAL_EXTRACTION_ANDY]: {Factory: RareMaterialExtraction, compatibility: 'turmoil'},
       [CardName.ONGOING_STUDY_ANDY]: {Factory: OngoingStudy, compatibility: 'pathfinders'},
       [CardName.MARTIAN_RESEARCH_ANDY]: {Factory: MartianResearch, compatibility: 'pathfinders'},
       [CardName.DATA_SHIPMENT_ANDY]: {Factory: DataShipment, compatibility: 'pathfinders'},
  },

  preludeCards: {
    
  },

  corporationCards: {
    
  },
});
