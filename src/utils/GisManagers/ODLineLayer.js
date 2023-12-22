import GisBase from './GisBase';
import { ODLineLayerClick } from './UeActionCallback';
/* global _*/

/**RelationshipDiagram */
export default class ODLineLayer extends GisBase {
  constructor() {
    super('RelationshipDiagram');
    this.ueAction = new ODLineLayerClick();
  }
  config = {
    coordType: 0,
    coordTypeZ: 0,
    legends: [],
  };

  /**
   * Add Diagram Layer
   * @param {Object} layerConfig Layer Configuration
   * @param {Array} data Layer data
   */
  addLayer(layerConfig, data, callback) {
    let item = _.cloneDeep(this.config);
    super.copyObject(layerConfig, item, [
      'id',
      'name',
      'bubbleRadiusMax',
      'bubbleRadiusMin',
      'bubbleSpeed',
      'lineWidthMax',
      'lineWidthMin',
      'lineSpeed',
      'curvature',
      'legend',
    ]);
    if (layerConfig.legends) {
      item.legends = layerConfig.legends;
    } else {
      super.dealLegends(item.legends, layerConfig);
    }
    item.data = super.selectArray(data, [
      'id',
      'startCoord',
      'startCoordZ',
      'targetCoord',
      'targetCoordZ',
      'value',
      'type',
    ]);
    item.valueMax = _.max(data, 'value').value * 1.1;
    item.valueMin = 0;
    super.copyObject(item, layerConfig, ['valueMax', 'valueMin']);
    let cBack = (res) => {
      callback && callback(res.result);
      super.setCallBack('AddDiagramLayer', res, layerConfig);
      if (layerConfig.isClick) {
        super.setLayerClick(layerConfig, this.ueAction.clickCallback);
        if (res.result == 0 || layerConfig.isAddClick) {
          return;
        }
        layerConfig.isAddClick = true;
      }
    };
    window.appInstance.uniCall('addODLineLayer', item, cBack);
    return item;
  }

  /**
   * Update Graph Data
   * @param {Array} data 
   */
  updateData(layerConfig, data, callback, isAppend = false) {
    let item = _.cloneDeep(this.config);
    super.copyObject(layerConfig, item, ['id', 'name']);
    if (layerConfig.legends) {
      item.legends = layerConfig.legends;
    } else {
      super.dealLegends(item.legends, layerConfig);
    }
    item.isAppend = isAppend;
    item.data = super.selectArray(data, [
      'id',
      'startCoord',
      'startCoordZ',
      'targetCoord',
      'targetCoordZ',
      'value',
      'type',
    ]);
    if (!isAppend) {
      item.valueMax = _.max(data, 'value').value * 1.1;
      item.valueMin = 0;
      super.copyObject(item, layerConfig, ['valueMax', 'valueMin']);
    }
    let cBack = (res) => {
      callback && callback(res.result);
      super.setCallBack('UpdateGraphData', res, layerConfig);
      if (layerConfig.isClick) {
        super.setLayerClick(layerConfig, this.ueAction.clickCallback);
        if (res.result == 0 || layerConfig.isAddClick) {
          return;
        }
        layerConfig.isAddClick = true;
      }
    };
    window.appInstance.uniCall('updateODLineLayerCoord', item, cBack);
    this.updateStyle(layerConfig);
  }

  /**
   * Update Diagram Style
   * @param {Object} layerConfig 
   */
  updateStyle(layerConfig) {
    let item = _.cloneDeep(this.config);
    super.copyObject(layerConfig, item, [
      'id',
      'valueMax',
      'valueMin',
      'bubbleRadiusMax',
      'bubbleRadiusMin',
      'bubbleSpeed',
      'lineWidthMax',
      'lineWidthMin',
      'lineSpeed',
      'curvature',
      'legend',
    ]);
    if (layerConfig.legends) {
      item.legends = layerConfig.legends;
    } else {
      super.dealLegends(item.legends, layerConfig);
    }
    item.isAppend = true;
    window.appInstance.uniCall('updateODLineLayerStyle', item, (res) => {
      super.setCallBack('UpdateDiagramStyle', res, layerConfig);
    });
  }
}
