export default {
  topic: "ZhiHuiGuanLang",
  legendCtrl: "ZhiHuiGuanLang",
  commonLayers: [],
  defaultView: {
    sceneName: "KNY",
  },
  cardNames: {
    ZhiHuiGuanLang: {
      cardShowLegends: [
        "Parking Lot",
        "Camera",
        "Advertisement Displa",
        "Security Incident",

      ],
      cardShowLayers: [
        "DengganIcon",
        // "import_marks"
      ],
    },

  },
  allLayers: {
    "Advertisement Displa": [{
      id: "Advertisement-AdvertisementDispla",
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
    "Parking Lot": [{
      id: "ZhiHuiGuanLang-ParkingLot1",
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
    "Shelter": [{
      id: "ScatterPoint-Shelter",
      layerType: "LandmarkMap",
      scatterType: "Shelter",
      isClick: true,
      coordZ: 0,
      jsonPath: "./data/GongGongAnQuan/Shelter.json",
      legend: {
        name: "Shelter",
        color: "#ffff",
        iconName: "custom-Shelter",
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
    "Enterprise": [{
      id: "ScatterPoint-Enterprise",
      layerType: "LandmarkMap",
      scatterType: "Enterprise",
      isClick: true,
      coordZ: 0,
      jsonPath: "./data/GongGongAnQuan/Enterprise.json",
      legend: {
        name: "Enterprise",
        color: "#ffff",
        iconName: "custom-Enterprise"
      },
    }],
    Camera: [{
      id: "ZhiHuiGuanLang-CameraGA",
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
    "Key Project": [{
      id: "ScatterPoint-KeyProject",
      layerType: "LandmarkMap",
      scatterType: "Key Project",
      isClick: true,
      coordZ: 0,
      jsonPath: "./data/GongGongAnQuan/Key_Project.json",
      legend: {
        name: "KeyProject",
        color: "#ffff",
        iconName: "custom-KeyProject",
      },
    },],
    "Smart Light Pole Weather Sensor": [{
      id: "ScatterPoint-SmartLightPoleWeatherSensorGA",
      layerType: "LandmarkMap",
      scatterType: "Smart Light Pole Weather Sensor",
      isClick: true,
      coordZ: 0,
      jsonPath: "./data/ZhiHuiDengGan/SmartLight.json",
      legend: {
        name: "SmartLightPoleWeatherSensor",
        color: "#ffff",
        iconName: "custom-WeatherSensor"
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
    "Security Incident": [{
      id: "Security-SecurityIncident",
      layerType: "LandmarkMap",
      scatterType: "Security Incident",
      isClick: true,
      coordZ: 0,
      jsonPath: "./data/GongGongAnQuan/Safety_Production_Accident.json",
      legend: {
        name: "SecurityIncident",
        color: "#ffff",
        iconName: "custom-SecurityIncident"
      },
    },],
    "Police Situation": [{
      id: "ScatterPoint-PoliceSituation",
      layerType: "LandmarkMap",
      scatterType: "Police Situation",
      isClick: true,
      coordZ: 0,
      jsonPath: "./data/GongGongAnQuan/Polic_Situation.json",
      legend: {
        name: "PoliceSituation",
        color: "#ffff",
        iconName: "custom-PoliceSituation"
      },
    },],

  },
};