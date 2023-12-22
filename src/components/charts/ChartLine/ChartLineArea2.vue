<template>
  <div class="chartBox">
    <div
      class="myChart"
      ref="myChart"
      :style="{ width: width, height: height }"
    ></div>
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
        return 5
      },
    },
    barColor: {
      type: Array,
      default: () => {
        return ['#04C8EB', '#80ECFF']
      },
    },
    legthColor: {
      type: Array,
      default: () => {
        return ['#4BDBF4', '#EECC46']
      },
    },
    legthWZ: {
      type: Array,
      default: () => {
        return [
          'Outbound bandwidth utilization rate',
          'Inbound bandwidth utilization rate',
        ]
      },
    },
    unit: {
      type: String,
      default: () => {
        return '%'
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
        return '800px'
      },
    },
    height: {
      type: String,
      default: () => {
        return '260px'
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
        return '200px'
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
            fontSize: 16,
            padding: 2,
            fontFamily: 'PingFang',
          },
        }
      },
    },
    top: {
      type: String,
      default: () => {
        return '20%'
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
    }
  },
  mounted() {
    // this.getData();
    if (this.rowData && this.rowData.length > 0) {
      this.rowData.forEach((item) => {
        this.Xdata.push(item.name)
        this.Ydata.push(item.value)
        this.valTwo.push(item.item)
      })
    } else {
      this.noDataShow()
      return
    }
    this.drawWidth()
    this.tooltipShuffling()
  },
  methods: {
    drawWidth() {
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
          left: '1%',
          right: '4%',
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
            },
            axisLine: {
              lineStyle: {
                color: '#9FAFB5',
                width: 1.2, //This is for highlighting and adding
              },
            },
          },
        ],
        yAxis: [
          {
            // name: `unit:${this.unit}`,
            position: 'left',
            type: 'value',
            nameTextStyle: this.fontStyle.nameTextStyle,
            axisLabel: {
              //Configuration of y-axis text
              textStyle: this.fontStyle.Yfont,
            },
            splitNumber: 5,
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
                width: 3, //This is for highlighting and adding
              },
            },
            splitArea: {
              show: true,
              areaStyle: {
                // color: ["rgba(14,29,52,0.5)", "rgba(191,235,255,0.1)"]
                color: ['rgba(238,238,238,.1)', 'transparent'],
              },
            },
          },
        ],
        series: [
          {
            type: 'line',
            barWidth: this.barWidth,
            data: this.Ydata,
            // symbolSize: this.symbolSize,
            smooth: true,
            symbolSize: 4,
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
        ],
      })
      //Set default selection for highlighted parts
      this.chartInst.dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
        dataIndex: 0,
      }) //Mouse in
    },
    tooltipShuffling() {
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
      }, 3000)
    },

    noDataShow() {
      this.chartInst = this.$echarts.init(this.$refs.myChart)
      this.chartInst.setOption({
        backgroundColor: 'rgba(255,255,255,.03)',
        title: {
          text: `no data`,
          show: true,
          textStyle: {
            align: 'center',
            color: '#fff',
            fontSize: 32,
          },
          top: 'center',
          left: 'center',
        },
      })
    },
  },
  beforeDestroy() {
    clearInterval(this.setTime)
    this.setTime = null
    this.chartInst.dispose()
  },
  watch: {
    rowData: {
      handler(val) {
        if (!val.length) {
          this.noDataShow()
          return
        }
        this.Xdata = []
        this.Ydata = []
        this.valTwo = []
        this.rowData.forEach((item) => {
          this.Xdata.push(item.name)
          this.Ydata.push(item.value)
          this.valTwo.push(item.item)
        })
        this.chartInst.dispose()
        this.drawWidth()
        this.tooltipShuffling()
      },
      deep: true,
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
      margin-right: 20px;
      height: 20px;
      h3 {
        float: left;
        width: 16px;
        height: 3px;
        margin-top: 8px;
        background-color: red;
      }
      span {
        margin-left: 7px;
        font-size: 16px;
        font-family: 'PingFang';
        color: #bfebff;
      }
    }
  }
}
</style>
