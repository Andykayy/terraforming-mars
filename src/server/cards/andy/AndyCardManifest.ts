import {CardName} from '../../../common/cards/CardName';
import {ModuleManifest} from '../ModuleManifest';
import {GhgShipmentAndy } from './GhgShipment';

export const ANDY_CARD_MANIFEST = new ModuleManifest({
  module: 'andy',
  projectCards: {
       [CardName.GHG_SHIPMENT_ANDY]: {Factory: GhgShipmentAndy, compatibility: 'turmoil'},
  },

  preludeCards: {
    
  },

  corporationCards: {
    
  },
});
