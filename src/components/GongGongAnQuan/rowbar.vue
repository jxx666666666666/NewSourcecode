<!--
 * @Description:bar graph

-->
<template>
  <div class="barChart">
    <div
      class="unitAndLengend"
      :style="{ width: `${width - 15}px`, height: `${unitAndLengendheight}px` }"
    >
      <div class="leftUnit">{{ unit }}</div>
      <div class="rightLegend" v-show="isShowLengend">
        <div class="lengendList" v-for="(item, index) in legends" :key="index">
          <div
            class="legendLeft"
            :style="{ 'background-color': item.from }"
          ></div>
          <div class="legendRight">{{ item.name }}</div>
        </div>
      </div>
    </div>
    <div
      ref="barChart"
      :style="{ width: `${width}px`, height: `${height}px` }"
      @mouseover="chartsMouseOver"
      @mouseout="chartsMouseOut"
      class="barEcharts"
    ></div>
    <div class="legend" v-if="legendIsShow">
      <div
        class="legendItem"
        v-for="(val, index) in legends"
        :key="index"
        :style="{ width: `${lewidth}px` }"
      >
        <div class="block" :style="{ 'background-color': val.from }"></div>
        <div class="text" v-text="val.name"></div>
      </div>
    </div>

    <!-- <div v-if="showDetailMsg && activeMsg" :style="{ left: `${activeXY.offsetX}px`, top: `${activeXY.offsetY}px` }" class="DetailMsg_box">
      <DetailMsg :detail="activeData" />
    </div> -->
  </div>
</template>

<script>
import { mapState } from 'vuex';
// import DetailMsg from '../../customize/CommonDetailMsg/DetailMsg.vue';

export default {
  components: {
    // DetailMsg,
  },
  props: {
    lewidth: { type: String, default: '100' },
    height: { type: String, default: '600' }, //height
    unitAndLengendheight: { type: String, default: '27' }, //Legend and Unit Height

    xAreaFontColor: { type: String, default: '#BFEBFF' }, //X-axis font color
    width: { type: String, default: '400' }, //width
    unit: {
      type: String,
      default: 'unit:w',
    }, //unit
    xtype: { type: String, default: 'category' }, //xtype
    ytype: { type: String, default: 'value' }, //ytype
    inverse: { type: Boolean, default: false }, //inverse
    isShowLengend: { type: Boolean, default: false }, //isShowLengend
    labelshow: { type: Boolean, default: false }, //labelshow
    labelposition: { type: null, default: 'top' }, //labelposition
    xsplitshow: { type: Boolean, default: false }, //xsplitshow
    ysplitshow: { type: Boolean, default: true }, //ysplitshow
    provideNumber: { type: Number, default: 7 }, //provideNumber
    interval: { type: Number, default: 0 }, //interval
    rowData: {
      type: Array,
      default: () => {
        return [
          { legend: 'type 1', measure: 152, dimension: 'this month' },
          { legend: 'type 1', measure: 101, dimension: 'last year' },
          { legend: 'type 1', measure: 90, dimension: '1-3 month' },
          { legend: 'type 1', measure: 101, dimension: 'last year' },
        ];
      },
    },
    measurebox: { type: Number, default: 5 }, //Layered y-axis columns

    legendWidth: {
      default: null,
    },
    legendShow: {
      default: true,
    },
    // Is the data left blank (fakse starts from zero
    isBoundaryGap: {
      type: Boolean,
      default: true,
    },
    //Legend data
    stack: {
      type: Boolean,
      default: true,
    }, //Is it stacked
    barWidth: {
      type: Number,
      default: 12,
    },
    //Column width
    type: {
      type: String,
      default: 'bar',
    },
    //Column type
    gridTop: {
      type: String,
      default: '0%',
    },
    gridBottom: {
      type: String,
      default: '0%',
    },

    gridLeft: {
      type: String,
      default: '0%',
    },
    gridRight: {
      type: String,
      default: '20%',
    },
    unitPadding: {
      type: Array,
      default: () => {
        return [0, 0, 0, 50];
      },
    },
    active: {
      type: Boolean,
      default: false,
    }, //Interactive or not
    activeobj: {
      type: String,
      default: '',
    }, //Associate layers
    showToolTip: { type: Boolean, default: true }, //Display animation or not
    //Legend Hidden
    legendIsShow: {
      type: Boolean,
      default: false,
    },
    bid: {
      type: String,
      default: '',
    },
    // 3D data reception
    EquipmentData: {
      type: Array,
      default: () => {
        return null;
      },
    },
    // Whether to display double Y lines
    YAxisBooL2: {
      type: Boolean,
      default: () => {
        return false;
      },
    },

    YaxisLabel: {
      type: Object,
      default: () => {
        return {
          fontFamily: 'PingFang SC',
          fontSize: 18,
          color: '#BFEBFF',
        };
      },
    },

    // Is the x-axis displayed
    showXaxis: {
      type: Boolean,
      default: true,
    },
    //Display Y-axis
    showYaxis: {
      type: Boolean,
      default: true,
    },
    //Automatically display tips
    showTip: {
      type: Boolean,
      default: true,
    },

    // Show Legend
    Showlegend: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    // Is the top data displayed as a percentage
    isShowRate: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    // Maximum width of column
    barMaxWidth: {
      type: [String, Number],
      default: 'auto',
    },
    showDetailMsg: {
      type: Boolean,
      default: false,
    },
    //After turning on the scroll bar, the default display is several pieces of data
    isShowNumer: {
      type: Number,
      default: 6,
    },
    //Legend Color
    colorList: {
      type: Array,
      default: [
        { from: '#FFE426', to: '#FFE426' },
        { from: '#00D9D9', to: '#00D9D9' },
        { from: '#95FF2B', to: '#95FF2B' },
        { from: '#FFE426', to: '#FFE426' },
        { from: '#00D9D9', to: '#00D9D9' },
        { from: '#95FF2B', to: '#95FF2B' },
        { from: '#FFE426', to: '#FFE426' },
        { from: '#00D9D9', to: '#00D9D9' },
        { from: '#95FF2B', to: '#95FF2B' },
      ],
    },
  },
  data() {
    return {
      xData: [],
      yData: [],
      hasData: true,
      selectItemName: '', //The name of the selected column
      isChangeColor: false, //Control click discoloration
      strBox: '',

      activeXY: {},
      activeMsg: false,
      activeData: {
        focusPeople: 89999,
        activePeople: 78888,
      },
      names: '',
      start: 0,
      legends: [],
    };
  },
  mounted() {
    let that = this;
    that.$nextTick(() => {
      if (that.rowData) {
        that.start = 100 - (that.isShowNumer / that.rowData.length) * 100;
        that.transformData(that.rowData);
        that.drawChart();
        that.tooltipShuffling();
      }
    });
  },
  computed: {
    ...mapState([]),
  },
  methods: {
    chartsMouseOver() {
      clearInterval(this.setTime);
    },
    chartsMouseOut() {
      this.tooltipShuffling();
    },
    drawChart() {
      let that = this;
      // Initialize the echarts instance based on the prepared dom
      this.barChart = this.$echarts.init(this.$refs.barChart);
      this.option = this.initOption();
      this.barChart.setOption(this.option, true);
      that.barChart.on('click', function (params) {
        if (that.active) {
          let selectObj = {};

          if (that.names == params.name) {
            that.activeMsg = false;

            that.isChangeColor = false;
            that.selectItemName = '';
            selectObj.value = null;
            that.$store.commit('setHighLight', '');
          } else {
            that.activeMsg = true;
            that.activeXY = {
              offsetX: params.event.offsetX,
              offsetY: params.event.offsetY,
            };
            that.isChangeColor = true;
            that.selectItemName = params.name;
            selectObj.value = params;

            that.names = params.name;
          }
          that.barChart.setOption(that.option, true);
        }
      });
    },
    initOption() {
      let that = this;
      if (!that.yData || that.yData.length == 0) {
        that.option = {
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
        };
        that.xData = [];
        that.hasData = false;
        return that.option;
      } else {
        that.hasData = true;
        that.option = {
          title: {
            text: ``,
            show: true,
            textStyle: {
              align: 'center',
              color: '#fff',
              fontSize: 32,
            },
            top: 'center',
            left: 'center',
          },
          tooltip: {
            show: that.showToolTip,
            trigger: 'axis',
            textStyle: {
              fontSize: 18,
              fontFamily: 'Helvetica',
            },
            // axisPointer: {
            //   type: "line",
            //   animation: false,
            //   label: {
            //     backgroundColor: "#505765",
            //     fontSize: 12,
            //   },
            // },
          },
          legend: {
            show: this.Showlegend,
            data: this.legends,
            itemWidth: 5,
            x: '60%',
            y: '4.5%',
            width: 200,
            orient: 'horizontal',
            textStyle: {
              color: '#BFEBFF',
            },
          },
          grid: {
            left: that.gridLeft,
            right: that.gridRight,
            bottom: that.gridBottom,
            top: that.gridTop,
            width: that.barMaxWidth,
            containLabel: true,
          },
          xAxis: [
            {
              boundaryGap: this.isBoundaryGap,
              show: this.showXaxis,
              type: `${this.xtype}`,
              axisTick: { show: false },
              data: this.xData,
              axisLine: {
                lineStyle: {
                  color: '#608B9E',
                },
              },
              axisLabel: {
                color: this.xAreaFontColor,
                fontSize: 16,
                interval: this.interval,
                formatter: function (params) {
                  let newParamsName = '';
                  let paramsNameNumber = params.length;
                  let provideNumber = that.provideNumber; //Display a few words in a row
                  let rowNumber = Math.ceil(paramsNameNumber / provideNumber);
                  if (paramsNameNumber > provideNumber) {
                    for (let p = 0; p < rowNumber; p++) {
                      let tempStr = '';
                      let start = p * provideNumber;
                      let end = start + provideNumber;
                      if (p == rowNumber - 1) {
                        tempStr = params.substring(start, paramsNameNumber);
                      } else {
                        tempStr = params.substring(start, end) + '\n';
                      }
                      newParamsName += tempStr;
                    }
                  } else {
                    newParamsName = params;
                  }
                  return newParamsName;
                },
              },
              //Interlaced color change
              splitArea: {
                show: this.xsplitshow,
                areaStyle: {
                  color: ['transparent', 'rgba(238,238,238,.1)'],
                },
              },
              splitLine: {
                show: false,
              },
            },
          ],
          yAxis: [
            {
              show: this.showYaxis,
              name: this.unit[0],
              type: `${this.ytype}`,
              data:  this.xData,
              splitNumber: this.measurebox,
              nameTextStyle: {
                fontFamily: 'PingFang SC',
                fontSize: 16,
                color: '#BFEBFF',
              },
              axisLine: {
                lineStyle: {
                  color: '#608B9E',
                },
              },
              axisTick: {
                show: false,
              },
              axisLabel: this.YaxisLabel,
              inverse: this.inverse,
              //Interlaced color change
              splitArea: {
                show: this.ysplitshow,
                areaStyle: {
                  color: ['rgba(238,238,238,.1)', 'transparent'],
                },
              },
              splitLine: {
                show: false,
              },
            },
          ],

          series: [
          
          ],
        };
        if (that.xtype == 'value') {
          that.option.yAxis[0].data = that.xData;
        } else {
          that.option.xAxis[0].data = that.xData;
        }
        if (that.YAxisBooL2) {
          that.option.yAxis.push({
            name: this.unit[1],
            type: `${this.ytype}`,
            splitNumber: this.measurebox,
            nameTextStyle: {
              fontFamily: 'PingFang SC',
              fontSize: 18,
              color: '#BFEBFF',
            },
            axisLine: {
              lineStyle: {
                color: '#608B9E',
              },
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              color: '#BFEBFF',
              fontSize: 18,
            },
            inverse: this.inverse,
            splitLine: {
              show: false,
            },
          });
        }
        that.option.series = [];
        that.yData.forEach((d, index) => {
          
          let serie = {
            type: this.type,
            data: d,
            smooth: true,
            barWidth: that.barWidth,
            name: that.legends[index].name,

          };
          if (that.type == 'line') {
            serie.itemStyle = {
              normal: {
                color: this.colorList[index].from,
              },
            };
          } else {
            serie.itemStyle = {
              normal: {
                color: function (params) {
                  //Determine the selected name and change the color and style of the column
                  if (that.xtype == 'value') {
                    if (
                      that.isChangeColor &&
                      that.selectItemName === params.name
                    ) {
                     
                      return new that.$echarts.graphic.LinearGradient(
                        0,
                        0,
                        1,
                        0,
                        [
                          {
                            offset: 0.5,
                            color: '#D3F02F',
                          },
                          {
                            offset: 1,
                            color: '#D3F02F',
                          },
                        ]
                      );
                    } else {
            
                      return new that.$echarts.graphic.LinearGradient(
                        0,
                        0,
                        1,
                        0,
                        [
                          {
                            offset: 0,
                            color: that.legends[index].from,
                          },
                          {
                            offset: 0.39,
                            color: that.legends[index].to,
                          },
                        ]
                      );
                    }
                  } else {
                    if (
                      that.isChangeColor &&
                      that.selectItemName === params.name
                    ) {
                     
                      return new that.$echarts.graphic.LinearGradient(
                        0,
                        0,
                        0,
                        1,
                       
                        [
                          {
                            offset: 0.5,
                            color: '#D3F02F',
                          },
                          {
                            offset: 1,
                            color: '#D3F02F',
                          },
                        ]
                      );
                    } else {
                    
                      return new that.$echarts.graphic.LinearGradient(
                        0,
                        0,
                        0,
                        1,
                        [
                          {
                            offset: 0,
                            color: that.legends[index].from,
                          },
                          {
                            offset: 0.39,
                            color: that.legends[index].to,
                          },
                        ]
                      );
                    }
                  }
                },
                barBorderRadius: [0, 20, 20, 0],
                label: {
                  show: this.labelshow,
                  position: this.labelposition,
                  textStyle: {
                    color: '#EBEBEB',
                    fontSize: 18,
                    fontFamily: 'Voltage',
                  },
                  formatter: function (data) {
                    // return data.value + 'individual';
                    let str = '';
                    str = '{b|' + data.value + '}' + '{a|' + 'individual' + '}';
                    return str;
                  },
                  rich: {
                    a: {
                      color: '#3FCBFF',
                      fontFamily: 'PingFang SC',
                    },
                    b: {
                      width: 50,
                      color: '#EBEBEB',
                      fontSize: 30,
                      fontFamily: 'Voltage',
                    },
                  },
                },
              },
            };
          }

          if (that.stack) {
            serie.stack = '0';
          }
          that.option.series.push(serie);
        });
      }
      return that.option;
    },
    tooltipShuffling() {
      if (this.showTip) {
        clearInterval(this.setTime);
        let count = this.xData.length;
        this.setTime = setInterval(() => {
          if (count < 0) {
            count = this.xData.length;
          }
          this.barChart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: count,
          });
          count--;
        }, 1000);
      }
    },
    transformData(rowData) {
      let that = this;
      //Obtain category deduplication
      let dimensions = Array.from(
        // new Set(
        //   rowData.map((r) => {
        //     return r.dimension;
        //   })
        // )
        rowData.map((r) => {
            return r.dimension;
          })
      );

      that.xData = dimensions.reverse();
     
      that.yData = [];

      let legends = Array.from(
        new Set(
          rowData.map((r) => {
            return r.legend;
          })
        )
      );

      let legendsTemp = [];
      legends.forEach((l, index) => {
        let array = [];
        legendsTemp.push({
          name: l,
          from: this.colorList[index].from,
          to: this.colorList[index].to,
        });
        dimensions.forEach((d) => {
          let data = rowData.find((r) => r.dimension == d && r.legend == l);
          array.push(data.measure);
        });
        that.yData.push(array);
      });
      this.legends = legendsTemp;
    },
  },
  watch: {
    immediate: true,
    rowData: {
      handler(neVal) {
        let that = this;
        if (neVal.length == 0) {
          this.option = {
            title: {
              text: `no data`,
              show: true,
              textStyle: {
                align: 'center',
                color: '#fff',
                fontSize: 18,
              },
              top: 'center',
              left: 'center',
            },
            xAxis: [
              {
                data: null,
              },
            ],
            yAxis: [
              {
                data: null,
              },
            ],
            series: [
              {
                data: null,
              },
            ],
          };

          this.barChart.setOption(this.option);
        } else {
          // console.log("Update column chart data");
          this.start = 100;
          that.transformData(neVal);
          that.option = that.initOption(that.option);
          that.yData.forEach((n, index) => {
            that.option.series[index].data = n;
          });
          that.$nextTick(() => {
            let temp = that.barChart; //Temporarily storing properties of Chart
            that.barChart.clear();
            that.barChart = temp;
            that.barChart.setOption(that.option);
          });
        }
      },
      deep: false,
    },
  },
  destroyed() {
    this.setTime && clearInterval(this.setTime);
    this.debounce && clearTimeout(this.debounce);
    this.$echarts.dispose(this.barChart);
    this.barChart = null;
    this.option = null;
    this.xData = null;
    this.yData = null;
  },
};
</script>
<style lang="less" scoped>
.barChart {
  pointer-events: all;
  width: 100%;
  height: 100%;
  position: relative;
  box-sizing: border-box;
  // padding: 0 15px;
  .unitAndLengend {
    width: 200px;
    height: 102px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
  }
  .leftUnit {
    width: 143px;
    height: 27px;
    color: #bfebff;
    font-size: 20px;
    text-align: left;
  }
  .rightLegend {
    width: 242px;
    height: 27px;
    display: flex;
    text-align: right;
  }
  .lengendList {
    display: flex;
    width: 242px;
  }
  .legendLeft {
    width: 6px;
    height: 20px;
    background: #1581ee;
  }
  .legendRight {
    margin-left: 5px;
    height: 27px;
    color: #bfebff;
    font-size: 20px;
  }
  .legend {
    width: 100%;
    display: flex;
    position: absolute;
    top: 15px;
    right: 15px;
    justify-content: flex-end;
    line-height: 18px;

    .legendItem {
      display: flex;
      width: 80px;

      .block {
        width: 10px;
        height: 10px;
      }

      .text {
        margin: -5px 5px;
        color: #bfebff;
        font-size: 14px;
      }
    }
  }
  .DetailMsg_box {
    position: absolute;
  }
}
</style>
