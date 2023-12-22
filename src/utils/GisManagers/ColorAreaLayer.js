import GisBase from './GisBase';
/* global _*/

/**NumericalAreaMap */
export default class ColorAreaLayer extends GisBase {
  constructor() {
    super('NumericalAreaMap');
  }
  config = {
    coordType: 0,
    coordTypeZ: 0,
  };
  /**
   * Add Value Area Map Layer
   * @param {Object} layerConfig Layer Configuration
   * @param {Array} data Layer data
   */
  addLayer(layerConfig, data, callback) {
    let item = _.cloneDeep(this.config);
    super.copyObject(layerConfig, item, [
      'id',
      'name',
      'coordZ',
      'alpha',
      'type',
      'areaHeight',
      'fillArea',
      'colorMax',
      'colorMin',
    ]);
    super.copyObject(data, item, ['areas', 'data']);
    item.valueMax = _.max(data.data, 'value').value * 1.1;
    item.valueMin = 0;
    super.copyObject(item, layerConfig, ['valueMax', 'valueMin']);
    window.appInstance.uniCall('addColorAreaLayer', item, (res) => {
      callback && callback(res.result);
      super.setCallBack('dd Value Area Map Layer', res, layerConfig);
    });
    return item;
  }

  /**
   * Update numerical area map data
   * @param {Array} data Layer data
   */
  updateDataCoord(layerConfig, data, callback, isAppend = false) {
    let item = _.cloneDeep(this.config);
    super.copyObject(layerConfig, item, ['id', 'name']);
    item.isAppend = isAppend; //True: Append absolute numerical data without clearing other data. If the name is the same, replace the data// Add: Append relative change data without clearing other data. If the name is the same, accumulate the data// False: Rebuild absolute numerical data and clear all data;
    item.data = data;
    if (!isAppend) {
      item.valueMax = _.max(data.data, 'value').value * 1.1;
      item.valueMin = 0;
      super.copyObject(item, layerConfig, ['valueMax', 'valueMin']);
    }
    window.appInstance.uniCall('updateColorAreaLayerCoord', item, (res) => {
      callback && callback(res.result);
      super.setCallBack('Update numerical area map data', res, layerConfig);
    });
  }

  /**
   * Update numerical area map section
   * @param {Array} data Layer data
   */
  updateDataArea(layerConfig, data, callback, isAppend = false, areas) {
    let item = _.cloneDeep(this.config);
    super.copyObject(layerConfig, item, ['id', 'coordZ']);
    item.isAppend = isAppend; //True: Append absolute numerical data without clearing other data. If the name is the same, replace the data// Add: Append relative change data without clearing other data. If the name is the same, accumulate the data// False: Rebuild absolute numerical data and clear all data;
    item.areas = areas;
    window.appInstance.uniCall('updateColorAreaLayerArea', item, (res) => {
      super.setCallBack('Update numerical area map data', res, layerConfig);
      callback && callback(res.result);
    });
  }

  /**
   * Update Value Area Chart Style
   * @param {Object} layerConfig Layer Configuration
   */
  updateStyle(layerConfig, data, callback, isAppend = false) {
    let item = _.cloneDeep(this.config);
    super.copyObject(layerConfig, item, [
      'id',
      'alpha',
      'type',
      'areaHeight',
      'fillArea',
      'colorMax',
      'colorMin',
    ]);
    item.isAppend = true;
    window.appInstance.uniCall('updateColorAreaLayerStyle', item, (res) => {
      super.setCallBack('Update Value Area Chart Style', res, layerConfig);
    });
  }
}
