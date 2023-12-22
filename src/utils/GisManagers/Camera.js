import GisBase from "./GisBase";
/* global _ */

/**camera */
export default class Camera extends GisBase {
  constructor() {
    super("camera");
  }

  /**
   * Set the scene lens perspective
   * @param {string} cameraName configuration
   * @param {number} duration Configure numerical flight seconds
   */
  setCameraByName (cameraName, duration, callback) {
    // if (window.layerConfigs.currentCameraName == cameraName) {
    //   return;
    // }
    let cameraInfo = window.layerConfigs.cameraInfos.get(cameraName).info;
    let temp = _.clone(cameraInfo);
    if (duration) {
      temp.fly = true;
      temp.duration = duration;
    }
    if (cameraInfo) {
      window.appInstance.uniCall("setCamera", temp, (res) => {
        super.setCallBack("Set the scene lens perspective", cameraName, res);
        callback && callback(res.result);
        window.layerConfigs.currentCameraName = cameraName;
      });
    }
  }

  /**
   * Set the scene lens perspective
   * @param {Object} config configuration
   */
  setCamera (config, callback) {
    let temp = {
      centerCoord: [37.185822, -1.692009],
      coordType: 0,
      coordTypeZ: 0,
      coordZ: 0,
      distance: 1223,
      heading: 206,
      pitch: 9,
      fly: true,
      duration: 1,
    };
    if (config) {
      temp = config;
    } else {
      if (this.currentView) {
        temp = this.currentView;
      }
    }
    window.appInstance.uniCall("setCamera", temp, (res) => {
      super.setCallBack("Set the scene lens perspective", res);
      callback && callback(res.result);
    });
  }

  /**递归设置场景直至成功 */
  setCameraSuccess (config, callback) {
    window.appInstance.uniCall("setCamera", config, (res) => {
      if (res.result) {
        super.setCallBack("Set the scene lens perspective", res);
        callback && callback(res.result);
      } else {
        this.setCameraSuccess(config, callback);
      }
    });
  }

  currentView = "";
  /**Obtain the current perspective */
  getCameraInfo (callback) {
    this.currentView = "";
    return window.appInstance.uniCall("getCameraInfo", {}, (res) => {
      let config = {
        coordType: 0,
        coordTypeZ: 0,
      };
      super.copyObject(res, config, [
        "centerCoord",
        "coordZ",
        "distance",
        "heading",
        "pitch",
      ]);
      this.currentView = config;
      super.setCallBack("Obtain the current perspective", res);
    });
  }

  /**
   * Focus on Architecture
   * @param {Object} config configuration
   */
  focusBuilding (config) {
    let temp = { buildingId: "building0001", distance: 100 };
    if (config) {
      temp = config;
    }
    window.appInstance.uniCall("focusBuilding", temp, (res) => {
      super.setCallBack("Focus on Architecture", res);
    });
  }

  /**
   * Focus on floors
   * @param {Object} config configuration
   */
  focusFloor (config) {
    let temp = { buildingId: "building0001", floor: 3, distance: 100 };
    if (config) {
      temp = config;
    }
    window.appInstance.uniCall("focusFloor", temp, (res) => {
      super.info("Focus on floors", res);
    });
  }

  /**
   * Focus on the room
   * @param {Object} config configuration
   */
  focusRoom (config) {
    let temp = {
      buildingId: "building0001",
      floor: 3,
      room: "room0001",
      distance: 100,
    };
    if (config) {
      temp = config;
    }
    window.appInstance.uniCall("focusRoom", temp, (res) => {
      super.setCallBack("Focus on the room", res);
    });
  }

  /**
   * Camera surround
   * @param {Object} config configuration
   */
  setCameraRotate (config) {
    let jsonData = {
      enabled: true, // Enable camera to fly around the target
      duration: 10, // The number of seconds required to fly for a week, the higher the value, the slower the flight
      direction: "clockwise", // The number of seconds required for one week of flight, the larger the value, the slower the flight direction. Clockwise is clockwise, and counterclockwise is counterclockwise
    };
    if (config) {
      jsonData = config;
    }
    window.appInstance.uniCall("rotateCamera", jsonData, (result) => {
      super.log("surround:", result.message);
    });
  }

  restrictCamera (callback) {
    window.appInstance.uniCall("getBaseCenter", {}, (res) => {
      if (res.result == 1) {
        let jsonData = {
          center: [res.originLon, res.originLat],
          coordType: 0,
          coordTypeZ: 0,
          limitYaw: [0, 359],
          limitPitch: [5, 89],
          limitCoordZ: [50, 1000],
          limitDistance: [1600, 7000],
          radius: 10000,
        };
        window.appInstance.uniCall("restrictCamera", jsonData, (res1) => {
          window.appInstance.uniCall(
            "setCameraRestrictionState", {
            state: "restricted",
          },
            (res2) => {
              super.log("limitation:", res2.message);
              callback && callback(res2.result);
            }
          );
        });
      }
    });
  }
  restrictCameraInfo (info) {
    window.appInstance.uniCall("restrictCamera", info, (res1) => {
      window.appInstance.uniCall(
        "setCameraRestrictionState", {
        state: "restricted",
      },
        (res2) => {
          super.log("limitation:", res2.message);
        }
      );
    });
  }
  //Perspective roaming
  roamingCamera (points) {
    let jsonData = {
      coordType: 0,
      coordTypeZ: 0,
      loopMode: 'none',
      points: points,
    };
    window.appInstance.uniCall('roamingCamera', jsonData, result => {
      console.log(result);
    });
  }
}