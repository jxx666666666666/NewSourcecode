import { axios, isLocal } from '../base';
import BaseGisData from './BaseGisData';

/** Investment Promotion Operations */
export default class ZSYYGisData {
    static getData(layer, callback) {
        switch (layer.scatterType) {

            case 'Leased Place Locations':
            case 'Device Alarm':
            case 'Police Situation':
            case 'Key Project':
            case 'Camera':
            case 'Enterprise':
            case 'Alarm':
            case 'Pilot community':
            case 'weather sensor':
            case 'Smart Light Pole Weather Sensor':
            case 'import_marks':
            case '告警点位':
                BaseGisData.getLocal(layer, callback);
                break;
            case 'Smart Lamp Pole/lamp':
            case 'DengganIcon':
                BaseGisData.getModelData(layer, callback);
                break;
        }
    }
}