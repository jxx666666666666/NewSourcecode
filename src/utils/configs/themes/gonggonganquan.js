export default {
  topic: "gonggonganquan",
  legendCtrl: "gonggonganquan",
  commonLayers: ["ParkingSpace"],
  defaultView: {
    sceneName: "KNY",
  },
  cardNames: {
    gonggonganquan: {
      cardShowLegends: [
        "Shelter",
        "Enterprise",
        "Smart Light Pole Weather Sensor",
        "Key Project",
        "Security Incident",
        "Police Situation",

      ],
      cardShowLayers: [
        "DengganIcon",
        // "import_marks"
      ],
    },

  },
  allLayers: {
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
      id: "ScatterPoint-CameraGA",
      layerType: "LandmarkMap",
      scatterType: "Camera",
      isClick: true,
      coordZ: 0,
      jsonPath: "./data/GongGongAnQuan/Camera.json",
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
      id: "ScatterPoint-SecurityIncident",
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