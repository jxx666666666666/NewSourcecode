import { axios, isLocal } from '../base';
export default class LDZFApi {
  static async getDynamicsOnDutyData () {
    if (isLocal) {
      let res = await axios.get('./data/LDZF/DynamicsOnDuty.json')
      return res.data.data
    }
  }
  static async getIncidentReportInfo () {
    if (isLocal) {
      let res = await axios.get('./data/LDZF/IncidentReportInfo.json')
      return res.data.data
    }
  }
  static async getIncidentReportInfoinfoList () {
    if (isLocal) {
      let res = await axios.get('./data/LDZF/getIncidentReportInfoinfoList.json')
      return res.data
    }
  }

  static async getRegionalDistributionReported (params) {
    if (isLocal) {
      let res = await axios.get('./data/LDZF/RegionalDistributionReported.json')
      return res.data[params]
    }
  }
  static async getTimeDistributionReportedIncidents (params) {
    if (isLocal) {
      let res = await axios.get('/data/LDZF/TimeDistributionReportedIncidents.json')
      return res.data[params]
    }
  }
  static async getCenterData (params) {
    if (isLocal) {
      let res = await axios.get('/data/LDZF/centerData.json')
      return res.data.data
    }
  }
}