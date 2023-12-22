import { axios, isLocal } from '../base';

/** Comprehensive security */
export default class ZHAFApi {
  /**
   * Example method
   * @param {Object} params Parameter, can be empty
   */
  async getZHAFData(params) {
    if (isLocal) {
      //Local JSON
      let res = await axios.get('jsonPath');
      return res.data;
    } else {
      //On site interface
    }
  }
}
