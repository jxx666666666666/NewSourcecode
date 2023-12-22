import GisBase from './GisBase';
/* global _*/

/**heat map */
export default class HeatLayer extends GisBase {
  constructor() {
    super('HeatMap');
  }
  config = {
    coordType: 0,
    coordTypeZ: 0,
  };
  /**
   * Add a heat map layer
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
      'alpha',
      'colorMax',
      'colorMin',
      'radius',
    ]);
    let scatterData = super.selectArray(data, ['coord', 'value']);
    item.valueMax = _.max(data, 'value').value * 1.1;
    item.valueMin = 0;
    super.copyObject(item, layerConfig, ['valueMax', 'valueMin']);

    //Add scattered points in batches at multiple times
    let group = _.chunk(scatterData, 200);

    item.data = group[0];
    window.appInstance.uniCall('addHeatMapLayer', item, (res) => {
      callback && callback(res.result);
      super.setCallBack('Add a heat map layer', res, layerConfig);
      this.updateGroup(layerConfig, group);
    });
    //todo Delete when there is a callback
    setTimeout(() => {
      this.updateGroup(layerConfig, group);
    }, 3000);
    return item;
  }

  /**
   * Append and update grouping data
   * @param {Object} layerConfig 
   * @param {Array} group 
   * @param {int} index 
   */
  updateGroup(layerConfig, group, index = 1) {
    if (index < group.length) {
      this.updateData(
        layerConfig,
        group[index],
        () => {
          this.updateGroup(layerConfig, group, ++index);
        },
        true
      );
    }
  }

  /**
   * Update heat map data
   * @param {Array} data 
   */
  updateData(layerConfig, data, callback, isAppend = false) {
    let item = _.cloneDeep(this.config);
    super.copyObject(layerConfig, item, ['id', 'name', 'coordZ']);
    item.isAppend = isAppend; //True: Append absolute numerical data without clearing other data. If the name is the same, replace the data// Add: Append relative change data without clearing other data. If the name is the same, accumulate the data// False: Rebuild absolute numerical data and clear all data;
    item.data = super.selectArray(data, ['coord', 'value']);
    if (!isAppend) {
      item.valueMax = _.max(data, 'value').value * 1.1;
      item.valueMin = 0;
      super.copyObject(item, layerConfig, ['valueMax', 'valueMin']);
    }
    window.appInstance.uniCall('updateHeatMapLayerCoord', item, (res) => {
      callback && callback(res.result);
      super.setCallBack('Update heat map data', res, layerConfig);
    });
  }

  /**
   * Update heat map style
   * @param {Object} layerConfig 
   */
  updateStyle(layerConfig) {
    let item = _.cloneDezep(this.config);
    super.copyObject(layerConfig, item, [
      'id',
      'type',
      'alpha',
      'colorMax',
      'colorMin',
      'valueMax',
      'valueMin',
    ]);
    item.isAppend = true;
    window.appInstance.uniCall('updateHeatMapLayerStyle', item, (res) => {
      super.setCallBack('Update heat map style', res, layerConfig);
    });
  }
}
