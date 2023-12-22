import { getMiddleAPI, postMiddleAPI, getMiddleCommonAPI } from "../base";

/** Overall situation */
export default class ZTTSApi {
  static async getAlarmModeData() {
    let res = await getMiddleCommonAPI(
      "0/service/Number_of_Alarm_way_Modes",
      "Number_of_Alarm_way_Modes",
      "57e3935b308745707fbb59a567fca1f9"
    );
    return res;
  }

  static async getAlarmAnalysisData() {
    let res = await getMiddleCommonAPI(
      "0/service/Alarm_Type_Analysis_of_the_Month",
      "Alarm_Type_Analysis_of_the_Month",
      "ac3abb07c7911c78fa3f8f272a516028"
    );
    return res;
  }

  static async getAlarmTrendData() {
    let res = await getMiddleCommonAPI(
      "0/service/Alarm_Quantity_Change_Trend",
      "Alarm_Quantity_Change_Trend",
      "88f1122ba7ef45b7213bed2720288b7f"
    );
    return res;
  }

  static async getAlarmStatisticsData() {
    let res = await getMiddleCommonAPI(
      "0/service/Top_Alarm_Type_Statistics_of_the_Month",
      "Top_Alarm_Type_Statistics_of_the_Month",
      "80aa6923396ef83b7b523ca765c947e5"
    );
    return res;
  }

  static async getAlarmCurrentDayData() {
    let res = await getMiddleCommonAPI(
      "0/service/Alarm_list_of_the_current_day",
      "Alarm_list_of_the_current_day",
      "1aa359c115a16a3449b98175159be730"
    );
    return res;
  }

  static async getCenterData() {
    let res = await getMiddleCommonAPI(
      "0/service/public_safety_center_data",
      "public_safety_center_data",
      "0dd5ee206bb481a3145a5dc5567c355b"
    );
    return res;
  }

  static async getSafetyMonitoringData() {
    let res = await getMiddleCommonAPI(
      "0/service/Safety_Monitoring_of_Key_Projects",
      "Safety_Monitoring_of_Key_Projects",
      "00a5d4316de9ab26658cb00717ff8ffb"
    );
    return res;
  }

  static async getAnalysisgProjectsData() {
    let res = await getMiddleCommonAPI(
      "0/service/AnalysisOfTheTypesOfProjectsUnderConstruction",
      "AnalysisOfTheTypesOfProjectsUnderConstruction",
      "870c9b3f668a1376428e71c7218cd535"
    );
    return res;
  }

  static async getEnvironmentalMonitoringData() {
    let res = await getMiddleCommonAPI(
      "0/service/Environmental_Monitoring",
      "Environmental_Monitoring",
      "f8d0a152981a2cda9e1fe748a00eedf0"
    );
    return res;
  }

  static async getAveragePMData() {
    let res = await getMiddleCommonAPI(
      "0/service/Average_PM2_concentration",
      "Average_PM2_concentration",
      "3dc9085b124f582ce4065f51cc34bbf6"
    );
    return res;
  }

  static async getRegionalAmbientNoiseData() {
    let res = await getMiddleCommonAPI(
      "0/service/Regional_ambient_noise",
      "Regional_ambient_noise",
      "7440357d4307b177c6280e55ab490f68"
    );
    return res;
  }
}
