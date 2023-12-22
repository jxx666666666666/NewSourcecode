<!--
 * @Description:Cycle graph
 * @Version: 1.0
 * @Date: 2020-11-06 16:39:22
 * @LastEditTime: 2023-12-05 14:29:12
-->
<template>
  <div class="loopChart">
    <div class="container">
      <div ref="loop" :style="{ width: `${width}`, height: `${height}` }"></div>
      <div
        class="loop_label"
        v-if="textshow"
        :style="{ width: `${width}`, height: `${height}` }"
      >
        <div
          class="text"
          :title="selectedSeries.legend"
          v-text="selectedSeries.legend"
          :style="{ fontSize: `${fontText}px` }"
        ></div>
        <div
          class="num"
          :style="{ fontSize: `${fonts}px` }"
          v-text="selectedSeries.measure"
        ></div>

        <!-- <div class="num" :style="{ fontSize: `${fonts}px` }">{{ selectedSeries.value }}</div> -->
      </div>
    </div>

    <div class="flex-ledengs" v-if="flexLegends == 1">
      <div
        class="legends-item"
        v-for="(item, index) in returnData"
        :key="index"
      >
        <div class="left">
          <div class="name">{{ item.name }}</div>
          <div class="line">
            <div
              v-if="isGradual"
              :style="{ background: item.itemStyle.color, width: item.num }"
            ></div>
            <div
              v-else
              :style="{
                background: `linear-gradient(to right, ${Graduallegends[index].start}, ${Graduallegends[index].end})`,
                width: item.num,
              }"
            ></div>
          </div>
        </div>
        <div class="right">{{ item.value }}</div>
      </div>
    </div>

    <div class="flex-ledengs2" v-if="flexLegends == 2">
      <div
        class="legends-item"
        v-for="(item, index) in returnData"
        :key="index"
        @click="selectLegend(item)"
      >
        <div class="legends">
          <div
            class="block"
            :style="{ background: item.itemStyle.color }"
          ></div>
          <div class="name">{{ item.name }}</div>
          <div class="rate" style="height: 14px">
            <!-- background-image: linear-gradient(to right, red , yellow); -->
            <div
              :style="{
                'background-image':
                  'linear-gradient(to right, ' +
                  item.itemStyle.color +
                  '00' +
                  ',' +
                  item.itemStyle.color +
                  'ff' +
                  ')',
                width: progressNum(item.value),
              }"
            >
              {{ item.rate }}
            </div>
          </div>
          <div class="value" :style="{ color: item.itemStyle.color }">
            {{ item.value }}
          </div>
        </div>
      </div>
    </div>

    <div class="flex-ledengs3" v-if="flexLegends == 3">
      <div
        class="legends-item"
        v-for="(item, index) in returnData"
        :key="index"
      >
        <div class="left">
          <div class="text">
            <div class="name">{{ item.name }}</div>
            <div class="value" :style="'color:' + legends[index]">
              {{ item.value }}
            </div>
            <div class="unit">{{ unit }}</div>
          </div>
          <div class="line">
            <div
              v-if="isGradual"
              :style="{ background: item.itemStyle.color, width: item.num }"
            ></div>
            <div
              v-else
              :style="{
                background: `linear-gradient(to right, ${Graduallegends[index].start}, ${Graduallegends[index].end})`,
                width: item.num,
              }"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex-ledengs4" v-if="flexLegends == 4">
      <div class="legend">
        <div
          class="legend_item"
          v-for="(item, index) in returnData"
          :key="index"
        >
          <div class="title">{{ item.name }}</div>
          <div class="value">
            <span :style="'color:' + legends[index]">
              {{ item.value }}
            </span>
            <span>{{ unit }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-ledengs5" v-if="flexLegends == 5">
      <div
        class="legends-item"
        v-for="(item, index) in returnData"
        :key="index"
        @click="selectLegend(item)"
      >
        <div class="legends">
          <div
            class="block"
            :style="{ background: item.itemStyle.color }"
          ></div>
          <div class="name">{{ item.name }}</div>
          <div class="rate" style="height: 14px">
            <!-- background-image: linear-gradient(to right, red , yellow); -->
            <div
              :style="{
                'background-image':
                  'linear-gradient(to right, ' +
                  item.itemStyle.color +
                  '00' +
                  ',' +
                  item.itemStyle.color +
                  'ff' +
                  ')',
                width: progressNum(item.value),
              }"
            >
              {{ item.rate }}
            </div>
          </div>
          <div class="value" :style="{ color: item.itemStyle.color }">
            {{ item.value }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Introducing Vuex
import { mapState } from "vuex";

export default {
  components: {},
  props: {
    bid: { type: String, default: "" }, //unique identification
    height: { type: String, default: "100%" }, //height
    width: { type: String, default: "100%" }, //width
    isGradual: { type: Boolean, default: true }, //isGradual
    // data
    rowData: {
      type: Array,
      default: () => {
        return [
          {
            legend: "360 ° Patrol Vehicle Calls",
            measure: 100,
            rate: "13.33%",
          },
          { legend: "Number of drone calls", measure: 100, rate: "13.33%" },
          {
            legend: "Number of law enforcement instrument calls",
            measure: 100,
            rate: "13.33%",
          },
          {
            legend: "Number of emergency firefighting equipment calls",
            measure: 100,
            rate: "13.33%",
          },
        ];
      },
    },
    rowDatas: {
      type: Array,
      default: () => {
        return [];
      },
    },
    //Legend data
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
    //Legend data
    Graduallegends: {
      type: Array,
      default: () => {
        return [];
      },
    },
    // Whether to display year-on-year
    isup: {
      type: Boolean,
      default: false,
    },
    //12.Customize whether the overall legend is displayed
    diyLegendIsShow: {
      type: Boolean,
      default: true,
    },
    //Elastic Legend
    flexLegends: {
      type: Number,
      default: 1,
    },

    //15. Is the text initialization in the middle of the pie chart displayed
    pietext: {
      type: Boolean,
      default: true,
    },
    textshow: {
      type: Boolean,
      default: true,
    },
    //Number size in the middle of the pie chart
    fonts: {
      type: [String, Number],
      default: "70",
    },
    //unit
    unit: {
      type: String,
      default: "piece",
    },
    //Middle text size in pie chart
    fontText: {
      type: [String, Number],
      default: "16",
    },
    //Pie Chart Size
    radius: {
      type: Array,
      default: () => {
        return ["85%", "75%"];
      },
    },
    radiuss: {
      type: Array,
      default: () => {
        return ["30%", "40%"];
      },
    },
    //Center position of pie chart
    center: {
      type: Array,
      default: () => {
        return ["50%", "50%"];
      },
    },
    //three-dimensional data
    EquipmentData: {
      type: Array,
      default: () => {
        return ["45%", "45%"];
      },
    },
    //Legend Text Size
    legendsfz: {
      type: Number,
      default: 14,
    },
    //Legend Style Height
    itemHeight: {
      type: Number,
      default: 18,
    },
    //Custom Legend Top Margin
    diyLegendsTop: {
      type: String,
      default: "-52px",
    },
    //Custom Legend Left Margin
    diyLegendsLeft: {
      type: String,
      default: "0",
    },
    //Custom Legend Units
    diyLegendsText: {
      type: String,
      default: "times",
    },
    //Custom Legend Item Top and Bottom Margins
    diyLegendsBorder: {
      type: String,
      default: "0px",
    },
    itemGap: {
      type: Number,
      default: 10,
    },
    //Legends from top
    top: {
      type: String,
      default: "10%",
    },
    right: {
      type: String,
      default: "-60px",
    },
    //Legend data
    legenddata: {
      type: Array,
      default: () => {
        return [{ name: "" }];
      },
    },
    legenddatas: {
      type: Array,
      default: () => {
        return [{}];
      },
    },
    //Legend development
    legendshow: {
      type: Boolean,
      default: false,
    },

    /**
     * echarts Default Legend Type
     * 'plain'：Normal legend. The default is a regular legend.
     * 'scroll'：A scrollable legend. Can be used when there are a large number of legends.
     */
    legendType: {
      type: String,
      default: "scroll",
    },
  },

  data() {
    return {
      //Current clicked content
      CurrentValue: "",
      loopData: [],
      returnData: [],
      num: 0,
      //The currently selected data
      selectedSeries: {
        legend: "",
        measure: "",
      },
      sum: 0,
      nnm: 0,
      allNum: 0,
      allNumList: [],
      total: 0,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.drawChart();
    });
  },
  created() {
    this.rowData.forEach((item) => {
      // if (item.measure > this.allNum) {
      //   this.allNum = item.measure;
      // }
      this.allNum += item.measure;
      this.total = item.measure;
    });
  },
  computed: {
    ...mapState([]),
    progressNum() {
      return function (aaa) {
        return ((aaa / this.total) * 100).toFixed(1) + "%";
      };
    },
  },
  methods: {
    drawChart() {
      // Initialize the echarts instance based on the prepared dom
      this.loopChart = this.$echarts.init(this.$refs.loop);
      this.option = {
        tooltip: {
          trigger: "item",
          formatter: "{b}:{d}%",
          textStyle: {
            fontSize: 20,
          },
        },
        legend: [
          {
            type: "scroll",
            show: this.legendshow,
            type: this.legendType,
            top: this.top,
            width: "74%",
            right: this.right,
            itemWidth: 4,
            orient: "vertical",
            itemHeight: this.itemHeight,
            data: this.legenddata,
            itemGap: this.itemGap,
            textStyle: {
              color: "#ADC6D2",
              fontWeight: "bold",
              fontSize: this.legendsfz,
            },
          },
          {
            show: this.legendshows,
            top: this.top,
            right: "20%",
            itemWidth: 4,
            orient: "vertical",
            itemHeight: this.itemHeight,
            data: this.legenddatas,
            textStyle: {
              color: "#ADC6D2",
              fontWeight: "bold",
              fontSize: this.legendsfz,
            },
          },
        ],
        series: [
          {
            type: "pie",
            radius: this.radius,
            center: this.center,
            hoverAnimation: false,
            selectedMode: "single",
            label: {
              show: false,
              position: "center",
            },
            labelLine: {
              show: false,
            },
            data: [],
          },
          {
            type: "pie",
            radius: this.radiuss,
            center: ["50%", "50%"],
            hoverAnimation: false,
            selectedMode: "single",
            label: {
              show: false,
              position: "center",
            },
            labelLine: {
              show: false,
            },
            data: [
              { legend: "School", measure: 5 },
              { legend: "University", measure: 6 },
              { legend: "LC/ADC", measure: 7 },
            ],
          },
        ],
      };
      this.loopData = this.convertData(this.rowData, this.legends);
      this.loopDatas = this.convertDatas(this.rowDatas, this.legendss);
      this.option.series[0].data = this.loopData;
      this.option.series[1].data = this.loopDatas;
      this.carousel();
      this.loopChart.setOption(this.option);
      if (this.diyLegendIsShow == true && this.rowData.length > 5) {
        this.lengedCarousel();
      }
      if (this.legendType == "scroll" && this.rowData.length > 6) {
        this.echartsLengedCarousel(this.option);
      }
    },
    //data conversion
    convertData(rowData, legends) {
      this.sum = 0;
      let returnData = [];
      if (rowData.length > 0) {
        rowData.forEach((d, index) => {
          this.sum += d.measure;
          returnData.push({
            value: d.measure,
            name: d.legend,
            unit: d.unit,
            dw: d.dw,
            itemStyle: {
              color: legends[index % 10],
            },
          });
          this.legenddata.push({
            name: d.legend,
          });
        });
        returnData.forEach((d) => {
          d.num =
            this.sum == 0
              ? "0"
              : Math.round((d.value / this.sum) * 100 * Math.pow(10, 1)) /
                  Math.pow(10, 1) +
                "%";
        });

        if (returnData.length > 0 && returnData[0].value == this.sum) {
          returnData[0].num = "100%";
        }
      } else {
        returnData.push({
          name: "No data",
          value: "0",
          num: "0%",
          itemStyle: { color: "#373F55" },
        });
      }
      this.returnData = returnData;
      return returnData;
    },
    convertDatas(rowDatas, legendss) {
      this.nnm = 0;
      let returnDatas = [];
      if (rowDatas.length > 0) {
        rowDatas.forEach((d, index) => {
          this.nnm += d.measure;
          returnDatas.push({
            value: d.measure,
            name: d.legend,
            unit: d.unit,
            dw: d.dw,
            itemStyle: {
              color: legendss[index % 10],
            },
          });
          this.legenddatas.push({
            name: d.legend,
          });
        });
        returnDatas.forEach((d) => {
          d.num =
            this.sum == 0
              ? "0"
              : Math.round((d.value / this.sum) * 100 * Math.pow(10, 1)) /
                  Math.pow(10, 1) +
                "%";
        });
        if (returnDatas.length > 0 && returnDatas[0].value == this.nnm) {
          returnDatas[0].num = "100%";
        }
      }
      return returnDatas;
    },
    setTimeToDo() {
      if (this.option.series[0].data.length != 0) {
        const data = this.option.series[0].data;
        if (data.length > 2) {
          data.forEach((e) => (e.selected = false));
          data[this.num].selected = true;
        }
        this.selectedSeries.legend = data[this.num].name;
        this.selectedSeries.measure = data[this.num].num;
        this.selectedSeries.value = data[this.num].value;
        this.selectedSeries.unit = data[this.num].unit;
        // Option must be reset because echart did not listen for changes in data
        this.loopChart.setOption(this.option);
      }
    },
    setHighLights() {
      clearInterval(this.timer);
      const data = this.option.series[0].data;
      const datas = this.option.series[1].data;
      this.timer = setInterval(() => {
        if (this.num < data.length - 1 || this.num < datas.length - 1) {
          this.num++;
        } else {
          this.num = 0;
        }
        this.setTimeToDo();
      }, 3000);
    },
    //Carousel
    carousel() {
      if (
        this.option.series[0].data.length > 0 ||
        this.option.series[1].data.length > 0
      ) {
        //Turn on timer
        if (this.pietext) {
          this.setTimeToDo();
          this.setHighLights();
        }

        this.loopChart.on("mouseover", (params) => {
          clearInterval(this.timer);
          // When the mouse moves rapidly, it can cause the code in the mouseover to run too late, causing event delays and the phenomenon of multiple sector regions being selected at the same time. Therefore, it is necessary to set an anti shake function
          this.debounce && clearTimeout(this.debounce);
          this.debounce = setTimeout(() => {
            const data = this.option.series[0].data;
            // const datas = this.option.series[1].data;
            data.forEach((e) => (e.selected = false));
            // datas.forEach((e) => (e.selected = false));
            data[params.dataIndex].selected = true;
            // datas[params.dataIndex].selected = true;
            this.loopChart.setOption(this.option);
            this.num = params.dataIndex;
          }, 700);
        });

        this.loopChart.on("mouseout", () => {
          if (this.pietext) {
            this.setTimeToDo();
            this.setHighLights();
          }
        });
      }
    },
    // --------------------------------------------------
    // Custom Legend Rotation
    lengedCarousel() {
      let that = this;
      if (that.rowData.length > 10) {
        let Scroll = function () {
          // Total height
          let countHeight = document.querySelector(".lendges");
          // Item height
          let itemHeight = document.querySelector(".lendges_item").scrollHeight;
          let goTop = parseInt(
            countHeight.scrollHeight - countHeight.offsetHeight
          );
          if (goTop == parseInt(countHeight.scrollTop)) {
            countHeight.scrollTo(0, 0);
          } else {
            countHeight.scrollTo({
              top: countHeight.scrollTop + itemHeight,
              left: 0,
              behavior: "smooth",
            });
          }
        };
        that.$set(that, "SetInte", setInterval(Scroll, 2000));
      }
    },
    // echarts Legend rotation
    echartsLengedCarousel(option) {
      let that = this;
      let i = -1;
      let dataLen = option.series[0].data.length;
      that.timers = setInterval(() => {
        i = (i + 1) % dataLen; // +1 represents one jump at a time
        this.$emit("loopindex", i);
        that.loopChart.dispatchAction({
          type: "legendScroll",
          scrollDataIndex: i,
          // legendId: string,
        });
      }, 2000);
    },

    setHighLight(item) {
      //
      this.$emit("selectLegend", item);
    },
    // Legend click event
    // selectLegend(item){
    //   this.$emit('selectLegend',item)
    // }
  },
  watch: {
    immediate: true,
    rowData: {
      handler(neVal) {
        this.option.series[0].data = [];
        this.loopData = this.convertData(neVal, this.legends);
        this.option.series[0].data = this.loopData;
        this.$nextTick(() => {
          this.num = 0;
          this.selectedSeries = {
            legend: "",
            measure: "",
          };
          this.sum = 0;
          let chart = this.$echarts.init(this.$refs.loop);
          this.carousel();
          chart.setOption(this.option);
        });
        this.rowData.forEach((item) => {
          this.allNum += item.measure;
          this.total = item.measure;
        });
      },
      deep: false,
    },
    rowDatas: {
      handler(neVal) {
        this.option.series[1].data = [];
        this.loopData = this.convertDatas(neVal, this.legendss);
        this.option.series[1].data = this.loopData;
        this.$nextTick(() => {
          this.num = 0;
          this.selectedSeries = {
            legend: "",
            measure: "",
          };
          this.nnm = 0;
          let chart = this.$echarts.init(this.$refs.loop);
          this.carousel();
          chart.setOption(this.option);
        });
      },
      deep: false,
    },
  },
  destroyed() {
    this.timer && clearInterval(this.timer);
    this.debounce && clearTimeout(this.debounce);
  },
};
</script>
<style lang="less" scoped>
.loopChart {
  display: flex;
  // width: 392px;
  justify-content: space-between;
  align-items: center;
}
.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  pointer-events: all;
}
.loop_label {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 10px;
  .text {
    width: 158px;
    font-size: 24px;
    font-family: "Helvetica";
    // background: linear-gradient(to bottom, #ffffff, #c5fcf3);
    // -webkit-background-clip: text;
    // color: transparent;
    color: #ffffff;
    text-align: center;
  }
  .num {
    font-family: "Roboto";
    font-size: 60px;
    color: #ffffff;
    font-weight: bold;
    // background: linear-gradient(to bottom, #ffffff, #81bac9);
    // -webkit-background-clip: text;
    // color: transparent;
  }
}

//Elastic Box Legend
.flex-ledengs {
  display: flex;
  flex-direction: column;
  .legends-item {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    width: 242px;
    margin-bottom: 8px;
    cursor: pointer;
    .left {
      .name {
        font-family: "Helvetica";
        font-size: 14px;
        color: #bfebff;
        margin-bottom: 5px;
      }
      .line {
        height: 8px;
        width: 190px;
        border-radius: 5px;
        background: rgba(#3e4f62, 0.6);
        div {
          height: 8px;
          border-radius: 5px;
        }
      }
    }
    .right {
      font-family: "Roboto";
      font-size: 20px;
      color: #ffffff;
      margin-bottom: -5px;
    }
  }
}
.flex-ledengs2 {
  margin-left: 60px;
  display: flex;
  flex-direction: column;
  height: 255px;
  justify-content: space-between;
  .legends-item {
    display: flex;
    cursor: pointer;
    .legends {
      display: flex;
      flex-direction: row;
      .block {
        width: 8px;
        height: 16px;
        margin-right: 15px;
        margin-top: 5px;
        border: 1px solid #088;
        border-radius: 100px;
        opacity: 1;
      }
      .name {
        width: 120px;
        font-family: "Helvetica";
        font-size: 24px;
        color: #bfebff;
        margin-bottom: 5px;
      }
      .rate {
        margin-top: 10px;
        width: 260px;
        // text-align: center;
        // font-family: 'Voltage';
        // font-size: 32px;
        // color: #ffffff;
        div {
          border-radius: 7px;
          height: 100%,
        //   width: 0%;
        }
      }
      .value {
        width: 45px;
        text-align: right;
        font-family: "Roboto";
        font-size: 38px;
        background: linear-gradient(to bottom, #ffffff, #73DCFF);
        -webkit-background-clip: text;
        color: transparent;
        margin-left: 50px;
      }

      .unit {
        width: 20px;
        text-align: right;
        font-family: "Adobe Heiti Std";
        font-size: 16px;
        color: #3fcbff;
        margin-top: 5px;
      }
    }
  }
}

.flex-ledengs3 {
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  .legends-item {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    width: 169px;
    margin-bottom: 8px;
    cursor: pointer;
    .left {
      .text {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .name {
          width: 120px;
          font-family: "PingFang SC";
          font-size: 18px;
          background: linear-gradient(to bottom, #ffffff, #d3e7ec);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          margin-bottom: 5px;
        }
        .value {
          width: 30px;
          font-family: "Voltage";
          font-size: 32px;
        }
        .unit {
          font-family: "Microsoft YaHei";
          font-size: 16px;
          color: #3fcbff;
        }
      }

      .line {
        height: 8px;
        width: 190px;
        border-radius: 5px;
        background: rgba(#3e4f62, 0.6);
        div {
          height: 9px;
        }
      }
    }
  }
}

.flex-ledengs4 {
  .legend {
    margin-right: 30px;
    .legend_item {
      margin-bottom: 10px;
      width: 128px;
      height: 81px;
      //   background: url('../../../assets/img/YiWangTongBan/sxgk_legend_bg.png')
      // no-repeat;
      .title {
        width: 150px;
        font-family: "Carbon Fiber Zheng Zhong Hei Jian Ti";
        font-size: 22px;
        background: linear-gradient(to bottom, #ffffff, #b0ebff);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
      }
      .value {
        :nth-child(1) {
          font-family: "Voltage";
          font-size: 50px;
        }
        :nth-child(2) {
          margin-left: 20px;
          font-family: "Microsoft YaHei";
          font-size: 22px;
          color: #3fcbff;
        }
      }
    }
  }
}
.flex-ledengs5 {
  display: flex;
  flex-direction: column;
  height: 220px;
  justify-content: space-between;
  .legends-item {
    display: flex;
    cursor: pointer;
    .legends {
      display: flex;
      flex-direction: row;
      .block {
        width: 5px;
        height: 27px;
        margin-right: 15px;
        margin-top: 5px;
        // border-radius: 100px;
        opacity: 1;
      }
      .name {
        width: 280px;
        font-family: "Helvetica";
        font-size: 24px;
        color: #bfebff;
        margin-bottom: 5px;
      }
      .rate {
        margin-top: 10px;
        width: 150px;
        // text-align: center;
        // font-family: 'Voltage';
        // font-size: 32px;
        // color: #ffffff;
        div {
          border-radius: 7px;
          height: 100%,
        //   width: 0%;
        }
      }
      .value {
        width: 45px;
        text-align: right;
        font-family: "Roboto";
        font-size: 38px;
        background: linear-gradient(to bottom, #ffffff, #73DCFF);
        -webkit-background-clip: text;
        color: transparent;
        margin-left: 30px;
      }

      .unit {
        width: 20px;
        text-align: right;
        font-family: "Adobe Heiti Std";
        font-size: 16px;
        color: #3fcbff;
        margin-top: 5px;
      }
    }
  }
}
</style>
