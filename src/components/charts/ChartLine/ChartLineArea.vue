<!-- @format -->

<template>
  <div class="chartBox">
    <div class="myChart"
         ref="myChart"
         :style="{ width: width, height: height }"></div>
    <ul class="legth"
        :style="{ top: legTop, left: legLeft }"
        v-if="legIsShow">
      <li v-for="(item, i) in legthWZ"
          :key="i">
        <h3 :style="{ backgroundColor: legthColor[i] }"></h3>
        <span>{{ item }}</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'pieGeRenNanDing',
  props: {
    rowData: {
      type: Array,
      default: () => {
        return [
          {
            name: '00:00',
            value: 90,
            item: 10,
          },
          {
            name: '02:00',
            value: 150,
            item: 20,
          },
          {
            name: '04:00',
            value: 130,
            item: 120,
          },
          {
            name: '04:00',
            value: 130,
            item: 130,
          },
          {
            name: '04:00',
            value: 120,
            item: 140,
          },
          {
            name: '06:00',
            value: 100,
            item: 150,
          },
          {
            name: '08:00',
            value: 80,
            item: 110,
          },
          {
            name: '10:00',
            value: 80,
            item: 160,
          },
          {
            name: '12:00',
            value: 70,
            item: 191,
          },
          {
            name: '14:00',
            value: 90,
            item: 182,
          },
          {
            name: '16:00',
            value: 100,
            item: 170,
          },
          {
            name: '18:00',
            value: 130,
            item: 160,
          },
          {
            name: '20:00',
            value: 120,
            item: 150,
          },
          {
            name: '22:00',
            value: 110,
            item: 140,
          },
        ]
      },
    },
    symbolSize: {
      type: [String, Number],
      default: () => {
        return 6
      },
    },
    barColor: {
      type: Array,
      default: () => {
        return ['#00DD8A', 'rgba(0,221,138,0)', '#80ECFF', '#80ECFF']
      },
    },
    legthColor: {
      type: Array,
      default: () => {
        return ['#4BDBF4', '#EECC46', '#80ECFF', '#80ECFF']
      },
    },
    legthWZ: {
      type: Array,
      default: () => {
        return ['Outbound bandwidth utilization rate', 'Inbound bandwidth utilization rate']
      },
    },
    unit: {
      type: String,
      default: () => {
        return 'piece'
      },
    },
    barWidth: {
      type: String,
      default: () => {
        return '32'
      },
    },
    width: {
      type: String,
      default: () => {
        return '410px'
      },
    },
    height: {
      type: String,
      default: () => {
        return '225px'
      },
    },
    legTop: {
      type: String,
      default: () => {
        return '10px'
      },
    },
    legLeft: {
      type: String,
      default: () => {
        return '2100px'
      },
    },
    legIsShow: {
      type: Boolean,
      default: () => {
        return false
      },
    },
    fontStyle: {
      type: Object,
      default: () => {
        return {
          Xfont: {
            color: '#BFEBFF',
            fontSize: 22,
            fontFamily: 'Helvetica',
          },
          Yfont: {
            color: '#BFEBFF',
            fontSize: 22,
            fontFamily: 'Helvetica',
          },
          nameTextStyle: {
            color: '#BFEBFF',
            fontSize: 20,
            padding: 2,
            fontFamily: 'PingFang SC',
          },
        }
      },
    },
    top: {
      type: String,
      default: () => {
        return '13%'
      },
    },
    left: {
      type: String,
      default: () => {
        return '0%'
      },
    },
    right: {
      type: String,
      default: () => {
        return '2%'
      },
    },

    secondTisk: {
      type: Boolean,
      default: false,
    },
    smooth: {
      type: Boolean,
      default: false,
    },
    interval: {
      type: Number,
      default: null,
    },
    max: {
      type: Number,
      default: null,
    },

  },
  data () {
    return {
      Xdata: [],
      Ydata: [],
      valTwo: [],
      valThree: [],
      setTime: null,
      chartInst: null,
    }
  },
  mounted () {
    // this.getData();
    if (this.rowData && this.rowData.length > 0) {
      this.rowData.forEach((item) => {
        this.Xdata.push(item.name)
        this.Ydata.push(item.value)
        this.valTwo.push(item.item)
        this.valThree.push(item.valThree)
      })
    }
    this.drawWidth()
    this.tooltipShuffling()
  },
  methods: {
    drawWidth () {
      // Initialize the echarts instance based on the prepared dom
      this.chartInst = this.$echarts.init(this.$refs.myChart)
      this.chartInst.setOption({
        color: this.barColor[0],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985',
            },
          },
        },
        grid: {
          top: this.top,
          left: this.left,
          right: this.right,
          bottom: '0%',
          containLabel: true,
        },
        xAxis: [
          {
            boundaryGap: false,
            type: 'category',
            data: this.Xdata,
            axisTick: {
              alignWithLabel: true,
            },
            axisLabel: {
              //Configuration of x-axis text
              textStyle: this.fontStyle.Xfont,
              margin: 15
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: '#9FAFB5',
                width: 0, //This is for highlighting and adding
              },
            },
          },
        ],
        yAxis: [
          {
            name: `unit:${this.unit}`,
            position: 'left',
            type: 'value',
            nameTextStyle: this.fontStyle.nameTextStyle,
            interval: this.interval,
            max: this.max,
            axisLabel: {
              //Configuration of y-axis text
              textStyle: this.fontStyle.Yfont,
            },
            splitNumber: 4,
            // Set the thickness of the y-axis line
            splitLine: {
              show: false,
              lineStyle: {
                color: ['#0A223E'],
                width: 2,
                type: 'solid',
              },
            },
            axisLine: {
              lineStyle: {
                color: '#9FAFB5',
                width: 1, //This is for highlighting and adding
              },
            },
            splitArea: {
              show: true,
              areaStyle: {
                color: ['rgba(191,235,255,0.03)', 'rgba(255,255,255,.08)'],
                // color: ["rgba(238,238,238,0.1)", "rgba(238,238,238,0.2)"],
              },
            },
          },
          // {
          //   name: 'Unit: Day',
          //   position: 'right',
          //   type: 'value',
          //   show: this.secondTisk,
          //   min: 0,
          //   max: 200,
          //   nameTextStyle: this.fontStyle.nameTextStyle,
          //   // interval: 50,
          //   axisLabel: {
          //     //Configuration of y-axis text
          //     textStyle: this.fontStyle.Yfont,
          //   },
          //   splitNumber: 4,
          //   // Set the thickness of the y-axis line
          //   splitLine: {
          //     show: true,
          //     lineStyle: {
          //       color: ['#0A223E'],
          //       width: 1,
          //       type: 'solid',
          //     },
          //   },
          //   axisLine: {
          //     lineStyle: {
          //       color: '#9FAFB5',
          //       width: 1, //This is for highlighting and adding
          //     },
          //   },
          //   splitArea: {
          //     show: true,
          //     areaStyle: {
          //       color: ['rgba(14,29,52,0.5)', 'rgba(191,235,255,0.1)'],
          //       // color: ["rgba(238,238,238,0.1)", "rgba(238,238,238,.1)"],
          //     },
          //   },
          // },
        ],
        series: [
          {
            type: 'line',
            barWidth: this.barWidth,
            data: this.Ydata,
            smooth: this.smooth,
            symbol: 'path://M864 197.888V160a96 96 0 0 0-96-96H256a96 96 0 0 0-96 96v37.888A95.68 95.68 0 0 0 96 288a96 96 0 1 0 192 0 95.68 95.68 0 0 0-64-90.112V160a32 32 0 0 1 32-32h224v544h-13.344a66.656 66.656 0 0 0-66.496 66.88L386.272 928H288a32.032 32.032 0 0 0 0 64h480a32 32 0 0 0 0-64h-130.24l-13.984-191.456c0.064-34.56-29.632-64.544-66.432-64.544H544V128h224a32 32 0 0 1 32 32v37.888A95.68 95.68 0 0 0 736 288a96 96 0 1 0 192 0 95.68 95.68 0 0 0-64-90.112zM192 320a32 32 0 1 1 0-64 32 32 0 0 1 0 64z m367.84 418.88l13.76 189.12h-123.168l13.664-186.784c0.064-4.032 1.248-5.216 2.56-5.216h90.656c1.344 0 2.528 1.184 2.528 2.88zM832 320a32 32 0 1 1 0-64 32 32 0 0 1 0 64z',
            symbolSize: 20,
            symbolOffset: ['1%', '-90%'], //「offset」
            // symbolSize: 0,
            itemStyle: {
              normal: {
                lineStyle: {
                  color: this.barColor[0],
                  shadowColor: this.barColor[0],
                  shadowBlur: 20,
                },
              },
            },
            smooth: this.smooth,
            areaStyle: {
              normal: {
                lineStyle: {
                  width: 30,
                  type: 'solid',
                  shadowColor: 'rgba(0,0,0,0)', //Default Transparency
                  shadowBlur: 5,
                  shadowOffsetX: 3,
                  shadowOffsetY: 3,
                },
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: this.barColor[0] + '99',
                  },
                  {
                    offset: 1,
                    color: this.barColor[0] + '00',
                  },
                ]),
              },
            },
          },
          // {
          //   type: 'line',
          //   barWidth: this.barWidth,
          //   data: this.valTwo,
          //   // symbolSize: this.symbolSize,
          //   symbolSize: 5,

          //   itemStyle: {
          //     normal: {
          //       lineStyle: {
          //         color: this.barColor[2],
          //       },
          //     },
          //   },
          //   areaStyle: {
          //     normal: {
          //       lineStyle: {
          //         width: 30,
          //         type: 'solid',
          //         shadowColor: 'rgba(0,0,0,0)', //Default Transparency
          //         shadowBlur: 5,
          //         shadowOffsetX: 3,
          //         shadowOffsetY: 3,
          //       },
          //       color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
          //         {
          //           offset: 0,
          //           color: this.barColor[2],
          //         },
          //         {
          //           offset: 1,
          //           color: this.barColor[3],
          //         },
          //       ]),
          //     },
          //   },
          // },
          // {
          //   type: 'line',
          //   barWidth: this.barWidth,
          //   data: this.valThree,
          //   // symbolSize: this.symbolSize,
          //   symbolSize: 5,

          //   itemStyle: {
          //     normal: {
          //       lineStyle: {
          //         color: this.barColor[3],
          //       },
          //     },
          //   },
          //   areaStyle: {
          //     normal: {
          //       lineStyle: {
          //         width: 30,
          //         type: 'solid',
          //         shadowColor: 'rgba(0,0,0,0)', //Default Transparency
          //         shadowBlur: 5,
          //         shadowOffsetX: 3,
          //         shadowOffsetY: 3,
          //       },
          //       color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
          //         {
          //           offset: 0,
          //           color: '#FFA64D',
          //         },
          //         {
          //           offset: 1,
          //           color: 'rgba(255,166,77,0)',
          //         },
          //       ]),
          //     },
          //   },
          // },
        ],
      }, true)
      //Set default selection for highlighted parts
      this.chartInst.dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
        dataIndex: 0,
      }) //Mouse in
    },
    tooltipShuffling () {
      clearInterval(this.setTime)
      var currentIndex = -1
      this.setTime = setInterval(() => {
        var dataLen = this.Ydata.length
        // Cancel previously highlighted shapes
        this.chartInst.dispatchAction({
          type: 'downplay',
          seriesIndex: 0, //Indicates which data loop in the series to display
          dataIndex: currentIndex,
        })
        currentIndex = (currentIndex + 1) % dataLen //+1 represents one jump at a time
        this.chartInst.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: currentIndex,
        })
        // show tooltip
        this.chartInst.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: currentIndex,
        })
      }, 1000)
    },
  },
  beforeDestroy () {
    clearInterval(this.setTime)
  },
  watch: {
    rowData: {
      handler () {
        this.Xdata = []
        this.Ydata = []
        this.valTwo = []
        this.valThree = []
        this.rowData.forEach((item) => {
          this.Xdata.push(item.name)
          this.Ydata.push(item.value)
          this.valTwo.push(item.item)
          this.valThree.push(item.valThree)
        })
        this.chartInst.dispose()
        this.drawWidth()
        this.tooltipShuffling()
      },
    },
  },
}
</script>

<style lang="less" scoped>
.chartBox {
  position: relative;
  .legth {
    position: absolute;
    left: 321px;
    top: 10px;
    width: 100%;
    li {
      float: left;
      // width: 200px;
      // margin-right: 20px;
      height: 20px;
      h3 {
        float: left;
        width: 20px;
        height: 7px;
        margin-top: 10px;
        background-color: red;
      }
      span {
        margin-left: 7px;
        font-size: 20px;
        font-family: "PingFang";
        color: #bfebff;
      }
    }
  }
}
</style>
