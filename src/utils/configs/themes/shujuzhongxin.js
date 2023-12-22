export default {
  topic: 'shujuzhongxin',
  legendCtrl: 'shujuzhongxin',
  commonLayers: [],
  defaultView: {
    sceneName: 'KNY',
  },
  cardNames: {
    shujuzhongxin: {
      cardShowLegends: [
        'Camera',
        'Device Alarm',
        'Air Conditioner',
        'FusionModule',
        'Temperature Sensor',
        'Humidity Sensor',
      ],
      cardShowLayers: ['DengganIcon'],
    },
  },
  allLayers: {
    Camera: [
      {
        id: 'PDC_Data_Center-CameraGA',
        layerType: 'LandmarkMap',
        scatterType: 'Camera',
        isClick: true,
        coordZ: 0,
        jsonPath: './data/GongGongAnQuan/Camera.json',
        legend: {
          name: 'Camera',
          color: '#ffff',
          iconName: 'custom-Camera',
        },
      },
    ],
    'Device Alarm': [
      {
        id: 'PDC_Data_Center-DeviceAlarm',
        layerType: 'LandmarkMap',
        scatterType: 'Device Alarm',
        isClick: true,
        coordZ: 0,
        jsonPath: './data/ZhiHuiDengGan/DeviceAlarm.json',
        legend: {
          name: 'DeviceAlarm',
          color: '#ffff',
          iconName: 'custom-DeviceAlarm',
        },
      },
      {
        id: 'PDC_Data_CenterBubbleAlarmPoint',
        name: 'BubbleAlarmPoint',
        layerType: 'BubbleChart',
        speed: 50,
        radiusMax: 50,
        radiusMin: 10,
        valueMax: 10,
        valueMin: 5,
        visible: true,
        scatterType: 'AlarmPoints',
        jsonPath: './data/ZhiHuiDengGan/DeviceAlarm.json',
        coordZ: 0,
        legends: [
          {
            name: 'default',
            color: '#ff0000',
          },
        ],
      },
    ],
    'Air Conditioner': [
      {
        id: 'PDC_Data_Center-AirConditioner',
        layerType: 'LandmarkMap',
        scatterType: 'Air Conditioner',
        isClick: true,
        coordZ: 0,
        jsonPath: './data/ShuJuZhongXin/AirConditioner.json',
        legend: {
          name: 'AirConditioner',
          color: '#ffff',
          iconName: 'custom-AirConditioner',
        },
      },
    ],
    DengganIcon: [
      {
        id: 'Model-DengganIcon',
        layerType: 'Model',
        scatterType: 'DengganIcon',
        isClick: true,
        coordZ: 0,
        jsonPath: './data/ZhiHuiDengGan/SmartPoleSites.json',
        legend: {
          name: 'DengganIcon',
          color: '#ffff',
          iconName: 'custom-dengganIcon',
        },
      },
    ],
    FusionModule: [
      {
        id: 'PDC_Data_Center-FusionModule',
        layerType: 'LandmarkMap',
        scatterType: 'FusionModule',
        isClick: true,
        coordZ: 0,
        jsonPath: './data/ShuJuZhongXin/FusionModule.json',
        legend: {
          name: 'FusionModule',
          color: '#ffff',
          iconName: 'custom-FusionModule',
        },
      },
    ],
    'Temperature Sensor': [
      {
        id: 'PDC_Data_Center-TemperatureSensor',
        layerType: 'LandmarkMap',
        scatterType: 'Temperature Sensor',
        isClick: true,
        coordZ: 0,
        jsonPath: './data/ShuJuZhongXin/TemperatureSensor.json',
        legend: {
          name: 'TemperatureSensor',
          color: '#ffff',
          iconName: 'custom-TemperatureSensor',
        },
      },
    ],
    'Humidity Sensor': [
      {
        id: 'PDC_Data_Center-HumiditySensor',
        layerType: 'LandmarkMap',
        scatterType: 'Humidity Sensor',
        isClick: true,
        coordZ: 0,
        jsonPath: './data/ShuJuZhongXin/HumiditySensor.json',
        legend: {
          name: 'HumiditySensor',
          color: '#ffff',
          iconName: 'custom-HumiditySensor',
        },
      },
    ],
  },
}
