import GisBase from './GisBase';
/* global _*/

/**BubbleChart */
export default class Bubble extends GisBase {
  constructor() {
    super('BubbleChart');
  }
  config = {
    coordType: 0,
    coordTypeZ: 0,
    fillArea: 'none',
    legends: [],
  };

  /**
   * Add a bubble chart layer
   * @param {Object} layerConfig Layer Configuration
   * @param {Array} data Layer data
   */
  addLayer(layerConfig, data, callback) {
    let item = _.cloneDeep(this.config);
    super.copyObject(layerConfig, item, [
      'id',
      'layerName',
      'speed',
      'radiusMax',
      'radiusMin',
      'legends',
      'fillArea',
      'visible'
    ]);
    //super.dealLegends(item.legends, layerConfig);
    item.data = super.selectArray(data, [
      'id',
      'coordZ',
      'coord',
      'value',
      'type',
      'legend',
    ]);
    item.valueMax = 10;
    item.valueMin = 5;
    // super.copyObject(item, layerConfig, ['valueMax', 'valueMin']);
    window.appInstance.uniCall('addBubbleLayer', item, (res) => {
      callback && callback(res.result);
      super.setCallBack('Add a bubble chart layer', res, layerConfig);
    });
    return item;
  }

  /**
   * Update bubble chart data
   * @param {Array} data Layer data
   */
  updateData(layerConfig, data, callback, isAppend = false) {
    let item = _.cloneDeep(this.config);
    super.copyObject(layerConfig, item, [
      'id',
      'layerName',
      'speed',
      'radiusMax',
      'radiusMin',
    ]);
    super.dealLegends(item.legends, layerConfig);
    item.isAppend = isAppend; // True: Appending data does not clear other existing data. If the name is the same, replace the data; False: Rebuild the data and clear all data; Add: Accumulate values on existing data with duplicate names
    item.data = super.selectArray(data, [
      'id',
      'coordZ',
      'coord',
      'value',
      'type',
    ]);
    if (!isAppend) {
      item.valueMax = _.max(data, 'value').value * 1.1;
      item.valueMin = 0;
      super.copyObject(item, layerConfig, ['valueMax', 'valueMin']);
    }
    window.appInstance.uniCall('updateBubbleLayerCoord', item, (res) => {
      callback && callback(res.result);
      super.setCallBack('Update bubble chart data', res, layerConfig);
    });
    this.updateStyle(layerConfig);
  }

  /**
   * Update Bubble Chart Style
   * @param {Object} layerConfig Layer Configuration
   */
  updateStyle(layerConfig) {
    let item = _.cloneDeep(this.config);
    super.copyObject(layerConfig, item, [
      'id',
      'layerName',
      'speed',
      'radiusMax',
      'radiusMin',
      'valueMax',
      'valueMin',
    ]);
    super.dealLegends(item.legends, layerConfig);
    item.isAppend = true;
    window.appInstance.uniCall('updateBubbleLayerStyle', item, (res) => {
      super.setCallBack('Update Bubble Chart Style', res, layerConfig);
    });
  }
  getAddBulle(layer, data, cBack) {
    let jsonData = {
      id: 'bubble', // Layer object ID, a unique identifier passed in by the caller during creation, used for object recognition for various operations
      layerName: '气泡图层', // Layer name, supports customizing names for layers
      coordType: 0, // XY axis coordinate category, 0: X longitude, Y latitude; 1: X meters, Y meters, relative to world 00 points
      coordTypeZ: 0, // Z-axis coordinate category, 0: relative 3D world 0 elevation; 1: Relative 3D world surface; 2: Relative 3D model surface (in meters)
      fillArea: 'none', // Area fill style category none
      speed: 50, // Bubble diffusion velocity (in meters/second)
      radiusMax: 320, // Maximum radius of bubbles in meters
      radiusMin: 50, // Minimum radius of bubbles in meters
      valueMax: 10, // Upper limit of maximum data value
      valueMin: 5, // Lower limit of minimum data value
      visible: true, // Whether to show or hide by default when adding the current layer
      legends: [
        // Define layers containing legends, supporting the definition of different styles for different legends
        {
          name: 'legend01', // The legend name within the layer, which is a unique name passed in by the caller when creating a new one, used for identifying legends for various operations
          color: '#ff0000', // Color (HEX color value)
        }
      ],
      data: data
    };
    appInstance.uniCall(
      'clearOverlayType',
      {
        overlayType: 'bubbleLayer', // Layer Object Categories
      },
      (result) => {
        console.log(result);
      }
    );
    appInstance.uniCall('addBubbleLayer', jsonData, (result) => {
      console.log(result);
      if (result.result === 1) {
        appInstance.uniCall(
          'focusById',
          {
            id: 'bubble',
            overlayType: 'bubbleLayer',
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
