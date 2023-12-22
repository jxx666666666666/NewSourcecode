export default {
  topic: 'ChengShiQuanJing',
  legendCtrl: 'ChengShiQuanJing',
  commonLayers: [],
  defaultView: {
    sceneName: 'KNY',
  },
  cardNames: {
    ChengShiQuanJing: {
      cardShowLegends: [
        'Camera Location',
        'Public Security Police Situation Point',
        'Alarm Event Point',
        'Historical Event Point',
        'Enterprise Location',
      ],
      cardShowLayers: ['DengganIcon'],
    },
    CityGDP: {
      cardShowLegends: [],
      cardShowLayers: ['GDPColumnLayer'],
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
    'Camera Location': [
      {
        id: 'ChengShiQuanJing-CameraLocation',
        layerType: 'LandmarkMap',
        scatterType: 'Camera Location',
        isClick: true,
        coordZ: 0,
        jsonPath: './data/ChengShiQuanJing/CameraLocation.json',
        legend: {
          name: 'CameraLocation',
          color: '#ffff',
          iconName: 'custom-CameraLocation',
        },
      },
    ],
    'Public Security Police Situation Point': [
      {
        id: 'ChengShiQuanJing-PublicSecurityPolice',
        layerType: 'LandmarkMap',
        scatterType: 'Public Security Police Situation Point',
        isClick: true,
        coordZ: 0,
        jsonPath: './data/ChengShiQuanJing/PublicSecurityPolice.json',
        legend: {
          name: 'PublicSecurityPolice',
          color: '#ffff',
          iconName: 'custom-PublicSecurityPolice',
        },
      },
    ],
    'Alarm Event Point': [
      {
        id: 'ChengShiQuanJing-AlarmEventPoint',
        layerType: 'LandmarkMap',
        scatterType: 'Alarm Event Point',
        isClick: true,
        coordZ: 0,
        jsonPath: './data/ChengShiQuanJing/AlarmEventPoint.json',
        legend: {
          name: 'AlarmEventPoint',
          color: '#ffff',
          iconName: 'custom-AlarmEventPoint',
        },
      },
    ],
    'Historical Event Point': [
      {
        id: 'ChengShiQuanJing-HistoricalEventPoint',
        layerType: 'LandmarkMap',
        scatterType: 'Historical Event Point',
        isClick: true,
        coordZ: 0,
        jsonPath: './data/ChengShiQuanJing/HistoricalEventPoint.json',
        legend: {
          name: 'HistoricalEventPoint',
          color: '#ffff',
          iconName: 'custom-HistoricalEventPoint',
        },
      },
    ],
    'Enterprise Location': [
      {
        id: 'ChengShiQuanJing-EnterpriseLocation',
        layerType: 'LandmarkMap',
        scatterType: 'Enterprise Location',
        isClick: true,
        coordZ: 0,
        jsonPath: './data/ChengShiQuanJing/EnterpriseLocation.json',
        legend: {
          name: 'EnterpriseLocation',
          color: '#ffff',
          iconName: 'custom-EnterpriseLocation',
        },
      },
    ],
    GDPColumnLayer: [
      {
        id: 'ChengShiQuanJing-GDPColumnLayer',
        name: 'GDPColumnLayer',
        layerType: 'Histogram',
        scatterType: 'GDPColumnLayer',
        isClick: true,
        coordType: 0,
        coordTypeZ: 0,
        coordZ: 0,
        columnType: 'cylinder',
        columnMinHeight: 10,
        columnMaxHeight: 300,
        columnAlpha: 1,
        columnPaint: 'solid',
        columnGap: 0,
        columnWidth: 30,
        colorMax: '#FF2626',
        colorMin: '#FFFF00',
        valueMax: 250,
        valueMin: 10,
        labelColor: '#ffffff',
        labelBackgroundColor: '#333333',
        visible: true,
        pointDataId: 'pointDataId',
        jsonPath: './data/ChengShiQuanJing/GDPColumnLayer.json',
      },
    ],
  },
}
