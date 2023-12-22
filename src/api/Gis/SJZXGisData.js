import { axios, isLocal } from '../base'
import BaseGisData from './BaseGisData'

/** traffic operation */
export default class SJZXGisData {
  static getData(layer, callback) {
    switch (layer.scatterType) {
      case 'Camera':
      case 'Device Alarm':
      case 'Air Conditioner':
      case 'FusionModule':
      case 'Temperature Sensor':
      case 'Humidity Sensor':
      case 'AlarmPoints':
        BaseGisData.getLocal(layer, callback)
        break
      case 'Smart Lamp Pole/lamp':
      case 'DengganIcon':
        BaseGisData.getModelData(layer, callback)
        break
    }
  }
}
