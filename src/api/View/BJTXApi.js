import { axios, isLocal } from '../base';

/** Convenient passage */
export default class BJTXApi {
  /**
   * Example method
   * @param {Object} params Parameter, can be empty
   */
  async getBJTXData(params) {
    if (isLocal) {
      //Local JSON
      let res = await axios.get('jsonPath');
      return res.data;
    } else {
      //On site interface
    }
  }
}
