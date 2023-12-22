export default {
  topic: "ChengShiGuiHua",
  legendCtrl: "ChengShiGuiHua",
  commonLayers: [],
  defaultView: {
    sceneName: "KNY",
  },
  cardNames: {
    ChengShiGuiHua: {
      cardShowLegends: [

        "Advertisement Displa"

      ],
      cardShowLayers: [
        "DengganIcon",
        // "import_marks"
      ],
    },

  },
  allLayers: {

    "Advertisement Displa": [{
      id: "ChengShiGuiHua-AdvertisementDispla",
      layerType: "LandmarkMap",
      scatterType: "Advertisement Displa",
      isClick: true,
      coordZ: 0,
      jsonPath: "./data/ZhiHuiDengGan/Advertisement.json",
      legend: {
        name: "AdvertisementDispla",
        color: "#ffff",
        iconName: "custom-Advertisement",
      },
    },],

  },
};