export default {
  topic: "jiaotongyunxing",
  legendCtrl: "jiaotongyunxing",
  commonLayers: ["ParkingSpace"],
  defaultView: {
    sceneName: "SmartPole",
    scatterView: {
      coordZ: 17,
      distance: 500,
      heading: 293,
      pitch: 17,
    },
  },
  cardNames: {
    jiaotongyunxing: {
      cardShowLegends: [
        "Parking Lot",
        "Camera",
        "Checkpoint",
        "Traffic Incident",
      ],
      cardShowLayers: [
        "DengganIcon",
        // "import_marks"
      ],
    },

  },
  allLayers: {
    "Parking Lot": [{
      id: "ScatterPoint-ParkingLot",
      layerType: "LandmarkMap",
      scatterType: "Parking Lot",
      isClick: true,
      coordZ: 0,
      jsonPath: "./data/ZhaoShangYunXing/LeasedPlaceLocations.json",
      legend: {
        name: "ParkingLot",
        color: "#ffff",
        iconName: "custom-ParkingLot",
      }

    },],
    "DengganIcon": [{
      id: "Model-DengganIcon",
      layerType: "Model",
      scatterType: "DengganIcon",
      isClick: true,
      coordZ: 0,
      jsonPath: "./data/ZhiHuiDengGan/SmartPoleSites.json",
      legend: {
        name: "DengganIcon",
        color: "#ffff",
        iconName: "custom-dengganIcon",
      },
    },],

    "Camera": [{
      id: "ScatterPoint-CameraJTYX",
      layerType: "LandmarkMap",
      scatterType: "Camera",
      isClick: true,
      coordZ: 0,
      jsonPath: "./data/ZhiHuiDengGan/Camera.json",
      legend: {
        name: "Camera",
        color: "#ffff",
        iconName: "custom-Camera"
      },
    },],
    "Checkpoint": [{
      id: "ScatterPoint-Checkpoint",
      layerType: "LandmarkMap",
      scatterType: "Checkpoint",
      isClick: true,
      coordZ: 0,
      jsonPath: "./data/JiaoTongYunXing/Checkpoint.json",
      legend: {
        name: "Checkpoint",
        color: "#ffff",
        iconName: "custom-Checkpoint",
      },
    },],
    "Traffic Incident": [{
      id: "ScatterPoint-TrafficIncident",
      layerType: "LandmarkMap",
      scatterType: "Traffic Incident",
      isClick: true,
      coordZ: 0,
      jsonPath: "./data/ZhiHuiDengGan/SmartLight.json",
      legend: {
        name: "TrafficIncident",
        color: "#ffff",
        iconName: "custom-TrafficIncident"
      },
    },],
    "import_marks": [{
      id: "keniya",
      layerType: "LandmarkMap",
      scatterType: "import_marks",
      isClick: true,
      coordZ: 0,
      jsonPath: "./data/common/keniya.json",
      legend: {
        name: "keniya",
        color: "#ffff",
        iconName: "custom-Konza"
      },
    },
    {
      id: "build",
      layerType: "LandmarkMap",
      scatterType: "import_marks",
      isClick: true,
      coordZ: 0,
      jsonPath: "./data/common/build.json",
      legend: {
        name: "build",
        color: "#ffff",
        iconName: "custom-KonzaComplex"
      },
    },
    ],


  },
};