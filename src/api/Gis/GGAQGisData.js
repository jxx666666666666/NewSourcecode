import { axios, isLocal } from '../base'
import BaseGisData from './BaseGisData'

/** Public safety */
export default class GGAQGisData {
  static getData(layer, callback) {
    switch (layer.scatterType) {
      case 'Shelter':
      case 'Enterprise':
      case 'Camera':
      case 'import_marks':
      case 'Smart Light Pole Weather Sensor':
      case 'Key Project':
      case 'Security Incident':
      case 'Police Situation':
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
      case '告警点位':
      case 'Shelter':
      case 'Enterprise':
      case 'Camera':
      case 'import_marks':
      case 'Smart Light Pole Weather Sensor':
      case 'Key Project':
      case 'Security Incident':
      case 'Police Situation':
      case 'Device Alarm':
      case 'Camera':
      case 'Smart Light Pole Weather Sensor':
      case 'import_marks':
      case 'onLineLamp':
      case 'offLineLamp':
      case 'onLineAdvertisement':
      case 'offLineAdvertisement':
      case 'planLamp':
      case 'planAdvertisement':
      case '告警点位':
      case 'Parking Lot':
      case 'Checkpoint':
      case 'Traffic Incident':
      case 'Air Conditioner':
      case 'FusionModule':
      case 'Temperature Sensor':
      case 'Humidity Sensor':
      case 'Camera':
      case 'import_marks':
        BaseGisData.getLocal(layer, callback)
        break
      case 'Smart Lamp Pole/lamp':
      case 'DengganIcon':
        BaseGisData.getModelData(layer, callback)
        break

      default:
        BaseGisData.getLocal(layer, callback)
        break
    }
  }
}
