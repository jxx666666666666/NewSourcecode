import VideoSurveillance from '../../components/popup/lightScene/VideoSurveillance.vue';
import DigitalSignagePro from '../../components/popup/lightScene/DigitalSignagePro.vue';
import EnviromentalSensor from '../../components/popup/lightScene/EnviromentalSensor.vue';
import OtherModulePro from '../../components/popup/lightScene/OtherModulePro.vue';
import SmartPolePrp from '../../components/popup/lightScene/SmartPolePrp.vue';
import createPanel from '../configs/createPanel';
export default class LightScene {
  static isShowBillbord = false;
  static sceneName = "";
  static init(info, sceneName) {
    this.sceneName = sceneName;
    this.SetCamrea(info);
    this.PickModelStart();
    this.RegisterPickModelEvent();
    this.setModelStyle(info);

  }
  static SetCamrea(info) {
    let jsonData = null;
    if (info.TO_INSTALL.indexOf('Light_Type01') != -1) {
      jsonData = {
        coordType: 0,
        coordTypeZ: 0,
        centerCoord: [-0.09317274094, -4.55552764893],
        coordZ: 4.48748687744,
        distance: 32,
        pitch: 14,
        heading: 1,
        fly: true,
        duration: 0.5,
      };
    }
    else {
      jsonData = {
        coordType: 0,
        coordTypeZ: 0,
        centerCoord: [0, 0],
        coordZ: 5.59765991211,
        distance: 32,
        pitch: 16,
        heading: 0,
        fly: true,
        duration: 0.5,
      };
    }

    appInstance.uniCall('setCamera', jsonData, (result) => {
      setTimeout(() => {
        let jsonData = { state: 'restricted' }; //restricted：受限；free：不受限制
        // appInstance.uniCall('setCameraRestrictionState', jsonData, result => {
        //   console.log(result);
        // });
      }, 1000);

    });
  }
  static PickModelStart() {
    let jsonData = {
      modelType: 'model', // Model Category
      type: 'click', // Single selection mode, click: click to select; Hover: hover to select
      isShowDecorator: false,
    };

    appInstance.uniCall('pickModel', jsonData, (result) => {
      console.log(result);
    });
  }

  static RegisterPickModelEvent() {
    let that = this;
    window.eventCallback = function (event) {
      // that.addModelOverTip(event);
      that.currentModelId = event.id;
    };

    appInstance.uniCall(
      'addEventListener',
      {
        eventName: 'onModelClick', // The event name is shown in the Unified API Development Manual on the official website of Guanguan
        callback: window.eventCallback, // To register event listening callback functions, multiple callback functions can be registered for the same event. Note that this callback function corresponds to the callback function at the time of the event represented by the first parameter, and should be distinguished from the callback function completed by this addEventListener call.
      },
      result => {
        console.log(result);
      }
    );

  }
  static addModelOverTip(info) {

    let divId = "";
    let size = [];
    let offset = [];
    if (info.id == "LampPost") {
      divId = createPanel.getDivId(SmartPolePrp, {
        id: info.id,
        data: {} //Signage Details
      });
      size = [590, 268];
      offset = [0, 345];
    }
    else if (info.id == "GunTypeCamera_A") {
      divId = createPanel.getDivId(VideoSurveillance, {
        id: info.id,
        data: {} //Signage Details
      });
      size = [450, 184];
      offset = [38 - 55 - 55, 342 + 90];
    }
    else if (info.id == "GunTypeCamera_B") {
      divId = createPanel.getDivId(VideoSurveillance, {
        id: info.id,
        data: {} //Signage Details
      });
      size = [450, 184];
      offset = [-54, 342 + 90];
    }
    else if (info.id == "GunTypeCamera_C") {
      divId = createPanel.getDivId(VideoSurveillance, {
        id: info.id,
        data: {} //Signage Details
      });
      size = [450, 184];
      offset = [38 - 55 + 44, 342 + 90];
    }
    else if (info.id == "EnvironmentalSensor") {
      divId = createPanel.getDivId(EnviromentalSensor, {
        id: info.id,
        data: {} //Signage Details
      });
      size = [510, 184];
      offset = [61 + 21, 323 + 110];
    }
    else if (info.id == "SphericalCameraa") {
      divId = createPanel.getDivId(VideoSurveillance, {
        id: info.id,
        data: {} //Signage Details
      });
      size = [450, 184];
      offset = [38 - 55 - 98, 342 + 64];
    }
    else if (info.id == "Screen") {
      divId = createPanel.getDivId(DigitalSignagePro, {
        id: info.id,
        data: {} //Signage Details
      });
      size = [410, 210];
      offset = [18, 286];
    }
    else if (info.id == "Radio") {
      divId = createPanel.getDivId(OtherModulePro, {
        id: info.id,
        data: {} //Signage Details
      });
      size = [410, 210];
      offset = [0, 167 + 95 + 108];
    }

    window.appInstance.uniCall('removeModelTip', { id: '' }, res => {
      window.appInstance.uniCall(
        'addModelTip', {
        id: info.id,
        url: "",
        divId: divId, // Resolution reason: All configurations here are reduced by 2 times
        size: size,
        offset: offset,
        isShowClose: false,
      },
        res => {
          console.log(res);
        }
      );
    });
  }
  static setModelStyle(info) {
    let lampId = info.TO_INSTALL.indexOf('Light_Type01') != -1 ? "LampPost_A" : "LampPost";
    if (info.TO_INSTALL == "Light_Type01_B") {
      let jsonData = {
        ids: ['Screen_A'], // Model Object ID Collection
        visible: false, // The model needs to set the explicit and implicit states, true: display, false: hide
      };
      appInstance.uniCall('setModelVisibility', jsonData, (result) => {
        console.log(result);
      });
      this.isShowBillbord = false;
    }
    else {
      let jsonData = {
        ids: ['Screen_A'], // Model Object ID Collection
        visible: true, // The model needs to set the explicit and implicit states, true: display, false: hide
      };
      appInstance.uniCall('setModelVisibility', jsonData, (result) => {
        console.log(result);
      });
      this.isShowBillbord = true;
    }
    if (info.TO_INSTALL == "Light_Type02_B") {
      let jsonData = {
        ids: ['Screen'], // Model Object ID Collection
        visible: false, // The model needs to set the explicit and implicit states, true: display, false: hide
      };
      appInstance.uniCall('setModelVisibility', jsonData, (result) => {
        console.log(result);
      });
      this.isShowBillbord = false;
    }
    else {
      let jsonData = {
        ids: ['Screen'], // Model Object ID Collection
        visible: true, // The model needs to set the explicit and implicit states, true: display, false: hide
      };
      appInstance.uniCall('setModelVisibility', jsonData, (result) => {
        console.log(result);
      });
      this.isShowBillbord = true;
    }
    let jsonData = {
      id: lampId,
      alpha: 1,
      scale: 1,
      maskType: 'color',
      maskAlpha: 1,
      maskColor: info.type,
      maskPicture: 'Arrow01',
      maskPictureScale: 1.0,
      maskFlowSpeed: 1.0,
      maskFlowDirection: 180,
      includeChildren: 'false',
      xRay: 'off',
    };
    appInstance.uniCall('setModelStyle', jsonData, (result) => {
      console.log(result);
    });
    // let jsonData = {
    //   id: lampId, // Model object ID, a unique identifier passed in by the caller during creation, used for object recognition for various operations
    //   duration: 0.5, // Flashing period (in seconds)
    //   color: info.type, // Blinking color (HEX color value)
    //   type: 'default', // Blinking style category, default: default style
    // };
    // appInstance.uniCall('blinkingModel', jsonData, (result) => {
    //   let jsonData = {
    //     id: lampId, // Model object ID, a unique identifier passed in by the caller during creation, used for object recognition for various operations
    //     state: 'pause', // The model continues to flicker, pause: pause; Continue: continue; Stop: Stop, return to the initial state
    //   };
    //   appInstance.uniCall('setModelBlinkState', jsonData, (result) => {
    //     console.log(result);
    //   });

    // });


  }
  static currentModelId = "";
  static blinkingModel(modelId) {
    if (this.sceneName == "SmartPole-A") {
      modelId = modelId + "_A"
      if (modelId == "SphericalCameraa_A") {
        modelId = "SphericalCamera_A"
      }
    }
    let jsonDataStop = {
      id: this.currentModelId,
      state: 'stop',
    };
    appInstance.uniCall('setModelBlinkState', jsonDataStop, (result) => {
      console.log(result);
    });
    this.currentModelId = modelId;
    let jsonData = {
      id: modelId,
      duration: 0.5,
      color: "#ff0000",
      type: 'default',
    };
    appInstance.uniCall('blinkingModel', jsonData, (result) => {
    });
  }
}