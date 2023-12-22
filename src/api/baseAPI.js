//  * @Descripttion:  Data access component
//  * @version: 3.3.4
//  * @Author: guanzhuyu
//  * @Date: 2022-12-21 15:21:13
//  * @LastEditors: kangzesheng
//  * @LastEditTime: 2023-02-12 17:55:25
import axios from "axios";
axios.defaults.timeout = 60000;
const BASE_URL = "/baseUrl";
const IVSUrl = "IVSUrl";
const PublicTransport_Base_URL = "/PublicTransit";
const Weather_Base_URL = "/weatherApi";
const RomaUrl = "RomaUrl";
const AAAApi = "aaaApi";
export default axios;
export async function getWeatherAPI(url, params) {
  let install = axios.create({
    baseURL: Weather_Base_URL, // address
    timeout: 60000, // request timeout
    headers: {},
  });

  return new Promise((resolve, reject) => {
    install
      .get(url, {
        params: params,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
}

export async function getAPI(url, params) {
  let token = await getToken();

  let install = axios.create({
    baseURL: BASE_URL, // address
    timeout: 5000, // request timeout
    headers: {
      authentication: "Bearer " + token.data.auth_token,
      "x-group-uuid": token.data.x_group_uuid,
      "API-ID": "huawei_dev_20221115",
      "API-TIMESTAMP": API_TIMESTAMP,
      "API-SIGNATURE": API_SIGNATURE,
    },
  });

  return new Promise((resolve, reject) => {
    install
      .get(url, {
        params: params,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
}
export async function getPublicTransportAPI(url, Params) {
  let GETInstall = axios.create({
    baseURL: PublicTransport_Base_URL, // address
    timeout: 50000, // request timeout
    headers: {
      "Content-Type": "application/json",
    },
  });
  return new Promise((resolve, reject) => {
    GETInstall.get(url, {
      params: Params,
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
}

export async function IVSPost(url, Params) {
  let data = await IVSLogin("loginInfo/login/v1.0");

  let tokenInstall = axios.create({
    baseURL: IVSUrl, // address
    timeout: 60000, // request timeout
    withCredentials: true,
  });

  return new Promise((resolve, reject) => {
    tokenInstall
      .post(url, Params)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export async function IVSLogin(url) {
  let tokenInstall = axios.create({
    baseURL: IVSUrl, // address
    timeout: 60000, // request timeout
    withCredentials: true,
  });

  let loginParams = {
    userName: window.streamingConfig.IVSUserName,
    password: window.streamingConfig.IVSPassWord,
  };
  return new Promise((resolve, reject) => {
    tokenInstall
      .post(url, loginParams)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
}

export async function romaGet(url, Params) {
  Params.appKey = "akjsdfiuwfksfvds";
  let tokenInstall = axios.create({
    baseURL: RomaUrl, // address
    timeout: 5000, // request timeout
    headers: {
      "Content-Type": "application/json",
    },
  });

  return new Promise((resolve, reject) => {
    tokenInstall
      .get(url, {
        params: Params,
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
}

export async function getAAAAPI(url, params) {
  let install = axios.create({
    baseURL: AAAApi, // 地址
    timeout: 60000
  });

  return new Promise((resolve, reject) => {
    install
      .get(url, {
        params: params,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
}
export async function postAAAAPI(url, params) {
  let install = axios.create({
    baseURL: AAAApi, // 地址
    timeout: 60000
  });

  return new Promise((resolve, reject) => {
    install
      .post(url, params)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
}
