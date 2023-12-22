<!--
 * @Author: hp
 * @Date: 2021-03-22 17:51:49
 * @LastEditTime: 2021-07-27 11:59:04
 * @LastEditors: guozhiqing
 * @Description: Region selection component
 * @FilePath: /digital_china/src/components/common/AreaSelect.vue
-->
<template>
  <div class="areaselect">
    <!-- time -->
    <div class="select-options ac1" @click="timeDownShow = !timeDownShow">
      {{ time }}
      <!-- Dropdown icon -->
      <div class="down-select b1">
        <span class="downicon" v-show="timeDownShow"></span>
        <span class="downiconUp" v-show="!timeDownShow"></span>
      </div>
      <!-- Dropdown display area -->
      <ul class="down-aren" v-if="timeDownShow">
        <li
          class="item"
          v-for="(ele, ind) in areaList"
          :key="ind"
          @click="areaSel(ele)"
        >
          {{ ele }}
        </li>
      </ul>
    </div>
    <!-- weather -->
    <div class="select-options ac1" @click="weatherDownShow = !weatherDownShow">
      {{ weather }}
      <!-- Dropdown icon -->
      <div class="down-select b1">
        <span class="downicon" v-show="weatherDownShow"></span>
        <span class="downiconUp" v-show="!weatherDownShow"></span>
      </div>
      <!-- Dropdown display area -->
      <ul class="down-aren" v-if="weatherDownShow">
        <li
          class="item"
          v-for="(value, key) in weathers"
          :key="key"
          @click="weatherSel(key)"
        >
          {{ key }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "areaselect",
  computed: {
    ...mapState(["topic"]),
  },
  data() {
    return {
      time: "scene",
      weather: "Sunny",
      timeDownShow: false,
      weatherDownShow: false,
      areaList: [
        "7:00",
        "12:00",
        "17:00",
        "22:00",
        "Follow",
        "scene",
        "LightingEffects",
      ],
      weathers: {
        Sunny: "Sunny",
        PartlyCloudy: "PartlyCloudy",
        Overcast: "Overcast",
        LightRain: "LightRain",
        ModerateRain: "ModerateRain",
        HeavyRain: "HeavyRain",
        Foggy: "Foggy",
        Dust: "Dust",
        Haze: "Haze",
      },
    };
  },
  watch: {},
  methods: {
    areaSel(time) {
      if (time === "LightingEffects") {
        appInstance.uniCall(
          "setCamera",
          {
            centerCoord: [37.184696, -1.687668],
            coordType: 0,
            coordTypeZ: 0,
            coordZ: 0,
            distance: 132,
            heading: 299,
            pitch: 12,
            result: 1,
            status: "restricted",
          },
          (res) => {
            console.log(res);
          }
        );
      } else {
        this.time = time;
        let envTime = time;
        this.timeDownShow = false;
        switch (time) {
          case "scene":
            window.gisManager.stopTimer();
            envTime = "15:00";
            break;
          case "Follow":
            window.gisManager.startTimer();
            envTime = new Date().format("hh:mm");
            break;
          default:
            window.gisManager.stopTimer();
            break;
        }
        window.gisManager.environment.changeEnvTime(envTime);
      }
    },
    // Weather selection
    weatherSel(weather) {
      this.weather = weather;
      this.weatherDownShow = false;
      window.gisManager.environment.changeEnvWeather(this.weathers[weather]);
    },
  },
};
</script>

<style lang="less" scoped>
.areaselect {
  position: relative;
  display: flex;
  pointer-events: all;
  font-family: "Helvetica";
  font-size: 16px;
  margin: 10px 0;
  & div.select-options,
  & div.selected-area {
    position: relative;
    width: 160px;
    height: 35px;
    margin-right: 8px;
    line-height: 35px;
    text-align: center;
    // border: 1px solid #1fbbef;
    // background-image: linear-gradient(to bottom, #ffffff, #c5fcf3);
    color: #ccc;
    -webkit-background-clip: text;
  }
  & div.select-options {
    width: 180px;
    height: 30px;
    margin-right: 12px;
    background: #0d2033;
    & div.down-select {
      position: relative;
      height: 100%;
      float: right;
      width: 18px;
      // border-left: 1px solid #1fbbef;
      transition: all 0.6s;
      & span.downicon {
        position: absolute;
        border-top: 4px solid transparent;
        border-right: 4px solid transparent;
        border-left: 4px solid #1fbbef;
        border-bottom: 4px solid #1fbbef;
        transform: translate(-4px, 16px) rotate(135deg);
      }
      & span.downiconUp {
        position: absolute;
        border-top: 4px solid transparent;
        border-right: 4px solid transparent;
        border-left: 4px solid #1fbbef;
        border-bottom: 4px solid #1fbbef;
        transform: translate(-4px, 12px) rotate(-45deg);
      }
    }
    & ul.down-aren {
      width: 100%;
      position: relative;
      bottom: 0;
      left: 0;
      height: 245px;
      overflow: auto;
      // border: 1px solid #1fbbef;
      & li.item {
        background: rgba(#0d2033, 0.8);
        border: 1px solid rgba(#0d2033, 0.1);
        user-select: none;
        &:not(:first-of-type) {
          border-top: none;
        }
        &:hover {
          color: #00ffff;
          background: rgba(#1fbbef, 0.7);
        }
      }
    }
  }
  & div.selected-area {
    background: rgba(#1fbbef, 0.3);
    &::before {
      position: absolute;
      left: -10px;
      display: inline-block;
      content: "";
      border-top: 4px solid #fff;
      border-right: 4px solid #fff;
      border-left: 4px solid transparent;
      border-bottom: 4px solid transparent;
      transform: translate(-4px, 10px) rotate(45deg);
    }
  }
  // Theme Colors
  .b1 {
    border-left: 1px rgb(37, 138, 239) solid;
  }
  .b2 {
    border-left: 1px rgb(22, 180, 248) solid;
  }
  .b3 {
    border-left: 1px rgb(13, 200, 130) solid;
  }
  .b4 {
    border-left: 1px rgb(222, 189, 88) solid;
  }
  .b5 {
    border-left: 1px rgb(244, 149, 43) solid;
  }
  .b6 {
    border-left: 1px rgb(33, 243, 243) solid;
  }
  .b7 {
    border-left: 1px rgb(165, 187, 4) solid;
  }
  .ac1 {
    border: 1px rgb(37, 138, 239) solid;
    // background-color: rgba(37, 138, 239, 0.2);
  }
  .ac2 {
    border: 1px rgb(22, 180, 248) solid;
    // background-color: rgba(22, 180, 248, 0.2);
  }
  .ac3 {
    border: 1px rgb(13, 200, 130) solid;
    // background-color: rgba(13, 200, 130, 0.2);
  }
  .ac4 {
    border: 1px rgb(222, 189, 88) solid;
    // background-color: rgba(222, 189, 88, 0.2);
  }
  .ac5 {
    border: 1px rgb(244, 149, 43) solid;
    // background-color: rgba(244, 149, 43, 0.2);
  }
  .ac6 {
    border: 1px rgb(33, 243, 243) solid;
    // background-color: rgba(33, 243, 243, 0.2);
  }
  .ac7 {
    border: 1px rgb(165, 187, 4) solid;
    // background-color: rgba(165, 187, 4, 0.2);
  }
}
</style>
