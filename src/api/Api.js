import { axios } from './base'
//todo Write the corresponding API methods according to the topic, and note that the method names for each topic cannot be duplicated
import BJTXApi from './View/BJTXApi'
import ZHAFApi from './View/ZHAFApi'
import ZTTSApi from './View/ZTTSApi'
import LDZFApi from './View/LDZFApi'
import MSFW from './View/MSFW'
import SJZXApi from './View/SJZXApi'
import ZSYYApi from './View/ZSYYApi'
import GGAQApi from './View/GGAQApi'
let baseUrl = '/newretail'

class Api {
  //#region singleton
  constructor() {}

  static instance = null
  static getInstance() {
    if (this.instance == null) {
      this.instance = new Api()
      this.instance.init()
    }
    return this.instance
  }

  init() {
    this.copyMethods(BJTXApi, this)
    this.copyMethods(ZHAFApi, this)
    this.copyMethods(ZTTSApi, this)
  }

  /**
   * Assign prototype methods of one class to another class
   * @param {*} fromClass
   * @param {*} toClass
   */
  copyMethods(fromClass, toClass) {
    let keys = Object.getOwnPropertyNames(fromClass.prototype)
    keys.forEach((key) => {
      if (
        key != 'constructor' &&
        typeof fromClass.prototype[key] == 'function'
      ) {
        toClass[key] = fromClass.prototype[key]
      }
    })
  }

  //#endregion

  /**
   * getData
   * @param {string} jsonPath JSON data address
   */
  async getData(jsonPath) {
    let res = await axios.get(jsonPath)
    return res.data
  }
  /**
   * getData
   * @param {string} jsonPath JSON data address
   */
  async getJsonData(jsonPath) {
    let res = await axios.get(jsonPath)
    return res.data.RECORDS
  }
}

let apiList = Api.getInstance()

export default {
  apiList,
  LDZFApi,
  MSFW,
  SJZXApi,
  ZSYYApi,
  GGAQApi
}
// export default apiList
