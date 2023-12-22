<template>
  <div class="popup_box">
    <div
      class="smart_pole_name"
      @click="OpenSmartPole"
      :class="currentPanelType == 'smart_pole_name' ? 'active' : ''"
    >
      <PopupPagecommon></PopupPagecommon>
    </div>
    <div class="video_surveillance">
      <surveillanceVue></surveillanceVue>
      <!-- <div
        class="camera1"
        @click="OpenCamrea(1)"
        :class="currentPanelType == 'camera1' ? 'active' : ''"
      ></div>
      <div
        class="camera2"
        @click="OpenCamrea(2)"
        :class="currentPanelType == 'camera2' ? 'active' : ''"
      ></div>
      <div
        class="camera3"
        @click="OpenCamrea(3)"
        :class="currentPanelType == 'camera3' ? 'active' : ''"
      ></div>
      <div
        class="camera4"
        @click="OpenCamrea(4)"
        :class="currentPanelType == 'camera4' ? 'active' : ''"
      ></div> -->
    </div>
    <div class="right_box">
      <div
        class="enviromental_sensor"
        @click="OpenEnviromentalSensor"
        :class="
          currentPanelType == 'environmental_sensor_panel' ? 'active' : ''
        "
      >
        <sensor></sensor>
      </div>
      <div
        class="digital_signage"
        @click="OpenDigitalSignage"
        :class="currentPanelType == 'digital_signage_panel' ? 'active' : ''"
        v-if="showDigital"
      >
        <signage></signage>
      </div>
      <div class="other_module">
        <properties></properties>
        <!-- <div
          class="help_button"
          :class="currentPanelType == 'help_button' ? 'active' : ''"
          @click="OpenHelpButton"
        ></div>
        <div
          class="wifi"
          :class="currentPanelType == 'wifi' ? 'active' : ''"
          @click="OpenWifi"
        ></div> -->
        <!-- <div class="helper_button"></div> -->
      </div>
    </div>
  </div>
</template>

<script>
import LightScene from "../../utils/other/LightScene";
// 引入场景图表组件
import PopupPagecommon from "./component/PopupPagecommon.vue";
import surveillanceVue from "./component/surveillance.vue";
import sensor from "./component/sensor.vue";
import signage from "./component/signage.vue";
import properties from "./component/properties.vue";
export default {
  data() {
    return {
      showDigital: false,
      currentModelId: "",
      currentPanelType: "",
    };
  },
  components: {
    PopupPagecommon,
    surveillanceVue,
    sensor,
    signage,
    properties,
  },
  mounted() {
    let that = this;
    this.$eventBus.$on("showBillbord", (res) => {
      that.showDigital = res;
    });
    this.$eventBus.$on("closePanel", (res) => {
      that.currentPanelType = "";
    });
  },
  methods: {
    // OpenCamrea(type) {
    //   let modelId = "";
    //   if (type == 1) {
    //     this.$eventBus.$emit("showPanel", "dome_camrea");
    //     modelId = "SphericalCameraa";
    //     this.currentPanelType = "camera1";
    //   } else if (type == 2) {
    //     this.$eventBus.$emit("showPanel", "bullet_camrea");
    //     modelId = "GunTypeCamera_A";
    //     this.currentPanelType = "camera2";
    //   } else if (type == 3) {
    //     this.$eventBus.$emit("showPanel", "bullet_camrea");
    //     modelId = "GunTypeCamera_B";
    //     this.currentPanelType = "camera3";
    //   } else if (type == 4) {
    //     this.$eventBus.$emit("showPanel", "bullet_camrea");
    //     modelId = "GunTypeCamera_C";
    //     this.currentPanelType = "camera4";
    //   }

    //this.blinkingModel(modelId);
    // this.blinkingModel(id + "_A");
    // LightScene.blinkingModel(modelId);
    // },
    OpenSmartPole() {
      this.$eventBus.$emit("showPanel", "smart_pole_name_panel");
      this.currentPanelType = "smart_pole_name";
    },
    OpenEnviromentalSensor() {
      this.$eventBus.$emit("showPanel", "environmental_sensor_panel");
      this.currentPanelType = "environmental_sensor_panel";
      this.blinkingModel("EnvironmentalSensor");
      this.blinkingModel("EnvironmentalSensor_A");
    },
    OpenDigitalSignage() {
      this.$eventBus.$emit("showPanel", "digital_signage_panel");
      this.currentPanelType = "digital_signage_panel";
      this.blinkingModel("Screen");
      this.blinkingModel("Screen_A");
    },
    // OpenHelpButton() {
    //   this.$eventBus.$emit("showPanel", "help_bubtton");
    //   this.currentPanelType = "help_button";
    // },
    // OpenWifi() {
    //   this.$eventBus.$emit("showPanel", "wifi");
    //   this.currentPanelType = "wifi";
    // },
    blinkingModel(id) {
      let jsonDataStop = {
        id: this.currentModelId,
        state: "stop",
      };
      appInstance.uniCall("setModelBlinkState", jsonDataStop, (result) => {
        console.log(result);
      });
      this.currentModelId = id;
      let jsonData = {
        id: id,
        duration: 0.5,
        color: "#ff0000",
        type: "default",
      };
      appInstance.uniCall("blinkingModel", jsonData, (result) => {});
    },
  },
};
</script>

<style lang="less" scoped>
.popup_box {
  width: 4042px;
  height: 1263px;
  position: absolute;
  left: 1818px;
  top: 0px;
  // background: url("../../assets/img/ZhiHuiDengGan/pupupPage.png") no-repeat;
  .smart_pole_name {
    pointer-events: all;
    // background: url("../../assets/img/ZhiHuiDengGan/popup/SmartPoleName.png")
    //   no-repeat;
    width: 908px;
    height: 563px;
    position: absolute;
    left: 16px;
    top: 20px;
    border: 1px transparent solid;
    -webkit-animation: slide-in-left 0.5s 2s
      cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
    animation: slide-in-left 0.5s 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  }

  .video_surveillance {
    border: 1px transparent solid;
    pointer-events: all;
    // background: url("../../assets/img/ZhiHuiDengGan/popup/VideoSurveillance.png")
    //   no-repeat;
    width: 921px;
    height: 433px;
    position: absolute;
    left: 0px;
    top: 642px;
    -webkit-animation: slide-in-left 0.5s 2.2s
      cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
    animation: slide-in-left 0.5s 2.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;

    // div {
    //   background: transparent;
    //   width: 40px;
    //   height: 40px;
    // }
    .camera1 {
      position: absolute;
      right: 14px;
      top: 128px;
    }
    .camera2 {
      position: absolute;
      right: 14px;
      top: 205px;
    }
    .camera3 {
      position: absolute;
      right: 14px;
      top: 288px;
    }
    .camera4 {
      position: absolute;
      right: 14px;
      top: 365px;
    }
  }
  .right_box {
    position: absolute;
    right: 0px;
    .enviromental_sensor {
      pointer-events: all;
      // background: url("../../assets/img/ZhiHuiDengGan/popup/environmental_sensor.png")
      //   no-repeat;
      border: 1px transparent solid;
      width: 944px;
      height: 475px;
      -webkit-animation: slide-in-right 0.5s 2.4s
        cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
      animation: slide-in-right 0.5s 2.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)
        both;
    }
    .digital_signage {
      pointer-events: all;
      // background: url("../../assets/img/ZhiHuiDengGan/popup/DigitalSignage.png")
      //   no-repeat;
      border: 1px transparent solid;
      width: 921px;
      height: 304px;
      -webkit-animation: slide-in-right 0.5s 2.6s
        cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
      animation: slide-in-right 0.5s 2.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)
        both;
    }
    .other_module {
      pointer-events: all;
      // background: url("../../assets/img/ZhiHuiDengGan/popup/OtherModule.png")
      //   no-repeat;
      border: 1px transparent solid;
      width: 921px;
      height: 433px;
      -webkit-animation: slide-in-right 0.5s 2.8s
        cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
      animation: slide-in-right 0.5s 2.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)
        both;
      .help_button {
        width: 311px;
        height: 86px;
        position: absolute;
        top: 86px;
        border: solid 1px transparent;
        left: 29px;
        pointer-events: all;
      }
      .wifi {
        width: 249px;
        height: 86px;
        position: absolute;
        top: 86px;
        border: solid 1px transparent;
        left: 371px;
        pointer-events: all;
      }
      .active {
        border: 1px solid yellow;
        box-shadow: 0px 0px 12px 6px rgb(255 201 38 / 65%) inset !important;
        background-color: rgba(255, 201, 38, 0.15) !important;
      }
    }
    .active {
      border: 1px solid yellow;
      box-shadow: 0px 0px 12px 6px rgb(255 201 38 / 65%) inset !important;
      background-color: rgba(255, 201, 38, 0.15) !important;
    }
  }
  .active {
    border: 1px solid yellow;
    box-shadow: 0px 0px 12px 6px rgb(255 201 38 / 65%) inset !important;
    background-color: rgba(255, 201, 38, 0.15) !important;
  }
}
@-webkit-keyframes slide-in-left {
  0% {
    -webkit-transform: translateX(-1000px);
    transform: translateX(-1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
}
@keyframes slide-in-left {
  0% {
    -webkit-transform: translateX(-1000px);
    transform: translateX(-1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
}
@-webkit-keyframes slide-in-right {
  0% {
    -webkit-transform: translateX(1000px);
    transform: translateX(1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
}
@keyframes slide-in-right {
  0% {
    -webkit-transform: translateX(1000px);
    transform: translateX(1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
}
</style>