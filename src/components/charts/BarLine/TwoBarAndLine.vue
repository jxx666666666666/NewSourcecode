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
          width: "14px",
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
        return ["#3C6BEA", "#02FDE3", "#FAD602"];
      },
    },
    legthColor: {
      type: Array,
      default: () => {
        return ["#3C6BEA", "#02FDE3", "#FAD602"];
      },
    },
    legthWZ: {
      type: Array,
      default: () => {
        return ["Total", "Number Of New Devices", "Growth Rate"];
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
        return "13";
      },
    },
    width: {
      type: String,
      default: () => {
        return "100%";
      },
    },
    height: {
      type: String,
      default: () => {
        return "294px";
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
        return "180px";
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
            fontSize: 22,
            fontFamily: "Helvetica",
          },
          Yfont: {
            color: "#BFEBFF",
            fontSize: 22,
            fontFamily: "Helvetica",
          },
          nameTextStyle: {
            color: "#BFEBFF",
            fontSize: 22,
            padding: 2,
            fontFamily: "Helvetica",
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
      Ydata2: [],
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
        this.Ydata2.push(item.val);
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
          top: "16%",
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
              show: false,
            },
            axisLabel: {
              //Configuration of x-axis text
              textStyle: this.fontStyle.Xfont,
              rotate: this.rotate,
            },
            axisLine: {
              lineStyle: {
                color: "#618C9F",
                width: 1, //This is for highlighting and adding
              },
            },
          },
        ],
        yAxis: [
          {
            // name: `unit:${this.unit}`,
            position: "left",
            type: "value",
            nameTextStyle: this.fontStyle.nameTextStyle,
            axisLabel: {
              //Configuration of y-axis text
              textStyle: this.fontStyle.Yfont,
            },
            axisTick: {
              show: false,
            },
            splitNumber: 5,
            // Set the thickness of the y-axis line
            splitLine: {
              show: false,
              lineStyle: {
                color: ["#0A223E"],
                width: 2,
                type: "solid",
              },
            },
            axisLine: {
              lineStyle: {
                color: "#618C9F",
                width: 1, //This is for highlighting and adding
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
            axisTick: {
              show: false,
            },
            type: "value",
            nameTextStyle: this.fontStyle.nameTextStyle,
            min: 0,
            axisLabel: {
              //Configuration of y-axis text
              textStyle: this.fontStyle.Yfont,
            },
            splitNumber: 5,
            // Set the thickness of the y-axis line
            splitLine: {
              show: false,
              lineStyle: {
                color: ["#0A223E"],
                width: 2,
                type: "solid",
              },
            },
            axisLine: {
              lineStyle: {
                color: "#618C9F",
                width: 1, //This is for highlighting and adding
              },
            },
            splitArea: {
              show: false,
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
                    color: this.barColor[0] + "00",
                  },
                ]),
              },
            },
          },
          {
            name: this.legthWZ[1],
            type: "bar",
            barWidth: this.barWidth,
            data: this.Ydata2,
            itemStyle: {
              normal: {
                barBorderRadius: [10, 10, 0, 0],
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: this.barColor[1],
                  },
                  {
                    offset: 1,
                    color: this.barColor[1] + "00",
                  },
                ]),
              },
            },
          },
          {
            name: this.legthWZ[2],
            type: "line",
            smooth: true,
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
        this.Ydata2 = [];
        this.valTwo = [];
        this.rowData.forEach((item) => {
          this.Xdata.push(item.name);
          this.Ydata.push(item.value);
          this.Ydata2.push(item.val);
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
    right: 0px;
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
      &:nth-child(3) {
        h3 {
          margin-top: 10px !important;
          width: 14px !important;
          height: 2px !important;
          position: relative;
          &::before {
            content: "";
            display: block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: #ffffff;
            box-sizing: border-box;
            border: 1px solid #fdd801;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }
        }
      }
    }
  }
}
</style>
