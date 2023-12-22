import GisBase from './GisBase'
import Timer from '../common/Timer'
import { TrailLayerClick } from './UeActionCallback'
import { forEach } from 'lodash'

/* global _*/

/**Trajectories */
export default class TrailLayer extends GisBase {
  constructor() {
    super('Trajectories')
    this.ueAction = new TrailLayerClick()
  }
  static TimerList = {}
  config = {
    coordType: 0,
    coordTypeZ: 0,
    legends: [],
  }
  configNew = {
    coordType: 0,
    coordTypeZ: 0,
  }
  /**
   * Add Track Map Layer
   * @param {Object} layerConfig Layer Configuration
   * @param {Array} data Layer data
   */
  addHisLayer(layerConfig, data, callback) {
    layerConfig.Timer = new Timer()
    layerConfig.Timer.TimerInterval = layerConfig.delay || 5000
    let index = 0
    this.addLayer(layerConfig, data, (success) => {
      if (success) {
        callback && callback(success)
        layerConfig.Timer.TimerTick = () => {
          this.updateData(layerConfig, data[0], data[0].points[index])
          if (index >= data[0].points.length) {
            index = 0
            // layerConfig.Timer.Stop()
          } else {
            index++
          }
        }
        layerConfig.Timer.Start()
      }
    })
  }

  /**
   * Add Track Map Layer
   * @param {Object} layerConfig
   * @param {Array} data
   */
  addLayer(layerConfig, data, callBack) {
    let item = _.cloneDeep(this.config)
    super.copyObject(layerConfig, item, [
      'id',
      'name',
      'trackStyle',
      'trackDuration',
      'trackWidth',
      'objLife',
      'time',
      'visible',
      'duration',
    ])
    // super.dealLegends(item.legends, layerConfig)
    super.dealLegends(item.legends, layerConfig)
    item.data = super.selectArray(data, [
      'id',
      'coordZ',
      'coord',
      'label',
      'type',
    ])
    window.appInstance.uniCall('addTrailLayer', item, (res) => {
      callBack && callBack(res.result)
      console.log('AddTrackMapLayer', res, layerConfig)
      if (layerConfig.isClick) {
        super.setLayerClick(layerConfig, this.ueAction.clickCallback)
        if (res.result == 0 || layerConfig.isAddClick) {
          return
        }
        layerConfig.isAddClick = true
      }
    })
    return item
  }

  /**
   * Update trajectory data
   * @param {Array} data
   */
  updateData(layerConfig, data, points) {
    if (points) {
      let item = _.cloneDeep(this.configNew)
      super.copyObject(layerConfig, item, ['id', 'name'])
      // super.dealLegends(item.legends, layerConfig)
      item.isAppend = true // True: Append data; False: rebuilding data
      item.duration = 1
      item.data = [
        {
          id: data.id,
          label: '',
          coord: [points.lon, points.lat], //以深圳湾经纬度为例
          coordZ: data.coordZ,
          yaw: 0,
          type: data.type,
        },
      ]
      window.appInstance.uniCall('updateTrailLayerCoord', item, (res) => {
        //this.setLayerClick(layerConfig)
      })
    }
  }

  /**
   * Update Track Map Style
   * @param {Object} layerConfig
   */
  updateStyle(layerConfig) {
    let item = _.cloneDeep(this.config)
    super.copyObject(layerConfig, item, [
      'id',
      'trackStyle',
      'trackDuration',
      'objLife',
    ])
    super.dealLegends(item.legends, layerConfig)
    item.isAppend = true
    window.appInstance.uniCall('updateTrailLayerStyle', item, (res) => {
      //this.setLayerClick(layerConfig)
    })
  }

  setLayerClick(layerConfig) {
    window.appInstance.uniCall(
      'pickOverlay',
      {
        overlayType: 'trailLayer',
        idLayer: layerConfig.id,
        type: 'click',
      },
      (result) => {
        window.appInstance.uniCall('onTrailLayerLClick', {}, (result) => {
          let item = { scatterType: 'vehicle' }
          console.log(
            'gzq',
            result,
            window.streamingConfig.panelURL + '/?' + JSON.stringify(item)
          )
          window.appInstance.uniCall(
            'addOverlayTip',
            {
              id: result.idObj,
              url:
                window.streamingConfig.panelURL + '/?' + JSON.stringify(item),
              size: [400, 100],
              offset: [0, 0],
              overlayType: 'trailLayer',
              isShowClose: true,
            },
            (res) => {
              console.log('gzq', res)
            }
          )
        })
      }
    )
  }
}
