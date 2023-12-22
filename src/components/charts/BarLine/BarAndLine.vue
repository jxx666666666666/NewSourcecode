<template>
  <div class="chartBox">
    <div
      class="myChart"
      ref="myChart"
      :style="{ width: width, height: height }"
    ></div>
    <ul
      class="legth"
      :style="{ top: legTop, right: legLeft }"
      v-if="legIsShow && rowData.length"
    >
      <li v-for="(item, i) in legthWZ" :key="i">
        <h3
          :style="{
            width: stylebrick.width,
            height: stylebrick.height,
            marginTop: stylebrick.marginTop,
            background: legthColor[i],
          }"
        ></h3>
        <span>{{ item }}</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "pieGeRenNanDing",
  props: {
    stylebrick: {
      type: Object,
      default: () => {
        return {
          width: "13px",
          height: "14px",
          marginTop: "2px",
        };
      },
    },
    rowData: {
      type: Array,
      default: () => {
        return [
          {
            name: "20210601",
            value: "10",
            item: "30",
            val: "20",
          },
          {
            name: "20210602",
            value: "20",
            item: "30",
            val: "40",
          },
          {
            name: "20210603",
            value: "50",
            item: "30",
            val: "10",
          },
          {
            name: "20210604",
            value: "20",
            item: "30",
            val: "40",
          },
          {
            name: "20210605",
            value: "30",
            item: "45",
            val: "32",
          },
          {
            name: "20210606",
            value: "45",
            item: "32",
            val: "10",
          },
          {
            name: "20210607",
            value: "12",
            item: "45",
            val: "21",
          },
          {
            name: "20210608",
            value: "23",
            item: "23",
            val: "45",
          },
        ];
      },
    },
    barColor: {
      type: Array,
      default: () => {
        return ["#16B4F8", "#16B4F800", "#F5D471"];
      },
    },
    legthColor: {
      type: Array,
      default: () => {
        return ["#4BDBF4", "#EECC46"];
      },
    },
    legthWZ: {
      type: Array,
      default: () => {
        return ["Traffic Volume of Last Month", "Ring Ratio"];
      },
    },
    unit: {
      type: String,
      default: () => {
        return "10000/square meter";
      },
    },
    barWidth: {
      type: String,
      default: () => {
        return "20";
      },
    },
    width: {
      type: String,
      default: () => {
        return "796px";
      },
    },
    height: {
      type: String,
      default: () => {
        return "284px";
      },
    },
    legTop: {
      type: String,
      default: () => {
        return "10px";
      },
    },
    legLeft: {
      type: String,
      default: () => {
        return "0px";
      },
    },
    legIsShow: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
    fontStyle: {
      type: Object,
      default: () => {
        return {
          Xfont: {
            color: "#BFEBFF",
            fontSize: 14,
            fontFamily: "PingFang",
          },
          Yfont: {
            color: "#BFEBFF",
            fontSize: 14,
            fontFamily: "Helvetica",
          },
          nameTextStyle: {
            color: "#BFEBFF",
            fontSize: 16,
            padding: 2,
            fontFamily: "PingFang",
          },
        };
      },
    },
    rotate: {
      type: Number,
      default() {
        return 0;
      },
    },
  },
  data() {
    return {
      Xdata: [],
      Ydata: [],
      valTwo: [],
      setTime: null,
      chartInst: null,
    };
  },
  mounted() {
    // this.getData();
    if (this.rowData && this.rowData.length > 0) {
      this.rowData.forEach((item) => {
        this.Xdata.push(item.name);
        this.Ydata.push(item.value);
        this.valTwo.push(item.item);
      });
    } else {
      // this.noDataShow();
      return;
    }
    this.drawWidth();
    this.tooltipShuffling();
  },
  methods: {
    drawWidth() {
      // Initialize the echarts instance based on the prepared dom
      this.chartInst = this.$echarts.init(this.$refs.myChart);
      this.chartInst.setOption({
        color: "#00BFFF",
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        grid: {
          top: "20%",
          left: "1%",
          right: "1%",
          bottom: "0%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: this.Xdata,
            axisTick: {
              alignWithLabel: true,
            },
            axisLabel: {
              //Configuration of x-axis text
              textStyle: this.fontStyle.Xfont,
              rotate: this.rotate,
            },
            axisLine: {
              lineStyle: {
                color: "#9FAFB5",
                width: 1.2, //This is for highlighting and adding
              },
            },
          },
        ],
        yAxis: [
          {
            // name: `unit:${this.unit}`,
            position: "left",
            type: "value",
            max: 100,
            nameTextStyle: this.fontStyle.nameTextStyle,
            axisLabel: {
              //Configuration of y-axis text
              textStyle: this.fontStyle.Yfont,
            },
            splitNumber: 5,
            // Set the thickness of the y-axis line
            splitLine: {
              show: true,
              lineStyle: {
                color: ["#0A223E"],
                width: 2,
                type: "solid",
              },
            },
            axisLine: {
              lineStyle: {
                color: "#9FAFB5",
                width: 2, //This is for highlighting and adding
              },
            },
            splitArea: {
              show: true,
              areaStyle: {
                color: ["rgba(255,255,255,.1)", "transparent"],
              },
            },
          },
          {
            // name: `unit:%`,
            position: "right",
            type: "value",
            nameTextStyle: this.fontStyle.nameTextStyle,
            max: 100,
            min: 0,
            axisLabel: {
              //Configuration of y-axis text
              textStyle: this.fontStyle.Yfont,
            },
            splitNumber: 5,
            // Set the thickness of the y-axis line
            splitLine: {
              show: true,
              lineStyle: {
                color: ["#0A223E"],
                width: 2,
                type: "solid",
              },
            },
            axisLine: {
              lineStyle: {
                color: "#9FAFB5",
                width: 2, //This is for highlighting and adding
              },
            },
            splitArea: {
              show: true,
              areaStyle: {
                // color: ['rgba(14,29,52,0.5)', 'rgba(191,235,255,0.12)']
                // color: ['transparent', 'transparent']
                color: ["rgba(255,255,255,.1)", "transparent"],
              },
            },
          },
        ],
        series: [
          {
            name: this.legthWZ[0],
            type: "bar",
            barWidth: this.barWidth,
            data: this.Ydata,
            itemStyle: {
              normal: {
                barBorderRadius: [10, 10, 0, 0],
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: this.barColor[0],
                  },
                  {
                    offset: 1,
                    color: this.barColor[1],
                  },
                ]),
              },
            },
          },
          {
            name: this.legthWZ[1],
            type: "line",
            barWidth: this.barWidth,
            data: this.valTwo,
            yAxisIndex: 1,
            itemStyle: {
              normal: {
                color: this.barColor[2],
              },
            },
          },
        ],
      });
      //Set default selection for highlighted parts
      this.chartInst.dispatchAction({
        type: "downplay",
        seriesIndex: 0,
        dataIndex: 0,
      }); //Mouse in
    },
    tooltipShuffling() {
      clearInterval(this.setTime);
      var currentIndex = -1;
      this.setTime = setInterval(() => {
        var dataLen = this.Ydata.length;
        // Cancel previously highlighted shapes
        this.chartInst.dispatchAction({
          type: "downplay",
          seriesIndex: 0, //Indicates which data loop in the series to display
          dataIndex: currentIndex,
        });
        currentIndex = (currentIndex + 1) % dataLen; //+1 represents one jump at a time
        this.chartInst.dispatchAction({
          type: "showTip",
          seriesIndex: 0,
          dataIndex: currentIndex,
        });
        // show tooltip
        this.chartInst.dispatchAction({
          type: "showTip",
          seriesIndex: 0,
          dataIndex: currentIndex,
        });
      }, 3000);
    },
    // noDataShow() {
    //   this.chartInst = this.$echarts.init(this.$refs.myChart);
    //   this.chartInst.setOption({
    //     backgroundColor: 'rgba(255,255,255,.03)',
    //     title: {
    //       text: `There is currently no data available`,
    //       show: true,
    //       textStyle: {
    //         align: 'center',
    //         color: '#fff',
    //         fontSize: 32
    //       },
    //       top: 'center',
    //       left: 'center'
    //     }
    //   });
    // }
  },
  beforeDestroy() {
    clearInterval(this.setTime);
    this.setTime = null;
    this.chartInst.dispose();
  },
  watch: {
    rowData: {
      handler(val) {
        if (!val.length) {
          this.noDataShow();
          return;
        }
        this.Xdata = [];
        this.Ydata = [];
        this.valTwo = [];
        this.valThree = [];
        this.rowData.forEach((item) => {
          this.Xdata.push(item.name);
          this.Ydata.push(item.value);
          this.valTwo.push(item.item);
        });
        this.tooltipShuffling();
        this.drawWidth();
      },
    },
  },
};
</script>

<style lang="less" scoped>
.chartBox {
  position: relative;
  .legth {
    position: absolute;
    // left: 321px;
    right:0px;
    top: 10px;
    li {
      float: left;
      // width: 200px;
      margin-right: 20px;
      height: 20px;
      h3 {
        float: left;
        width: 4px;
        height: 20px;
        background-color: red;
      }

      span {
        margin-left: 7px;
        font-size: 16px;
        font-family: "PingFang SC";
        color: #bfebff;
      }
    }
  }
}
</style>
