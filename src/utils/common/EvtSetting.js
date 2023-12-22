export default class EvtSetting {
  static setThemeEvt(theme) {
    let time = "15:30";
    let camerajsonData = {
      coordType: 0,
      coordTypeZ: 0,
      centerCoord: [37.18582199997, -1.6920089999], //Taking the Longitude and Latitude of Shenzhen Bay as an Example
      coordZ: 0,
      distance: 1223,
      pitch: 9,
      heading: 206,
      fly: true,
      duration: 0.5,
    };
    if (theme == "zhihuidenggan") {
      camerajsonData = {
        coordType: 0,
        coordTypeZ: 0,
        centerCoord: [37.18582199997, -1.6920089999], //Taking the Longitude and Latitude of Shenzhen Bay as an Example
        coordZ: 0,
        distance: 1223,
        pitch: 9,
        heading: 206,
        fly: true,
        duration: 0.5,
      };
      time = "15:30";
    } else if (theme == "gonggonganquan") {
      camerajsonData = {
        coordType: 0,
        coordTypeZ: 0,
        centerCoord: [37.1842857503, -1.69127468485], //Taking the Longitude and Latitude of Shenzhen Bay as an Example
        coordZ: 0,
        distance: 1502,
        pitch: 16,
        heading: 215,
        fly: true,
        duration: 0.5,
      };
      time = "09:30";
    } else if (theme == "zhaoshangyunxing") {
      camerajsonData = {
        coordType: 0,
        coordTypeZ: 0,
        centerCoord: [37.18534426818, -1.69213847382], //Taking the Longitude and Latitude of Shenzhen Bay as an Example
        coordZ: 0,
        distance: 1166,
        pitch: 7,
        heading: 198,
        fly: true,
        duration: 0.5,
      };
      time = "13:30";
    } else if (theme == "jiaotongyunxing") {
      camerajsonData = {
        coordType: 0,
        coordTypeZ: 0,
        centerCoord: [37.18168235681, -1.69212066231], //Taking the Longitude and Latitude of Shenzhen Bay as an Example
        coordZ: 0,
        distance: 3923,
        pitch: 89,
        heading: 166,
        fly: true,
        duration: 0.5,
      };
      time = "18:00";
    } else if (theme == "shujuzhongxin") {
      camerajsonData = {
        coordType: 0,
        coordTypeZ: 0,
        centerCoord: [37.16686093854, -1.69926451703],
        coordZ: 10,
        distance: 1332,
        pitch: 20,
        heading: 202,
        fly: true,
        duration: 0.5,
      };
    }
    window.appInstance.uniCall("setCamera", camerajsonData, (result) => {
      console.log(result);
    });

    // let jsonData = {
    //   envTime: time,
    //   alwayForward: false,
    //   duration: 3,
    // };

    // appInstance.uniCall('setEnvTime', jsonData, (result) => {
    //   console.log(result);
    // });
  }
}
