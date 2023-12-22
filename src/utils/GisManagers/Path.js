import GisBase from './GisBase';
import { PathLayerClick } from './UeActionCallback';
/* global _*/

/**route */
export default class Path extends GisBase {
  constructor() {
    super('route');
    this.ueAction = new PathLayerClick();
  }
  config = {
    coordType: 0,
    coordTypeZ: 0,
  };
  /**
   * Add Path Layer
   * @param {Object} layerConfig Layer Configuration
   * @param {Array} data Layer data
   */
  addLayer(layerConfig, data, callback) {
    let item = _.cloneDeep(this.config);
    super.copyObject(layerConfig, item, [
      'id',
      'name',
      'type',
      'color',
      'colorPass',
      'width',
    ]);
    let cBack = (res) => {
      callback && callback(res.result);
      super.setCallBack('AddPathLayer', res, layerConfig);
      if (layerConfig.isClick) {
        super.setLayerClick(layerConfig, this.ueAction.clickCallback);
        if (res.result == 0 || layerConfig.isAddClick) {
          return;
        }
        layerConfig.isAddClick = true;
      }
    };
    item.points = super.selectArray(data, ['coord', 'coordZ']);
    window.appInstance.uniCall('addPath', item, cBack);
    return item;
  }

  /**
   * Update path data
   * @param {Array} data 
   */
  updateData(layerConfig, data, callback) {
    let item = _.cloneDeep(this.config);
    super.copyObject(layerConfig, item, ['id', 'name']);
    item.isAppend = false;
    item.points = super.selectArray(data, ['coord', 'coordZ']);
    let cBack = (res) => {
      callback && callback(res.result);
      super.setCallBack('UpdatePathData', res, layerConfig);
      if (layerConfig.isClick) {
        super.setLayerClick(layerConfig, this.ueAction.clickCallback);
        if (res.result == 0 || layerConfig.isAddClick) {
          return;
        }
        layerConfig.isAddClick = true;
      }
    };
    window.appInstance.uniCall('updatePathCoord', item, cBack);
  }

  static addPath(params) {
    let defaultOption = {
      id: 'path',
      name: 'route',
      coordType: 0,
      coordTypeZ: 0,
      type: 'Arrow06',
      color: '#ff0000',
      colorPass: '#0000FF',
      width: 40,
      texture: 'cableFlow.png',
      textureSpeed: 0,
      tag: 'custominfo',
      autoScale: false,
      lineDataId: '',
      points: [],
      visible: true
    }
    let jsonData = Object.assign({}, defaultOption, params)
    delete jsonData.layerConfig
    window.appInstance.uniCall('addPath', jsonData, res => {
      console.log(`addPath`, jsonData, res);
    });
  }

  static async updatePathCoord(params) {
    let defaultOption = {
      id: 'path',
      name: 'route',
      coordType: 0,
      coordTypeZ: 0,
      isAppend: false,
      tag: 'custominfo',
      points: []
    }
    let jsonData = Object.assign({}, defaultOption, params)
    window.appInstance.uniCall('updatePathCoord', jsonData, res => {
      console.log('updatePathCoord', jsonData, res)
    })
  }

  /**
   * Update Path Style
   * @param {Object} layerConfig 
   */
  updateStyle(layerConfig) {
    let item = {};
    super.copyObject(layerConfig, item, [
      'id',
      'type',
      'color',
      'colorPass',
      'width',
    ]);
    window.appInstance.uniCall('updatePathStyle', item, (res) => {
      super.setCallBack('UpdatePathStyle', res, layerConfig);
    });
  }

  /**
   * Add Shp Path Layer
   * @param {Object} layerConfig 
   * @param {Array} data 
   */
  addLayerShp(layerConfig, data) {
    let item = _.cloneDeep(this.config);
    super.copyObject(layerConfig, item, [
      'id',
      'name',
      'coordZ',
      'type',
      'color',
      'colorPass',
      'width',
      'shpPath',
    ]);
    window.appInstance.uniCall('addPathShp', item, (res) => {
      super.setCallBack('AddShpPathLayer', res, layerConfig);
    });
    return item;
  }
}
