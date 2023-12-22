<template>
  <div class="weather">

    <!-- <div :style="{ backgroundImage: 'url(' + changeBackground(weathertext) + ')' }"></div> -->
    <img class="weatherIcon" :src="img" alt="">
    <div class="weatherOne">{{ temp }}<span>℃</span></div>

    <!-- <div class="weatherFour">
      <div class="weatherFourTop">
        <span>CLEAR</span>
        <span>54 GOOD</span>
      </div>
      <div class="weatherFourBottom">30℃-40℃</div>
    </div> -->
  </div>
</template>

<script>
import { getWeatherAPI } from '../../api/base'
export default {
  name: "weather",
  data() {
    return {
      weathertext: "clear day",
      temp: "26.0",
      timer: null,
      img: '/img/weather/Weather-Sunny.png'
    };
  },
  methods: {
    async GetWeatherApi() {
      let params = {
        q: "Konza",
        appid: "f8a7a765e83c3007c40fd5fc3933769e", // 天气接口密钥
        units: "metric",
      };
      let data = await getWeatherAPI('/weather', params);
      let weather = '';
      this.weathertext = data.weather[0].main;
      if (data.weather[0].main == "Clear") {
        weather = 'Sunny';
        this.img = '/img/weather/Weather-Sunny.png'
      } else if (data.weather[0].main == "Clouds") {
        weather = 'PartlyCloudy';
        this.img = '/img/weather/Weather-PartlyCloudy.png'
      } else if (data.weather[0].main == "Heavy") {
        weather = 'Overcast';
        this.img = '/img/weather/Weather-Overcast.png'
      } else if (data.weather[0].main == "Rain" && data.weather[0].description == "light rain") {
        weather = 'LightRain';
        this.img = '/img/weather/Weather-LightRain.png'
      } else if (data.weather[0].main == "Rain" && data.weather[0].description == "moderate rain") {
        weather = 'ModerateRain';
        this.img = '/img/weather/Weather-ModerateRain.png'
      } else if (data.weather[0].main == "Rain") {
        weather = 'HeavyRain';
        this.img = '/img/weather/Weather-Foggy.png'
      } else if (data.weather[0].main == "Dust") {
        weather = 'Dust';
        this.img = '/img/weather/Weather-Dust.png'
      } else if (data.weather[0].main == "Haze") {
        weather = 'Haze';
        this.img = '/img/weather/Weather-Haze.png'
      }
      this.temp = data.main.temp.toFixed(0);
      window.gisManager.environment.changeEnvWeather(weather);
    },
  },
  mounted() {
    this.GetWeatherApi();
    this.timer = setInterval(() => {
      this.GetWeatherApi();
    }, 1000 * 60 * 60);
  },
  destroyed() {
    clearInterval(this.timer);
    this.timer = null;
  },
};
</script>

<style lang="less" scoped>
.weather {
  display: flex;
  height: 50px;
  justify-content: space-between;
  align-items: center;

  .weatherOne {
    font-family: "Voltage";
    font-size: 50px;
    color: #e9e9e9;
    line-height: 50px;
    letter-spacing: 3px;
    margin-left: 20px;

    span {
      font-size: 40px;
    }
  }



  .weatherIcon {
    width: 50px;
    // height: 80px;
    position: relative;
  }


  .weatherFour {
    width: 95px;
    height: 52px;
    display: flex;
    flex-direction: column;
    margin-left: 10px;

    .weatherFourTop {
      span:nth-child(1) {
        font-size: 18px;
        color: #fff;
        font-family: "Saira";
      }

      span:nth-child(2) {
        display: inline-block;
        width: 50px;
        height: 18px;
        line-height: 20px;
        text-align: center;
        font-size: 18px;
        color: #000;
        font-family: "Saira";
        background-color: #3cd280;
        border-radius: 2px;
        margin-left: 10px;
      }
    }

    .weatherFourBottom {
      font-size: 20px;
      color: #fff;
      font-family: "Saira";
    }
  }
}
</style>
