import { axios, isLocal } from '../base';

/** Convenient passage */
export default class MSFW {
  static async getDynamicsOnDuty() {
    if (isLocal) {
      let res = await axios.get('./data/MingShengFuWu/DynamicsOnDuty.json');
      return res.data.data;
    }
  }
  static async getClassificationOfMedicalInstitutions() {
    if (isLocal) {
      let res = await axios.get('./data/MingShengFuWu/ClassificationOfMedicalInstitutions.json');
      return res.data.data;
    }
  }
  static async getPatientAgeStructure() {
    if (isLocal) {
      let res = await axios.get('./data/MingShengFuWu/PatientAgeStructure.json');
      return res.data.data;
    }
  }
  static async getEducationStatistics() {
    if (isLocal) {
      let res = await axios.get('./data/MingShengFuWu/EducationStatistics.json');
      return res.data.data;
    }
  }
  static async getDistribution() {
    if (isLocal) {
      let res = await axios.get('./data/MingShengFuWu/Distribution.json');
      return res.data.data;
    }
  }
  static async getTrend() {
    if (isLocal) {
      let res = await axios.get('./data/MingShengFuWu/Trend.json');
      return res.data.data;
    }
  }

  static async getElderly() {
    if (isLocal) {
      let res = await axios.get('./data/MingShengFuWu/Elderly.json');
      return res.data.data;
    }
  }
  static async getTrend_Data() {
    if (isLocal) {
      let res = await axios.get('./data/MingShengFuWu/Trend_Data.json');
      return res.data.data;
    }
  }
  static async getNursing() {
    if (isLocal) {
      let res = await axios.get('./data/MingShengFuWu/Nursing.json');
      return res.data.data;
    }
  }
  static async getStatistics() {
    if (isLocal) {
      let res = await axios.get('./data/MingShengFuWu/Statistics.json');
      return res.data.data;
    }
  }
  static async getUnemployment() {
    if (isLocal) {
      let res = await axios.get('./data/MingShengFuWu/Unemployment.json');
      return res.data.data;
    }
  }
  static async getAge() {
    if (isLocal) {
      let res = await axios.get('./data/MingShengFuWu/Age.json');
      return res.data.data;
    }
  }

  static async getCenden() {
    if (isLocal) {
      let res = await axios.get('./data/MingShengFuWu/Cenden.json');
      return res.data.data;
    }
  }
}
