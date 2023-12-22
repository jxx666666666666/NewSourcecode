import { axios, isLocal } from '../base';
import BaseGisData from './BaseGisData';

/** Overall situation */
export default class ZTTSGisData {
  static getData (layer, callback) {
    switch (layer.scatterType) {
      case 'Device Alarm':
      case 'Camera':
      case 'Advertisement Displa':
      case 'Smart Light Pole Weather Sensor':
      case 'import_marks':
      case 'onLineLamp':
      case 'offLineLamp':
      case 'onLineAdvertisement':
      case 'offLineAdvertisement':
      case 'planLamp':
      case 'planAdvertisement':
      case 'dataCenter':
      case '告警点位':
      case "AlarmPoints":
        BaseGisData.getLocal(layer, callback);
        break;
      case 'Smart Lamp Pole/lamp':
      case 'DengganIcon':
        BaseGisData.getModelData(layer, callback);
        break;
    }
  }
}