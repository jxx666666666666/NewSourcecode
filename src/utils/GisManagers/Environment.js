import GisBase from './GisBase';
/**environment */
export default class Environment extends GisBase {
  constructor() {
    super('environment');
  }

  //#region Scenario related

  /**
   * Set scene time
   * @param {String} envTime Scene time  HH:mm
   */
  changeEnvTime(envTime = new Date().format('hh:mm')) {
    window.appInstance.uniCall(
      'setEnvTime',
      {
        envTime: envTime,
        duration: 2,
      },
      (result) => {
        console.log('Set Weather', result.result, result.message);
      }
    );
  }

  /**
   * Set Weather
   * @param {String} weather Weather rain snow sunny
   */
  changeEnvWeather(weather) {
    window.appInstance.uniCall(
      'setEnvWeather',
      {
        envWeather: weather,
      },
      (result) => {
        console.log('Set Weather', result.result, result.message);
      }
    );
  }

  /**
   * Switch Model (Scene)
   * @param {string} sceneName Scene Name  ABuJiaBi,ABuJiaBi-L0,ABuJiaBi-ShiNei
   */
  switchScene(sceneName) {
    if (sceneName) {
      window.appInstance.uniCall('switchScene', {
        name: sceneName,
      });
    }
  }

  //#endregion

  //#region Real time refresh test

  envTimer = null;
  index = 20;

  changeEnvironment() {
    if (this.index++ >= 144) {
      this.index = 0;
    }
    let current =
      Math.floor((this.index * 30) / 60) + ':' + ((this.index * 30) % 60);
    this.log(current);
    window.appInstance.uniCall(
      'setEnvTime',
      {
        envTime: current,
        duration: 2,
      },
      (res) => {
        super.setCallBack('Set scene time', res);
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
