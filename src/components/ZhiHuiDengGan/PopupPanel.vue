<template>
  <div class="popup_box">
    <div class="bullet_camrea" v-if="currentType == 'bullet_camrea'">
      <popupPanel
        :img="popupimgtwo"
        :video="popupvideos"
        :cameraName="popupcameraNametwo"
        :popupTitle="popupTitle"
      ></popupPanel>
      <div class="close" @click="closePanel('GunTypeCamera')">X</div>
    </div>
    <div class="dome_camrea" v-if="currentType == 'dome_camrea'">
      <popupPanel
        :img="popupimg"
        :video="popupvideo"
        :cameraName="popupcameraName"
        :popupTitle="popupTitle"
      ></popupPanel>
      <div class="close" @click="closePanel('SphericalCameraa')">X</div>
    </div>
    <div
      class="digital_signage_panel"
      v-if="currentType == 'digital_signage_panel'"
    >
      <HelpWiFiDigital
        :imgTop="digitalimgTop"
        :titleName="digitalName"
        :ValueData="digitalValueData"
      ></HelpWiFiDigital>
      <div class="close" @click="closePanel('Screen')">X</div>
    </div>
    <div
      class="environmental_sensor_panel"
      v-if="currentType == 'environmental_sensor_panel'"
    >
      <sensorPanel></sensorPanel>
      <div class="close" @click="closePanel('EnvironmentalSensor')">X</div>
    </div>
    <div class="help_bubtton" v-if="currentType == 'help_bubtton'">
      <HelpWiFiDigital
        :imgTop="helpimgTop"
        :titleName="helpeName"
        :ValueData="helpValueData"
      ></HelpWiFiDigital>
      <div class="close" @click="closePanel('help_bubtton')">X</div>
    </div>
    <div
      class="smart_pole_name_panel"
      v-if="currentType == 'smart_pole_name_panel'"
    >
      <propertiesPanel></propertiesPanel>
      <div class="close" @click="closePanel('smart_pole_name_panel')">X</div>
    </div>
    <div class="wifi" v-if="currentType == 'wifi'">
      <HelpWiFiDigital
        :imgTop="wifiimgTop"
        :titleName="wifititleName"
        :ValueData="wifiValueData"
      ></HelpWiFiDigital>
      <div class="close" @click="closePanel('wifi')">X</div>
    </div>
  </div>
</template>

<script>
import popupPanel from "./component/popupPanel.vue";
import sensorPanel from "./component/sensorPanel.vue";
import HelpWiFiDigital from "./component/HelpWiFiDigital.vue";
import propertiesPanel from "./component/propertiesPanel.vue";
export default {
  components: {
    popupPanel,
    sensorPanel,
    HelpWiFiDigital,
    propertiesPanel,
  },
  data() {
    return {
      currentType: "",
      currentModelId: "",
      popupTitle: " Video Surveillance Properties",
      popupcameraName: [
        { name: "Camera Name", value: "NumberOne camera" },
        { name: "Camera Type", value: "Dome Camera" },
      ],
      popupcameraNametwo: [
        { name: "Camera Name", value: "NumberTow camera" },
        { name: "Camera Type", value: "Bullet Camera" },
      ],
      popupimg: require("./img/yuanxiangji.png"),
      popupimgtwo: require("./img/longcream.png"),
      popupvideo: require("../../../public/video/01.mp4"),
      popupvideos: require("../../../public/video/02.mp4"),
      wifiValueData: [
        { name: "WiFi", value: "Normal" },
        { name: "Signal strength", value: "-40dbm~-85dbm" },
      ],
      wifiimgTop: require("./img/wifi.png"),
      wifititleName: "WiFi",
      helpValueData: [
        { name: "Broadcast", value: "Normal" },
        { name: "Help Button Status", value: "Helping" },
      ],
      helpimgTop: require("./img/helpimg.png"),
      helpeName: "Help Button",
      digitalValueData: [
        { name: "Digital Signage", value: "Normal" },
        {
          name: "Digital Signage",
          value:
            "Over the years digital signage in public places has become an increasingly common sight in shopping centers around the world",
        },
      ],
      digitalimgTop: require("./img/phone.png"),
      digitalName: "Digital Signage Properties",
    };
  },
  mounted() {
    let that = this;
    this.$eventBus.$on("showPanel", (res) => {
      that.currentType = res;
    });

    window.eventCallback = function (event) {
      window.appInstance.uniCall(
        "setModelBlinkState",
        {
          id: that.currentModelId,
          state: "stop",
        },
        (result) => {
          console.log(result);
        }
      );

      that.currentModelId = event.id;
      if (event.id == "Screen_A" || event.id == "Screen") {
        that.currentType = "digital_signage_panel";
      } else if (
        event.id == "EnvironmentalSensor" ||
        event.id == "EnvironmentalSensor_A"
      ) {
        that.currentType = "environmental_sensor_panel";
      } else if (
        event.id == "GunTypeCamera_A" ||
        event.id == "GunTypeCamera_A_A" ||
        event.id == "GunTypeCamera_B" ||
        event.id == "GunTypeCamera_B_A" ||
        event.id == "GunTypeCamera_C" ||
        event.id == "GunTypeCamera_C_A"
      ) {
        that.currentType = "bullet_camrea";
      } else if (
        event.id == "SphericalCameraa" ||
        event.id == "SphericalCamera_A"
      ) {
        that.currentType = "dome_camrea";
      } else if (event.id == "Radio" || event.id == "Radio_A") {
        that.currentType = "";
      } else if (event.id == "WiFi" || event.id == "WiFi_A") {
        that.currentType = "wifi";
      } else if (event.id == "PowerCube" || event.id == "PowerCube_A") {
        // that.currentType = "wifi"
      }
      if (event.id.indexOf("modelId") == -1) {
        let jsonData = {
          id: event.id, // The id of a model object is a unique identifier passed in by the caller at creation time, and used for object identification in various operations.
          duration: 0.5, // Blinking cycle (in seconds)
          color: "#ff0000", // Blinking color (HEX color value)
          type: "default", // Blinking style category, default: default style
        };
        appInstance.uniCall("blinkingModel", jsonData, (result) => {
          console.log(result);
        });
      }

      //"PowerCube"
    };

    appInstance.uniCall(
      "addEventListener",
      {
        eventName: "onModelClick", // Event name, refer to TuGuan API Development Manual
        callback: window.eventCallback, // The event listener callback function to be registered can have multiple callback functions registered for the same event. Note that this callback function corresponds to the callback function when the event represented by the first parameter occurs, and should be distinguished from the callback function that completes the addEventListener call
      },
      (result) => {
        console.log(result);
      }
    );
  },
  methods: {
    closePanel(id) {
      this.$store.commit("cameraIndex", -1);
      this.$store.commit("currentIndexs", -1);
      this.$eventBus.$emit("closePanel");
      this.currentType = "";
      if (id == "GunTypeCamera") {
        this.clearSelected("GunTypeCamera_A");
        this.clearSelected("GunTypeCamera_B");
        this.clearSelected("GunTypeCamera_C");
        this.clearSelected("GunTypeCamera_A_A");
        this.clearSelected("GunTypeCamera_B_B");
        this.clearSelected("GunTypeCamera_C_C");
      } else if (id == "SphericalCameraa") {
        this.clearSelected("SphericalCameraa");
        this.clearSelected("SphericalCamera" + "_A");
      } else {
        this.clearSelected(id);
        this.clearSelected(id + "_A");
      }
    },
    clearSelected(id) {
      let jsonDataStop = {
        id: id,
        state: "stop",
      };
      appInstance.uniCall("setModelBlinkState", jsonDataStop, (result) => {
        console.log(result);
        this.currentModelId = "";
      });
    },
  },
};
</script>

<style lang="less" scoped>
.popup_box {
  position: absolute;
  left: 3856px;
  top: 218px;
  .bullet_camrea {
    // background: url("../../assets/img/ZhiHuiDengGan/popup/smartpole/BulletCamrea.png")
    //   no-repeat;
    width: 1030px;
    height: 580px;
    position: absolute;
    left: 0px;
    top: 0px;
    .close {
      background: transparent;
      width: 40px;
      height: 40px;
      position: absolute;
      right: 0px;
      top: 10px;
      pointer-events: all;
    }
  }
  .dome_camrea {
    // background: url("../../assets/img/ZhiHuiDengGan/popup/smartpole/DomeCamrea.png")
    //   no-repeat;
    width: 1030px;
    height: 580px;
    position: absolute;
    left: 0px;
    top: 0px;
    .close {
      background: transparent;
      width: 40px;
      height: 40px;
      position: absolute;
      right: 0px;
      top: 10px;
      pointer-events: all;
    }
  }
  .digital_signage_panel {
    // background: url("../../assets/img/ZhiHuiDengGan/popup/smartpole/DigitalSignagePanel.png")
    //   no-repeat;
    width: 790px;
    height: 480px;
    position: absolute;
    left: 0px;
    top: 0px;
    .close {
      background: transparent;
      width: 40px;
      height: 40px;
      position: absolute;
      right: 0px;
      top: 10px;
      pointer-events: all;
    }
  }
  .environmental_sensor_panel {
    // background: url("../../assets/img/ZhiHuiDengGan/popup/smartpole/environmental_sensor_panel.png")
    //   no-repeat;
    width: 790px;
    height: 480px;
    position: absolute;
    left: 76px;
    top: 0px;
    .close {
      background: transparent;
      width: 40px;
      height: 40px;
      position: absolute;
      right: 0px;
      top: 10px;
      pointer-events: all;
    }
  }
  .help_bubtton {
    // background: url("../../assets/img/ZhiHuiDengGan/popup/smartpole/HelpBubtton.png")
    //   no-repeat;
    width: 710px;
    height: 480px;
    position: absolute;
    left: 134px;
    top: 0px;
    .close {
      background: transparent;
      width: 40px;
      height: 40px;
      position: absolute;
      right: 0px;
      top: 10px;
      pointer-events: all;
    }
  }
  .smart_pole_name_panel {
    // background: url("../../assets/img/ZhiHuiDengGan/popup/smartpole/SmartPoleNamePanel.png")
    //   no-repeat;
    width: 790px;
    height: 480px;
    position: absolute;
    left: 134px;
    top: 0px;
    .close {
      background: transparent;
      width: 40px;
      height: 40px;
      position: absolute;
      right: 0px;
      top: 10px;
      pointer-events: all;
    }
  }
  .wifi {
    // background: url("../../assets/img/ZhiHuiDengGan/popup/smartpole/WIFI.png")
    //   no-repeat;
    width: 710px;
    height: 480px;
    position: absolute;
    left: 134px;
    top: 0px;
    .close {
      background: transparent;
      width: 40px;
      height: 40px;
      position: absolute;
      right: 0px;
      top: 10px;
      pointer-events: all;
    }
  }
}
.close {
  width: 40px;
  height: 40px;
  pointer-events: all;
  font-size: 35px;
  color: #fff;
  text-align: center;
  line-height: 40px;
}
</style>