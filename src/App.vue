<template>
  <div id="app">
    <!-- Center before Zoom -->
    <div class="gis-container" :style="{
      transform: 'translate(-50%,-50%) scale(' + scale + ')',
    }">
      <!-- <Streaming></Streaming> -->
    </div>
    <div :class="topic == 'gonggonganquan' ||
      topic == 'zhaoshangyunxing' ||
      topic == 'jiaotongyunxing' ||
      topic == 'zhihuidenggan' ||
      topic == 'zhihuidenggan'
      ? 'screen'
      : 'screen1'
      " :style="{ transform: 'translate(-50%,-50%) scale(' + scale + ')' }">
      <!-- The background image here needs to be changed according to the theme -->
      <div class="header">
        <div class="left">
          <p>{{ leftTitle }}</p>
        </div>
        <!-- time component -->
        <div class="right" @click="openSwitch"></div>
        <weather class="weatherCom"></weather>
        <Clock class="time"></Clock>
        <Nav v-show="!showPopup && !CompRoom"></Nav>
      </div>
      <div class="env_pos">
        <!-- <EnvSelect /> -->
        <SceneSelect />
      </div>

      <div class="main">
        <router-view></router-view>
      </div>
      <div class="legned_pos" v-show="!showPopup">
        <Legend></Legend>
      </div>
      <div class="gisbtn_wraper">
        <GisBtn :ztqh="showPopup" :CompRoom="CompRoom"></GisBtn>
      </div>
      <div class="dateweather">
        <DateWeather :timeFlag="timeSwith"></DateWeather>
      </div>
      <div class="recordline" v-if="changjingStatus">
        <RecordLine></RecordLine>
      </div>
    </div>
    <div id="layer-container" class="layer-container" :style="{ transform: 'translate(-50%,-50%) scale(' + scale + ')' }">
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import Streaming from "./views/Streaming.vue";
import Nav from "@/components/common/Nav";
import Clock from "../src/components/common/Clock";
import Legend from "@/components/common/Legend";
import gisManager from "@/utils/GisManagers/GisManager";
import layerConfigs from "@/utils/configs/layerConfigs";
import GisBtn from "@/components/common/GisBtn";
import EnvSelect from "@/components/common/EnvSelect";
import SceneSelect from "@/components/common/SceneSelect";
import DateWeather from "@/components/common/DateWeather";
import LightSceneType01 from "@/components/popup/lightScene/LightSceneType01";
import LightSceneType02 from "@/components/popup/lightScene/LightSceneType02";
import EvtSetting from "./utils/common/EvtSetting";
import RecordLine from "@/components/common/RecordLine";
import weather from "@/components/common/weather";
export default {
  name: "App",
  components: {
    Streaming,
    Nav,
    Clock,
    Legend,
    GisBtn,
    SceneSelect,
    EnvSelect,
    DateWeather,
    LightSceneType01,
    LightSceneType02,
    RecordLine,
    weather,
  },
  data() {
    return {
      scale: 1,
      showName: "",
      leftTitle: "",
      timeSwith: false,
      LightSceneType: "",
      showPopup: false,
      CompRoom: false
    };
  },
  methods: {
    setScreen() {
      // Size of visible area
      let visibleWidth = window.innerWidth;
      let visibleHeight = window.innerHeight;
      // Manually configured panel size
      let manualWidth = 7680;
      let manualHeight = 1440;
      // Calculate the horizontal and vertical scaling factors
      var widthPercentage = (1.0 * visibleWidth) / manualWidth;
      var heightPercentage = (1.0 * visibleHeight) / manualHeight;
      // Obtain the minimum scaling factor
      this.scale = Math.min(widthPercentage, heightPercentage);
    },
    openSwitch() {
      this.timeSwith = !this.timeSwith;
    },

    ...mapMutations(["setTopic"]),
  },
  created() { },
  mounted() {
    let that = this;
    //Immediately execute the display resolution setting method
    this.setScreen();
    window.addEventListener("resize", this.setScreen.bind(this));
    document.oncontextmenu = function (ev) {
      ev.preventDefault();
    };
    window.gisManager = new gisManager();
    window.layerConfigs = layerConfigs;

    this.$eventBus.$on("SmartSelected", (res) => {
      that.showPopup = res;
    });
    this.$eventBus.$on("CompRoom", (res) => {
      that.CompRoom = res;
    });

  },
  computed: {
    ...mapState([
      "topic",
      "isStreaming",
      "rotateStatus",
      "scene",
      "sceneTime",
      "changjingStatus",
    ]),
  },
  watch: {
    isStreaming: {
      handler(val) {
        // window.gisManager.selectMenu(window.currentLayer.defaultView);
        // window.gisManager.addTopicDefault();
        // if (this.topic == "zhihuidenggan") {
        //   setTimeout(() => {
        //     this.$store.commit("setRotate", true);
        //   }, 3000);
        // }
      },
    },
    $route: {
      handler(val) {
        //Switching Scenes and Perspectives
        //Switch themes, modify Vuex themes and secondary themes
        let topic = val.name;
        switch (topic) {
          case "zhihuidenggan":
            this.leftTitle = "Smart Lamp Pole";
            break;
          case "gonggonganquan":
            this.leftTitle = "Public Safety";
            break;
          case "zhaoshangyunxing":
            this.leftTitle = "Investment & Operati";
            break;
          case "jiaotongyunxing":
            this.leftTitle = "Traffic Operation";
            break;
        }
        // Modify the theme display name;
        this.$router.options.routes.forEach((item) => {
          if (!item.name) {
            return;
          }
          if (item.name === topic) {
            this.showName = item.showName;
          }
        });
        window.currentLayer = layerConfigs.themes.find((t) => t.topic == topic);
        // window.gisManager.selectMenu(window.currentLayer.defaultView);
        // window.gisManager.addTopicDefault();
        this.setTopic(topic);
        EvtSetting.setThemeEvt(topic);
      },
      deep: true,
    },
    rotateStatus: {
      handler(val) {
        window.gisManager.camera.setCameraRotate({
          enabled: val, // Enable camera to fly around the target
          duration: 240, // The number of seconds required to fly for a week, the higher the value, the slower the flight
          direction: "clockwise", // Flight direction, clockwise is clockwise, counter clockwise is counterclockwise
        });
      },
      deep: true,
    },
    scene: {
      handler(val) { },
    },
    sceneTime: {
      handler(val) {
        window.gisManager.environment.changeEnvTime(val);
      },
      deep: true
    },
  },
};
</script>

<style lang="less">
#app {
  user-select: none;
  cursor: pointer;
  position: relative;
  width: 100%;
  height: 100%;
  background: #000;
  overflow: auto;
  pointer-events: all;

  .gis-container {
    background-color: #000;
    position: absolute;
    left: 50%;
    top: 50%;
    width: 4800px;
    height: 1440px;
  }

  .gis-container {
    .layer {
      z-index: 1;
      left: 0;
      top: 0;
      position: absolute;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
  }

  .layer-container {
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 2;
    width: 7680px;
    height: 1440px;
    pointer-events: none;
    overflow: hidden;

    .position_dialog {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 200px;
    }
  }

  .screen {
    background: url(./assets/img/layout/mask.png) no-repeat center top;
    background-size: 100% 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 2;
    width: 7680px;
    height: 1440px;
    pointer-events: none;
    overflow: hidden;

    .header {
      background: url(./assets/img/layout/bgbg.png) no-repeat center top;
      background-size: 100% 60%;
      position: absolute;
      top: 0;
      left: 0;
      width: 7680px;
      height: 190px;
      overflow: hidden;
      pointer-events: none;
      z-index: 10;

      .left {
        position: absolute;
        top: 40px;
        left: 30px;
        width: 700px;
        height: 96px;
        background: url("./assets/img/layout/nav_left_title.png");
        background-repeat: no-repeat;
        background-position: 0 20%;
        box-sizing: border-box;
        padding-left: 58px;

        p {
          margin: 0;
          padding: 0;
          font-size: 46px;
          // font-weight: bold;
          font-family: "Helvetica Bold";
          background: linear-gradient(to bottom, #fff, #d5f7fd);
          -webkit-background-clip: text;
          color: transparent;
        }
      }

      .right {
        position: absolute;
        top: 40px;
        right: 0px;
        width: 700px;
        height: 96px;
        background: url("./assets/img/layout/rightTitle.png");
        background-repeat: no-repeat;
        background-position: 0 20%;
        box-sizing: border-box;
        padding-left: 58px;
        pointer-events: all;
      }

      .time {
        position: absolute;
        top: 22px;
        right: 85px;
      }

      .weatherCom {
        position: absolute;
        top: 32px;
        right: 400px;
      }
    }

    .main {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 1300px;
      margin-top: 140px;
      pointer-events: none;
      z-index: 5;
    }

    .env_pos {
      position: absolute;
      display: flex;
      left: 2100px;
      top: 30px;
      pointer-events: all;
      z-index: 10;
    }

    .legned_pos {
      z-index: 5;
      position: absolute;
      bottom: 50px;
      left: 5601px;
      pointer-events: all;
    }

    .recordline {
      z-index: 6;
      position: absolute;
      width: 280px;
      height: 300px;
      top: 1120px;
      left: 2230px;
      pointer-events: all;
    }

    .gisbtn_wraper {
      position: absolute;
      bottom: 40px;
      left: 1841px;
    }
  }

  .screen1 {
    background: url(./assets/img/layout/mask1.png) no-repeat center top;
    background-size: 100% 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 2;
    width: 7680px;
    height: 1440px;
    pointer-events: none;
    overflow: hidden;

    .header {
      background: url(./assets/img/layout/bgbg.png) no-repeat center top;
      background-size: 100% 60%;
      position: absolute;
      top: 0;
      left: 0;
      width: 7680px;
      height: 190px;
      overflow: hidden;
      pointer-events: none;
      z-index: 10;

      .left {
        position: absolute;
        top: 40px;
        left: 30px;
        width: 700px;
        height: 96px;
        background: url("./assets/img/layout/nav_left_title.png");
        background-repeat: no-repeat;
        background-position: 0 20%;
        box-sizing: border-box;
        padding-left: 58px;

        p {
          margin: 0;
          padding: 0;
          font-size: 46px;
          // font-weight: bold;
          font-family: "Helvetica Bold";
          background: linear-gradient(to bottom, #fff, #d5f7fd);
          -webkit-background-clip: text;
          color: transparent;
        }
      }

      .right {
        position: absolute;
        top: 40px;
        right: 0px;
        width: 700px;
        height: 96px;
        background: url("./assets/img/layout/rightTitle.png");
        background-repeat: no-repeat;
        background-position: 0 20%;
        box-sizing: border-box;
        padding-left: 58px;
        pointer-events: all;
      }

      .time {
        position: absolute;
        top: 22px;
        right: 85px;
      }

      .weatherCom {
        position: absolute;
        top: 32px;
        right: 400px;
      }
    }

    .main {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 1300px;
      margin-top: 140px;
      pointer-events: none;
      z-index: 5;
    }

    .env_pos {
      position: absolute;
      display: flex;
      left: 2100px;
      top: 30px;
      pointer-events: all;
      z-index: 10;
    }

    .legned_pos {
      z-index: 5;
      position: absolute;
      bottom: 50px;
      left: 5601px;
      pointer-events: all;
    }

    .recordline {
      z-index: 6;
      position: absolute;
      width: 280px;
      height: 300px;
      top: 1120px;
      left: 2230px;
      pointer-events: all;
    }

    .gisbtn_wraper {
      position: absolute;
      bottom: 40px;
      left: 1841px;
    }
  }
}
</style>
