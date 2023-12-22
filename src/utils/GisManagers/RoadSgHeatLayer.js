import GisBase from './GisBase';
/* global _*/

/**ThermalDiagramOfPathSection */
export default class RoadSgHeatLayer extends GisBase {
  constructor() {
    super('ThermalDiagramOfPathSection');
  }
  config = {
    coordType: 0,
    coordTypeZ: 0,
  };
  /**
   * Add a thermal diagram layer for the path section
   * @param {Object} layerConfig Layer Configuration
   * @param {Array} data Layer data
   */
  addLayer(layerConfig, data, callback) {
    let item = _.cloneDeep(this.config);
    super.copyObject(layerConfig, item, [
      'id',
      'name',
      'alpha',
      'width',
      'colorMax',
      'colorMin',
    ]);

    item.valueMax = _.max(data.data, 'value').value * 1.1;
    item.valueMin = 0;
    super.copyObject(item, layerConfig, ['valueMax', 'valueMin']);
    super.copyObject(data, item, ['segments', 'data']);

    window.appInstance.uniCall('addRoadSgHeatLayerCoord', item, (res) => {
      callback && callback(res.result);
      super.setCallBack('AddAThermalDiagramLayerForThePathSection', res, layerConfig);
    });
    return item;
  }

  /**
   * Update the thermal diagram data of the path section
   * @param {Array} data 
   */
  updateDataCoord(layerConfig, data, callback, isAppend = false) {
    let item = _.cloneDeep(this.config);
    super.copyObject(layerConfig, item, ['id', 'name', 'coordZ']);
    item.isAppend = isAppend;
    item.data = data;
    if (!isAppend) {
      item.valueMax = _.max(data.data, 'value').value * 1.1;
      item.valueMin = 0;
      super.copyObject(item, layerConfig, ['valueMax', 'valueMin']);
    }
    window.appInstance.uniCall('updateRoadSgHeatLayerCoord', item, (res) => {
      callback && callback(res.result);
      super.setCallBack('Update the thermal diagram data of the path section', res, layerConfig);
    });
  }

  /**
   * Update the thermal map section of the route section
   * @param {Array} data 
   */
  updateDataSegment(layerConfig, segments, callback, isAppend = false) {
    let item = _.cloneDeep(this.config);
    super.copyObject(layerConfig, item, ['id', 'name']);
    item.isAppend = isAppend; //true:  追加 绝对数值 数据，不会清除其他数据，名称相同，则替换数据；    //add: 追加 相对变化 数据，不会清除其他数据，名称相同，则累加数据；    //false: 重建 绝对数值 数据，数据全部清空；
    item.segments = segments;
    window.appInstance.uniCall('updateRoadSgHeatLayerSegment', item, (res) => {
      callback && callback(res.result);
      super.setCallBack('Update the thermal map section of the route section', res, layerConfig);
    });
  }

  /**
   * Update the thermal diagram style of the path section
   * @param {Object} layerConfig 
   */
  updateStyle(layerConfig) {
    let item = _.cloneDeep(this.config);
    super.copyObject(layerConfig, item, [
      'id',
      'alpha',
      'width',
      'colorMax',
      'colorMin',
      'valueMax',
      'valueMin',
    ]);
    item.isAppend = true;
    window.appInstance.uniCall('updateRoadSgHeatLayerStyle', item, (res) => {
      super.setCallBack('Update the thermal diagram style of the path section', res, layerConfig);
    });
  }
}
