import {CardName} from '../../../common/cards/CardName';
import {ModuleManifest} from '../ModuleManifest';
import { OngoingStudy } from './OngoingStudy';
import { RareMaterialExtraction } from './RareMaterials';


export const ANDY_CARD_MANIFEST = new ModuleManifest({
  module: 'andy',
  projectCards: {
       [CardName.RARE_MATERIAL_EXTRACTION_ANDY]: {Factory: RareMaterialExtraction, compatibility: 'turmoil'},
       [CardName.ONGOING_STUDY_ANDY]: {Factory: OngoingStudy, compatibility: 'pathfinders'},
  },

  preludeCards: {
    
  },

  corporationCards: {
    
  },
});
