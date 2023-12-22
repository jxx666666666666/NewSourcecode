import GisBase from "./GisBase";
import { AreaLayerClick } from "./UeActionCallback";
/**Area */
export default class Area extends GisBase {
  constructor() {
    super("Area");
    this.ueAction = new AreaLayerClick();
  }
  config = {
    coordType: 0,
    coordTypeZ: 0,
  };
  /**
   * Add Area Layer
   * @param {Object} layerConfig Layer Configuration
   * @param {Array} data Layer data
   */
  addLayer(layerConfig, data, callback) {
    let item = _.cloneDeep(this.config);
    super.copyObject(layerConfig, item, [
      "id",
      "name",
      "coordZ",
      "type",
      "color",
      "areaHeight",
      "fillArea",
    ]);
    item.points = data;
    // Set callback
    let cBack = (res) => {
      callback && callback(res.result);
      super.setCallBack("Add Area Layer", res, layerConfig);
      if (layerConfig.isClick) {
        super.setLayerClick(layerConfig, this.ueAction.clickCallback);
        if (res.result == 0 || layerConfig.isAddClick) {
          return;
        }
        layerConfig.isAddClick = true;
      }
    };
    window.appInstance.uniCall("addArea", item, cBack);
    return item;
  }

  /**
   * Update regional data
   * @param {Array} data Layer data
   */
  updateData(layerConfig, data, callback) {
    let item = _.cloneDeep(this.config);
    super.copyObject(layerConfig, item, ["id", "name", "coordZ"]);
    item.points = super.selectArray(data, ["coord"]);
    window.appInstance.uniCall("updateAreaCoord", item, (res) => {
      callback && callback(res.result);
      super.setCallBack("Update regional data", res, layerConfig);
    });
    this.updateStyle(layerConfig);
  }

  /**
   * Update Area Style
   * @param {Object} layerConfig Layer Configuration
   */
  updateStyle(layerConfig) {
    let item = _.cloneDeep(this.config);
    super.copyObject(layerConfig, item, [
      "id",
      "type",
      "color",
      "areaHeight",
      "fillArea",
    ]);
    item.isAppend = true;
    window.appInstance.uniCall("updateAreaStyle", item, (res) => {
      super.setCallBack("Update Area Style", res, layerConfig);
    });
  }

  /**
   * Add Shp area layer
   * @param {Object} layerConfig Layer Configuration
   * @param {Array} data Layer data
   */
  addLayerShp(layerConfig, data) {
    let item = _.cloneDeep(this.config);
    super.copyObject(layerConfig, item, [
      "id",
      "name",
      "type",
      "color",
      "areaHeight",
      "fillArea",
      "shpPath",
    ]);
    window.appInstance.uniCall("addAreaShp", item, (res) => {
      super.setCallBack("Add Area Layer", res, layerConfig);
    });
    return item;
  }

  /**
   * Remove Area Layer
   * @param {String} name Layer Name
   */
  removeArea(name) {
    appInstance.uniCall("deleteArea", {
      id: name,
    });
  }
  // Add Area Map
  getAddLayer(value) {
    let arr = [];
    if (value === "Area1") {
      arr = [
        {
          name: "areaName01", //Layer area sub object ID, a unique identifier passed in by the caller during creation, used for object recognition for various operations
          points: [
            {
              coord: [37.18327897307775, -1.6846560375888493], // XY axis coordinates, X: longitude; Y: Latitude
            },
            {
              coord: [37.183364803759154, -1.6931066876590901],
            },
            {
              coord: [37.18684094635604, -1.6931495842661322],
            },
            {
              coord: [37.186794, -1.690529],
            },
            {
              coord: [37.187416, -1.690323],
            },
            {
              coord: [37.189411, -1.690071],
            },
            {
              coord: [37.189419, -1.686012],
            },

            {
              coord: [37.186813, -1.685989],
            },
            {
              coord: [37.18692677703745, -1.684698934382437],
            },
          ],
        },
      ];
    } else if (value === "Area2") {
      arr = [
        {
          name: "areaName02", // Layer area sub object ID, a unique identifier passed in by the caller during creation, used for object recognition for various operations
          points: [
            {
              coord: [37.18941586679818, -1.6850421086971459],
            },
            {
              coord: [37.191990985582095, -1.6850501165943803],
            },
            {
              coord: [37.191990985582095, -1.6919368816089504],
            },
            {
              coord: [37.18938818882076, -1.6919113751169048],
            },
          ],
        },
      ];
    } else if (value === "Area3") {
      arr = [
        {
          name: "areaName03", // Layer area sub object ID, a unique identifier passed in by the caller during creation, used for object recognition for various operations
          points: [
            {
              coord: [37.17225695398673, -1.6881276883796963],
            },
            {
              coord: [37.17896808681254, -1.6872094526542563],
            },
            {
              coord: [37.180686681799145, -1.6942324645531783],
            },
            {
              coord: [37.178160437883726, -1.694717087264214],
            },

            {
              coord: [37.177731, -1.692749],
            },
            {
              coord: [37.17355, -1.693657],
            },
          ],
        },
      ];
    } else if (value === "Area4") {
      arr = [
        {
          name: "areaName04", // Layer area sub object ID, a unique identifier passed in by the caller during creation, used for object recognition for various operations
          points: [
            {
              coord: [37.173515, -1.693642],
            },

            {
              coord: [37.177696, -1.692749],
            },
            {
              coord: [37.178143, -1.694626],
            },

            {
              coord: [37.17897, -1.694595],
            },
            {
              coord: [37.178902, -1.69458],
            },

            {
              coord: [37.178986, -1.694618],
            },
            {
              coord: [37.179432, -1.695267],
            },

            {
              coord: [37.180779, -1.694984],
            },

            {
              coord: [37.181183, -1.697121],
            },
            {
              coord: [37.183258, -1.697342],
            },

            {
              coord: [37.183434, -1.700218],
            },

            {
              coord: [37.174923, -1.69928],
            },
          ],
        },
      ];
    } else if (value === "Area5") {
      arr = [
        {
          name: "areaName05", // Layer area sub object ID, a unique identifier passed in by the caller during creation, used for object recognition for various operations
          points: [
            {
              coord: [37.18671, -1.699577],
            },
            {
              coord: [37.183289, -1.697235],
            },
            {
              coord: [37.18325, -1.693245],
            },
            {
              coord: [37.186768, -1.693214],
            },
            {
              coord: [37.186901, -1.698074],
            },
            {
              coord: [37.189423, -1.698135],
            },
            {
              coord: [37.189415, -1.700111],
            },
            {
              coord: [37.18755, -1.700142],
            },
          ],
        },
      ];
    } else if (value === "All areas") {
      arr = [
        {
          name: "areaName01", // Layer area sub object ID, a unique identifier passed in by the caller during creation, used for object recognition for various operations
          points: [
            {
              coord: [37.18327897307775, -1.6846560375888493],
            },
            {
              coord: [37.183364803759154, -1.6931066876590901],
            },
            {
              coord: [37.18684094635604, -1.6931495842661322],
            },
            {
              coord: [37.186794, -1.690529],
            },
            {
              coord: [37.187416, -1.690323],
            },
            {
              coord: [37.189411, -1.690071],
            },
            {
              coord: [37.189419, -1.686012],
            },

            {
              coord: [37.186813, -1.685989],
            },
            {
              coord: [37.18692677703745, -1.684698934382437],
            },
          ],
        },
        {
          name: "areaName02", // Layer area sub object ID, a unique identifier passed in by the caller during creation, used for object recognition for various operations
          points: [
            {
              coord: [37.18941586679818, -1.6850421086971459],
            },
            {
              coord: [37.191990985582095, -1.6850501165943803],
            },
            {
              coord: [37.191990985582095, -1.6919368816089504],
            },
            {
              coord: [37.18938818882076, -1.6919113751169048],
            },
          ],
        },
        {
          name: "areaName03", // Layer area sub object ID, a unique identifier passed in by the caller during creation, used for object recognition for various operations
          points: [
            {
              coord: [37.17225695398673, -1.6881276883796963],
            },
            {
              coord: [37.17896808681254, -1.6872094526542563],
            },
            {
              coord: [37.180686681799145, -1.6942324645531783],
            },
            {
              coord: [37.178160437883726, -1.694717087264214],
            },

            {
              coord: [37.177731, -1.692749],
            },
            {
              coord: [37.17355, -1.693657],
            },
          ],
        },
        {
          name: "areaName04", // Layer area sub object ID, a unique identifier passed in by the caller during creation, used for object recognition for various operations
          points: [
            {
              coord: [37.173515, -1.693642],
            },

            {
              coord: [37.177696, -1.692749],
            },
            {
              coord: [37.178143, -1.694626],
            },

            {
              coord: [37.17897, -1.694595],
            },
            {
              coord: [37.178902, -1.69458],
            },

            {
              coord: [37.178986, -1.694618],
            },
            {
              coord: [37.179432, -1.695267],
            },

            {
              coord: [37.180779, -1.694984],
            },

            {
              coord: [37.181183, -1.697121],
            },
            {
              coord: [37.183258, -1.697342],
            },

            {
              coord: [37.183434, -1.700218],
            },

            {
              coord: [37.174923, -1.69928],
            },
          ],
        },
        {
          name: "areaName05", // Layer area sub object ID, a unique identifier passed in by the caller during creation, used for object recognition for various operations
          points: [
            {
              coord: [37.18671, -1.699577],
            },
            {
              coord: [37.183289, -1.697235],
            },
            {
              coord: [37.18325, -1.693245],
            },
            {
              coord: [37.186768, -1.693214],
            },
            {
              coord: [37.186901, -1.698074],
            },
            {
              coord: [37.189423, -1.698135],
            },
            {
              coord: [37.189415, -1.700111],
            },
            {
              coord: [37.18755, -1.700142],
            },
          ],
        },
      ];
    }
    let jsonData = {
      id: value, // Layer object ID, a unique identifier passed in by the caller during creation, used for object recognition for various operations
      name: "数值区域图", // Layer name, supports customizing names for layers
      coordType: 0, // XY axis coordinate category, 0: X longitude, Y latitude; 1: X meters, Y meters, relative to world 00 points
      coordTypeZ: 0, // Z-axis coordinate category, 0: relative 3D world 0 elevation; 1: Relative 3D world surface; 2: Relative 3D model surface (in meters)
      coordZ: 0, // Z-axis height in meters
      alpha: 1, // Transparency, 0: completely transparent; 1: Completely opaque
      type: "Grid05", // Area Boundary Style Category Arrow01 Gradient01 Gradient02 Gradient03 Grid01 Grid02 Grid03 Grid04 Grid05 Segment01 Segment02 Segment03
      areaHeight: 100, // Fence height in meters
      fillArea: "Grid01", // Area Fill Style Category Gradient01 Gradient02 Grid01 Grid02 Segment01 Segment02
      colorMax: "#FF0000", // Max Color (HEX Color Value)
      colorMin: "#0000FF", // Minimum value color (HEX color value)
      valueMax: 500, // Upper limit of maximum data value
      valueMin: 0, // Lower limit of minimum data value
      fillPosition: "top", // The position of the area fill, top/bottom, default to top
      visible: true, // Whether to show or hide by default when adding the current layer
      areas: arr,
      data: [
        // Define layer visualization data
        {
          areaName: "areaName01", // Data point area name
          value: 20, // Data point weight
        },
        {
          areaName: "areaName02", // Data point area name
          value: 200, // Data point weight
        },
        {
          areaName: "areaName03", // Data point area name
          value: 400, // Data point weight
        },
        {
          areaName: "areaName04", // Data point area name
          value: 500, // Data point weight
        },
        {
          areaName: "areaName05", // Data point area name
          value: 70, // Data point weight
        },
      ],
    };
    appInstance.uniCall(
      "clearOverlayType",
      {
        overlayType: "colorAreaLayer", // Layer Object Categories
      },
      (result) => {
        console.log(result);
      }
    );
    appInstance.uniCall("addColorAreaLayer", jsonData, (result) => {
      console.log(result);
      if (result.result === 1) {
        appInstance.uniCall(
          "focusById",
          {
            id: value,
            overlayType: "colorAreaLayer",
            distance: 2000,
          },
          (focusResult) => {
            console.log(focusResult);
          }
        );
      }
    });
  }
}
