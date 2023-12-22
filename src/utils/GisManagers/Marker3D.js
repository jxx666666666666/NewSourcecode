export default class Marker3D {
  static marker3DState = "";
  static add3DMarker () {
    let config = {
      id: "3DMarker",
      coordType: 0,
      coordTypeZ: 0,
      alpha: 0.8,
      scale: 40,
      type: "Spread06",
      titleText: "",
      titleBackgroundColor: "#00000060",
      titleColor: "#ffff00",
      coord: [37.18483091133276, -1.689422666063875],
      coordZ: 60,
    };
    window.appInstance.uniCall("add3DMarker", config, (res) => { });

    let config1 = {
      id: "3DMarker1",
      coordType: 0,
      coordTypeZ: 0,
      alpha: 1,
      scale: 40,
      type: "Spread08",
      titleColor: "#70EAD7",
      titleText: "",
      titleBackgroundColor: "#00000060",
      coord: [37.18680795877488, -1.6900593134104853],
      coordZ: 60,
    };
    window.appInstance.uniCall("add3DMarker", config1, (res) => {
      this.marker3DState = "add";
    });
    let config2 = {
      id: "3DMarker2",
      coordType: 0,
      coordTypeZ: 0,
      alpha: 1,
      scale: 40,
      type: "Spread08",
      titleColor: "#70EAD7",
      titleText: "",
      titleBackgroundColor: "#00000060",
      coord: [37.16954267775, -1.69645716025],
      coordZ: 18,
    };
    window.appInstance.uniCall("add3DMarker", config2, (res) => {
      // this.marker3DState = "add";
    });
  }
  static remove3DMarker () {
    window.appInstance.uniCall(
      'clearOverlayType',
      {
        overlayType: "3DMarker",
      },
      (res) => {
        this.marker3DState = "remove";
      }
    );
  }
  static add3dMarkerIcon () {
    let jsonData = {
      id: 'landmarkLayer',
      name: 'LandmarkLayer',
      coordType: 0,
      coordTypeZ: 0,
      autoScale: false,
      visible: true,
      legends: [
        {
          name: 'keniya',
          color: '#73FFFF',
          iconName: 'custom-Konza',
        },
        {
          name: 'build',
          color: '#2626FF',
          iconName: 'custom-KonzaComplex',
        },
        {
          name: 'pdc',
          color: '#2626FF',
          iconName: 'custom-PDC',
        },
      ],
      data: [
        {
          id: 'keniya',
          type: 'keniya',
          label: '',
          coord: [37.18483091133276, -1.689422666063875],
          coordZ: 180,
        },
        {
          id: 'build',
          type: 'build',
          label: '',
          coord: [37.18680795877488, -1.6900593134104853],
          coordZ: 140,
        },
        {
          id: 'pdc',
          type: 'pdc',
          label: '',
          coord: [37.16954267775, -1.69645716025],
          coordZ: 100,
        }
      ],
    };

    window.appInstance.uniCall('addLandmarkLayer', jsonData, (result) => {
      console.log(result);
    });
  }
}