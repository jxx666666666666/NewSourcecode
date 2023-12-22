<template>
  <div class="sensorBox">
    <div class="sensortitle">
      <span>NO.4</span>
      <span>Other Module Properties</span>
    </div>
    <div class="content">
      <div class="contentList" v-for="(item, index) in contentData" :key="index" @click="OpenHelpButton(index)"
        :class="currentIndex == index ? 'active' : ''">
        <div class="pictureName">
          <img :src="img" alt="" />
          <span>{{ item.name }}</span>
        </div>
        <div class="num">
          <span>{{ item.value }}</span>
        </div>
      </div>
    </div>
    <div class="echartsBox" v-if="false">
      <div class="chartName">
        <div class="legend"></div>
        <div class="legendName">The weekly trend of the indicator</div>
      </div>
      <ChartLine class="BarChartsH" :width="'880px'" :height="'220px'" :rowData="Energydata"
        :barColor="['#418304', '#93FF2B00']"></ChartLine>
    </div>
  </div>
</template>

<script>
import ChartLine from "../../../components/charts/ChartLine/ChartLineArea2.vue";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["currentIndexs"]),
  },
  components: {
    ChartLine,
  },
  props: {
    contentData: {
      type: Array,
      default: () => {
        return [
          { name: "Help Button Status", value: "Normal" },
          { name: "Wifi", value: "Normal" },
          { name: "Broadcast", value: "ABnormal" },
        ];
      },
    },
    Energydata: {
      type: Array,
      default: () => {
        return [
          {
            name: "01",
            value: 75,
          },
          {
            name: "02",
            value: 80,
          },
          {
            name: "03",
            value: 75,
          },
          {
            name: "04",
            value: 75,
          },
          {
            name: "05",
            value: 65,
          },
          {
            name: "06",
            value: 70,
          },
          {
            name: "07",
            value: 65,
          },
          {
            name: "08",
            value: 75,
          },
          {
            name: "09",
            value: 77,
          },
          {
            name: "10",
            value: 70,
          },
          {
            name: "11",
            value: 82,
          },
        ];
      },
    },
  },
  data() {
    return {
      currentIndex: -1,
      currentPanelType: "",
      img: require("../img/threePoint.png"),
    };
  },
  mounted() {
    this.currentIndex = -1;
  },
  methods: {
    OpenHelpButton(index) {
      // this.currentIndex=index
      this.$store.commit("currentIndexs", index);
      if (index == 0) {
        this.$eventBus.$emit("showPanel", "help_bubtton");
        this.currentPanelType = "help_button";
      } else if (index == 1) {
        this.$eventBus.$emit("showPanel", "wifi");
        this.currentPanelType = "wifi";
      }
    },
  },
  watch: {
    currentIndexs: {
      handler(val) {
        this.currentIndex = val;
      },
    },
  },
};
</script>

<style lang="less" scoped>
.active {
  border: 1px solid yellow;
  box-shadow: 0px 0px 12px 6px rgb(255 201 38 / 65%) inset !important;
  background-color: rgba(255, 201, 38, 0.15) !important;
}

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
    width: 90%;
    height: 20%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    top: 55px;

    .contentList {
      width: 270px;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .num {
        width: 100%;

        text-align: center;

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
        justify-content: center;
        align-items: center;
        position: relative;
        top: 15px;

        img {
          position: relative;
          right: 15px;
        }

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
      top: -45px;
      left: 15px;
    }

    .chartName {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      position: relative;
      top: -20px;

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