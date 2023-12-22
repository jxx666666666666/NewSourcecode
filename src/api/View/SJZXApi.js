/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-12-05 15:53:52
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-12-05 16:17:43
 * @FilePath: \NewSourcecode\src\api\View\SJZX.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {
  axios,
  isLocal,
  putNetEcoAPI,
  deleteNetEcoAPI,
  getNetEcoAPI,
  postNetEcoAPI,
} from "../base";
export default class SJZXApi {
  static openid = null;
  // Capacity Usage State

  static async getCapacityUsageStateData() {
    if (isLocal) {
      let res = await axios.get(
        "./data/ShuJuZhongXin/CapacityUsageStateData.json"
      );
      return res.data;
    }
  }
  // Power

  static async getPowerData() {
    if (isLocal) {
      let res = await axios.get("./data/ShuJuZhongXin/PowerData.json");
      return res.data;
    }
  }
  // Cooling

  static async getCoolingData() {
    if (isLocal) {
      let res = await axios.get("./data/ShuJuZhongXin/CoolingData.json");
      return res.data;
    }
  }
  // Space

  static async getSpaceData() {
    if (isLocal) {
      let res = await axios.get("./data/ShuJuZhongXin/SpaceData.json");
      return res.data;
    }
  }
  // Energy

  static async getEnergyData() {
    if (isLocal) {
      let res = await axios.get("./data/ShuJuZhongXin/EnergyData.json");
      return res.data;
    }
  }
  //  IT Device Status

  static async getDeviceStatusData() {
    if (isLocal) {
      let res = await axios.get("./data/ShuJuZhongXin/DeviceStatusData.json");
      return res.data;
    }
  }
  // Trend of Total Number of IT...

  static async getTotalNumberData() {
    if (isLocal) {
      let res = await axios.get("./data/ShuJuZhongXin/TotalNumberData.json");
      return res.data;
    }
  }
  // IT Device

  static async getITDeviceData() {
    if (isLocal) {
      let res = await axios.get("./data/ShuJuZhongXin/ITDeviceData.json");
      return res.data;
    }
  }
  // Facility

  static async getFacilityData() {
    if (isLocal) {
      let res = await axios.get("./data/ShuJuZhongXin/FacilityData.json");
      return res.data;
    }
  }

  // Monitoring

  static async getmonitoringData() {
    if (isLocal) {
      let res = await axios.get("./data/ShuJuZhongXin/monitoringData.json");
      return res.data;
    }
  }
  // Alarms By Device Type

  static async getByDeviceData(params) {
    if (isLocal) {
      let res = await axios.get("./data/ShuJuZhongXin/ByDeviceData.json");
      return res.data[params];
    }
  }
  // Alarms By Severity

  static async getBySeverityData(params) {
    if (isLocal) {
      let res = await axios.get("./data/ShuJuZhongXin/BySeverityData.json");
      return res.data[params];
    }
  }
  // Access Event

  static async getAccessEventData() {
    if (isLocal) {
      let res = await axios.get("./data/ShuJuZhongXin/AccessEventData.json");
      return res.data;
    }
  }
  // Environment

  static async getEnvironmentData() {
    if (isLocal) {
      let res = await axios.get("./data/ShuJuZhongXin/EnvironmentData.json");
      return res.data;
    }
  }
  // login NetEco
  static async loginNetEco() {
    if (!this.openid) {
      let data = await putNetEcoAPI("rest/openapi/sm/session", {
        userid: window.streamingConfig.NetEcoUserName,
        value: window.streamingConfig.NetEcoPassWord,
        ipaddr: "",
      });
      if (data && data.data) {
        this.openid = data.data;
      }
    }
  }
  // logout NetEco
  static async logoutNetEco() {
    if (this.openid) {
      let data = await deleteNetEcoAPI(
        "rest/openapi/sm/session",
        {},
        this.openid
      );
      if (data && data.code === 0) {
        this.openid = null;
      }
    }
  }
  // get Object tree
  static async getMoTree(params) {
    await this.loginNetEco();
    if (this.openid) {
      let data = await getNetEcoAPI(
        "rest/openapi/neteco/nbi/v2/mo",
        {},
        {
          openid: this.openid,
          params: params,
        }
      );
      return data;
    }
  }

  // get energy analysis
  static async getEnergyAnalysis(params) {
    await this.loginNetEco();
    if (this.openid) {
      let data = await postNetEcoAPI(
        "rest/openapi/energy/v3/energy-analysis/sync-job",
        params,
        {
          openid: this.openid,
        }
      );
      return data.data;
    }
  }
  // get capacity data
  static async getCapacitySpcn(params) {
    8;
    await this.loginNetEco();
    if (this.openid) {
      let data = await postNetEcoAPI(
        "rest/openapi/capacity/v1/operation/capacity-spcn",
        params,
        {
          openid: this.openid,
        }
      );
      return data;
    }
  }

  //Query capacity statistics report
  static async getCapacityStatistics(params) {
    await this.loginNetEco();
    if (this.openid) {
      let data = await getNetEcoAPI(
        "rest/openapi/capacity/v3/capacity-report/statistics",
        {},
        {
          openid: this.openid,
          params: params,
        }
      );
      return data;
    }
  }

  static async getITDevice(params) {
    await this.loginNetEco();
    if (this.openid) {
      let data = await getNetEcoAPI(
        "rest/openapi/asset/v3/asset-report/statistics",
        {},
        {
          openid: this.openid,
          params: params,
        }
      );
      return data;
    }
  }

  static async getAccessEvent(params) {
    await this.loginNetEco();
    if (this.openid) {
      let data = await getNetEcoAPI(
        "rest/openapi/neteco/nbi/v2/access/event",
        {},
        {
          openid: this.openid,
          params: params,
        }
      );
      return data;
    }
  }

  //Query capacity data
  static async getCapacityData(params) {
    await this.loginNetEco();
    if (this.openid) {
      let data = await getNetEcoAPI(
        "rest/openapi/neteco/capacity",
        {},
        {
          openid: this.openid,
          params: params,
        }
      );
      return data;
    }
  }

  //Query alarm data
  static async getAlarmCurrent(params) {
    await this.loginNetEco();
    if (this.openid) {
      let data = await getNetEcoAPI(
        "rest/openapi/neteco/nbi/v2/alarm/current",
        {},
        {
          openid: this.openid,
          params: params,
        }
      );
      return data;
    }
  }
}
