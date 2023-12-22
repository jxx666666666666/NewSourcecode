import GisBase from "./GisBase";
import api from "../../api/Api";
import panelConfig from "../configs/panelConfig";
import store from "../../store/index";
/**Model */
export default class Model extends GisBase {
  constructor() {
    super("Model");
  }

  defaultConfig = {
    coordType: 0,
    coordTypeZ: 0,
  };

  //#region basic control

  /**
   * Set Model Base Transform
   * @param {Object} modelConfig 
   */
  setModelTransform(modelConfig) {
    let config = {
      id: "modelId",
      coordType: 0,
      coordTypeZ: 0,
      coord: [114.560257, 37.09079],
      coordZ: 10,
      rotation: [20, 80, 90],
      scale: [0.1, 1, 10],
    };
    if (modelConfig) {
      config = modelConfig;
    }
    window.appInstance.uniCall("setModelTransform", config, (res) => {
      super.setCallBack("SetModelBaseTransform", res);
    });
  }

  /**
   * Set Model Data
   * @param {Object} modelConfig 
   */
  setModelCoord(modelConfig) {
    let config = {
      id: "modelId",
      coordType: 0,
      coordTypeZ: 0,
      coord: [114.560257, 37.09079],
      coordZ: 10,
    };
    if (modelConfig) {
      config = modelConfig;
    }
    window.appInstance.uniCall("setModelCoord", config, (res) => {
      super.setCallBack("SetModelData", res);
    });
  }

  /**
   * Set Model Style
   * @param {string} id 
   * @param {string} isShow 
   */
  setModelVisible(id, isShow) {
    let config = {
      id: id, // Model object ID, a unique identifier passed in by the caller during creation, used for object recognition for various operations
      alpha: isShow ? 1 : 0, // Model transparency, 0: completely transparent; 1: Completely opaque
    };
    window.appInstance.uniCall("setModelStyle", config, (res) => {
      super.setCallBack("SetModelStyle" + config.id, res);
    });
  }

  /**
   * setModelStyle
   * @param {Object} modelConfig 
   */
  setModelStyle(modelConfig) {
    let config = {
      id: "modelId",
      alpha: 1,
      scale: 1,
      maskType: "none",
      maskAlpha: 1,
      maskColor: "#ff0000",
      maskPicture: "arrow",
      maskPictureScale: 1.0,
      maskFlowSpeed: 1.0,
      maskFlowDirection: 90,
      xRay: "off",
    };
    let resConfig = Object.assign({}, config, modelConfig);
    window.appInstance.uniCall("setModelStyle", resConfig, (res) => {
      super.setCallBack("setModelStyle" + resConfig.id, res);
    });
  }

  /**
   * Set up model joint data
   * @param {Object} modelConfig 
   */
  setModelArticulation(modelConfig) {
    let config = {
      id: "modelId",
      isAppend: true,
      data: [{
        articulation: "articulationName01",
        type: "float",
        value: "15",
      },
      {
        articulation: "articulationName02",
        type: "enum",
        value: "String001",
      },
      {
        articulation: "articulationName03",
        type: "bool",
        value: "false",
      },
      ],
    };
    if (modelConfig) {
      config = modelConfig;
    }
    window.appInstance.uniCall("setModelArticulation", config, (res) => {
      super.setCallBack("SetUpModelJointData", res);
    });
  }

  /**
   * Add Model Tip
   * @param {Object} modelConfig 
   */
  addModelTip(modelConfig, layer) {
    let res;
    if (layer.scatterType == "DengganIcon") {
      res = layer.data
    } else {
      res = api.getJsonData(layer.jsonPath);
    }
    // res.then((t) => {
    res.forEach((item, index) => {
      if (modelConfig.id === "modelId" + index || modelConfig.id === "modelId" + index + "_LampPost") {
        // Model perspective
        appInstance.uniCall(
          "setCamera", {
          centerCoord: item.coord,
          coordType: 0,
          coordTypeZ: 0,
          coordZ: 10,
          distance: 150,
          heading: 253,
          pitch: 47,
          result: 1,
          fly: true,
          duration: 1
        },
          (res) => {
            console.log(res);
          }
        );
        let arr = {
          AdvertisementDispla: item.AdvertisementDispla,
          Area: item.Area,
          Lamp: item.Lamp,
          LampPoleCamera: item.LampPoleCamera,
          SensorNoise: item.SensorNoise,
          SensorPm: item.SensorPm,
          SensorTemperature: item.SensorTemperature,
          SensorThumidity: item.SensorThumidity,
          scatterType: layer.scatterType,
          sourceData: item.sourceData

        };

        let info = panelConfig.getPanelIfon(
          "modelId" + index,
          "addModelTip",
          arr
        );
        let config = {
          id: "modelId" + index,
          url: "",
          size: info.size,
          offset: [30, -200],
          isShowClose: false,
          divId: info.divId || ""
        };
        store.commit('setModelId', "modelId" + index)
        store.commit('setHighLightData', item.sourceData.TO_INSTALL)
        setTimeout(() => {
          let jsonData = {
            id: '',
          };
          appInstance.uniCall('removeModelTip', jsonData, (result) => {
            window.appInstance.uniCall("addModelTip", config, (res) => {
              super.setCallBack("Add Model Tip", res);
            });
          });


        }, 1000)
      }
    });
    // });
  }

  /**
   * Set Model Data
   */
  getModelsByType(callback) {
    let config = { modelType: "model" };
    window.appInstance.uniCall("getModelsByType", config, (res) => {
      super.setCallBack("SetModelData", res);
      callback && callback(res.result);
    });
  }

  /**
   * Set Model Data
   * @param {string} type 
   * @param {boolean} isVisble 
   */
  setModelsVisibleByType(type, isVisble) {
    let config = { modelType: type };
    window.appInstance.uniCall("getModelsByType", config, (res) => {
      if (res.result && res.data) {
        res.data.forEach((item) => {
          this.setModelVisible(item.id, isVisble);
        });
      }
    });
  }

  //#endregion

  //#region model selection

  /**
   * Start Box Selection Model
   * @param {Object} modelConfig 
   */
  selectModel(modelConfig) {
    let config = { modelType: "model", type: "rect" };
    if (modelConfig) {
      config = modelConfig;
    }
    window.appInstance.uniCall("selectModel", config, (res) => {
      super.setCallBack("StartBoxSelectionModel", res);
    });
  }

  /**
   * End Box Selection Model
   */
  endSelectModel() {
    window.appInstance.uniCall("endSelectModel", {}, (res) => {
      super.setCallBack("EndBoxSelectionModel", res);
    });
  }

  /**
   ;* Set the model by clicking
   * @param {string} type 
   */
  setModelClick(type, callback) {
    window.appInstance.uniCall(
      "pickModel", { modelType: type, type: "click" },
      (res) => {
        window.appInstance.uniCall("onModelClick", {}, (res) => {
          callback && callback(res.result);
        });
      }
    );
  }

  /**
   * Start radio selecting model
   * @param {Object} modelConfig 
   */
  pickModel(modelConfig) {
    let config = { modelType: "model", type: "click" };
    if (modelConfig) {
      config = modelConfig;
    }
    window.appInstance.uniCall("pickModel", config, (res) => {
      super.setCallBack("StartRadioSelectingModel", res);
    });
  }

  /**
   * End Radio Model
   */
  endPickModel() {
    window.appInstance.uniCall("endPickModel", {}, (res) => {
      super.setCallBack("EndRadioModel", res);
    });
  }

  /**
   * Click on the model
   * @param {Object} modelConfig 
   */
  clickModel(modelConfig) {
    let config = { id: "modeljId", modelType: "model", selected: true };
    if (modelConfig) {
      config = modelConfig;
    }
    window.appInstance.uniCall("clickModel", config, (res) => {
      super.setCallBack("ClickOnTheModel", res);
    });
  }

  /**
   * Click on the model category
   * @param {Object} modelConfig 
   */
  clickModelType(modelConfig) {
    let config = { modelType: "model", selected: true };
    if (modelConfig) {
      config = modelConfig;
    }
    window.appInstance.uniCall("clickModelType", config, (res) => {
      super.setCallBack("ClickOnTheModelCategory", res);
    });
  }

  /**
   * Clear Model selection Status
   * @param {Object} modelConfig 
   */
  clearModelSelected() {
    window.appInstance.uniCall("clearModelSelected", {}, (res) => {
      super.setCallBack("ClearModelSelectionStatus", res);
    });
  }

  //#endregion

  //#region model behavior

  /**
   * Continuous Rotation Model
   * @param {Object} modelConfig 
   */
  rotatingModel(modelConfig) {
    let config = {
      id: "modelId",
      durationX: 20,
      durationY: 0,
      durationZ: 0,
      directionX: "clockwise",
      directionY: "clockwise",
      directionZ: "clockwise",
    };
    if (modelConfig) {
      config = modelConfig;
    }
    window.appInstance.uniCall("rotatingModel", config, (res) => {
      super.setCallBack("ContinuousRotationModel", res);
    });
  }

  /**
   * Set the continuous rotation state of the model
   * @param {Object} modelConfig 
   */
  setModelRotationState(modelConfig) {
    let config = { id: "idObj", state: "stop" };
    if (modelConfig) {
      config = modelConfig;
    }
    window.appInstance.uniCall("setModelRotationState", config, (res) => {
      super.setCallBack("SetTheContinuousRotationStateOfTheModel", res);
    });
  }

  /**
   * Continuous scintillation model
   * @param {Object} modelConfig 
   */
  blinkingModel(modelConfig) {
    let config = {
      id: "modelId",
      duration: 0.5,
      color: "#ff0000",
      type: "type01",
    };
    if (modelConfig) {
      config = modelConfig;
    }
    window.appInstance.uniCall("blinkingModel", config, (res) => {
      super.setCallBack("ContinuousScintillationModel", res);
    });
  }

  /**
   * Set the continuous flashing state of the model
   * @param {Object} modelConfig 
   */
  setModelBlinkState(modelConfig) {
    let config = { id: "modelId", state: "stop" };
    if (modelConfig) {
      config = modelConfig;
    }
    window.appInstance.uniCall("setModelBlinkState", config, (res) => {
      super.setCallBack("SetTheContinuousFlashingStateOfTheModel", res);
    });
  }

  /**
   * Continuous movement model
   * @param {Object} modelConfig 
   */
  movingModel(modelConfig) {
    let config = {
      id: "modelId",
      coordType: 0,
      coordTypeZ: 0,
      loopMode: "round",
      reverse: false,
      direction: "path",
      offset: [100, -30, 900],
      points: [{
        coord: [134.55, 34.577],
        coordZ: 1,
      },
      {
        coord: [134.59, 33.577],
        coordZ: 2,
        speed: 2,
      },
      ],
    };
    if (modelConfig) {
      config = modelConfig;
    }
    window.appInstance.uniCall("movingModel", config, (res) => {
      super.setCallBack("ContinuousMovementModel", res);
    });
  }

  /**
   * Set the continuous movement status of the model
   * @param {Object} modelConfig 
   */
  setModelMoveState(modelConfig) {
    let config = { id: "modelId", state: "stop" };
    if (modelConfig) {
      config = modelConfig;
    }
    window.appInstance.uniCall("setModelMoveState", config, (res) => {
      super.setCallBack("SetTheContinuousMovementStatusOfTheModel", res);
    });
  }

  /**
   * Continuous path movement model
   * @param {Object} modelConfig 
   */
  pathingModel(modelConfig) {
    let config = {
      id: "modelId",
      pathId: "pathId",
      loopMode: "round",
      reverse: false,
      direction: "path",
      offset: [100, -30, 900],
      speed: 2,
    };
    if (modelConfig) {
      config = modelConfig;
    }
    window.appInstance.uniCall("pathingModel", config, (res) => {
      super.setCallBack("ContinuousPathMovementModel", res);
    });
  }

  /**
   * Set the continuous path movement status of the model
   * @param {Object} modelConfig 
   */
  setModelPathingState(modelConfig) {
    let config = { state: "stop" };
    if (modelConfig) {
      config = modelConfig;
    }
    window.appInstance.uniCall("setModelPathingState", config, (res) => {
      super.setCallBack("SetTheContinuousPathMovementStatusOfTheModel", res);
    });
  }

  //#endregion

  //#region Model: Architecture

  /**
   * Disassembling building floors
   * @param {Object} modelConfig 
   */
  showBuildingFloor(modelConfig) {
    let config = { id: "buildingId", floor: 1, animation: 1 };
    if (modelConfig) {
      config = modelConfig;
    }
    window.appInstance.uniCall("showBuildingFloor", config, (res) => {
      super.setCallBack("DisassemblingBuildingFloors", res);
    });
  }

  /**
   * Restore the exterior of the building
   * @param {Object} modelConfig 
   */
  resetBuildingFloor(modelConfig, callback) {
    let config = { id: "buildingId", animation: 1 };
    if (modelConfig) {
      config = modelConfig;
    }
    window.appInstance.uniCall("resetBuildingFloor", config, (res) => {
      super.setCallBack("RestoreTheExteriorOfTheBuilding", res);
      callback && callback(res.result);
    });
  }

  /**
   * Highlight building
   * @param {Object} modelConfig 
   */
  highlightBuilding(modelConfig) {
    let config = { id: "buildingId", type: "style1" };
    if (modelConfig) {
      config = modelConfig;
    }
    window.appInstance.uniCall("highlightBuilding", config, (res) => {
      super.setCallBack("HighlightBuilding", res);
    });
  }

  /**
   * Highlight floors
   * @param {Object} modelConfig 
   */
  highlightFloor(modelConfig) {
    let config = { id: "buildingId", floor: 1, type: "style1" };
    if (modelConfig) {
      config = modelConfig;
    }
    window.appInstance.uniCall("highlightFloor", config, (res) => {
      super.setCallBack("HighlightFloors", res);
    });
  }

  /**
   * Highlight Room
   * @param {Object} modelConfig
   */
  highlightRoom(modelConfig) {
    let config = {
      id: "buildingId",
      floor: 1,
      room: "roomName",
      type: "style1",
    };
    if (modelConfig) {
      config = modelConfig;
    }
    window.appInstance.uniCall("highlightRoom", config, (res) => {
      super.setCallBack("HighlightRoom", res);
    });
  }

  /**
   * Obtain building information
   */
  getBuilding() {
    window.appInstance.uniCall("getBuilding", {}, (res) => {
      super.setCallBack("ObtainBuildingInformation", res);
    });
  }

  /**
   * Obtain model ID based on building information
   */
  getModelIdBuilding() {
    window.appInstance.uniCall("getModelIdBuilding", {}, (res) => {
      super.setCallBack("ObtainModelIDBasedOnBuildingInformation", res);
    });
  }

  //#endregion

  //#region Model: Special

  /**
   * Set 3dmarker display and hiding
   * @param {string} id 3dmarkerid
   * @param {bool} isVisible Display or not
   */
  set3DMarkerVisible(id, isVisible) {
    appInstance.uniCall("setOverlayVisibility", {
      id: id,
      overlayType: "3DMarker",
      visible: isVisible,
    });
  }

  /**
   * Delete 3dmarker
   * @param {string} id 3dmarkerid
   */
  remove3DMarker(id) {
    appInstance.uniCall("removeOverlay", {
      id: id,
      overlayType: "3DMarker",
    });
  }

  /**
   * Add scene effects
   * @param {Object} modelConfig configuration
   * @param {Function} callback callback
   */
  add3DMarker(modelConfig, callback) {
    let config = {
      id: "3DMarker",
      coordType: 0,
      coordTypeZ: 0,
      alpha: 0.8,
      scale: 25,
      type: "Spread04",
      titleText: "",
      coord: [114.560257, 37.09079],
      coordZ: 10,
    };
    super.copyObject(modelConfig, config, [
      "id",
      "alpha",
      "scale",
      "type",
      "titleText",
      "coord",
      "coordZ",
    ]);
    window.appInstance.uniCall("add3DMarker", config, (res) => {
      super.setCallBack("AddSceneEffects" + config.id, res);
      if (callback) {
        callback(res.result != 0);
      }
    });
  }

  /**
   * Update scene special effects data points
   * @param {Object} modelConfig 
   */
  update3DMarkerCoord(modelConfig) {
    let config = {
      id: "3DMarker",
      coordType: 0,
      coordTypeZ: 0,
      coord: [114.560257, 37.09079],
      coordZ: 10,
    };
    super.copyObject(modelConfig, config, ["id", "coord", "coordZ"]);
    window.appInstance.uniCall("update3DMarkerCoord", config, (res) => {
      // No callback
    });
  }

  /**
   * Update scene special effects styles
   * @param {Object} modelConfig 
   */
  update3DMarkerStyle(modelConfig) {
    let config = {
      id: "3DMarkerId",
      alpha: 0.5,
      scale: 25,
      type: "Spread04",
      titleText: "GiveAnAlarm",
    };
    super.copyObject(modelConfig, config, [
      "id",
      "alpha",
      "scale",
      "type",
      "titleText",
    ]);
    window.appInstance.uniCall("update3DMarkerStyle", config, (res) => {
      super.setCallBack("UpdateSceneSpecialEffectsStyles" + config.id, res);
    });
  }

  //#endregion

  /**
   *
   * @param {string} animationName Animation name
   * @param {string} state animation state
   */
  playAnimation(animationName, state) {
    let config = {
      animationName: animationName,
      state: state,
    };
    window.appInstance.uniCall("playAnimation", config, (res) => {
      super.setCallBack("PlayAnimation" + config.animationName);
    });
  }
  // Add model landmark map
  getModelLayerId(layer, data, cBack) {
    window.appInstance.uniCall("addModel", data, (result) => {

    });
    let dataLamp = data;
    dataLamp.id = dataLamp.id + "_LampPost";
    dataLamp.modelType = data.modelType + "_LampPost"
    window.appInstance.uniCall("addModel", dataLamp, (result) => {
      if (result.result == "1") {
        let jsonData = {
          id: dataLamp.id,
          alpha: 1,
          scale: 1,
          maskType: 'color',
          maskAlpha: 1,
          maskColor: data.newtype,
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


      }
    });
    appInstance.uniCall(
      "pickModel", { modelType: "model", type: "click" },
      (result) => {

        window.appInstance.uniCall("onModelClick", {}, (res) => {
          let jsonData = {
            modelType: 'model',
            selected: false,
          };
          appInstance.uniCall('clickModelType', jsonData, (result) => {
            console.log(result);
          });
          this.addModelTip(res, layer);
          window.appInstance.uniCall("removeOverlayTip", {
            overlayType: "landmarkLayer",
          });
          window.appInstance.uniCall('clearOverlaySelected', {});
          window.appInstance.uniCall("removeModelTip", { id: store.state.ModelId });
        });
      }
    );





  }
}