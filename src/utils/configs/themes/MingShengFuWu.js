export default {
  topic: 'MingShengFuWu',
  legendCtrl: 'MingShengFuWu',
  commonLayers: [],
  defaultView: {
    sceneName: 'KNY',
  },
  cardNames: {
    MingShengFuWu: {
      cardShowLegends: [
        'Hospital',
        'School',
        'Nursing Home',
        'Police Station',
        'Government Agency',
      ],
      cardShowLayers: ['DengganIcon'],
    },
  },
  allLayers: {
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
    Hospital: [
      {
        id: 'MingShengFuWu-Hospital',
        layerType: 'LandmarkMap',
        scatterType: 'Hospital',
        isClick: true,
        coordZ: 0,
        jsonPath: './data/MingShengFuWu/Hospital.json',
        legend: {
          name: 'Hospital',
          color: '#ffff',
          iconName: 'custom-Hospital',
        },
      },
    ],
    School: [
      {
        id: 'MingShengFuWu-School',
        layerType: 'LandmarkMap',
        scatterType: 'School',
        isClick: true,
        coordZ: 0,
        jsonPath: './data/MingShengFuWu/School.json',
        legend: {
          name: 'School',
          color: '#ffff',
          iconName: 'custom-School',
        },
      },
    ],
    'Nursing Home': [
      {
        id: 'MingShengFuWu-NursingHome',
        layerType: 'LandmarkMap',
        scatterType: 'Nursing Home',
        isClick: true,
        coordZ: 0,
        jsonPath: './data/MingShengFuWu/NursingHome.json',
        legend: {
          name: 'NursingHome',
          color: '#ffff',
          iconName: 'custom-NursingHome',
        },
      },
    ],
    'Police Station': [
      {
        id: 'MingShengFuWu-PoliceStation',
        layerType: 'LandmarkMap',
        scatterType: 'Police Station',
        isClick: true,
        coordZ: 0,
        jsonPath: './data/MingShengFuWu/PoliceStation.json',
        legend: {
          name: 'PoliceStation',
          color: '#ffff',
          iconName: 'custom-PoliceStation',
        },
      },
    ],
    'Government Agency': [
      {
        id: 'MingShengFuWu-GovernmentAgency',
        layerType: 'LandmarkMap',
        scatterType: 'Government Agency',
        isClick: true,
        coordZ: 0,
        jsonPath: './data/MingShengFuWu/GovernmentAgency.json',
        legend: {
          name: 'GovernmentAgency',
          color: '#ffff',
          iconName: 'custom-GovernmentAgency',
        },
      },
    ],
  },
}
