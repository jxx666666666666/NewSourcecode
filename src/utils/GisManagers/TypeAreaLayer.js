import GisBase from './GisBase';
import { TypeAreaLayerClick } from './UeActionCallback';
/* global _*/

/**Type Area Map */
export default class TypeAreaLayer extends GisBase {
  constructor() {
    super('TypeAreaMap');
    this.ueAction = new TypeAreaLayerClick();
  }
  config = {
    coordType: 0,
    coordTypeZ: 0,
  };
  /**
   * Add Type Area Map Layer
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
      'legends',
    ]);
    super.copyObject(data, item, ['areas', 'data']);
    let cBack = (res) => {
      callback && callback(res.result);
      super.setCallBack('AddTypeAreaMapLayer', res, layerConfig);
      if (layerConfig.isClick) {
        super.setLayerClick(layerConfig, this.ueAction.clickCallback);
        if (res.result == 0 || layerConfig.isAddClick) {
          return;
        }
        layerConfig.isAddClick = true;
      }
    };
    window.appInstance.uniCall('addTypeAreaLayer', item, cBack);
    return item;
  }

  /**
   * Update type area map data
   * @param {Array} data Layer data
   */
  updateDataCoord(layerConfig, data, callback, isAppend = false) {
    let item = {};
    super.copyObject(layerConfig, item, ['id', 'name']);
    item.isAppend = isAppend;
    item.data = data;
    window.appInstance.uniCall('updateTypeAreaLayerCoord', item, (res) => {
      callback && callback(res.result);
      super.setCallBack('UpdateTypeAreaMapData', res, layerConfig);
    });
  }

  /**
   * Update Type Area Map
   * @param {Array} data Layer data
   */
  updateDataArea(layerConfig, areas, callback, isAppend = false) {
    let item = _.cloneDeep(this.config);
    super.copyObject(layerConfig, item, ['id', 'coordZ']);
    item.isAppend = isAppend;
    item.areas = areas;
    window.appInstance.uniCall('updateTypeAreaLayerArea', item, (res) => {
      callback && callback(res.result);
      super.setCallBack('UpdateTypeAreaMapData', res, layerConfig);
    });
  }

  /**
   * Update Type Area Map Style
   * @param {Object} layerConfig Layer Configuration
   */
  updateStyle(layerConfig) {
    let item = _.cloneDeep(this.config);
    super.copyObject(layerConfig, item, ['id', 'alpha', 'legends']);
    item.isAppend = true;
    window.appInstance.uniCall('updateTypeAreaLayerStyle', item, (res) => {
      super.setCallBack('UpdateTypeAreaMapStyle', res, layerConfig);
    });
  }
}
