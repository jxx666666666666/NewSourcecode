import BaseGisData from '@/api/Gis/BaseGisData'
import store from '@/store/index'
import panelConfig from '../configs/panelConfig'
/** Basic Settings and Methods */
class CommonClick {
  /** Local Video */
  static showLocalVideo(id, overlayType, url) {
    CommonClick.removeTipByType(() => {
      window.appInstance.uniCall('addOverlayTip', {
        id: id,
        url: window.streamingConfig.panelURL + url,
        // Resolution reason: All configurations here are reduced by 2 times
        size: [300, 200],
        offset: [0, 0],
        overlayType: overlayType,
        isShowClose: true,
      })
      CommonClick.currentSelected.tipType = overlayType
    })
  }
  /** Drill down perspective */
  static showViewConfig(item) {
    //Drilldown from a scattered perspective
    let view = window.currentLayer.defaultView.scatterView
    view.centerCoord = item.coord
    view.coordType = 0
    view.coordTypeZ = 0
    item.coord && window.gisManager.camera.setCamera(view)
  }
  /** Focusing Scatter */
  static showView(result, overlayType) {
    appInstance.uniCall('focusByLayer', {
      id: result.idObj,
      idLayer: result.idLayer,
      layerType: overlayType,
      distance: 100,
    })
  }
  /** Bullet box */
  static showPanel(id, overlayType, item) {
    let info = panelConfig.getPanelIfon(id, overlayType, item)
    appInstance.uniCall(
      'addOverlayTip',
      {
        id: id,
        url: '',
        // Resolution reason: All configurations here are reduced by 2 times
        size: info.size,
        offset: info.offset,
        overlayType: overlayType,
        isShowClose: false,
        divId: info.divId || '',
      },
      (res) => {
        console.log(res)
      }
    )
    CommonClick.currentSelected.tipType = overlayType
  }

  static currentSelected = {
    tipType: null,
    isSelected: false,
  }
  static removeTipByType(callback) {
    //Cancel the current selected state
    if (CommonClick.currentSelected.tipType) {
      window.appInstance.uniCall(
        'removeOverlayTip',
        {
          overlayType: CommonClick.currentSelected.tipType,
        },
        (res) => {
          callback && callback(res.result)
        }
      )
    } else {
      callback && callback()
    }
  }
}
/** Scatter click */
class LandmarkLayerClick {
  constructor() {}
  overlayType = 'landmarkLayer'
  /**
   * Click callback
   * @param {Object} result Click on callback parameters
   */
  clickCallback(result) {
    if (!this.ueAction) {
      return
    }
    let that = this.ueAction
    //Close the bullet box
    CommonClick.removeTipByType()
    if (result.selected) {
      //Selected
      let item = BaseGisData.getItem(result.idLayer, result.idObj)
      if (!item || !item.scatterType) {
        return
      }
      let showPanels = [item.scatterType]
      if (showPanels.includes(item.scatterType)) {
        setTimeout(() => {
          CommonClick.showPanel(result.idObj, that.overlayType, item)
        }, 1000)
      }
      appInstance.uniCall(
        'setCamera',
        {
          centerCoord: item.coord,
          coordType: 0,
          coordTypeZ: 0,
          coordZ: 10,
          distance: 300,
          heading: 253,
          pitch: 47,
          result: 1,
          fly: true,
          duration: 1,
        },
        (res) => {
          console.log(res)
        }
      )
    }
  }
}
/** Column Chart Click */
class BarLayerClick {
  constructor() {}
  overlayType = '3DColumnLayer'
  panelSize = { SecurityPersonnelColumnDiagram: [450, 152] }
  offsetSize = {} //Special modifications needed
  /**
   * Click callback
   * @param {Object} result Click on callback parameters
   */
  clickCallback(result) {
    if (!this.ueAction) {
      return
    }
    //Close the bullet box
    CommonClick.removeTipByType()
    let that = this.ueAction
    if (result.selected) {
      //Selected
      let item = BaseGisData.getItem(result.idLayer, result.idObj)
      if (!item || !item.scatterType) {
        return
      }
      console.info('Click to select the column chart', item)
      let showViews = []
      if (showViews.includes(item.scatterType)) {
        CommonClick.showView(result, that.overlayType) //测试不能聚焦
      }
      let showPanels = [item.scatterType]
      if (showPanels.includes(item.scatterType)) {
        CommonClick.showPanel(
          result.idObj,
          that.overlayType,
          item,
          that.panelSize[item.scatterType],
          that.offsetSize[item.scatterType]
        )
      }
    } else {
    }
  }
}
/** Link click */
class ODLineLayerClick {
  constructor() {}
  overlayType = 'ODLineLayer'
  panelSize = {}
  offsetSize = {} //Special modifications needed
  /**
   * Click callback
   * @param {Object} result Click on callback parameters
   */
  clickCallback(result) {
    if (!this.ueAction) {
      return
    }
    //uncheck
    CommonClick.removeTipByType()
    let that = this.ueAction
    if (result.selected) {
      //Selected
      let item = BaseGisData.getItem(result.idLayer, result.idObj)
      if (!item || !item.scatterType) {
        return
      }
      console.info('Click to select the link', item)
      let showViews = []
      if (showViews.includes(item.scatterType)) {
        CommonClick.showView(result, that.overlayType) //没试过
      }
      let showPanels = []
      if (showPanels.includes(item.scatterType)) {
        CommonClick.showPanel(
          result.idObj,
          that.overlayType,
          item,
          that.panelSize[item.scatterType],
          that.offsetSize[item.scatterType]
        )
      }
    } else {
    }
  }
}
/** Path click */
class PathLayerClick {
  constructor() {}
  overlayType = 'path'
  panelSize = {}
  offsetSize = {} //Special modifications needed
  /**
   * Click callback
   * @param {Object} result Click on callback parameters
   */
  clickCallback(result) {
    if (!this.ueAction) {
      return
    }
    //uncheck
    CommonClick.removeTipByType()
    let that = this.ueAction
    if (result.selected) {
      //Selected
      let item = BaseGisData.getPathItem(result.id)
      if (!item || !item.scatterType) {
        return
      }
      console.info('Click to select the path', item)
      let showViews = []
      if (showViews.includes(item.scatterType)) {
        CommonClick.showView(result, that.overlayType)
      }
      let showPanels = ['SecurityPersonnelColumnDiagram']
      if (showPanels.includes(item.scatterType)) {
        CommonClick.showPanel(
          result.id,
          that.overlayType,
          item,
          that.panelSize[item.scatterType],
          that.offsetSize[item.scatterType]
        )
      }
    } else {
    }
  }
}
/** Area click */
class AreaLayerClick {
  constructor() {}
  overlayType = 'area'
  panelSize = {}
  offsetSize = {} //Special modifications needed
  /**
   * Click callback
   * @param {Object} result Click on callback parameters
   */
  clickCallback(result) {
    if (!this.ueAction) {
      return
    }
    //uncheck
    CommonClick.removeTipByType()
    let that = this.ueAction
    if (result.selected) {
      //Selected
      let item = BaseGisData.getItem(result.id)
      if (!item || !item.scatterType) {
        return
      }
      console.info('Click to select the area', item)
      let showPanels = ['VideoPerimeter']
      if (showPanels.includes(item.scatterType)) {
        CommonClick.showPanel(
          result.id,
          that.overlayType,
          item,
          that.panelSize[item.scatterType],
          that.offsetSize[item.scatterType]
        )
      }
    } else {
    }
  }
}
/** Type area click */
class TypeAreaLayerClick {
  constructor() {}
  overlayType = 'typeAreaLayer'
  panelSize = {}
  offsetSize = {} //Special modifications needed
  /**
   * Click callback
   * @param {Object} result Click on callback parameters
   */
  clickCallback(result) {
    if (!this.ueAction) {
      return
    }
    //uncheck
    CommonClick.removeTipByType()
    let that = this.ueAction
    if (result.selected) {
      //selected
      let item = BaseGisData.getItem(result.idLayer, result.idObj)
      if (!item || !item.scatterType) {
        return
      }
      console.info('Click to select the type area', item)
      let showPanels = ['VideoPerimeter']
      if (showPanels.includes(item.scatterType)) {
        CommonClick.showPanel(
          result.id,
          that.overlayType,
          item,
          that.panelSize[item.scatterType],
          that.offsetSize[item.scatterType]
        )
      }
    } else {
    }
  }
}
/** Scatter click */
class TrailLayerClick {
  constructor() {}
  overlayType = 'trailLayer'
  /**
   * Click callback
   * @param {Object} result Click on callback parameters
   */
  clickCallback(result) {
    if (!this.ueAction) {
      return
    }
    let that = this.ueAction
    //Close the bullet box
    CommonClick.removeTipByType()
    if (result.selected) {
      //Selected
      let item = BaseGisData.getItem(result.idLayer, result.idObj)
      if (!item || !item.scatterType) {
        return
      }
      let showPanels = [item.scatterType]
      if (showPanels.includes(item.scatterType)) {
        setTimeout(() => {
          CommonClick.showPanel(result.idObj, that.overlayType, item)
        }, 1000)
      }
      if (
        showPanels != 'Expert Team' &&
        showPanels != 'Fire Truck' &&
        showPanels != 'Ambulance' &&
        showPanels != 'Transport Vehicle' &&
        showPanels != 'Police' &&
        showPanels != 'Firefighter' &&
        showPanels != 'Medical Personnel'
      ) {
        appInstance.uniCall(
          'setCamera',
          {
            centerCoord: item.coord,
            coordType: 0,
            coordTypeZ: 0,
            coordZ: 10,
            distance: 300,
            heading: 253,
            pitch: 47,
            result: 1,
            fly: true,
            duration: 1,
          },
          (res) => {
            console.log(res)
          }
        )
      }
    }
  }
}
export {
  CommonClick,
  LandmarkLayerClick,
  BarLayerClick,
  ODLineLayerClick,
  PathLayerClick,
  AreaLayerClick,
  TypeAreaLayerClick,
  TrailLayerClick,
}
