import { getAAAAPI, postAAAAPI } from "../baseAPI";
import { getMiddleAPI, postMiddleAPI, getMiddleCommonAPI } from "../base";
import sign from "../../utils/common/sign";
/** Overall situation */
export default class ZSYYApi {
  static openid = null;
  static async getAAAToken() {
    if (!this.openid) {
      let body = new URLSearchParams();
      body.append("appId", "SjAfsVkwzYy2j513ftU2pNvKGwxudNdK");
      body.append(
        "appSecret",
        "BkSlt0fZ8IH5rQdaNhLFjJ7evXfyjCQDaGCSuKj9OtXQNas1uq782E5kUmQP7xe5O70KFcwt3fYkYHfD4EuolOkNcrYZBqf5T0fOAvMSFwn3YrNklsAJSg8BdnbL8cv8"
      );
      let data = await postAAAAPI("api/v2/auth/get-access-token", body);
      if (data && data.data && data.data.access_token) {
        this.openid = data.data.access_token;
      }
    }
  }
  static async getAAAData() {
    await this.getAAAToken();
    if (this.openid) {
      let data = await getAAAAPI("api/kenya/index", {
        access_token: this.openid,
      });
      return data;
    }
  }

  static async getLeaseOverviewData() {
    let res = await getMiddleCommonAPI(
      "0/service/IO_Lease_Overview",
      "IO_Lease_Overview",
      "aa80c5a4beb8049e69bd54d71b2b4591"
    );
    return res;
  }

  static async getPublicWifiData() {
    let res = await getMiddleCommonAPI(
      "0/service/IO_Public_Wifi",
      "IO_Public_Wifi",
      "c798e79b5702883dc5d4a837c6c45bf9"
    );
    return res;
  }

  static async getOperationalDataStatisticsData() {
    let res = await getMiddleCommonAPI(
      "0/service/IO_Operational_Data_Statistics",
      "IO_Operational_Data_Statistics",
      "d0dcc43721fd74d61852a823afe32f44"
    );
    return res;
  }

  static async getLandAreaOverviewData() {
    let res = await getMiddleCommonAPI(
      "0/service/IO_Land_Area_Overview",
      "IO_Land_Area_Overview",
      "2c06c521a76e1c8f0d08b19a38915bcf"
    );
    return res;
  }
}
