import { axios, isLocal } from '../base'
import BaseGisData from './BaseGisData'

/** traffic operation */
export default class CSQJGisData {
  static getData(layer, callback) {
    switch (layer.scatterType) {
      case 'Camera Location':
      case 'Public Security Police Situation Point':
      case 'Alarm Event Point':
      case 'Historical Event Point':
      case 'Enterprise Location':
        BaseGisData.getLocal(layer, callback)
        break
      case 'Smart Lamp Pole/lamp':
      case 'DengganIcon':
        BaseGisData.getModelData(layer, callback)
        break
      case 'GDPColumnLayer':
        BaseGisData.get3DColumnLayer(layer, callback)
        break
    }
  }
}
