import { axios, isLocal } from '../base'
import BaseGisData from './BaseGisData'

/** traffic operation */
export default class MSFWGisData {
  static getData(layer, callback) {
    switch (layer.scatterType) {
      case 'Hospital':
      case 'School':
      case 'Nursing Home':
      case 'Police Station':
      case 'Government Agency':
        BaseGisData.getLocal(layer, callback)
        break
      case 'Smart Lamp Pole/lamp':
      case 'DengganIcon':
        BaseGisData.getModelData(layer, callback)
    }
  }
}
