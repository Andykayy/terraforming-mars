import {CardName} from '../../../common/cards/CardName';
import {ModuleManifest} from '../ModuleManifest';
import { GhgShipment } from './GhgShipment';

export const ANDY_CARD_MANIFEST = new ModuleManifest({
  module: 'andy',
  projectCards: {
       [CardName.GHG_SHIPMENT]: {Factory: GhgShipment, compatibility: 'turmoil'},
  },

  preludeCards: {
    
  },

  corporationCards: {
    
  },
});
