<!--
 * @Description:bar graph
-->
<template>
  <div class="barChart">
    <div
      ref="barChart"
      :style="{ width: `${width}px`, height: `${height}px` }"
      @mouseover="chartsMouseOver"
      @mouseout="chartsMouseOut"
      class="barEcharts"></div>
    <div class="legend" v-if="legendIsShow">
      <div class="legendItem" v-for="(val, index) in legends" :key="index" :style="legendWidth ? legendWidth : ''">
        <div class="block" :style="{ 'background-color': val.from }"></div>
        <div class="text" v-text="val.name"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
// import heat from '@/utils/streamingAPI/heatLayer';

export default {
  props: {
    height: { type: String, default: '600' }, //height
    xAreaFontColor: { type: String, default: '#BFEBFF' }, //X-axis font color
    width: { type: String, default: '400' }, //width
    unit: {
      type: Array,
      default: () => {
        return ['Unit: pieces', 'Unit: Times'];
      },
    }, //unit
    xtype: { type: String, default: 'category' }, //xtype
    ytype: { type: String, default: 'value' }, //ytype
    inverse: { type: Boolean, default: false }, //Y-axis data inverse
    labelshow: { type: Boolean, default: false }, //Top Display Value
    labelposition: { type: String, default: 'top' }, //Top display value position
    xsplitshow: { type: Boolean, default: false }, //X-axis interlaced color change
    ysplitshow: { type: Boolean, default: true }, //Y-axis interlaced color change
    provideNumber: { type: Number, default: 7 }, //Display a few words in a row
    interval: { type: Number, default: 0 }, //Label interval display
    rowData: {
      type: Array,
      default: () => {
        return [
          { legend: 'Type1', measure: 152, dimension: 'Jan' },
          { legend: 'Type1', measure: 101, dimension: 'Jan' },
          { legend: 'Type1', measure: 90, dimension: 'Jan' },
          { legend: 'Type1', measure: 101, dimension: 'Jan' },
          { legend: 'Type2', measure: 142, dimension: 'Jan' },
          { legend: 'Type2', measure: 161, dimension: 'Jan' },
          { legend: 'Type2', measure: 190, dimension: 'Jan' },
          { legend: 'Type2', measure: 181, dimension: 'Jan' },
        ];
      },
    },
    measurebox: { type: Number, default: 5 }, //Layered y-axis columns
    legends: {
      type: Array,
      default: () => {
        return [
          { name: 'Type1', from: '#15E8FF', to: '#15E8FF' },
          { name: 'Type2', from: '#BFFF00', to: '#8FBF00' },
        ];
      },
    },
    legendWidth: {
      default: null,
    },
    legendShow: {
      default: true,
    },
    //Legend data
    stack: {
      type: Boolean,
      default: true,
    }, //Is it stacked
    barWidth: {
      type: Number,
      default: 20,
    },
    //Column width
    type: {
      type: String,
      default: 'pictorialBar',
    },
    //Column type
    gridTop: {
      type: String,
      default: '18%',
    },
    gridLeft: {
      type: String,
      default: '0%',
    },
    gridRight: {
      type: String,
      default: '7%',
    },
    unitPadding: {
      type: Array,
      default: () => {
        return [10, 10, 10, 10];
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
    layerData: {
      type: null,
    },
    xFontSize: {
      type: [Number, String],
      default: 14,
    },
    // Enable scrollbar
    isShowScroll: {
      type: Boolean,
      default: false,
    },
    // The smaller the interval value of the Progress bar, the greater the interval value
    scrollEnd: {
      type: Number,
      default: 95,
    },
    max: {
      type: Number,
      default: 500,
    },
  },
  data() {
    return {
      barChart: null,
      option: null,
      xData: [],
      yData: [],
      hasData: true,
      selectItemName: '', //The name of the selected column
      isChangeColor: false, //Control click discoloration
      strBox: '',
    };
  },
  mounted() {
    let that = this;
    that.$nextTick(() => {
      if (that.rowData) {
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
      var that = this;
      // Initialize the echarts instance based on the prepared dom
      this.barChart = this.$echarts.init(this.$refs.barChart);
      this.option = this.initOption();
      this.barChart.setOption(this.option, true);
      //  Single item click to highlight
      that.barChart.on('click', function (params) {
        that.$emit('zhutudinjishijian', params.name);
        if (that.selectItemName === params.name && that.isChangeColor) {
          that.isChangeColor = false;
          heat.removeHeatVisible(that.layerData);
        } else {
          if (that.selectItemName !== params.name && that.isChangeColor) {
            heat.removeHeatVisible(that.layerData);
          }
          that.isChangeColor = true;
          heat.addHeat(that.layerData);
        }
        // item heat map
        console.log('Come in', heat, that.layerData);
        that.$emit('barClick', params.name);
        that.option = that.initOption();
        that.selectItemName = params.name;
        that.barChart.setOption(that.option, true);
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
          tooltip: {
            show: that.showToolTip,
            trigger: 'axis',
            textStyle: {
              fontSize: 18,
              fontFamily: 'Helvetica',
            },
            axisPointer: {
              type: 'line',
              animation: false,
              label: {
                backgroundColor: '#505765',
                fontSize: 12,
              },
            },
          },
          legend: {
            show: this.Showlegend,
            data: this.legends,
            itemWidth: 5,
            x: '78%',
            y: '4.5%',
            width: 200,
            orient: 'horizontal',
            textStyle: {
              color: '#fff',
            },
          },
          grid: {
            left: that.gridLeft,
            right: that.gridRight,
            bottom: '0%',
            top: that.gridTop,
            containLabel: true,
          },
          xAxis: [
            {
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
                fontSize: this.xFontSize,
                interval: this.interval,
                formatter: function (params) {
                  var newParamsName = '';
                  var paramsNameNumber = params.length;
                  var provideNumber = that.provideNumber; //Display a few words in a row
                  var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
                  if (paramsNameNumber > provideNumber) {
                    for (var p = 0; p < rowNumber; p++) {
                      var tempStr = '';
                      var start = p * provideNumber;
                      var end = start + provideNumber;
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
              name: this.unit[0],
              type: `${this.ytype}`,
              data: this.xData,
              // max: this.max,
              splitNumber: this.measurebox,
              nameTextStyle: {
                fontFamily: 'PingFang SC',
                fontSize: 14,
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
                fontSize: 14,
              },
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
          dataZoom: [
            {
              show: this.isShowScroll,
              height: 8,
              xAxisIndex: [0],
              bottom: -3,
              start: 0,
              end: this.scrollEnd,
              backgroundColor: 'rgba(41,53,91)',
              handleIcon:
                'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
              handleSize: '110%',
              handleStyle: {
                color: 'rgba(41,53,91)',
              },
              handleIconSize: 0,
              moveHandleStyle: {
                color: 'transparent',
              },
              textStyle: {
                color: '#fff',
              },
              borderColor: 'transparent',
            },
          ],
          series: [],
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
              fontSize: 14,
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
              fontSize: 16,
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
            barWidth: that.barWidth,
            name: that.legends[index].name,
            symbolRepeat: 'fixed',
            symbolMargin: 2,
            symbol: 'rect',
            symbolClip: true,
            symbolSize: [12, 1],
            symbolPosition: 'start',
            symbolOffset: [0, 0],
            z: 0,
            zlevel: 1,
          };
          serie.itemStyle = {
            normal: {
              color: function (params) {
                //Determine the selected name and change the color and style of the column
                if (that.xtype == 'value') {
                  if (that.isChangeColor && that.selectItemName === params.name) {
                    return new that.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                      {
                        offset: 0.5,
                        color: '#D3F02F',
                      },
                      {
                        offset: 1,
                        color: '#D3F02F',
                      },
                    ]);
                  } else {
                    return new that.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                      {
                        offset: 0.5,
                        color: that.legends[index].from,
                      },
                      {
                        offset: 1,
                        color: that.legends[index].to,
                      },
                    ]);
                  }
                } else {
                  if (that.isChangeColor && that.selectItemName === params.name) {
                    return new that.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0.5,
                        color: '#D3F02F',
                      },
                      {
                        offset: 1,
                        color: '#D3F02F',
                      },
                    ]);
                  } else {
                    return new that.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0.5,
                        color: that.legends[index].from,
                      },
                      {
                        offset: 1,
                        color: that.legends[index].to,
                      },
                    ]);
                  }
                }
              },
              label: {
                show: this.labelshow,
                position: this.labelposition,
                textStyle: {
                  color: '#EBEBEB',
                  fontSize: 26,
                  fontFamily: 'Voltage',
                },
              },
            },
          };

          if (that.stack) {
            serie.stack = '0';
          }
          that.option.series.push(serie);
        });
      }
      return that.option;
    },
    tooltipShuffling() {
      clearInterval(this.setTime);
      let count = 0;
      this.setTime = setInterval(() => {
        if (count == this.xData.length) {
          count = 0;
        }
        this.barChart.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: count,
        });
        count++;
      }, 2000);
    },
    transformData(rowData) {
      let that = this;
      //Obtain category deduplication
      let dimensions = Array.from(
        new Set(
          rowData.map((r) => {
            return r.dimension;
          })
        )
      );

      that.xData = dimensions;
      that.yData = [];

      let legends = Array.from(
        new Set(
          rowData.map((r) => {
            return r.legend;
          })
        )
      );

      legends.forEach((l) => {
        let array = [];
        dimensions.forEach((d) => {
          let data = rowData.find((r) => r.dimension == d && r.legend == l);
          array.push(data.measure);
        });
        that.yData.push(array);
      });
    },
  },
  watch: {
    immediate: true,
    rowData: {
      handler(neVal) {
        let that = this;
        // console.log("Update column chart data");
        that.transformData(neVal);
        // that.option = that.initOption(that.option);
        that.drawChart();
        that.yData.forEach((n, index) => {
          that.option.series[index].data = n;
        });
        that.$nextTick(() => {
          console.log(that.option, '??????????');
          that.barChart.setOption(that.option);
        });
      },
      deep: false,
    },
  },
  destroyed() {
    this.setTime && clearInterval(this.setTime);
    this.debounce && clearTimeout(this.debounce);
    this.barChart = null;
    this.option = null;
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
  padding: 0 15px;

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
      width: 130px;

      .block {
        width: 16px;
        height: 16px;
      }

      .text {
        margin: 0 5px;
        color: #bfebff;
        font-size: 18px;
      }
    }
  }
}
</style>
