import GisBase from './GisBase'
import { BarLayerClick } from './UeActionCallback'
/**Histogram */
export default class BarLayer extends GisBase {
  constructor() {
    super('Histogram')
    this.ueAction = new BarLayerClick()
  }
  config = {
    coordType: 0,
    coordTypeZ: 0,
  }
  /**
   * Add a bar chart layer
   * @param {Object} layerConfig Layer Configuration
   * @param {Array} data Layer data
   */
  addLayer(layerConfig, data, callback) {
    let item = _.cloneDeep(this.config)
    super.copyObject(layerConfig, item, [
      'id',
      'name',
      'coordZ',
      'columnType',
      'columnMinHeight',
      'columnMaxHeight',
      'columnAlpha',
      'columnPaint',
      'columnGap',
      'columnWidth',
      'colorMax',
      'colorMin',
      'labelColor',
      'visible',
      'labelBackgroundColor',
    ])
    item.data = super.selectArray(data, ['id', 'coord', 'value'])
    item.valueMax = _.max(data, 'value').value * 1.1
    item.valueMin = 0
    super.copyObject(item, layerConfig, ['valueMax', 'valueMin'])

    let cBack = (res) => {
      callback && callback(res.result)
      super.setCallBack('Add a bar chart layer', res, layerConfig)
      if (layerConfig.isClick) {
        super.setLayerClick(layerConfig, this.ueAction.clickCallback)
        if (res.result == 0 || layerConfig.isAddClick) {
          return
        }
        layerConfig.isAddClick = true
      }
    }
    window.appInstance.uniCall('add3DColumnLayer', item, cBack)
    return item
  }

  /**
   * Update bar chart data
   * @param {Array} data Layer data
   * @param {Array} data Layer data
   */
  updateData(layerConfig, data, callback, isAppend = false) {
    let item = _.cloneDeep(this.config)
    super.copyObject(layerConfig, item, ['id', 'name', 'coordZ'])
    item.isAppend = isAppend // True: Append data; False: rebuilding data
    item.data = super.selectArray(data, ['id', 'coord', 'value'])
    if (!isAppend) {
      item.valueMax = _.max(data, 'value').value * 1.1
      item.valueMin = 0
      super.copyObject(item, layerConfig, ['valueMax', 'valueMin'])
    }
    let cBack = (res) => {
      callback && callback(res.result)
      super.setCallBack('Update bar chart data', res, layerConfig)
      if (layerConfig.isClick) {
        super.setLayerClick(layerConfig, this.ueAction.clickCallback)
        if (res.result == 0 || layerConfig.isAddClick) {
          return
        }
        layerConfig.isAddClick = true
      }
    }
    window.appInstance.uniCall('update3DColumnLayerCoord', item, cBack)
    this.updateStyle(layerConfig, cBack)
  }

  /**
   * Update Bar Chart Style
   * @param {Object} layerConfig Layer Configuration
   */
  updateStyle(layerConfig, callback) {
    let item = _.cloneDeep(this.config)
    super.copyObject(layerConfig, item, [
      'id',
      'columnType',
      'columnMinHeight',
      'columnMaxHeight',
      'columnAlpha',
      'columnPaint',
      'columnGap',
      'columnWidth',
      'colorMax',
      'colorMin',
      'valueMax',
      'valueMin',
      'labelColor',
      'labelBackgroundColor',
    ])
    item.isAppend = false
    window.appInstance.uniCall('update3DColumnLayerStyle', item, (res) => {
      super.setCallBack('Update Bar Chart Style', res, layerConfig)
      callback && callback(res.result)
    })
  }
}
