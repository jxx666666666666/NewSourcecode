<template>
  <div class="chartBox">
    <div class="myChart" ref="myChart" :style="{ width: width, height: height }"></div>
    <ul class="legth" :style="{ top: legTop, left: legLeft }" v-if="legIsShow">
      <li v-for="(item, i) in legthWZ" :key="i">
        <h3
          :style="{
            backgroundColor: legthColor[i],
            width: stylebrick.width,
            height: stylebrick.height,
            marginTop: stylebrick.marginTop,
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
          width: "4px",
          height: "20px",
          marginTop: "3px"
        };
      }
    },
    rowData: {
      type: Array,
      default: () => {
        return [
          {
            name: "20210601",
            value: "10",
            item: "30",
            val: "20"
          },
          {
            name: "20210602",
            value: "20",
            item: "30",
            val: "40"
          },
          {
            name: "20210603",
            value: "50",
            item: "30",
            val: "10"
          },
          {
            name: "20210604",
            value: "20",
            item: "30",
            val: "40"
          },
          {
            name: "20210605",
            value: "30",
            item: "45",
            val: "32"
          },
          {
            name: "20210606",
            value: "45",
            item: "32",
            val: "10"
          },
          {
            name: "20210607",
            value: "12",
            item: "45",
            val: "21"
          },
          {
            name: "20210608",
            value: "23",
            item: "23",
            val: "45"
          }
        ];
      }
    },
    barColor: {
      type: Array,
      default: () => {
        return ["#00DD8A", "#00DD8A", "#EECC46", "#EECC46"];
      }
    },
    legthColor: {
      type: Array,
      default: () => {
        return ["#F6D570", "#4DA5FD"];
      }
    },
    legthWZ: {
      type: Array,
      default: () => {
        return ["Self-use Area", "Outgoing Area"];
      }
    },
    unit: {
      type: String,
      default: () => {
        return "%";
      }
    },
    barWidth: {
      type: String,
      default: () => {
        return "22";
      }
    },
    width: {
      type: String,
      default: () => {
        return "820px";
      }
    },
    height: {
      type: String,
      default: () => {
        return "215px";
      }
    },
    legTop: {
      type: String,
      default: () => {
        return "10px";
      }
    },
    legLeft: {
      type: String,
      default: () => {
        return "400px";
      }
    },
    legIsShow: {
      type: Boolean,
      default: () => {
        return true;
      }
    },
    fontStyle: {
      type: Object,
      default: () => {
        return {
          Xfont: {
            color: "#BFEBFF",
            fontSize: 14,
            fontFamily: "PingFang"
          },
          Yfont: {
            color: "#BFEBFF",
            fontSize: 14,
            fontFamily: "Helvetica"
          },
          nameTextStyle: {
            color: "#BFEBFF",
            fontSize: 16,
            padding: 2,
            fontFamily: "PingFang"
          }
        };
      }
    },
    rotate: {
      type: Number,
      default() {
        return 0;
      }
    }
  },
  data() {
    return {
      Xdata: [],
      Ydata: [],
      valTwo: [30, 40, 50, 60],
      valThree: [],
      setTime: null,
      chartInst: null
    };
  },
  mounted() {
    // this.getData();
    if (this.rowData && this.rowData.length > 0) {
      this.rowData.forEach(item => {
        this.Xdata.push(item.name);
        this.Ydata.push(item.value);
        this.valTwo.push(item.item);
        this.valThree.push(item.val);
      });
    }
    this.drawWidth();
    this.tooltipShuffling();
  },
  methods: {
    drawWidth() {
      // Initialize ECharts instance based on a prepared DOM.
      this.chartInst = this.$echarts.init(this.$refs.myChart);
      this.chartInst.setOption({
        color: "#00BFFF",
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: this.Xdata,
            axisTick: {
              alignWithLabel: true
            },
            axisLabel: {
              //Configuration of the x-axis labels.
              textStyle: this.fontStyle.Xfont,
              rotate: this.rotate
            },
            axisLine: {
              lineStyle: {
                color: "#9FAFB5",
                width: 1.2 //This is added for emphasis.
              }
            }
          }
        ],
        yAxis: [
          {
            // name: `unit:${this.unit}`,
            position: "left",
            type: "value",
            nameTextStyle: this.fontStyle.nameTextStyle,
            axisLabel: {
              //Configuration of the y-axis labels.
              textStyle: this.fontStyle.Yfont
            },
            splitNumber: 5,
            // Set the thickness of the y-axis line.
            splitLine: {
              show: true,
              lineStyle: {
                color: ["#0A223E"],
                width: 2,
                type: "solid"
              }
            },
            axisLine: {
              lineStyle: {
                color: "#9FAFB5",
                width: 2 //This is added for emphasis.
              }
            },
            splitArea: {
              show: true,
              areaStyle: {
                color: ["rgba(14,29,52,0.5)", "rgba(191,235,255,0.12)"]
              }
            }
          }
        ],
        series: [
          {
            // name: "DirectAccess",
            type: "bar",
            barWidth: this.barWidth,
            data: this.Ydata,
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: this.barColor[0]
                  },
                  {
                    offset: 1,
                    color: this.barColor[1]
                  }
                ])
              }
            }
          },
          {
            // name: "DirectAccess",
            type: "bar",
            barWidth: this.barWidth,
            data: this.valTwo,
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: this.barColor[2]
                  },
                  {
                    offset: 1,
                    color: this.barColor[3]
                  }
                ])
              }
            }
          }
        ]
      });
      //Set the default selected highlighted section.
      this.chartInst.dispatchAction({
        type: "downplay",
        seriesIndex: 0,
        dataIndex: 0
      }); //Mouse enters.
    },
    tooltipShuffling() {
      clearInterval(this.setTime);
      var currentIndex = -1;
      this.setTime = setInterval(() => {
        var dataLen = this.Ydata.length;
        // Cancel the previously highlighted graphic.
        this.chartInst.dispatchAction({
          type: "downplay",
          seriesIndex: 0, //Represent the cyclic display of data at which index in series.
          dataIndex: currentIndex
        });
        currentIndex = (currentIndex + 1) % dataLen; //+1Represent jumping one at a time.
        this.chartInst.dispatchAction({
          type: "showTip",
          seriesIndex: 0,
          dataIndex: currentIndex
        });
        // show tooltip
        this.chartInst.dispatchAction({
          type: "showTip",
          seriesIndex: 0,
          dataIndex: currentIndex
        });
      }, 1000);
    }
  },
  beforeDestroy() {
    clearInterval(this.setTime);
    this.setTime = null;
    this.chartInst.dispose();
  },
  watch: {
    rowData: {
      handler() {
        this.Xdata = [];
        this.Ydata = [];
        this.valTwo = [];
        this.valThree = [];
        this.rowData.forEach(item => {
          this.Xdata.push(item.name);
          this.Ydata.push(item.value);
          this.valTwo.push(item.item);
          this.valThree.push(item.val);
        });
        this.tooltipShuffling();
        this.drawWidth();
      }
    }
  }
};
</script>

<style lang="less" scoped>
.chartBox {
  position: relative;
  .legth {
    position: absolute;
    left: 321px;
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
        font-size: 22px;
        font-family: "PingFang";
        color: #bfebff;
      }
    }
  }
}
</style>
