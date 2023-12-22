export default {
  topic: 'zhaoshangyunxing',
  legendCtrl: 'zhaoshangyunxing',
  commonLayers: ['ParkingSpace'],
  defaultView: {
    sceneName: 'KNY',
    scatterView: {
      coordZ: 17,
      distance: 500,
      heading: 293,
      pitch: 17,
    },
    cameraName: '',
  },
  cardNames: {
    zhaoshangyunxing: {
      cardShowLegends: [
        'Leased Place Locations',
        'Key Project',
        'Enterprise',
        'Camera',
        'Alarm',
        'Pilot community',
        'weather sensor',
      ],
      cardShowLayers: [
        'DengganIcon',
        // "import_marks"
      ],
    },
  },
  allLayers: {
    Entersssprise: [
      {
        id: 'ScatterPoint-SmartLampPolelampZSYY',
        layerType: 'LandmarkMap',
        scatterType: 'Enterprise',
        isClick: true,
        coordZ: 0,
        jsonPath: './data/ZhiHuiDengGan/SmartPoleSites.json',
        // legend: {
        //     name: "SmartLampPolelamp",
        //     color: "#ffff",
        //     iconName: "custom-dengganIcon",
        // }
        legend: [
          {
            name: 'SmartLampPolelamp',
            color: '#ffff',
            iconName: 'custom-Enterprise',
          },
          {
            name: 'SmartLampPolelamp_grey',
            color: '#ffff',
            iconName: 'custom-grey',
          },
          {
            name: 'SmartLampPolelamp_red',
            color: '#ffff',
            iconName: 'custom-red',
          },
          {
            name: 'SmartLampPolelamp_orange',
            color: '#ffff',
            iconName: 'custom-orange',
          },
          {
            name: 'SmartLampPolelamp_brown',
            color: '#ffff',
            iconName: 'custom-brown',
          },
        ],
      },
    ],
    'Leased Place Locations': [
      {
        id: 'ScatterPoint-LeasedPlaceLocations',
        layerType: 'LandmarkMap',
        scatterType: 'Leased Place Locations',
        isClick: true,
        coordZ: 0,
        jsonPath: './data/ZhaoShangYunXing/LeasedPlaceLocations.json',
        legend: {
          name: 'LeasedPlace',
          color: '#ffff',

          iconName: 'custom-LeasedPlace',
        },
      },
    ],
    Enterprise: [
      {
        id: 'ScatterPoint-Enterprise',
        layerType: 'LandmarkMap',
        scatterType: 'Enterprise',
        isClick: true,
        coordZ: 0,
        jsonPath: './data/GongGongAnQuan/Enterprise.json',
        legend: {
          name: 'Enterprise',
          color: '#ffff',
          iconName: 'custom-Enterprise',
        },
      },
    ],
    Alarm: [
      {
        id: 'ScatterPoint-Alarm',
        layerType: 'LandmarkMap',
        scatterType: 'Alarm',
        isClick: true,
        coordZ: 0,
        jsonPath: './data/ZhaoShangYunXing/Alarm.json',
        legend: {
          name: 'Alarm',
          color: '#ffff',
          iconName: 'custom-Alarm',
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
        id: 'ScatterPoint-DeviceAlarmZSYX',
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
        id: 'BubbleAlarmPointZSYX',
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
        id: 'ScatterPoint-CameraZSYY',
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
    'Key Project': [
      {
        id: 'ScatterPoint-KeyProjectZSYX',
        layerType: 'LandmarkMap',
        scatterType: 'Key Project',
        isClick: true,
        coordZ: 0,
        jsonPath: './data/GongGongAnQuan/Key_Project.json',
        legend: {
          name: 'KeyProject',
          color: '#ffff',
          iconName: 'custom-KeyProject',
        },
      },
    ],
    'Pilot community': [
      {
        id: 'ScatterPoint-Pilotcommunity',
        layerType: 'LandmarkMap',
        scatterType: 'Pilot community',
        isClick: true,
        coordZ: 0,
        jsonPath: './data/ZhiHuiDengGan/SmartLight.json',
        legend: {
          name: 'Pilot',
          color: '#ffff',
          iconName: 'custom-Pilot',
        },
      },
    ],

    'weather sensor': [
      {
        id: 'weathersensor',
        layerType: 'LandmarkMap',
        scatterType: 'weather sensor',
        isClick: true,
        coordZ: 0,
        jsonPath: './data/ZhaoShangYunXing/weather.json',
        legend: {
          name: 'weather',
          color: '#ffff',
          iconName: 'custom-weather',
        },
      },
    ],
    'Police Situation': [
      {
        id: 'ScatterPoint-PoliceSituationZSYX',
        layerType: 'LandmarkMap',
        scatterType: 'Police Situation',
        isClick: true,
        coordZ: 0,
        jsonPath: './data/GongGongAnQuan/Polic_Situation.json',
        legend: {
          name: 'PoliceSituation',
          color: '#ffff',
          iconName: 'custom-PoliceSituation',
        },
      },
    ],
  },
}
