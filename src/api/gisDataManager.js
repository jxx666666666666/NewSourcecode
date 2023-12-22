import api from './Api'
import store from '@/store/index'
import BaseGisData from './Gis/BaseGisData'
import ZHDGGisData from './Gis/ZHDGGisData'
import GGAQGisData from './Gis/GGAQGisData'
import ZSYYGisData from './Gis/ZSYYGisData'
import JTYYGisData from './Gis/JTYYGisData'
import SJZXGisData from './Gis/SJZXGisData'
import LDZHGisData from './Gis/LDZHGisData'
import MSFWGisData from './Gis/MSFWGisData'
import CSQJGisData from './Gis/CSQJGisData'
import Time from '@/utils/common/time'

export default class GisDataManager {
  /** getData
   * @param {string} jsonPath JSON data address
   */
  static async getJsonData(jsonPath, callback) {
    let res = api.getJsonData(jsonPath)
    res.then((data) => {
      callback && callback(data)
    })
  }

  /** getData */
  static getData(layer, callback) {
    if (window.layerConfigs.commonKeys.includes(layer.scatterType)) {
      this.getCommonData(layer, callback)
    } else {
      this.getTopicData(layer, callback)
    }
  }

  static getCommonData(layer, callback) {
    //Common Layer
    switch (layer.scatterType) {
    }
  }

  static getTopicData(layer, callback) {
    //Theme Layer
    let topic = store.state.topic
    switch (topic) {
      case 'zhihuidenggan':
        ZHDGGisData.getData(layer, callback)
        break
      case 'gonggonganquan':
        GGAQGisData.getData(layer, callback)
        break
      case 'zhaoshangyunxing':
        ZSYYGisData.getData(layer, callback)
        break
      case 'jiaotongyunxing':
        JTYYGisData.getData(layer, callback)
        break
      case 'shujuzhongxin':
        SJZXGisData.getData(layer, callback)
        break
      case 'liandongzhihui':
        LDZHGisData.getData(layer, callback)
        break
      case 'MingShengFuWu':
        MSFWGisData.getData(layer, callback)
        break
      case 'ChengShiQuanJing':
        CSQJGisData.getData(layer, callback)
        break
      default:
        GGAQGisData.getData(layer, callback)
        break
    }
  }

  /** getData */
  static getQXData(layer, callback) {
    BaseGisData.getLocal(layer, callback)
  }
}
