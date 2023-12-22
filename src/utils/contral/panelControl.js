/*
 * @Author: yejinliang
 * @Date: 2022-05-27 00:24:38
 * @LastEditTime: 2022-05-27 02:16:59
 * @LastEditors: yejinliang
 * @Description: 3Extension of maintenance label pop-up window Vue
 */
import Vue from 'vue'
import router from '../../router'
import store from '../../store'
import UEapis from '../GisManagers/UEapi'
import PathMark from '../GisManagers/PathMark'
export default class panelControl {
  static domInstance = null
  static create(domId, com, info, changjing2, type, opts = {}) {
    // If there are instances, destroy them first
    if (changjing2 != 1) {
      panelControl.destroy()
    }
    const instance = Vue.extend(com)
    panelControl.domInstance = new instance({
      ...opts,
      store,
      router,
    }).$mount()
    panelControl.domType = type
    panelControl.domInstance.$el.id = domId
    panelControl.domInstance.$el.style.position = 'absolute'
    // panelControl.domInstance.$el.style.left = '-9999999px'
    document.body.append(panelControl.domInstance.$el)
    // After requesting data and obtaining it, bind it to the corresponding props
    // panelControl.domInstance.$props['rightList'||'listvalue'] = info.papanls;
    panelControl.domInstance.$props.info = info
    // Listening for events of component $exit
    panelControl.domInstance.$on('onClose', () => {
      if (changjing2 != 1) {
        UEapis.OverlayTip.removeOverLayTip()
        panelControl.destroy()
        if (panelControl.domType == 'model') {
          let modelTip = store.state.modelTip

          window.appInstance.uniCall('removeModelTip', {
            modelTip,
          })
          window.appInstance.uniCall('clearModelSelected', {})
        } else {
          window.appInstance.uniCall('clearOverlaySelected', {})
        }
      }
    })
    return panelControl.domInstance.$el
  }
  static destroy() {
    if (panelControl.domInstance) {
      panelControl.domInstance.$destroy && panelControl.domInstance.$destroy()
      panelControl.domInstance.$el &&
        panelControl.domInstance.$el.parentNode &&
        panelControl.domInstance.$el.parentNode.removeChild(
          panelControl.domInstance.$el
        )

      //Current alarm information, cancel the highlighted chart setting
      if (store.state.otherObj && store.state.otherObj.type == 'Current alarm information') {
        store.state.highLight = store.state.subTopic
      }
      //Path inspection and judgment
      let flag = PathMark.getCameraPathingState()
      if (!flag) {
        //Restore location
        // window.appInstance.uniCall(
        //   'setCamera',
        //   CameraList[store.state.cameraInfo]
        // )
      }
    }
    panelControl.domInstance = null
  }
}
