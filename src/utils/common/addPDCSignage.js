import PDCSignage from '../../components/UE4Panel/PDCSignage.vue'
import createPanel from '../../utils/configs/createPanel'
// import overlayTip from "../GisManagers/OverlayTip";
export default class addPDCSignage {
  static addpoint () {
    let jsonData = {
      id: 'pdcpanelid',
      scatterType: "PDCSignage",
      name: 'pdcpanel',
      coordType: 0,
      coordTypeZ: 0,
      autoScale: false,
      visible: true,
      legends: [
        {
          name: 'pdcpanel',
          color: '#73FFFF',
          iconName: 'custom-touming',
          iconScale: 1,
          labelScale: 1
        }
      ],

      data: [
        {
          id: 'pdcpanel',
          type: 'pdcpanel',
          label: '',
          coord: [37.16963878275, -1.69626141018], //以深圳湾经纬度为例
          coordZ: 18,
        }
      ],
    };

    appInstance.uniCall('addLandmarkLayer', jsonData, (result) => {
      console.log(result, '添加成功');
      this.addtip()
    });
  }
  static addtip () {
    let info = createPanel.getDivId(PDCSignage, { id: 'pdcpanel' })
    let jsonData = {
      id: 'pdcpanel',
      url: '',
      divId: info,
      size: [210, 60],
      offset: [-180, 10],
      isShowClose: false,
      overlayType: 'landmarkLayer',
    };

    appInstance.uniCall('addOverlayTip', jsonData, (result) => {
      console.log(result);
    });
  }
}