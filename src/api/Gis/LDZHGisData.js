import { axios, isLocal } from '../base'
import BaseGisData from './BaseGisData'

/** traffic operation */
export default class LDZHGisData {
  static getData(layer, callback) {
    switch (layer.scatterType) {
      case 'Camera':
      case 'Event Point':
      case 'Risks Points':
      case 'Protection Target':
      case 'Alarm Event':
      case 'Shelter':
      case 'Security Circle':
      case 'Emergency Material':
        BaseGisData.getLocal(layer, callback)
        break
      case 'Smart Lamp Pole/lamp':
      case 'DengganIcon':
        BaseGisData.getModelData(layer, callback)
        break
      case 'Expert Team':
      case 'Fire Truck':
      case 'Ambulance':
      case 'Transport Vehicle':
      case 'Police':
      case 'Firefighter':
      case 'Medical Personnel':
        BaseGisData.getTrailData(layer, callback)
        break
    }
  }
}
