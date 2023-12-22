//  * @Descripttion:   Customized visualized services
//  * @version: 3.3.4
//  * @Author: guanzhuyu
//  * @Date: 2022-10-11 11:21:13
//  * @LastEditors: kangzesheng
//  * @LastEditTime: 2023-01-12 13:25:25
import GisBase from "./GisBase";
/**Environment */
export default class Environment extends GisBase {
  constructor() {
    super("Environment");
  }

  //#region Scene related

  /**
   * Set scene time
   * @param {String} envTime Scene time HH:mm
   */
  changeEnvTime(envTime = new Date().format("hh:mm")) {
    window.appInstance.uniCall(
      "setEnvTime",
      {
        envTime: envTime,
        duration: 2,
      },
      (result) => {
        console.log("Set weather", result.result, result.message);
      }
    );
  }

  /**
   * Set weather
   * @param {String} weather Weather type rain snow sunny
   */
  changeEnvWeather(weather) {
    window.appInstance.uniCall(
      "setEnvWeather",
      {
        envWeather: weather,
      },
      (result) => {
        console.log("Set weather", result.result, result.message);
      }
    );
  }

  /**
   * Switch model(scene)
   * @param {string} sceneName Scene name ABuJiaBi,ABuJiaBi-L0,ABuJiaBi-ShiNei
   */
  switchScene(sceneName) {
    if (sceneName) {
      window.appInstance.uniCall("switchScene", {
        name: sceneName,
      });
    }
  }

  //#endregion

  //#region Real-time refresh testing

  envTimer = null;
  index = 20;

  changeEnvironment() {
    if (this.index++ >= 144) {
      this.index = 0;
    }
    let current =
      Math.floor((this.index * 30) / 60) + ":" + ((this.index * 30) % 60);
    this.log(current);
    window.appInstance.uniCall(
      "setEnvTime",
      {
        envTime: current,
        duration: 2,
      },
      (res) => {
        super.setCallBack("Set scene time", res);
      }
    );
  }
  autochangeEnvironment() {
    this.index = 0;
    this.stopChangeEnvironment();
    this.envTimer = setInterval(this.changeEnvironment.bind(this), 3000);
  }
  stopChangeEnvironment() {
    clearInterval(this.envTimer);
  }

  //#endregion
}
