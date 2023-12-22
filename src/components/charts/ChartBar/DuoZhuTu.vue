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
  name: 'pieGeRenNanDing',
  props: {
    rowData: {
      type: Array,
      default: () => {
        return [
          {
            name: '20210601',
            value: '10',
            item: '30',
            val: '20',
          },
          {
            name: '20210602',
            value: '20',
            item: '30',
            val: '40',
          },
          {
            name: '20210603',
            value: '50',
            item: '30',
            val: '10',
          },
          {
            name: '20210604',
            value: '20',
            item: '30',
            val: '40',
          },
          {
            name: '20210605',
            value: '30',
            item: '45',
            val: '32',
          },
          {
            name: '20210606',
            value: '45',
            item: '32',
            val: '10',
          },
          {
            name: '20210607',
            value: '12',
            item: '45',
            val: '21',
          },
          {
            name: '20210608',
            value: '23',
            item: '23',
            val: '45',
          },
        ];
      },
    },
    h3Style: {
      type: Object,
      default: () => {
        return {};
      },
    },
    barColor: {
      type: Array,
      default: () => {
        return ['#4DA6FF', '#02FDE3', '#FFDC73'];
      },
    },
    legthColor: {
      type: Array,
      default: () => {
        return ['#4DA6FF', '#02FDE3', '#FFDC73'];
      },
    },
    legthWZ: {
      type: Array,
      default: () => {
        return ['Outbound bandwidth utilization rate', 'Inbound bandwidth utilization rate'];
      },
    },
    unit: {
      type: String,
      default: () => {
        return '%';
      },
    },
    barWidth: {
      type: Number,
      default: () => {
        return 12;
      },
    },
    width: {
      type: String,
      default: () => {
        return '736px';
      },
    },
    height: {
      type: String,
      default: () => {
        return '360px';
      },
    },
    legTop: {
      type: String,
      default: () => {
        return '10px';
      },
    },
    legLeft: {
      type: String,
      default: () => {
        return '200px';
      },
    },
    legIsShow: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
    //Scale size and length of the Y-axis
    interval: {
      type: Number,
      default: null,
    },
    grid: {
      type: Object,
      default: () => {
        return {
          left: '1%',
          right: '2%',
          top: '3%',
          bottom: '0%',
          containLabel: true,
        };
      },
    },
  },
  data() {
    return {
      Xdata: [],
      Ydata: [],
      valTwo: [],
      valThree: [],
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
        this.valThree.push(item.val);
      });
    }
    this.drawWidth();
    this.tooltipShuffling();
  },
  methods: {
    drawWidth() {
      // Initialize the echarts instance based on the prepared dom
      this.chartInst = this.$echarts.init(this.$refs.myChart);
      this.chartInst.setOption({
        color: '#00BFFF',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985',
            },
          },
        },
        grid: this.grid,
        xAxis: [
          {
            type: 'category',
            data: this.Xdata,
            axisTick: {
              alignWithLabel: true,
            },
            axisLabel: {
              interval: 0,
              //Configuration of x-axis text
              textStyle: {
                color: '#BFEBFF',
                fontSize: 22,
                fontFamily: 'PingFang',
              },
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
            name: this.unit ? `unit:${this.unit}` : '',
            position: 'left',
            interval: this.interval,
            type: 'value',
            nameTextStyle: {
              color: '#BFEBFF',
              fontSize: 22,
              padding: 2,
              fontFamily: 'PingFang',
            },
            axisLabel: {
              //Configuration of y-axis text
              textStyle: {
                color: '#BFEBFF',
                fontSize: 22,
                fontFamily: 'Helvetica',
              },
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
                width: 2, //This is for highlighting and adding
              },
            },
            splitArea: {
              show: true,
              areaStyle: {
                color: ['transparent', 'rgba(238,238,238,.1)'],
              },
            },
          },
        ],
        series: [
          {
            // name: "Direct Access",
            type: 'bar',
            barWidth: this.barWidth,
            data: this.Ydata,

            itemStyle: {
              normal: {
                barBorderRadius: [this.barWidth, this.barWidth, 0, 0],
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: this.barColor[0] + 'ff',
                  },
                  {
                    offset: 1,
                    color: this.barColor[0] + '11',
                  },
                ]),
              },
            },
          },
          {
            // name: "Direct Access",
            type: 'bar',
            barWidth: this.barWidth,
            data: this.valTwo,
            itemStyle: {
              normal: {
                barBorderRadius: [this.barWidth, this.barWidth, 0, 0],
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: this.barColor[1] + 'ff',
                  },
                  {
                    offset: 1,
                    color: this.barColor[1] + '11',
                  },
                ]),
              },
            },
          },
          {
            // name: "Direct Access",
            type: 'bar',
            barWidth: this.barWidth,
            data: this.valThree,
            itemStyle: {
              normal: {
                barBorderRadius: [this.barWidth, this.barWidth, 0, 0],
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: this.barColor[2] + 'ff',
                  },
                  {
                    offset: 1,
                    color: this.barColor[2] + '11',
                  },
                ]),
              },
            },
          },
        ],
      });
      //Set default selection for highlighted parts
      this.chartInst.dispatchAction({
        type: 'downplay',
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
          type: 'downplay',
          seriesIndex: 0, //Indicates which data loop in the series to display
          dataIndex: currentIndex,
        });
        currentIndex = (currentIndex + 1) % dataLen; //+1 represents one jump at a time
        this.chartInst.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: currentIndex,
        });
        // show tooltip
        this.chartInst.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: currentIndex,
        });
      }, 1000);
    },
  },
  beforeDestroy() {
    clearInterval(this.setTime);
  },
  watch: {
    rowData: {
      handler() {
        this.Xdata = [];
        this.Ydata = [];
        this.valTwo = [];
        this.valThree = [];

        this.rowData.forEach((item) => {
          this.Xdata.push(item.name);
          this.Ydata.push(item.value);
          this.valTwo.push(item.item);
          this.valThree.push(item.val);
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
    width: 100%;
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
        width: 14px;
        height: 14px;
        background-color: red;
        margin-top: 5px;
      }
      span {
        margin-left: 7px;
        font-size: 20px;
        font-family: 'Helvetica';
        font-weight: Regular;
        color: #bfebff;
      }
    }
  }
}
</style>
