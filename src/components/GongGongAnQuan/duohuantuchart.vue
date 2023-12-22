<template>
  <div class="doughBox">
    <div :style="doughnuChart" class="doughnu" ref="chart"></div>
    <div class="rose_legend" v-if="displayModel == 1">
      <div class="legend" v-for="(item, index) in loopData" :key="index">
        <div class="legend_color"></div>
        <div class="legend_progress" :style="{
          backgroundColor: color[index],
          width: 'calc(' + item.num + ' - 0px)',
        }"></div>
        <!-- :style="{ backgroundColor: color[index], width: item.value> 100? 100: item.value +'%' }" -->
        <div class="legend_name">{{ item.name }}</div>
        <div class="legend_bar"></div>
        <div class="legend_value" :style="{ color: color[index] }">
          {{ item.num }}
        </div>
        <div class="legend_num" v-if="0">{{ item.value }}</div>
        <div class="legend_unit" v-if="0">{{ legthunit }}</div>
      </div>
    </div>
    <div class="rectrose_legend" v-if="displayModel == 2">
      <div class="legend" v-for="(item, index) in loopData" :key="index">
        <div class="legend_color" :style="{ backgroundColor: color[index] }"></div>
        <div class="legend_name" :style="{ color: '#aae3ff' }">
          {{ item.name }}
        </div>
      </div>
    </div>

    <div class="rosethree_legend" v-if="displayModel == 3">
      <vueSeamlessScroll :data="loopData" :class-option="classOption" ref="vueScoll">
        <div class="legend" v-for="(item, index) in loopData" :key="index" @click="itemclick(item)">
          <div class="legend_color" :style="{
            backgroundColor: color[index],
          }"></div>
          <div class="legend_name">{{ item.name }}</div>
          <div class="legend_value" :style="{ color: color[index] }">
            {{ item.zb }}
          </div>
          <div class="legend_unit">{{ item.value }}</div>
        </div>
      </vueSeamlessScroll>
    </div>
    <div class="doughPos" :style="doughPosStyle" v-if="displayModel == 1 || displayModel == 2">
      <li v-for="(item, index) in loopData" :key="index">{{ item.name }}</li>
    </div>
    <div class="point-box" v-if="displayModel == 3">
      <li v-for="(item, index) in loopData" :key="index" :style="{ backgroundColor: colorlist[index] }"></li>
    </div>
  </div>
</template>
<script>
import * as echarts from 'echarts';
import vueSeamlessScroll from 'vue-seamless-scroll';
export default {
  components: {
    vueSeamlessScroll
  },
  props: {
    legthunit: {
      type: String,
      default: 'individual',
    },
    doughnuChart: {
      type: Object,
      default: () => {
        return {};
      },
    },
    doughPosStyle: {
      type: Object,
      default: () => {
        return {};
      },
    },
    // Indicates the number of charts
    data: {
      type: Array,
      default: () => {
        return [5, 6, 7, 8, 9];
      },
    },
    barWidth: {
      type: [String, Number],
      default: () => {
        return 20;
      },
    },
    displayModel: {
      type: [String, Number],
      default: () => {
        return 1;
      },
    },
    obj: {
      type: Object,
      default: () => {
        return {};
      },
    },
    color: {
      type: Array,
      default: () => {
        return ['#00BFFF', '#FFE426', '#00DD8A', '#95FF2B', '#00D9D9'];
      },
    },
    scrollCount: {
      type: Number,
      default: 6
    },
    rowData: {
      type: Array,
      default: () => {
        return [
          { category: 'Type 1', value: 20 },
          { category: 'Type 2', value: 30 },
          { category: 'Type 3', value: 40 },
          { category: 'Type 4', value: 50 },
          { category: 'Type 5', value: 50 },
        ];
      },
    },
  },
  data() {
    return {
      colorlist: [],
      chartInst: null,
      option: {},
      setTime: null,
      loopData: [],
      num: 0,
      //The currently selected value
      selectedSeries: {
        category: '',
        value: '',
        sum: '',
      },
      sum: 0,
    };
  },
  computed: {
    classOption() {
      return {
        step: 0.3, // The higher the value, the faster the scrolling speed
        limitMoveNum: this.scrollCount, // The amount of data that starts rolling seamlessly this.dataList.length
        hoverStop: true, // Enable mouse hover stop
        direction: 1, // 0 Down 1 Up 2 Left 3 Right
        openWatch: false, // Enable real-time data monitoring and refresh dom
        singleHeight: 0, // The height at which a single step motion stops (the default value of 0 is seamless rolling without stopping) direction => 0/1
        singleWidth: 0, // Width of single step motion stop (default value of 0 is seamless rolling without stopping) direction => 2/3
        waitTime: 1000, // Time to stop single step motion (default value 1000ms)
      };
    },
    barData() {
      let arr = [];
      let num = 0;
      this.rowData.forEach((res) => {
        num += res.value
      })
      this.rowData.forEach((res, i) => {
        arr.push(Number(res.value / num * 12))
        if (String(Number(res.value / num) * 100).indexOf(".") > -1) {
          this.rowData[i].zb = (Number(res.value / num) * 100).toFixed(1) + "%"
        }
        else {
          this.rowData[i].zb = (Number(res.value / num) * 100) + "%"
        }

      })
      return arr
    }
  },
  methods: {
    itemclick(item) {
      this.$emit("itemclick", item)
    },
    instantiation() {
      this.chartInst = echarts.init(this.$refs.chart);
      let _this = this;
      this.option = {
        angleAxis: {
          max: 12,
          startAngle: 90,
          axisLine: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          minorTick: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          minorSplitLine: {
            show: false,
          },
          splitArea: {
            show: false,
          },
          axisPointer: {
            show: false,
          },
        },
        radiusAxis: {
          type: 'category',
          z: 20,
          nameTextStyle: {
            color: '#f00',
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
        polar: {},
        series: [
          {
            type: 'bar',
            barGap: '75%',
            data: this.barData,
            barWidth: this.barWidth,
            roundCap: true,
            animationEasing: 'bounceOut', //Initial Animation
            itemStyle: {
              normal: {
                color: function (params) {
                  return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: _this.color[params.dataIndex] + '00',
                    },
                    {
                      offset: 1,
                      color: _this.color[params.dataIndex] + 'ff',
                    },
                  ]);
                },
                barBorderRadius: 14,
              },
            },
            coordinateSystem: 'polar',
          },
        ],
        legend: {
          show: true,
        },
      };
      this.loopData = this.convertData(this.rowData, this.legends);
      this.chartInst.setOption(this.option, true);
    },
    //Value conversion
    convertData(rowData, legends) {
      this.sum = 0;
      let returnData = [];
      rowData.forEach((d) => {
        this.sum += d.value;
        returnData.push({
          value: d.value,
          name: d.category,
          num: d.value,
          zb: d.zb
          // itemStyle: {
          //   color: legends[d.category]
          // }
        });
      });
      returnData.forEach((d) => {
        d.num =
          this.sum == 0 ? '0' : ((d.value / this.sum) * 100).toFixed(0) + '%';
      });
      //Sort backward in Progress bar mode
      if (this.displayModel == 100000) {
        returnData.sort((a, b) => {
          return b.value - a.value;
        });
      }
      //Increase the thousandth percentile
      if (this.displayModel == 2) {
        let re = /(?=(?!(\b))(\d{3})+$)/g;
        returnData.forEach((r) => {
          r.value = String(r.value).replace(re, ',');
        });
      }
      return returnData;
    },
  },
  mounted() {
    this.instantiation();
    this.colorlist = this.color.reverse()
  },
  beforeDestroy() {
    echarts.init(this.$refs.chart).dispose();
    clearInterval(this.setTime);
    this.setTime = null;
  },
  watch: {
    dough: {
      handler() {
        this.instantiation();
      },
    },
    rowData: {
      handler(val) {
        this.instantiation();
      },
      deep: true
    }
  },
};
</script>
<style lang="less" scoped>
.doughBox {
  width: 100%;
  height: 100%;
  display: flex;
  // align-items: center;
  position: relative;

  .doughnu {
    width: 300px;
    height: 300px;
    margin-left: 20px;
  }

  .rose_legend {
    position: absolute;
    right: 10px;
    top: 20px;
    width: 260px;
    // position: relative;
    height: 262px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    // margin-top: 5px;
    .legend {
      position: relative;
      margin-bottom: 20px;
      height: 49px;
      // width: 275px;
      display: flex;
      padding-bottom: 6px;

      // border-bottom: 1px solid #24eefc;
      .legend_progress {
        // width: 100%;
        height: 10px;
        position: absolute;
        // left: 16px;
        top: 39px;
      }

      .legend_bar {
        z-index: -2;
        width: 100%;
        position: absolute;
        height: 10px;
        background: #373f55;
        top: 39px;
      }

      .legend_color {
        width: 10px;
        height: 10px;
        margin-top: 30px;
        border-radius: 50%;
        margin-right: 10px;
      }

      .legend_name {
        font-size: 26px;
        color: #aae3ff;
        font-family: 'PingFang SC';
        // line-height: 56px;
        // margin-left: 15px;
        // width: 52px;
        position: absolute;
        left: 0px;
        top: -9px;
      }

      .legend_num {
        position: absolute;
        // right: 13px;
        // top: -5px;
        font-size: 40px;
        background-image: -webkit-linear-gradient(bottom, #fff, #81bac9);
        -webkit-background-clip: text;
        // -webkit-text-fill-color: transparent;
        font-family: 'Voltage';
        // margin-right: 20px;
        top: -8px;
      }

      .legend_value {
        position: absolute;
        right: 30px;
        top: -5px;
        font-size: 40px;
        color: #dddddd;
        font-family: 'Voltage';
        line-height: 40px;
        // margin-right: 20px;
      }

      .legend_unit {
        position: absolute;
        top: 6px;
        // right: 27px;
        line-height: 22px;
        font-size: 20px;
        color: #14bfff;
        font-family: 'Microsoft YaHei', sans-serif;
      }
    }
  }

  .rectrose_legend {
    position: absolute;
    left: 10px;
    top: 24px;
    width: 300px;
    position: relative;
    height: 200px;
    display: flex;
    flex-direction: column;

    // justify-content: space-between;
    // margin-top: 5px;
    .legend {
      position: relative;
      height: 28px;
      // width: 275px;
      display: flex;
      padding-bottom: 6px;

      // border-bottom: 1px solid #24eefc;
      .legend_progress {
        // width: 100%;
        height: 10px;
        position: absolute;
        // left: 16px;
        top: 39px;
      }

      .legend_bar {
        z-index: -2;
        width: 100%;
        position: absolute;
        height: 10px;
        background: #373f55;
        top: 39px;
      }

      .legend_color {
        width: 5px;
        height: 20px;
        margin-top: 30px;
        // border-radius: 50%;
        margin-right: 10px;
      }

      .legend_name {
        font-size: 20px;
        color: #aae3ff;
        font-family: 'Microsoft YaHei', sans-serif;
        // line-height: 56px;
        // margin-left: 15px;
        // width: 52px;
        position: absolute;
        left: 16px;
        top: 23px;
      }

      .legend_num {
        position: absolute;
        // right: 13px;
        // top: -5px;
        font-size: 40px;
        background-image: -webkit-linear-gradient(bottom, #fff, #81bac9);
        -webkit-background-clip: text;
        // -webkit-text-fill-color: transparent;
        font-family: 'Voltage';
        // margin-right: 20px;
        top: -8px;
      }

      .legend_value {
        position: absolute;
        right: 100px;
        top: 15px;
        font-size: 40px;
        color: #dddddd;
        font-family: 'Voltage';
        line-height: 40px;
        // margin-right: 20px;
      }

      .legend_unit {
        position: absolute;
        top: 6px;
        // right: 27px;
        line-height: 22px;
        font-size: 20px;
        color: #14bfff;
        font-family: 'Microsoft YaHei', sans-serif;
      }
    }
  }

  .rosethree_legend {
    position: absolute;
    right: 99px;
    top: 45px;
    width: 320px;
    height: 176px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    // margin-top: 5px;
    .legend {
      position: relative;
      // margin-bottom: 20px;
      height: 35px;
      // width: 275px;
      display: flex;
      padding-bottom: 6px;

      // border-bottom: 1px solid #24eefc;
      .legend_progress {
        // width: 100%;
        height: 10px;
        position: absolute;
        // left: 16px;
        top: 39px;
      }

      .legend_bar {
        z-index: -2;
        width: 100%;
        position: absolute;
        height: 10px;
        background: #373f55;
        top: 39px;
      }

      .legend_color {
        position: absolute;
        left: 0px;
        top: 5px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        // margin-top: 3px;
        // border-radius: 50%;
        // margin-right: 10px;
      }

      .legend_name {
        font-size: 18px;
        color: #BFEBFF;
        font-family: 'Helvetica';
        // line-height: 56px;
        // margin-left: 15px;
        // width: 52px;
        position: absolute;
        left: 20px;
        // top: -9px;
      }

      .legend_num {
        position: absolute;
        // right: 13px;
        // top: -5px;
        font-size: 40px;
        background-image: -webkit-linear-gradient(bottom, #fff, #81bac9);
        -webkit-background-clip: text;
        // -webkit-text-fill-color: transparent;
        font-family: 'Voltage';
        // margin-right: 20px;
        top: -8px;
      }

      .legend_value {
        position: absolute;
        right: 60px;
        top: -5px;
        font-size: 28px;
        color: #dddddd;
        font-family: 'Roboto';
        // line-height: 40px;
        // margin-right: 20px;
      }

      .legend_unit {
        position: absolute;
        // top: 6px;
        right: 5px;
        line-height: 22px;
        font-size: 28px;
        color: #BFEFFF;
        font-family: 'Roboto';
      }
    }
  }

  .doughPos {
    position: absolute;
    left: 104px;
    top: 44px;
    font-size: 22px;
    font-family: 'Microsoft YaHei', sans-serif;
    color: #aae3ff;

    &>li {}
  }

  .point-box {
    position: absolute;
    left: 150px;
    top: 34px;
    width: 9px;

    // height: 20px;
    // background-color: #fff;
    &>li {
      display: inline-block;
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background-color: #fff;
      margin: 5px 0;
    }
  }
}
</style>
