import panelConfig from '../configs/panelConfig'
export default class overlayTip {
  static layerType = '' // Last added tip
  static addOverLayTip(res) {
    // Sign Exclusion
    if (this.layerType) {
      window.appInstance.uniCall('removeOverlayTip', {
        ...this.layerType,
      })
    }
    let info = panelConfig.getPanelIfon(res)
    window.appInstance.uniCall(
      'addOverlayTip',
      {
        id: info.idObj,
        url: info.url || '',
        divId: info.divId || '',
        // Resolution reason: All configurations here are reduced by 2 times
        size: info.size,
        offset: info.offset,
        overlayType: info.layerType,
        isShowClose: info.closePanelFlag,
      },
      (res) => {
        console.log(res)
      }
    )
    this.layerType = {
      overlayType: info.layerType,
      id: info.idObj,
    }
  }
  static removeOverLayTip() {
    if (this.layerType) {
      window.appInstance.uniCall('removeOverlayTip', {
        ...this.layerType,
      })
    }
  }
}
