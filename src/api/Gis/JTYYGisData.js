import { axios, isLocal } from '../base';
import BaseGisData from './BaseGisData';

/** traffic operation */
export default class JTYYGisData {
    static getData(layer, callback) {
        switch (layer.scatterType) {
            case 'Parking Lot':
            case 'Checkpoint':
            case 'Traffic Incident':
            case 'Camera':
            case 'import_marks':
                BaseGisData.getLocal(layer, callback);
                break;
            case 'DengganIcon':
                BaseGisData.getModelData(layer, callback);
                break;
        }
    }
}