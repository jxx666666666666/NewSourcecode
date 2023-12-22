import Path from './Path'
import Camera from './Camera'
import BarLayer from './BarLayer'
import Area from './Area'
import Marker3D from './Marker3D'
import Bubble from './Bubble'
import ODLineLayer from './ODLineLayer'
import TrailLayer from './TrailLayer'
import Model from './Model'
import OverlayTip from './OverlayTip'
import TypeAreaLayer from './TypeAreaLayer'

let TimerList = {}
let blinkingModelList = []
let Common = {

  switchScene(name) {
    appInstance.uniCall(
      'switchScene',
      {
        name: name,
        duration: 1,
      },
      (res) => {
        console.log('切换场景', name, res)
      }
    )
  },
  removeOverlay(params) {
    window.appInstance.uniCall(
      'removeOverlay',
      {
        id: params.id,
        overlayType: params.overlayType,
      },
      (res) => {
        console.log(`删除图层`, params, res)
      }
    )
  },
  clearOverlayType(type) {
    //TrailLayer.clearTrailLayerTimers()
    window.appInstance.uniCall(
      'clearOverlayType',
      {
        overlayType: type,
      },
      (res) => {
        console.log(`清空图层${type}`, res)
      }
    )
  },
  setLayerVisible(layer, isVisible = true) {
    if (!layer) {
      return
    }
    window.appInstance.uniCall(
      'setOverlayVisibility',
      {
        id: layer.id,
        overlayType: layer.layerConfig.layerType,
        visible: isVisible,
      },
      (res) => {
        console.log(`设置图层显隐-${layer.id}-${isVisible}`, res)
      }
    )
  },
  clearTrailTimer() {
    TrailLayer.clearTrailLayerTimers()
  },
  //Add Get Point Event
  addOnSceneClick(callback) {
    //Obtaining Points
    window.appInstance.uniCall(
      'addEventListener',
      {
        eventName: 'onSceneClick', // Scene click event
        callback: callback, // To register event listening callback functions, multiple callback functions can be registered for the same event. Note that this callback function corresponds to the callback function at the time of the event represented by the first parameter, and should be distinguished from the callback function completed by this addEventListener call.
      },
      (result) => {
        console.log(result, 'Data to be viewed')
      }
    )
  },
  //Remove Point Event
  removeOnSceneClick(callback) {
    window.appInstance.uniCall(
      'removeEventListener',
      {
        eventName: 'onSceneClick', // The event name is shown in the Unified API Development Manual on the official website of Guanguan
        callback: callback, // The event listener callback function to be unregistered cannot be an Anonymous function. If this parameter is not provided, all callback functions on the specified event will be unregistered. Note that this callback function should be distinguished from the callback function completed by this addEventListener call
      },
      (result) => {
        console.log(result)
      }
    )
  },
  //Scattering positions and playing cards
  fixedPointAndPopup(info) {
    window.appInstance.uniCall('clickOverlay', {
      id: info.idObj,
      ids: [],
      overlayType: info.overlayType,
      idLayer: info.idLayer,
      selected: true,
    })
    Camera.focusByLayer({
      id: info.idObj,
      idLayer: info.idLayer,
      layerType: info.overlayType,
      distance: info.distance,
    })
    OverlayTip.addOverLayTip(info)
  },
}
export default {
  ODLineLayer,
  Path,
  Camera,
  BarLayer,
  Area,
  Marker3D,
  Bubble,
  TrailLayer,
  Common,
  TimerList,
  Model,
  OverlayTip,
  TypeAreaLayer,
}
