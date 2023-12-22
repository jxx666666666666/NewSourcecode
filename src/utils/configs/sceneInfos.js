export default new Map([
  [
    'songShanLake',
    {
      scene: 'SSH',
    },
  ],
  // songShanLake
  [
    'Global',
    {
      scene: 'EarthMap',
    },
  ],
  [
    'ShenGuan',
    {
      scene: 'DongGuan-L1',
      layers: [
        {
          id: 'ScatteredPoints - ShenZhenDongguanSignage',
          layerType: 'LandmarkMap',
          scatterType: 'ShenzhenDongguanSignage',
          isShowLabel: true,
          coordZ: 0,
          jsonPath: './data/QuanChengQuanWang/shenguan.json',
          legend: {
            name: 'ShenzhenDongguanSignage',
            color: '#ffff',
            iconName: 'site_01',
          },
        },
      ],
    },
  ],
]);
