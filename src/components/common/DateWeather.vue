<template>
  <!-- -->
  <div class="date_weather" v-if="timeFlag">
    <div class="date_main">
      <!-- Time content -->
      <div class="time_cont">
        <div class="time_top">
          <div class="text">Real Time Switch</div>
          <!-- <div class="timing"></div> -->
          <div class="timing_but">
            <span>{{ defTime }}</span>
            <el-switch @change="timeChange" v-model="timingTimeButton">
            </el-switch>
          </div>
        </div>
        <!-- Time slider -->
        <div class="time_slider" :class="timingTimeButton ? 'forbid' : ''">
          <div class="slider">
            <CustomSlider @sliderChanged="sliderChanged" ref="custom_slider"></CustomSlider>
          </div>
        </div>
        <!-- Time Icon -->
        <div class="time_icon" :class="timingTimeButton ? 'forbid' : ''">
          <div class="icon_item" v-for="(item, index) in timeIcon" :key="index" @click="timeIconActive(item, index)">
            <div class="item_icon">
              <img v-if="!item.flag" :src="item.icon + '.png'" alt="" />
              <img v-else :src="item.icon + '-2.png'" alt="" />
            </div>
            <div class="item_text" :class="item.flag ? 'text_active' : ''">
              {{ item.text }}
            </div>
          </div>
        </div>
      </div>
      <!-- Weather content -->
      <div class="weather_cont">
        <div class="weather_top">
          <div class="text">Real Weather Switch</div>
          <div class="wea_condition">
            <img :src="realWeather.icon + '-2.png'" alt="" />
          </div>
          <div class="weather_but">
            <div class="but_text">{{ realWeather.text }}</div>
            <el-switch v-model="timingWeatherButton" @change="weatherChange">
            </el-switch>
          </div>
        </div>
        <div class="weather_icon" :class="timingWeatherButton ? 'forbid' : ''">
          <div class="ionc_item" v-for="(item, index) in weatherIcon" :key="index"
            @click="weatherIconActive(item, index)">
            <div class="item_icon">
              <img v-if="!item.flag" :src="item.icon + '.png'" alt="" />
              <img v-else :src="item.icon + '-2.png'" alt="" />
            </div>
            <div class="item_text" :class="item.flag ? 'text_active' : ''">
              {{ item.text }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Mask -->
    <!-- <div class="mask_shade"></div> -->
  </div>
</template>

<script>
import Time from '../../utils/common/time'
import Environment from '../../utils/GisManagers/Environment'
import CustomSlider from './CustomSlider.vue';
import { getWeatherAPI } from '../../api/base'
export default {
  props: {
    timeFlag: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      now: null,
      day: null,
      time: null,
      month: null,
      // Real time button
      timingTimeButton: false,
      // Time slider value
      timeSliderNum: [0, 6, 12, 18, 23],
      //   Time slider
      timeSlider: 420,
      //   Time Icon
      timeIcon: [
        {
          text: 'morning',
          icon: '/img/weather/Time-morning',
          flag: false
        },
        {
          text: 'noon',
          icon: '/img/weather/Time-noon',
          flag: false
        },
        {
          text: 'dusk',
          icon: '/img/weather/Time-dusk',
          flag: false
        },
        {
          text: 'evening',
          icon: '/img/weather/Time-evening',
          flag: false
        },
        {
          text: 'night',
          icon: '/img/weather/Time-night',
          flag: false
        }
      ],
      //   Real time weather button
      timingWeatherButton: false,
      // weather icon
      weatherIcon: [
        {
          text: 'Sunny',
          icon: '/img/weather/Weather-Sunny',
          flag: true
        },
        {
          text: 'Foggy',
          icon: '/img/weather/Weather-Foggy',
          flag: false
        },
        {
          text: 'LightRain',
          icon: '/img/weather/Weather-LightRain',
          flag: false
        },
        // {
        //     text: 'LightSnow',
        //     icon: '/img/weather/Weather-spit',
        //     flag: false
        // },

        {
          text: 'PartlyCloudy',
          icon: '/img/weather/Weather-PartlyCloudy',
          flag: false
        },
        {
          text: 'Dust',
          icon: '/img/weather/Weather-Dust',
          flag: false
        },
        {
          text: 'ModerateRain',
          icon: '/img/weather/Weather-ModerateRain',
          flag: false
        },
        // {
        //     text: 'ModerateSnow',
        //     icon: '/img/weather/Weather-Snow',
        //     flag: false
        // },

        {
          text: 'Overcast',
          icon: '/img/weather/Weather-Overcast',
          flag: false
        },
        {
          text: 'Haze',
          icon: '/img/weather/Weather-Haze',
          flag: false
        },
        {
          text: 'HeavyRain',
          icon: '/img/weather/Weather-HeavyRain',
          flag: false
        },
        // {
        //     text: 'HeavySnow',
        //     icon: '/img/weather/Weather-MajorSnow',
        //     flag: false
        // },

      ],
      //Displayed weather picture
      defIcon: '/img/weather/Weather-ModerateRain',
      defTime: '07:00',
      weathers: {
        Sunny: 'Sunny',
        PartlyCloudy: 'PartlyCloudy',
        Overcast: 'Overcast',
        LightRain: 'LightRain',
        ModerateRain: 'ModerateRain',
        HeavyRain: 'HeavyRain',
        LightSnow: 'LightSnow',
        ModerateSnow: 'ModerateSnow',
        HeavySnow: 'HeavySnow',
        Foggy: 'Foggy',
        Dust: 'Dust',
        Haze: 'Haze'
      },
      times: {
        morning: '07:00',
        noon: '12:00',
        dusk: '17:00',
        evening: '17:09',
        night: '20:00'
      },
      // timer 
      interTime: null,
      xjButton: false,
      realWeather: {
        text: 'Sunny',
        icon: '/img/weather/Weather-Sunny'
      }
    }
  },
  created() {
    this.initDay()
  },
  methods: {
    // When the slider label corresponds to
    sliderLabel(value) {
      let hh =
        parseInt((value * 24) / 1440) > 9
          ? parseInt((value * 24) / 1440)
          : '0' + parseInt((value * 24) / 1440)
      let mm =
        parseInt(value % 60) > 9
          ? parseInt(value % 60)
          : '0' + parseInt(value % 60)
      value = hh + ':' + mm
      this.defTime = value
      return value
    },
    closeTime() {
      this.$emit('closeTime')
    },
    // Time button
    timeChange(val) {
      if (val) {
        this.timeIcon.forEach(item => {
          item.flag = false
        })
        this.realTime()
      } else {
        clearInterval(this.interTime)
        this.interTime = null
      }
    },
    // Weather button
    weatherChange(val) {
      if (val) {
        this.weatherIcon.forEach(item => {
          item.flag = false
        })
        this.GetWeatherApi();
      }
    },
    // Click on the time icon to highlight it
    timeIconActive(item, index) {
      this.$refs.custom_slider.setValue(item.text);
      if (!this.timingTimeButton) {
        this.timeIcon.forEach(item => {
          item.flag = false
        })
        this.timeIcon[index].flag = true
        this.defTime = this.times[item.text]
        this.correspondingTime(this.defTime, false)
        // window.gisManager.environment.changeEnvTime(this.times[item.text]);

        this.$store.commit('setSceneTime', this.times[item.text])
      }
    },
    // Click the weather icon to highlight
    weatherIconActive(item, index) {
      if (!this.timingWeatherButton) {
        this.weatherIcon.forEach(item => {
          item.flag = false
        })
        this.weatherIcon[index].flag = true
        this.realWeather = item
        window.gisManager.environment.changeEnvWeather(this.weathers[item.text]);
      }
    },
    //Time slider
    sliderTiemChange() {
      window.gisManager.environment.changeEnvTime(this.defTime);
      // this.$store.commit('setSceneTime', this.defTime)
    },
    // Get timestamp
    initDay() {
      this.now = new Date()
      this.week = Time.getWeek(this.now)
      this.day = Time.format('yyyy-MM-dd', this.now)
      this.time = Time.format('HH:mm:ss', this.now)
      this.month = Time.format('M', this.now)
    },
    // Real time
    realTime() {
      let evnTime = new Date().format('hh:mm')
      this.$store.commit('setSceneTime', evnTime)
      this.defTime = evnTime
      this.correspondingTime(evnTime, true)
      this.interTime = setInterval(() => {
        this.defTime = evnTime
        let evnTime = new Date().format('hh:mm')
        this.$store.commit('setSceneTime', evnTime)
        this.correspondingTime(evnTime, true)
      }, 1000 * 60)
    },
    //  Time corresponding to numerical value
    correspondingTime(evnTime, flag) {
      let arr = evnTime.split(':')
      if (flag) {
        this.timeSlider = arr[0] * 60 + parseInt(arr[1] / 6)
      } else {
        this.timeSlider = arr[0] * 60 + parseInt(arr[1])
      }
    },
    sliderChanged(event) {
      let minutes = parseInt(1440 * event);
      let hh = parseInt(minutes / 60) > 9 ? parseInt(minutes / 60) : "0" + parseInt(minutes / 60);
      let mm = parseInt(minutes % 60) > 9 ? parseInt(minutes % 60) : "0" + parseInt(minutes % 60);
      this.defTime = hh + ':' + mm;
      this.sliderTiemChange();
    },
    async GetWeatherApi() {
      let params = {
        q: "Konza",
        appid: "f8a7a765e83c3007c40fd5fc3933769e", // 天气接口密钥
        units: "metric",
      };
      let data = await getWeatherAPI('/weather', params);
      if (data.weather[0].main == "Clear") {
        this.realWeather.text = 'Sunny';
        this.realWeather.icon = '/img/weather/Weather-Sunny'
      } else if (data.weather[0].main == "Clouds") {
        this.realWeather.text = 'PartlyCloudy';
        this.realWeather.icon = '/img/weather/Weather-PartlyCloudy'
      } else if (data.weather[0].main == "Heavy") {
        this.realWeather.text = 'Overcast';
        this.realWeather.icon = '/img/weather/Weather-Overcast'
      } else if (data.weather[0].main == "Rain" && data.weather[0].description == "light rain") {
        this.realWeather.text = 'LightRain';
        this.realWeather.icon = '/img/weather/Weather-LightRain'
      } else if (data.weather[0].main == "Rain" && data.weather[0].description == "moderate rain") {
        this.realWeather.text = 'ModerateRain';
        this.realWeather.icon = '/img/weather/Weather-ModerateRain'
      } else if (data.weather[0].main == "Rain") {
        this.realWeather.text = 'HeavyRain';
        this.realWeather.icon = '/img/weather/Weather-HeavyRain'
      } else if (data.weather[0].main == "Fog") {
        this.realWeather.text = 'Foggy';
        this.realWeather.icon = '/img/weather/Weather-Foggy'
      } else if (data.weather[0].main == "Dust") {
        this.realWeather.text = 'Dust';
        this.realWeather.icon = '/img/weather/Weather-Dust'
      } else if (data.weather[0].main == "Haze") {
        this.realWeather.text = 'Haze';
        this.realWeather.icon = '/img/weather/Weather-Haze'
      }
      window.gisManager.environment.changeEnvWeather(this.realWeather.text);
    },
  },
  computed: {
  },
  components: {
    CustomSlider
  }
}
</script>

<style lang="less" scoped>
.date_weather {
  position: absolute;
  top: 132px;
  // left: 0px;
  right: 36px;
  width: 640px;
  height: 910px;
  z-index: 5;
  pointer-events: all;
  background: rgba(15, 26, 36, 0.8);

  .date_main {
    width: 100%;
    pointer-events: all;

    .time_cont {
      width: 100%;
      padding: 0px 27px 0px 27px;
      box-sizing: border-box;

      .time_top {
        width: 98%;
        height: 90px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .text {
          font-family: "Microsoft YaHei";
          font-size: 28px;
          color: #cacad8;
        }

        .timing {
          width: 80px;
        }

        .timing_but {
          height: 100%;
          display: flex;
          align-items: center;

          span {
            font-family: "Arial";
            font-size: 28px;
            color: #cacad8;
            margin-right: 20px;
          }

          /deep/ .el-switch {
            transform: scale(1.5);

            .el-switch__core::after {
              width: 20px;
              height: 20px;
              top: 0px;
            }
          }
        }
      }

      .time_slider {
        width: 100%;
        height: 70px;

        .time_num {
          width: 100%;
          height: 20px;
          line-height: 30px;
          font-family: "Arial";
          font-size: 28px;
          color: #cacad8;
          position: relative;

          div {
            position: absolute;
            top: 0px;
          }

          .item_time1 {
            left: 145px;
          }

          .item_time2 {
            left: 285px;
          }

          .item_time3 {
            left: 440px;
          }

          .item_time4 {
            right: 0px;
          }
        }

        .slider {
          width: 100%;
        }
      }

      .time_icon {
        width: 100%;
        height: 154px;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #ffffff30;

        .icon_item {
          .item_icon {
            width: 128px;
            height: 74px;
            text-align: center;
            line-height: 74px;

            img {
              vertical-align: middle;
            }
          }

          .item_text {
            // width: 66px;
            text-align: center;
            font-size: 28px;
            font-family: "Microsoft YaHei";
            color: #cacad8;
          }

          .text_active {
            color: #ffffff;
            text-shadow: -2px 2px 8px #26c9ff;
          }
        }
      }
    }

    .weather_cont {
      width: 100%;
      height: 560px;

      .weather_top {
        width: 100%;
        height: 120px;
        display: flex;
        align-items: center;
        padding: 0px 30px 0px 20px;
        box-sizing: border-box;

        .text {
          width: 275px;
          font-family: "Microsoft YaHei";
          font-size: 28px;
          color: #cacad8;
        }

        .wea_condition {
          width: 80px;
          // text-align: right;
          // text-indent: 20px;

          img {}
        }

        .weather_but {
          font-family: "Microsoft YaHei";
          font-size: 28px;
          color: #cacad8;
          width: 230px;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .but_text {
            width: 100px;
            text-align: center;
          }

          /deep/ .el-switch {
            transform: scale(1.5);

            .el-switch__core::after {
              width: 20px;
              height: 20px;
              top: 0px;
            }
          }
        }
      }

      .weather_icon {
        width: 100%;
        height: 460px;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;

        .ionc_item {
          width: 212px;
          height: 150px;

          .item_icon {
            width: 128px;
            height: 74px;
            line-height: 74px;
            text-align: center;

            img {
              vertical-align: middle;
              transform: translate(39px, 0px);
            }
          }

          .item_text {
            text-align: center;
            font-size: 28px;
            font-family: "Microsoft YaHei";
            color: #cacad8;
          }

          .text_active {
            color: #ffffff;
            text-shadow: -2px 2px 8px #26c9ff;
          }
        }
      }
    }

    .xjsskg {
      width: 100%;
      padding: 0px 27px 30px 27px;
      box-sizing: border-box;
      border-bottom: 1px solid #ffffff30;

      .xjsskg_top {
        width: 98%;
        height: 90px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .text {
          font-family: "Microsoft YaHei";
          font-size: 28px;
          color: #cacad8;
        }

        .xjsskg_but {
          height: 100%;
          display: flex;
          align-items: center;

          span {
            font-family: "Arial";
            font-size: 28px;
            color: #cacad8;
            margin-right: 20px;
          }

          /deep/ .el-switch {
            transform: scale(1.5);

            .el-switch__core::after {
              width: 20px;
              height: 20px;
              top: 0px;
            }
          }
        }
      }

      .xjsskg_cont {
        width: 100%;
        display: flex;
        justify-content: space-between;

        .item_xjsskg {
          .item_img {
            width: 100px;
            height: 100px;
            line-height: 100px;
            text-align: center;

            img {
              vertical-align: middle;
            }
          }

          .item_text {
            width: 100px;
            text-align: center;
            font-size: 28px;
            font-family: "Microsoft YaHei";
            color: #cacad8;
          }

          .item_text_ac {
            color: #fff;
            text-shadow: 0px 0px 8px #0080ff;
          }
        }
      }
    }
  }

  .forbid {
    cursor: not-allowed;
  }

  .mask_shade {
    width: 100%;
    height: 100%;
    position: absolute;
    bottom: 0px;
    z-index: 1001;
    cursor: not-allowed;
    pointer-events: all;
    display: none;
  }
}
</style>
