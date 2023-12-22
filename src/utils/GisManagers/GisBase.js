import { CommonClick } from './UeActionCallback'

/**Base class */
export default class GisBase {
  /**
   * constructor
   * @param {String} cname Chinese name
   */
  constructor(cname) {
    this.cname = cname == undefined || cname == '' ? 'BaseClass' : cname
    this.layerType = GisBase.layerType[cname]
  }

  //#region Base Class Properties

  con = console
  //static The properties and method subclasses of will not inherit
  static layerType = {
    landmark: 'landmark',
    route: 'path',
    Area: 'area',
    circular: 'circularArea',
    ObliquePhotography: '3DTile',
    tile: 'gisMap',
    LandmarkMap: 'landmarkLayer',
    Histogram: '3DColumnLayer',
    RasterGraphics: '3DGridLayer',
    HeatMap: 'heatMapLayer',
    BubbleChart: 'bubbleLayer',
    eventGraph: 'eventBubbleLayer',
    Trajectories: 'trailLayer',
    PlotPlot: 'pointTrackLayer',
    RelationshipDiagram: 'ODLineLayer',
    TypeAreaMap: 'typeAreaLayer',
    NumericalAreaMap: 'colorAreaLayer',
    PathPointThermalDiagram: 'roadPtHeatLayer',
    ThermalDiagramOfPathSection: 'roadSgHeatLayer',
    SpecialEffects: '3DMarker',
  }

  //#endregion

  //#region Log, callback

  /**
   * log
   * @param {String} msg information
   */
  log(msg) {
    this.con.log(this.cname, ':', msg)
  }

  /**
   * log info
   * @param {String} msg information
   */
  info(...params) {
    this.con.info(this.cname, ...params)
  }

  /**
   * callback
   * @param {Object} res Callback Arguments
   */
  callback(res) {
    this.info(['fail', 'success'][res.result] + res.message)
  }

  /**
   * Set callback
   * @param {String} action operate
   * @param {Object} res Callback Arguments
   * @param {Object} layerConfig Layer Configuration
   */
  setCallBack(action, res, layerConfig) {
    let temp = ''
    if (layerConfig) {
      temp = '\r\nlayers:' + layerConfig.id + ''
    }
    this.info(
      temp,
      '\r\nOperation-',
      action,
      ':',
      ['fail', 'success'][res.result],
      res.message,
      res.ErrorData
    )
  }

  /**
   * You can click to set the layer
   * @param {Object} layerConfig Layer Configuration
   * @param {function} callback callback
   */
  setLayerClick(layerConfig, callback) {
    let that = this
    that.callback = callback
    window.appInstance.uniCall(
      'pickOverlay',
      {
        overlayType: GisBase.layerType[layerConfig.layerType],
        idLayer: layerConfig.id,
        type: 'click',
      },
      (clickResult) => {
        if (clickResult.result == 0 || layerConfig.isPickOverlay) {
          return
        }
        layerConfig.isPickOverlay = true
        this.setCallBack('pickOverlay-click', clickResult, layerConfig)
        let type = GisBase.layerType[layerConfig.layerType]
        type = type.charAt(0).toUpperCase() + type.slice(1)
        let action = 'on' + type + 'Click'
        window.appInstance.uniCall(action, {}, (pickResult) => {
          if (layerConfig.Timer) {
            layerConfig.Timer.Stop()
          }
          that.callback && that.callback(pickResult)
        })
      }
    )
  }
  //#endregion

  //#region Base class method

  /**
   * Process Legend
   * @param {Array} legends Configure Legend Collection
   * @param {Object} layerConfig Layer Legend (Single Legend)
   */
  dealLegends(legends, layerConfig) {
    let index = legends.findIndex((t) => t.name == layerConfig.legend.name)
    if (index === -1) {
      if (layerConfig.legend.length > 1) {
        layerConfig.legend.forEach((item) => {
          legends.push(item)
        })
      } else {
        legends.push(layerConfig.legend)
      }
    } else {
      legends[index] = layerConfig.legend
    }
  }

  /**
   * Process data and reduce data transmission
   * @param {Array} array array
   * @param {Array} props properties
   */
  selectArray(array, props) {
    let temp = []
    array.forEach((t) => {
      let item = {}
      props.forEach((d) => (item[d] = t[d]))
      temp.push(item)
    })
    return temp
  }

  /**
   * Process data and reduce data transmission
   * @param {Object} source Source Object
   * @param {Object} target Target object
   * @param {Array} props properties
   */
  copyObject(source, target, props) {
    if (props) {
      props.forEach((d) => {
        if (source[d]) {
          target[d] = source[d]
        }
      })
    } else {
      for (const key in source) {
        target[key] = source[key]
      }
    }
  }

  //#endregion

  //#region static method

  /**
   * Set overlay visibility
   * @param {Object} layer Layer Configuration
   * @param {Boolean} layer Display or not
   */
  static setLayerVisible(layer, isVisible, callback) {
    //清理轨迹图定时器
    if (layer.Timer) {
      layer.Timer.Stop()
    }
    let type = GisBase.layerType[layer.layerType]
    if (type) {
      window.appInstance.uniCall(
        'setOverlayVisibility',
        {
          id: layer.id,
          overlayType: type,
          visible: isVisible,
        },
        (res) => {
          callback && callback(res.result)
          console.info(
            layer.id,
            'Set overlay visibility',
            isVisible,
            ':',
            ['fail', 'success'][res.result],
            res.message
          )
        }
      )
    }
  }

  /**
   * Set the overlay type to be visible or hidden
   * @param {string} type cover type
   */
  static setLayerVisibleType(type) {
    if (type) {
      window.appInstance.uniCall(
        'setOverlayTypeVisibility',
        {
          overlayType: type,
          visible: true,
        },
        (res) => {
          console.info(
            type,
            'Remove coverings by type',
            ':',
            ['fail', 'success'][res.result],
            res.message
          )
        }
      )
    }
  }

  /**
   * Stop radio selecting layers
   * @param {Object} layer Layer Configuration
   */
  static endPickOverlay(layer) {
    let type = GisBase.layerType[layer.layerType]
    if (type) {
      window.appInstance.uniCall(
        'endPickOverlay',
        {
          id: layer.id,
          overlayType: type,
          type: 'click',
        },
        (res) => {
          GisBase.removeLayer(layer)
          layer.isAddClick = false
          layer.isPickOverlay = false
        }
      )
    }
  }

  /**
   * Remove coverings based on layer configuration (name+type)
   * @param {Object} layer Layer Configuration
   */
  static removeLayer(layer) {
    let type = GisBase.layerType[layer.layerType]
    if (type) {
      window.appInstance.uniCall(
        'removeOverlay',
        {
          id: layer.id,
          overlayType: type,
        },
        (res) => {
          console.info(
            layer.id,
            'Delete Overlay by Layer Name',
            ':',
            ['fail', 'success'][res.result],
            res.message
          )
        }
      )
    }
  }

  /**
   * Remove coverings based on their type
   * @param {string} type cover type
   */
  static removeLayerType(type) {
    if (type) {
      window.appInstance.uniCall(
        'clearOverlayType',
        {
          overlayType: type,
        },
        (res) => {
          console.info(
            type,
            'Remove coverings by type',
            ':',
            ['fail', 'success'][res.result],
            res.message
          )
        }
      )
    }
  }

  /**
   * Remove the cover frame based on the type of cover
   * @param {string} type cover type
   */
  static removeOverlayTip(layerType) {
    if (layerType) {
      let type = GisBase.layerType[layerType]
      window.appInstance.uniCall('removeOverlayTip', {
        overlayType: type,
      })
    } else {
      CommonClick.removeTipByType()
    }
  }

  /** Uncheck the selected state of the cover */
  static clearSelected() {
    window.appInstance.uniCall('clearOverlaySelected', {})
  }

  /**
   * Remove cover selected state
   */
  static clearOverlaySelected() {
    window.appInstance.uniCall('clearOverlaySelected', {})
  }

  /**
   * Focus on coverage
   * @param {string} id Coverage ID, which can be layer ID or object ID
   * @param {string} type Layer type, Chinese
   * @param {string} distance cover type
   */
  static focusById(id, type, distance) {
    let overlayType = GisBase.layerType[type]
    appInstance.uniCall('focusById', {
      id: id,
      overlayType: overlayType,
      distance: distance,
    })
  }

  //#endregion
}
