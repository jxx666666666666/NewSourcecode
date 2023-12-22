<template>
  <div class="sensorBox">
    <div class="sensortitle">
      <span>NO.2</span>
      <span>Environmental Sensor Properties</span>
    </div>
    <div class="content">
      <div class="contentList" v-for="(item, index) in contentData" :key="index">
        <div class="pictureName">
          <img :src="imgList[index].img" alt="" />
          <span>{{ item.name }}</span>
        </div>
        <div class="num">
          <span>{{ item.value }}</span>
          <span>{{ item.unit }}</span>
        </div>
      </div>
    </div>
    <div class="echartsBox">
      <div class="chartName">
        <div class="legend"></div>
        <div class="legendName">The weekly trend of the indicator</div>
      </div>
      <BarChartsH class="BarChartsH" :zidingyi="true" :ysplitshow="true" :unit="''" :rowData="midbar" :width="'880'"
        :gridLeft="'0%'" :height="'220'"></BarChartsH>
    </div>
  </div>
</template>

<script>
import BarChartsH from "../../../components/charts/ChartBar/BarChartsH.vue";
export default {
  components: {
    BarChartsH,
  },
  props: {
    contentData: {
      type: Array,
      default: () => {
        return [
          { name: "Temperature", value: "20", unit: "°C" },
          { name: "Humidity", value: "60", unit: "%" },
          { name: "PM2.5", value: "20", unit: "ug/m³" },
          { name: "Noise", value: "35", unit: "dB" },
        ];
      },
    },
    midbar: {
      type: Array,
      default: () => {
        return [
          { legend: "1", measure: 50, dimension: "01" },
          { legend: "1", measure: 75, dimension: "02" },
          { legend: "1", measure: 25, dimension: "03" },
          { legend: "1", measure: 40, dimension: "04" },
          { legend: "1", measure: 80, dimension: "05" },
          { legend: "1", measure: 73, dimension: "06" },
          { legend: "1", measure: 50, dimension: "07" },
        ];
      },
    },
  },
  data () {
    return {
      imgList: [
        { img: require("../img/Temperature.png") },
        { img: require("../img/Humidity.png") },
        { img: require("../img/PM.png") },
        { img: require("../img/Noise.png") },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.sensorBox {
  width: 100%;
  height: 100%;
  background: url("../img/surveillance.png") no-repeat center center;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  .sensortitle {
    width: 97%;
    position: relative;
    top: 20px;
    left: 1px;

    span:nth-of-type(1) {
      font-size: 28px;
      color: #fff;
      text-shadow: 0px 4px 40px #8bc2f9;
    }

    span:nth-of-type(2) {
      font-family: "Helvetica";
      font-size: 32px;
      font-weight: bold;
      color: #fff;
      text-shadow: 0px 4px 40px #8bc2f9;
      position: relative;
      left: 20px;
      font-style: italic;
    }
  }

  .content {
    width: 96%;
    height: 20%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    top: 69px;

    .contentList {
      width: 190px;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;

      .num {
        width: 100%;
        padding-left: 55px;

        span:nth-of-type(1) {
          background-image: -webkit-linear-gradient(right, #b2f7f7, #7bdeff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-size: 34px;
          font-family: "Adobe Heiti Std";
        }

        span:nth-of-type(2) {
          font-size: 20px;
          font-family: "Helvetica";
          color: #00ffff;
        }
      }

      .pictureName {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        span {
          font-family: "Helvetica";
          font-size: 28px;
          color: #fff;
        }
      }
    }
  }

  .echartsBox {
    width: 96%;
    height: 250px;
    position: relative;
    top: 80px;

    .BarChartsH {
      position: relative;
      top: -15px;
      left: 15px;
    }

    .chartName {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      .legend {
        width: 5px;
        height: 28px;
        background: #16b4f8;
        margin: 0px 20px;
      }

      .legendName {
        font-family: "Helvetica";
        font-size: 26px;
        font-family: "Helvetica";
        font-size: 26px;
        color: #fff;
        position: relative;
        top: 5px;
      }
    }
  }
}
</style>