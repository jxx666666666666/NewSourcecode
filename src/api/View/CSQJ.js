import { axios, isLocal } from "../base";
export default class CSQJApi {
  static async getTrafficAwareness() {
    if (isLocal) {
      let res = await axios.get("./data/CSQJ/TrafficAwareness.json");
      return res.data.data;
    }
  }
  static async geturbanCongestionData(params) {
    if (isLocal) {
      let res = await axios.get("./data/CSQJ/urbanCongestionData.json");
      return res.data[params];
    }
  }
  static async geturbanCongestionList(params) {
    if (isLocal) {
      let res = await axios.get("./data/CSQJ/urbanCongestionList.json");
      return res.data[params];
    }
  }
  static async getRescueForceAnalysis() {
    if (isLocal) {
      let res = await axios.get("./data/CSQJ/RescueForceAnalysis.json");
      return res.data.data;
    }
  }
  static async getRiskWarningAnalysis() {
    if (isLocal) {
      let res = await axios.get("./data/CSQJ/RiskWarningAnalysis.json");
      return res.data.data;
    }
  }
  static async getIncidentReceptionData(params) {
    if (isLocal) {
      let res = await axios.get("./data/CSQJ/IncidentReceptionData.json");
      return res.data[params];
    }
  }
  static async getMacroeconomicAnalysis(params) {
    if (isLocal) {
      let res = await axios.get("./data/CSQJ/MacroeconomicAnalysis.json");
      return res.data[params];
    }
  }
  static async getSalesSocial(params) {
    if (isLocal) {
      let res = await axios.get("./data/CSQJ/SalesSocial.json");
      return res.data[params];
    }
  }
  static async getImportExportVolume(params) {
    if (isLocal) {
      let res = await axios.get("./data/CSQJ/ImportExportVolume.json");
      return res.data[params];
    }
  }
  static async getPublicSecurityIncident(params) {
    if (isLocal) {
      let res = await axios.get("./data/CSQJ/PublicSecurityIncident.json");
      return res.data[params];
    }
  }
  static async getPublicHealth(params) {
    if (isLocal) {
      let res = await axios.get("./data/CSQJ/PublicHealth.json");
      return res.data[params];
    }
  }
  static async getDirectLoss(params) {
    if (isLocal) {
      let res = await axios.get("./data/CSQJ/DirectLoss.json");
      return res.data[params];
    }
  }
  static async getCenterData() {
    if (isLocal) {
      let res = await axios.get("./data/CSQJ/getCenterData.json");
      return res.data.data;
    }
  }
}
