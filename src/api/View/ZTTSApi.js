import { axios, isLocal } from '../base';

/** Overall situation */
export default class ZTTSApi {
  /**
   * Example method
   * @param {Object} params Parameter, can be empty
   */
  async getZTTSData(params) {
    if (isLocal) {
      //Local JSON
      let res = await axios.get('jsonPath');
      return res.data;
    } else {
      //On site interface
    }
  }
}
