import GisBase from './GisBase';
/* global _*/

/**circular */
export default class CircularArea extends GisBase {
  constructor() {
    super('circular');
  }
  config = {
    coordType: 0,
    coordTypeZ: 0,
  };
  /*
   * Add circular layer
   * @param {Object} layerConfig Layer Configuration
   * @param {Array} data Layer data
   */
  addLayer(layerConfig, data, callback) {
    let item = _.cloneDeep(this.config);
    super.copyObject(layerConfig, item, [
      'id',
      'name',
      'coordZ',
      'type',
      'color',
      'areaHeight',
      'fillArea',
      'radius',
    ]);
    if (data) {
      item.center = data;
    } else {
      item.center = layerConfig.center;
    }
    window.appInstance.uniCall('addCircularArea', item, (res) => {
      callback && callback(res.result);
      super.setCallBack('Add circular layer', res, layerConfig);
    });
    return item;
  }

  /**
   * Update circular data
   * @param {Array} data Layer data
   */
  updateData(layerConfig, data, callback) {
    let item = _.cloneDeep(this.config);
    super.copyObject(layerConfig, item, ['id', 'name', 'coordZ', 'radius']);
    if (data) {
      item.center = data;
    } else {
      item.center = layerConfig.center;
    }
    window.appInstance.uniCall('updateCircularAreaCoord', item, (res) => {
      callback && callback(res.result);
      super.setCallBack('Update circular data', res, layerConfig);
    });
  }

  /**
   * Update circular style
   * @param {Object} layerConfig Layer Configuration
   */
  updateStyle(layerConfig) {
    let item = _.cloneDeep(this.config);
    super.copyObject(layerConfig, item, [
      'id',
      'type',
      'color',
      'areaHeight',
      'fillArea',
    ]);
    item.isAppend = true;
    window.appInstance.uniCall('updateCircularAreaStyle', item, (res) => {
      super.setCallBack('Update circular style', res, layerConfig);
    });
  }

  /**
   * Add Shp circular layer
   * @param {Object} layerConfig Layer Configuration
   * @param {Array} data Layer data
   */
  addLayerShp(layerConfig, data) {
    let item = _.cloneDeep(this.config);
    super.copyObject(layerConfig, item, [
      'id',
      'name',
      'type',
      'color',
      'areaHeight',
      'fillCircularArea',
      'shpPath',
    ]);
    window.appInstance.uniCall('addCircularAreaShp', item, (res) => {
      super.setCallBack('Add circular layer', res, layerConfig);
    });
    return item;
  }

  /**
   * Remove circular layer
   * @param {String} name Layer Name
   */
  removeCircularArea(name) {
    window.appInstance.uniCall('deleteCircularArea', {
      id: name,
    });
  }
}
