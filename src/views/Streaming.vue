<template>
  <div class="streaming_box">
    <div id="container"
         class="ccontainer"></div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import Marker3D from "../utils/GisManagers/Marker3D";
import LightScene from "../utils/other/LightScene.js";
import addPDCSignage from "../utils/common/addPDCSignage";
// import UEapis from '../utils/UEapi/UEapi';
// import wsCustom from "@/utils/WsCustom";
// import cameraList from '../utils/configs/cameraList';
export default {
  components: {},
  data () {
    return {
      // cameraList: cameraList,
    };
  },
  methods: {
    //  * @Descripttion:  Visualized display component
    //  * @version: 3.3.4
    //  * @Author: guanzhuyu
    //  * @Date: 2022-10-07 15:21:13
    //  * @LastEditors: kangzesheng
    //  * @LastEditTime: 2023-01-13 14:15:25
    init () {
      // wsCustom.init();
      window.appInstance = new TGApp.App();
      window.appInstance.initScene({
        container: document.getElementById("container"),
        mode: "streaming3",
        token: streamingConfig.token,
        url: streamingConfig.url,
        // resolution: [6000, 1440],
      });
      window.appInstance.uniCall(
        "setLogMode",
        {
          mode: true,
        },
        (res) => {
          console.log(res, '初始化完成');

        }
      );
    },

    restrictCamera () {
      let jsonData = {
        coordType: 0,
        coordTypeZ: 0,
        limitPitch: [5, 89],
        limitYaw: [0, 359],
        limitCoordZ: [10, 2000],
        limitDistance: [20, 2000],
        center: [37.1759, -1.697291],
        radius: 1800,
      };
      appInstance.uniCall("restrictCamera", jsonData, (result) => {
        appInstance.uniCall(
          "setCameraRestrictionState",
          {
            state: "restricted",
          },
          (result) => {
            console.log("Set camera perspective", result);

          }
        );
      });
    },
    // Register Scatter Click Event
    mapClickFn () {
      window.appInstance.uniCall("onLandmarkLayerClick", {}, (res) => {
        UEapis.OverlayTip.addOverLayTip(res);
      });
      window.appInstance.uniCall("onTrailLayerClick", {}, (res) => {
        UEapis.OverlayTip.addOverLayTip(res);
      });
    },
    /**
     * @description: Set the width and height of streamingVideo
     * @param {String} width
     * @param {String} height
     * @return {*}
     */
    setVideoStyle (width, height) {
      const container = document.getElementById("container");
      const videoDom = document.getElementById("streamingVideo");
      const videoDomParent = videoDom.parentElement;
      container.style.width = width;
      container.style.height = height;
      videoDomParent.style.width = width;
      videoDomParent.style.height = height;
      videoDom.style.width = width;
      videoDom.style.height = height;
    },
  },
  computed: {},
  mounted () {
    this.init(); // Initialize graphic applications
    this.mapClickFn(); // Register Scatter Click Event
    // this.panelClickFn();
    window.appInstance.uniCall("addEventListener", {
      eventName: "onSceneInit",
      callback: () => {
        appInstance.uniCall("getScenesInfo", {}, (result) => {
          console.log("Obtain application status information", result);
        });
        appInstance.uniCall("getAppInfo", {}, (result) => {
          console.log("Obtain application information", result);
        });
        this.setVideoStyle("4800px", "2700px");
        setTimeout(() => {
          appInstance.uniCall(
            "setCamera",
            {
              centerCoord: [37.185822, -1.692009],
              coordType: 0,
              coordTypeZ: 0,
              coordZ: 0,
              distance: 1223,
              heading: 206,
              pitch: 9,
              fly: true,
              duration: 1,
            },
            (res) => {
              console.log(res);
            }
          );
        }, 5000);

        appInstance.uniCall("getScenesInfo", {}, (res) => {
          let sceneName = res.scenes.find((item) => {
            if (item.default) {
              return item.name;
            }
          }).name;
          console.log("current scene", sceneName);
          // You can set camera field of view restrictions based on the initial name
          this.restrictCamera();
          this.$store.commit("setStreaming", true);
        });
        Marker3D.add3DMarker();
        Marker3D.add3dMarkerIcon();
        // addPDCSignage.addpoint()
        window.appInstance.uniCall("addEventListener", {
          eventName: "onSceneChanged",
          callback: (res) => {
            if (res.name == "SmartPole") {
              //  LightScene.init();
            }
          },
        });
      },
    });
    window.appInstance.uniCall(
      "addEventListener",
      {
        eventName: "onCameraMove",
        callback: function (event) {
          let camerainfo = event;
          if (camerainfo.distance < 1000) {
            if (Marker3D.marker3DState == "add") {
              Marker3D.remove3DMarker();
            }
          } else {
            if (Marker3D.marker3DState == "remove") {
              Marker3D.add3DMarker();
            }
          }
        },
      },
      (result) => {
        console.log(result);
      }
    );

    // window.addEventListener("mousewheel", (e) => {
    //   appInstance.uniCall("getCameraInfo", {}, (res) => {

    //   });
    // });
  },
  destroyed () {
    window.appInstance.uniCall("destroy");
    wsCustom.closeSever();
  },
};
</script>
<style lang="less" scoped>
.streaming_box {
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: all;
}

#container {
  width: 100%;
  height: 100%;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}
</style>
