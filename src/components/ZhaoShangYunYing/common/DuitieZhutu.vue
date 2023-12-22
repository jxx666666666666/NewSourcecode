<template>
  <div class="chartBox">
    <div class="myChart" ref="myChart" :style="{ width: width, height: height }"></div>
    <ul class="legth" :style="{ top: legTop, left: legLeft }" v-if="legIsShow">
      <li v-for="(item, i) in legthWZ" :key="i">
        <h3 :style="{ backgroundColor: legthColor[i] }"></h3>
        <span>{{ item }}</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "pieGeRenNanDing",
  props: {
    rowData: {
      type: Array,
      default: () => {
        return [
          {
            name: "7MW",
            value: 250,
            item: 100
          },
          {
            name: "5MW",
            value: 150,
            item: 20
          },
          {
            name: "3-5MW",
            value: 130,
            item: 30
          },
          {
            name: "1.5-3MW",
            value: 130,
            item: 40
          },
          {
            name: "<1.5MW",
            value: 130,
            item: 50
          }
        ];
      }
    },
    barColor: {
      type: Array,
      default: () => {
        return ["#2693FF", "#2693FF", "#80ECFF", "#80ECFF"];
      }
    },
    legthColor: {
      type: Array,
      default: () => {
        return ["#4BDBF4", "#2693FF"];
      }
    },
    legthWZ: {
      type: Array,
      default: () => {
        return ["OutboundBandwidthUtilizationRate", "InboundBandwidthUtilizationRate"];
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
        return "736px";
      }
    },
    height: {
      type: String,
      default: () => {
        return "360px";
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
        return "200px";
      }
    },
    legIsShow: {
      type: Boolean,
      default: () => {
        return true;
      }
    }
  },
  data() {
    return {
      Xdata: [],
      Ydata: [],
      valTwo: [],
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
      });
    }
    this.drawWidth();
    this.tooltipShuffling();
  },
  methods: {
    drawWidth() {
      // Initialize the ECharts instance based on a prepared DOM.
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
              //Configuration of x-axis labels.
              textStyle: {
                color: "#BFEBFF",
                fontSize: 22,
                fontFamily: "PingFang"
              }
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
            name: `unit:${this.unit}`,
            position: "left",
            type: "value",
            nameTextStyle: {
              color: "#BFEBFF",
              fontSize: 22,
              padding: 2,
              fontFamily: "PingFang"
            },
            axisLabel: {
              //Configuration of y-axis labels.
              textStyle: {
                color: "#BFEBFF",
                fontSize: 22,
                fontFamily: "Helvetica"
              }
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
            name: "AllianceAdvertising.",
            type: "bar",
            stack: "Advertisement",
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
            name: "VideoAdvertisement",
            type: "bar",
            stack: "Advertisement",
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
        this.rowData.forEach(item => {
          this.Xdata.push(item.name);
          this.Ydata.push(item.value);
          this.valTwo.push(item.item);
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
  width: 100%;
  .legth {
    position: absolute;
    left: 321px;
    top: 10px;
    li {
      float: left;
      // width: 200px;
      height: 20px;
      margin-right: 20px;
      h3 {
        float: left;
        width: 6px;
        height: 24px;
        background-color: red;
        margin-top: 6px;
      }
      span {
        margin-left: 7px;
        font-size: 26px;
        font-family: "weiruanyahei";
        color: #bfebff;
      }
    }
  }
}
</style>
