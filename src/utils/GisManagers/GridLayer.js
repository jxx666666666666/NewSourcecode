import GisBase from './GisBase';
/* global _ */
/**RasterGraphics */
export default class GridLayer extends GisBase {
  constructor() {
    super('RasterGraphics');
  }
  config = {
    coordType: 0,
    coordTypeZ: 0,
  };
  /**
   * Add a grid map layer
   * @param {Object} layerConfig Layer Configuration
   * @param {Array} data Layer data
   */
  addLayer(layerConfig, data, callback) {
    let item = _.cloneDeep(this.config);
    super.copyObject(layerConfig, item, [
      'id',
      'name',
      'coordZ',
      'gridType',
      'gridHeight',
      'gridAlpha',
      'gridGap',
      'gridWidth',
      'colorMax',
      'colorMin',
    ]);
    item.data = super.selectArray(data, ['id', 'coord', 'value']);
    item.valueMax = _.max(data, 'value').value * 1.1;
    item.valueMin = 0;
    super.copyObject(item, layerConfig, ['valueMax', 'valueMin']);
    window.appInstance.uniCall('add3DGridLayer', item, (res) => {
      callback && callback(res.result);
      super.setCallBack('Add a grid map layer', res, layerConfig);
    });
    return item;
  }

  /**
   * Update raster data
   * @param {Array} data Layer data
   */
  updateData(layerConfig, data, callback, isAppend = false) {
    let item = _.cloneDeep(this.config);
    super.copyObject(layerConfig, item, ['id', 'name', 'coordZ']);
    item.isAppend = isAppend; // True: Append data; False: rebuilding data
    item.data = super.selectArray(data, ['id', 'coord', 'value']);
    if (!isAppend) {
      item.valueMax = _.max(data, 'value').value * 1.1;
      item.valueMin = 0;
      super.copyObject(item, layerConfig, ['valueMax', 'valueMin']);
    }
    window.appInstance.uniCall('update3DGridLayerCoord', item, (res) => {
      callback && callback(res.result);
      super.setCallBack('Update raster data', res, layerConfig);
    });
    this.updateStyle(layerConfig);
  }

  /**
   * Update Grid Chart Style
   * @param {Object} layerConfig Layer Configuration
   */
  updateStyle(layerConfig) {
    let item = _.cloneDeep(this.config);
    super.copyObject(layerConfig, item, [
      'id',
      'gridType',
      'gridHeight',
      'gridAlpha',
      'gridGap',
      'gridWidth',
      'colorMax',
      'colorMin',
      'valueMax',
      'valueMin',
    ]);
    item.isAppend = true;
    window.appInstance.uniCall('update3DGridLayerStyle', item, (res) => {
      super.setCallBack('Update Grid Chart Style', res, layerConfig);
    });
  }
}
