import axios from "axios";
import sign from "../utils/common/sign";
axios.defaults.timeout = 60000;
let isLocal = true;

export { axios, isLocal };

const Weather_Base_URL = "/weatherApi";
const NetEco_Base_URL = "/netecoApi";
const middle_Base_URL = "/middleApi"; //Middle platform
export async function getWeatherAPI(url, params) {
  let install = axios.create({
    baseURL: Weather_Base_URL, // 地址
    timeout: 60000, // 请求超时
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

export async function putNetEcoAPI(url, params) {
  let install = axios.create({
    baseURL: NetEco_Base_URL, // 地址
    timeout: 60000, // 请求超时
    headers: {},
  });

  return new Promise((resolve, reject) => {
    install
      .put(url, params)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
}

export async function deleteNetEcoAPI(url, params, openid) {
  let install = axios.create({
    baseURL: NetEco_Base_URL, // 地址
    timeout: 60000, // 请求超时
    headers: {
      openid: openid,
    },
  });

  return new Promise((resolve, reject) => {
    install
      .delete(url, {
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

export async function getNetEcoAPI(url, params, header) {
  let install = axios.create({
    baseURL: NetEco_Base_URL, // 地址
    timeout: 60000, // 请求超时
    headers: header,
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
export async function postNetEcoAPI(url, params, header) {
  let install = axios.create({
    baseURL: NetEco_Base_URL, // 地址
    timeout: 60000, // 请求超时
    headers: header,
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

export async function getMiddleAPI(url, params, header) {
  let install = axios.create({
    baseURL: middle_Base_URL, // 地址
    timeout: 60000, // 请求超时
    headers: header,
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
/**
 * get middle platform data
 * @param {*} url
 * @param {*} method
 * @param {*} securityStr
 * @param {*} username
 * @returns
 */
export async function getMiddleCommonAPI(
  url,
  method,
  securityStr,
  username = "devlop_test"
) {
  let header = {
    username: username,
    method: method,
    timestamp: new Date().getTime(),
    sign: "",
  };
  header.sign = sign.getSign(
    header.username,
    header.method,
    header.timestamp,
    securityStr
  );

  let install = axios.create({
    baseURL: middle_Base_URL, // 地址
    timeout: 60000, // 请求超时
    headers: header,
  });

  return new Promise((resolve, reject) => {
    install
      .get(url, {
        params: {
          currentPage: 1,
        },
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
}

export async function postMiddleAPI(url, params, header) {
  let install = axios.create({
    baseURL: middle_Base_URL, // 地址
    timeout: 60000, // 请求超时
    headers: header,
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
