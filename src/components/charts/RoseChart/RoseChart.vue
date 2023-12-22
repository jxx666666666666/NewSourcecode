<!--
 * @Description:Rose Chart
 * @Version: 1.0
 * @Date: 2020-11-06 16:39:22
 * @LastEditTime: 2023-12-05 15:47:25
-->
<template>
  <div class="rose-wrap">
    <div
      ref="roseChart"
      class="rose-project"
      :style="{ width: `${width}`, height: `${height}` }"
    ></div>
    <div class="rose_legend" v-if="legendShow === 0">
      <div class="legend" v-for="(item, index) in rowData" :key="index">
        <div
          class="legend_color"
          :style="{ backgroundColor: legends[index] }"
        ></div>
        <div class="legend_name">{{ item.dimension }}</div>
      </div>
    </div>
    <div class="rose_legenda" v-if="legendShow === 1">
      <div class="legend" v-for="(item, index) in rowData" :key="index">
        <div class="legend_text">
          <div class="legend_name">{{ item.dimension }}</div>
          <div :style="{ color: legends[index] }" class="legend_ratio">
            {{ item.ratio }}%
          </div>
          <div class="legend_value">{{ item.measure | NumFormat }}</div>
          <div class="legend_units">{{ units[index] }}</div>
        </div>
        <div class="ratio">
          <div
            :style="{
              width: item.ratio + '%',
              backgroundColor: legends[index],
            }"
            class="ratios"
          ></div>
        </div>
      </div>
    </div>
    <div class="rose_legendb" v-if="legendShow === 2">
      <div v-for="(item, index) in rowData" :key="index" class="rose_item">
        <div
          class="legend_color"
          :style="{ backgroundColor: legends[index] }"
        ></div>
        <div class="legend_name">{{ item.dimension }}</div>
        <div class="jdt">
          <div
            :style="{
              width: progressNum(item.measure),
              'background-image':
                'linear-gradient(to right, ' +
                legends[index] +
                '00' +
                ',' +
                legends[index] +
                'ff' +
                ')',
            }"
          ></div>
        </div>
        <!-- <div class="legend_dw">{{ unit }}</div> -->
        <!-- <div class="legend_value">
          {{ progressNum(item.measure) }}
        </div> -->
        <div class="legend_num" :style="{ color: legends[index] }">
          {{ item.measure }}
        </div>
      </div>
    </div>
    <div class="rose_legendc" v-if="legendShow === 3">
      <div v-for="(item, index) in rowData" :key="index" class="legend">
        <div
          class="legend_color"
          :style="{ backgroundColor: legends[index] }"
        ></div>
        <div class="legend_name">{{ item.dimension }}</div>
        <div :style="{ color: legends[index] }" class="legend_value">
          {{ item.measure + "%" }}
        </div>
        <!-- <div class="unit">{{ unit }}</div> -->
      </div>
    </div>

    <div class="rose_legend4" v-if="legendShow === 4">
      <div v-for="(item, index) in rowData" :key="index" class="legend">
        <div
          class="legend_color"
          :style="{ backgroundColor: legends[index] }"
        ></div>
        <div class="legend_name">{{ item.dimension }}</div>
      </div>
    </div>
    <div
      class="rose_legendb"
      :style="{ height: height }"
      v-if="legendShow === 5"
    >
      <div v-for="(item, index) in rowData" :key="index" class="rose_item">
        <div
          class="legend_color"
          :style="{ backgroundColor: legends[index] }"
        ></div>
        <div class="legend_name">{{ item.dimension }}</div>
        <div class="jdt">
          <div
            :style="{
              width: progressNum(item.measure),
              'background-image':
                'linear-gradient(to right, ' +
                legends[index] +
                '00' +
                ',' +
                legends[index] +
                'ff' +
                ')',
            }"
          ></div>
        </div>
        <!-- <div class="legend_dw">{{ unit }}</div> -->
        <!-- <div class="legend_value">
          {{ progressNum(item.measure) }}
        </div> -->
        <div class="legend_num" :style="{ color: legends[index] }">
          {{ item.measure }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    rowData: {
      type: Array,
      default: () => {
        return [
          {
            measure: 25,
            dimension: "Chashan Street",
          },
          {
            measure: 20,
            dimension: "xxstreet2",
          },
          {
            measure: 17,
            dimension: "xxstreet3",
          },
          {
            measure: 23,
            dimension: "xxstreet4",
          },
          {
            measure: 15,
            dimension: "xxstreet5",
          },
        ];
      },
    },
    showNumber: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
    legends: {
      type: Array,
      default: () => {
        return [
          "#2872EC",
          "#EBCF57",
          "#00F4EA",
          "#00DD8A",
          "#CDFC2E",
          "#BFFF00",
          "#00EADE",
          "#00C7EA",
          "#1180EE",
        ];
      },
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "100%",
    },
    legendShow: {
      type: Number,
      default: -1,
    },
    radius: {
      type: Array,
      default: () => {
        return [80, 100];
      },
    },
    units: {
      type: Array,
      default: () => {
        return [
          "Ten thousand yuan",
          "Ten thousand yuan",
          "Ten thousand yuan",
          "Ten thousand yuan",
          "Ten thousand yuan",
        ];
      },
    },
    center: {
      type: Array,
      default: () => {
        return ["50%", "65%"];
      },
    },
    legendClick: {
      type: Boolean,
      default: false,
    },
    unit: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      legendList: [],
      colors: [],
      roseOption: {
        grid: {
          top: "0%",
          left: "0%",
          right: "0%",
          bottom: "0%",
          containLabel: true,
        },
        tooltip: {
          trigger: "item",
          formatter: "{b} : {d}%",
        },
        series: [
          {
            type: "pie",
            radius: this.radius,
            center: this.center,
            roseType: "area",
            width: "100%",
            label: {
              normal: {
                show: false,
              },
              emphasis: {
                show: false,
              },
            },
            lableLine: {
              normal: {
                show: false,
              },
              emphasis: {
                show: false,
              },
            },
            data: [],
          },
        ],
      },
      myRoseChart: null,
      timer: null,
      allNum: 0,
      MaxNum: 0,
    };
  },
  mounted() {
    this.initRose();
  },
  watch: {
    rowData: {
      handler(newV, oldV) {
        this.allNum = 0;
        this.initRose();
      },
      deep: true,
    },
  },
  methods: {
    async initRose() {
      // let oRose = document.querySelectorAll('.rose-project')[0];
      // this.myRoseChart = this.$echarts.init(oRose);
      let that = this;
      this.myRoseChart = this.$echarts.init(this.$refs.roseChart);
      this.roseOption.color = this.legends;
      if (this.rowData && this.rowData.length > 0) {
        this.legendList = this.rowData;
        this.colors = this.legends;
        await this.$nextTick(() => {
          this.rowData.forEach((val) => {
            val.name = val["dimension"];
            val.value = val["measure"];
            that.allNum += val["measure"];
          });
          //This is the floating box content
          // if (this.roseObj.unit == '%') {
          //   this.roseOption.tooltip.formatter = '{b} : {d}%';
          // } else {
          //   this.roseOption.tooltip.formatter = '{b} : {c}individual';
          // }
          this.roseOption.series[0].data = this.rowData;
          this.myRoseChart.setOption(this.roseOption);
          this.tooltipShuffling(this.rowData.length);
        });
      }
    },
    tooltipShuffling(num) {
      let count = 0;
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
        this.myRoseChart.clear();
        this.myRoseChart.setOption(this.roseOption);
      }
      this.timer = setInterval(() => {
        if (count == num) {
          count = 0;
          this.myRoseChart.dispatchAction({
            type: "downplay",
            seriesIndex: 0,
            dataIndex: num - 1,
          });
        }
        if (count != 0) {
          this.myRoseChart.dispatchAction({
            type: "downplay",
            seriesIndex: 0,
            dataIndex: count - 1,
          });
        }
        this.myRoseChart.dispatchAction({
          type: "highlight",
          seriesIndex: 0,
          dataIndex: count,
        });
        count++;
      }, 1000);
    },
  },
  computed: {
    progressNum() {
      return function (aaa) {
        this.rowData.forEach((item) => {
          if (item.measure > this.MaxNum) {
            this.MaxNum = item.measure;
          }
        });
        return ((aaa / this.MaxNum) * 100).toFixed(1) + "%";
      };
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
    this.myRoseChart = null;
    this.roseOption = null;
  },
};
</script>

<style lang="less" scoped>
.rose-wrap {
  // width: 308px;
  // height: 161px;
  // float: right;
  position: relative;
  display: flex;
  align-items: center;
  .rose_legend {
    margin-left: 20px;
    height: 192px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 25px;
    .legend {
      height: 22px;
      display: flex;
      .legend_color {
        width: 12px;
        height: 8px;
        margin-top: 7px;
      }
      .legend_name {
        font-size: 16px;
        color: #bfebff;
        font-family: "msyh";
        line-height: 22px;
        margin-left: 15px;
      }
    }
  }
  .rose_legenda {
    // width: 347px;
    // margin-left: 150px;
    .legend {
      width: 100%;
      height: 40px;
      margin-bottom: 10px;
      .legend_text {
        display: flex;
        .legend_name {
          font-size: 20px;
          font-family: "msyh";
          color: #bfebff;
        }
        .legend_ratio {
          font-size: 28px;
          font-family: "Voltage";
          margin-left: auto;
          text-align: right;
          width: 50px;
        }
        .legend_value {
          font-size: 28px;
          font-family: "Voltage";
          color: #e9e9e9;
          text-align: right;
          width: 70px;
        }
        .legend_units {
          font-size: 16px;
          font-family: "msyh";
          color: #3fcbff;
          margin-left: 10px;
          padding-top: 6px;
        }
      }
      .ratio {
        height: 6px;
        width: 100%;
        background: #646473;
        .ratios {
          height: 6px;
        }
      }
    }
  }
  .rose_legendb {
    height: 270px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    // margin-top: 25px;
    .rose_item {
      display: flex;
      align-items: baseline;
      width: 510px;
      .legend_color {
        width: 4px;
        height: 18px;
        // margin-top: 11px;
      }
      .legend_name {
        width: 160px;
        font-size: 24px;
        color: #bfebff;
        font-family: "Helvetica";
        margin-left: 8px;
        white-space: nowrap;
      }
      .legend_num {
        width: 40px;
        font-size: 38px;
        font-family: "Roboto";
        text-align: right;
        margin-left: 50px;
      }
      .jdt {
        width: 240px;
        height: 14px;
        div {
          height: 100%;
          border-radius: 7px;
        }
      }
      .legend_dw {
        font-family: "Adobe Heiti Std";
        font-size: 16px;
        color: #3fcbff;
      }
      .legend_value {
        font-size: 32px;
        background: linear-gradient(to bottom, #ffffff, #81bac9);
        -webkit-background-clip: text;
        color: transparent;
        font-family: "Voltage";
        margin-left: auto;
      }
    }
  }
  .rose_legendc {
    width: 190px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 25px;
    .legend {
      // height: 22px;
      display: flex;
      .legend_color {
        width: 8px;
        height: 26px;
        margin-top: 11px;
      }
      .legend_name {
        font-size: 30px;
        color: #bfebff;
        font-family: "PingFang SC";
        line-height: 50px;
        margin-left: 15px;
      }
      .legend_value {
        font-size: 50px;
        line-height: 50px;
        font-family: "Voltage";
        margin-left: auto;
      }
      .unit {
        color: #fff;
        line-height: 50px;
        font-size: 24px;
        color: #bfebff;
        margin-left: 5px;
        margin-top: 5px;
        font-family: "PingFang SC";
      }
    }
  }
  .rose_legend4 {
    width: 64px;
    height: 125px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    // margin-top: 25px;
    .legend {
      display: flex;
      align-items: center;
      .legend_color {
        width: 5px;
        height: 14px;
        margin-right: 8px;
      }
      .legend_name {
        font-size: 16px;
        color: #bfebff;
        font-family: "PingFang SC";
      }
    }
  }
}
</style>
