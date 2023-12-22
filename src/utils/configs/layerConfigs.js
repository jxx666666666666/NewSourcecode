import CameraInfos from './cameraInfos'
import SceneInfos from './sceneInfos'

class LayerConfigs {
  cameraInfos = CameraInfos
  sceneInfos = SceneInfos
  themes = []
  e
  commonKeys = []
  commonLayers = {
    ParkingSpace: [
      {
        id: 'Scatter - Parking Space',
        layerType: 'LandmarkMap',
        scatterType: 'Parking space',
        coordZ: 0,
        isClick: true,
        jsonPath: './data/ZongTiTaiShi/ParkingSpace.json',
        legend: {
          name: 'chewei',
          color: '#ffff',
          iconName: 'chewei',
        },
      },
    ],
    FaceRecognitionGate: [
      {
        id: 'ScatterPoint-FaceRecognitionGate',
        layerType: 'LandmarkMap',
        scatterType: 'FaceRecognitionGate',
        coordZ: 0,
        isClick: true,
        jsonPath: './data/ZongHeAnFang/FaceRecognitionGate.json',
        legend: {
          name: 'renlianshibiezhaji',
          color: '#ffff',
          iconName: 'renlianshibiezhaji',
        },
      },
    ],
  }
  constructor() {
    this.init()
  }
  init() {
    const files = require.context('@/utils/configs/themes', true, /\.js$/)
    files.keys().forEach((key) => {
      let theme = files(key).default
      theme.layers = []
      for (const item in theme.allLayers) {
        theme.allLayers[item].forEach((layer) => {
          layer.status = 'false'
          theme.layers.push(layer)
        })
      }
      if (Array.isArray(theme.commonLayers)) {
        theme.commonLayers.forEach((item) => {
          this.commonLayers[item].forEach((layer) => {
            layer.status = 'false'
            this.commonKeys.push(layer.scatterType)
            theme.layers.push(layer)
          })
          theme.allLayers[item] = this.commonLayers[item]
        })
      }

      this.themes.push(theme)
    })
  }
}

let layerConfigs = new LayerConfigs()
export default layerConfigs

let example = {
  topic: 'zhihuidenggan', //Need to be consistent with the routing configuration name
  defaultView: {
    sceneName: 'SSH',
    cameraInfo: {
      centerCoord: [113.880768, 22.881165],
      coordType: 0,
      coordTypeZ: 0,
      coordZ: 38,
      distance: 486,
      heading: 133,
      pitch: 18,
      fly: true,
      duration: 1,
    },
    scatterView: {
      coordZ: 17,
      distance: 500,
      heading: 293,
      pitch: 17,
    },
  },
  cardNames: {
    //The default card and topic names are the same
    zhihuidenggan: {
      cardShowLegends: [
        'Smart Lamp Pole/lamp',
        'Device Alarm',
        'Camera',
        'Advertisement Displa',
        'Smart Light Pole Weather Sensor',
      ], //Legend name - legendCtrls legend name - layer name in allLayers [key value] is consistent
    },
    //The default card and topic names are the same
    gonggonganquan: {
      cardShowLegends: [
        'Shelter',
        'Enterprise',
        'Camera',
        'Smart Light Pole Weather Sensor',
        'Key Project',
        'Security Incident',
        'Police Situation',
      ], //Legend name - legendCtrls legend name - layer name in allLayers [key value] is consistent
    },

    //The default card and topic names are the same
    zhaoshangyunxing: {
      cardShowLegends: [
        'Leased Place Locations',
        'Police Situation',
        'Smart Lamp Pole/lamp',
        'Camera',
        'Smart Light Pole Weather Sensor',
        'Key Project',
        'Device Alarm',
      ], //Legend name - legendCtrls legend name - layer name in allLayers [key value] is consistent
    },
    //The default card and topic names are the same
    jiaotongyunxing: {
      cardShowLegends: [
        'Leased Place Locations',
        'Police Situation',
        'Smart Lamp Pole/lamp',
        'Camera',
        'Smart Light Pole Weather Sensor',
        'Key Project',
        'Device Alarm',
      ], //Legend name - legendCtrls legend name - layer name in allLayers [key value] is consistent
    },
    QuYuQuanJing: {
      cardShowLegends: [
        'Shelter',
        'Enterprise',
        'Camera',
        'Smart Light Pole Weather Sensor',
        'Key Project',
        'Security Incident',
        'Police Situation',
      ], //Legend name - legendCtrls legend name - layer name in allLayers [key value] is consistent
    },
    ChengShiZhiLi: {
      cardShowLegends: ['Smart Light Pole Weather Sensor', 'Camera'], //Legend name - legendCtrls legend name - layer name in allLayers [key value] is consistent
    },
    ChengShiGuiHua: {
      cardShowLegends: ['Advertisement Displa'], //Legend name - legendCtrls legend name - layer name in allLayers [key value] is consistent
    },
    ZhiHuiGuanLang: {
      cardShowLegends: [
        'Parking Lot',
        'Camera',
        'Advertisement Displa',
        'Security Incident',
      ], //Legend name - legendCtrls legend name - layer name in allLayers [key value] is consistent
    },
  },
}
