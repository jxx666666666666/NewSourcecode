export default {
  topic: 'zhihuidenggan',
  legendCtrl: 'zhihuidenggan',
  commonLayers: ['ParkingSpace'],
  defaultView: {
    sceneName: 'KNY',
  },
  cardNames: {
    zhihuidenggan: {
      cardShowLegends: [
        'Device Alarm',
        'Camera',
        'Advertisement Displa',
        'Smart Light Pole Weather Sensor',
        'Konza data center',
      ],
      cardShowLayers: [
        'DengganIcon',
        // "import_marks"
      ],
    },
    onLineLamp: {
      cardShowLegends: [],
      cardShowLayers: ['onLineLamp'],
    },
    offLineLamp: {
      cardShowLegends: [],
      cardShowLayers: ['offLineLamp'],
    },
    onLineAdvertisement: {
      cardShowLegends: [],
      cardShowLayers: ['onLineAdvertisement'],
    },
    offLineAdvertisement: {
      cardShowLegends: [],
      cardShowLayers: ['offLineAdvertisement'],
    },
    planLamp: {
      cardShowLegends: [],
      cardShowLayers: ['planLamp'],
    },
    planAdvertisement: {
      cardShowLegends: [],
      cardShowLayers: ['planAdvertisement'],
    },
  },
  allLayers: {
    'Konza data center': [
      {
        id: 'Konza-data-center',
        layerType: 'LandmarkMap',
        scatterType: 'dataCenter',
        isClick: true,
        coordZ: 0,
        jsonPath: './data/ZhiHuiDengGan/dataCenter.json',
        legend: {
          name: 'dataCenter',
          color: '#ffff',
          iconName: 'custom-dataCenter',
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
    'Device Alarm': [
      {
        id: 'ScatterPoint-DeviceAlarm',
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
        id: 'BubbleAlarmPoint',
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
    Camera: [
      {
        id: 'ScatterPoint-Camera',
        layerType: 'LandmarkMap',
        scatterType: 'Camera',
        isClick: true,
        coordZ: 0,
        jsonPath: './data/ZhiHuiDengGan/Camera.json',
        legend: {
          name: 'Camera',
          color: '#ffff',
          iconName: 'custom-Camera',
        },
      },
    ],
    'Advertisement Displa': [
      {
        id: 'ScatterPoint-AdvertisementDispla',
        layerType: 'LandmarkMap',
        scatterType: 'Advertisement Displa',
        isClick: true,
        coordZ: 0,
        jsonPath: './data/ZhiHuiDengGan/Advertisement.json',
        legend: {
          name: 'AdvertisementDispla',
          color: '#ffff',
          iconName: 'custom-Advertisement',
        },
      },
    ],
    'Smart Light Pole Weather Sensor': [
      {
        id: 'ScatterPoint-SmartLightPoleWeatherSensor',
        layerType: 'LandmarkMap',
        scatterType: 'Smart Light Pole Weather Sensor',
        isClick: true,
        coordZ: 0,
        jsonPath: './data/ZhiHuiDengGan/SmartLight.json',
        legend: {
          name: 'SmartLightPoleWeatherSensor',
          color: '#ffff',
          iconName: 'custom-WeatherSensor',
        },
      },
    ],
    import_marks: [
      {
        id: 'keniya',
        layerType: 'LandmarkMap',
        scatterType: 'import_marks',
        isClick: true,
        coordZ: 0,
        jsonPath: './data/common/keniya.json',
        legend: {
          name: 'keniya',
          color: '#ffff',
          iconName: 'custom-Konza',
        },
      },
      {
        id: 'build',
        layerType: 'LandmarkMap',
        scatterType: 'import_marks',
        isClick: true,
        coordZ: 0,
        jsonPath: './data/common/build.json',
        legend: {
          name: 'build',
          color: '#ffff',
          iconName: 'custom-KonzaComplex',
        },
      },
    ],
    onLineLamp: [
      {
        id: 'onLineLamp',
        layerType: 'LandmarkMap',
        scatterType: 'onLineLamp',
        isClick: true,
        coordZ: 0,
        jsonPath: './data/ZhiHuiDengGan/SmartLampOnline.json',
        legend: {
          name: 'online',
          color: '#ffff',
          iconName: 'custom-online',
        },
      },
    ],
    offLineLamp: [
      {
        id: 'offLineLamp',
        layerType: 'LandmarkMap',
        scatterType: 'offLineLamp',
        isClick: true,
        coordZ: 0,
        jsonPath: './data/ZhiHuiDengGan/SmartLampOffline.json',
        legend: {
          name: 'offline',
          color: '#ffff',
          iconName: 'custom-offline',
        },
      },
    ],
    planLamp: [
      {
        id: 'planLamp',
        layerType: 'LandmarkMap',
        scatterType: 'planLamp',
        isClick: true,
        coordZ: 0,
        jsonPath: './data/ZhiHuiDengGan/SmartLampPlan.json',
        legend: {
          name: 'planLamp',
          color: '#ffff',
          iconName: 'custom-plan',
        },
      },
    ],
    onLineAdvertisement: [
      {
        id: 'onLineAdvertisement',
        layerType: 'LandmarkMap',
        scatterType: 'offLineAdvertisement',
        isClick: true,
        coordZ: 0,
        jsonPath: './data/ZhiHuiDengGan/AdvertisementOnline.json',
        legend: {
          name: 'onLineAdvertisement',
          color: '#ffff',
          iconName: 'custom-online',
        },
      },
    ],
    offLineAdvertisement: [
      {
        id: 'offLineAdvertisement',
        layerType: 'LandmarkMap',
        scatterType: 'offLineAdvertisement',
        isClick: true,
        coordZ: 0,
        jsonPath: './data/ZhiHuiDengGan/AdvertisementOffline.json',
        legend: {
          name: 'offLineAdvertisement',
          color: '#ffff',
          iconName: 'custom-offline',
        },
      },
    ],
    planAdvertisement: [
      {
        id: 'planAdvertisement',
        layerType: 'LandmarkMap',
        scatterType: 'planAdvertisement',
        isClick: true,
        coordZ: 0,
        jsonPath: './data/ZhiHuiDengGan/AdvertisementPlan.json',
        legend: {
          name: 'planAdvertisement',
          color: '#ffff',
          iconName: 'custom-plan',
        },
      },
    ],
  },
}
