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
      class="barEcharts"
    ></div>
    <div class="legend" v-if="legendIsShow">
      <div class="legendItem" v-for="(val, index) in legends" :key="index">
        <div class="block" :style="{ 'background-color': val.from }"></div>
        <div class="text" v-text="val.name"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
// import layerControl from '../../utils/other/layerControl';
export default {
  props: {
    Bgimg : {type : String, default : ()=>{
      return  require('../../../assets/img/GongGongAnQuan/zzzzz.png')
      
    }},
    height: { type: String, default: '100%' }, //height
    width: { type: String, default: '100%' }, //width
    unit: { type: String, default: 'pieces' }, //unit
    xtype: { type: String, default: 'category' }, //xtype
    ytype: { type: String, default: 'value' }, //ytype
    inverse: { type: Boolean, default: false }, //Y-axis data inverse
    labelshow: { type: Boolean, default: false }, //Top Display Value
    labelposition: { type: String, default: 'top' }, //Top display value position
    xsplitshow: { type: Boolean, default: false }, //X-axis interlaced color change
    ysplitshow: { type: Boolean, default: false }, //Y-axis interlaced color change
    provideNumber: { type: Number, default: 7 }, //Display a few words in a row
    interval: { type: Number, default: 0 }, //Label interval display
    rowData: {
      type: Array,
      default: () => {
        return [
          { legend: 'Type1', measure: 152, dimension: 'Jan' },
          { legend: 'Type1', measure: 101, dimension: 'Feb' },
          { legend: 'Type1', measure: 90, dimension: 'Mar' },
          { legend: 'Type1', measure: 101, dimension: 'April' },
        ];
      },
    },
    measurebox: { type: Number, default: 5 }, //Layered y-axis columns
    legends: {
      type: Array,
      default: () => {
        return [
          { name: 'Type1', from: '#00C7EA', to: '#80ECFF' },
          // { name: "Type2", from: "#00BFFF", to: "#73FFFF" },
        ];
      },
    }, //Legend data
    stack: {
      type: Boolean,
      default: true,
    }, //Is it stacked
    barWidth: {
      type: String,
      default: '12',
    },
    //Column width
    type: {
      type: String,
      default: 'bar',
    },
    //Column Type
    gridTop: {
      type: String,
      default: '15%',
    },
    gridLeft: {
      type: String,
      default: '0%',
    },
    gridRight: {
      type: String,
      default: '0%',
    },
    // unitPadding: {
    //   type: Array,
    //   default:[5, 0, 0, 0],
    // },
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
    // Turn off the bullet box and unhighlight it
    isgl: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    //Custom Settings Picture
    zidingyi: {
      type: Boolean,
      default: () => {
        return false;
      },
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
    ...mapState(['aisxjqy']),
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
      that.barChart.on('click', function (params) {
        if (that.active) {
          var selectObj = {};
          selectObj.activeObj = that.activeobj;
          //Currently selected column
          //   if (that.selectItemName != params.name) {
          //     that.isChangeColor = true;
          //     that.selectItemName = params.name;
          //     selectObj.value = params;
          //     switch (that.bid) {
          //       case 'Aisxjfb':
          //         that.$store.commit('AiSxjqySel', params.name);
          //         layerControl.addLandmarks('KeySurveillanceVideo', that.EquipmentData);
          //         that.strBox = 'KeySurveillanceVideo';
          //         break;
          //       case 'OMORDERBAR':
          //         layerControl.addLandmarks('TheAlarmPoint', that.EquipmentData);
          //         that.strBox = 'TheAlarmPoint';
          //         console.log('OM bottom right click event');
          //         break;

          //       default:
          //         break;
          //     }
          //   } else {
          //     that.isChangeColor = false;
          //     that.selectItemName = '';
          //     that.$store.commit('AiSxjqySel', that.selectItemName);
          //     selectObj.value = null;
          //     layerControl.deleteLandmarks(that.strBox);
          //   }
          that.barChart.setOption(that.option, true);
          that.$eventBus.$emit('selectedMapPoint', selectObj);
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
          tooltip: {
            show: that.showToolTip,
            trigger: 'axis',
            textStyle: {
              fontSize: 22,
              fontFamily: 'Helvetica',
            },
            axisPointer: {
              //type: "cross",
              animation: false,
              lineStyle: {
                color: '#8A9EB5',
                width: 2,
              },
              label: {
                backgroundColor: '#505765',
                fontSize: 22,
              },
            },
          },
          legend: {
            data: this.legends,
            itemWidth: 5,
            x: '74%',
            y: '1%',
            width: 100,
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
                  color: '#8A9EB5',
                  width: 2,
                },
              },

              axisLabel: {
                color: '#FFFFFF',
                fontSize: 22,
                fontFamily: 'PingFang',
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
            },
          ],
          yAxis: [
            {
              type: `${this.ytype}`,
              data: this.xData,
              splitNumber: this.measurebox,
              axisLine: {
                lineStyle: {
                  color: '#8A9EB5',
                  width: 2,
                },
              },
              axisTick: {
                show: false,
              },
              axisLabel: {
                color: '#FFFFFF',
                fontSize: 22,
                fontFamily: 'PingFang',
              },
              inverse: this.inverse,

              //Interlaced color change
              splitArea: {
                show: this.ysplitshow,
                areaStyle: {
                  color: ['transparent', 'rgba(238,238,238,.1)'],
                },
              },
              splitLine: {
                show: false,
              },
            },
          ],
          title: {
            text: this.unit,
            // padding:this.unitPadding ,
            padding: [15, 0, 0, 0],
            textStyle: {
              color: '#FFFFFF',
              fontSize: 22,
              fontFamily: 'PingFang',
            },
            top: 'top',
            left: 'left',
          },
          series: [],
        };
        if (that.xtype == 'value') {
          that.option.yAxis[0].data = that.xData;
        } else {
          that.option.xAxis[0].data = that.xData;
        }
        that.option.series = [];
        that.yData.forEach((d, index) => {
          let serie = {};
          if (that.zidingyi) {
            serie = {
              type: 'pictorialBar',
              // data: that.yData,
              width: '100%',
              z: 2,
              zlevel: 0,
              legendHoverLink: true,
              large: false,
              largeThreshold: 400,
              symbolRepeat: false,
              symbolMargin: null,
              //*********************** */ 
              symbol: 'image://' +this.Bgimg,
              symbolClip: false,
              symbolSize: null,
              symbolPosition: null,
              symbolOffset: null,
              symbolRepeatDirection: 'end',
              symbolBoimdingData: null,
              symbolPatternSize: 400,
              barGap: '-100%',
              // itemStyle: {
              //   normal: {
              //     color: {
              //       type: 'linear',
              //       x: 0,
              //       y: 0,
              //       x2: 0,
              //       y2: 1,
              //       colorStops: [
              //         {
              //           offset: 0,
              //           color: 'rgba(48, 236, 166, 1)' // Color at 0%
              //         },
              //         {
              //           offset: 1,
              //           color: 'rgba(0, 34, 66, 0.2)' // Color at 100%
              //         }
              //       ],
              //       globalCoord: false // Default to false
              //     } //Gradient Color
              //   }
              // },
              data: d,
              barWidth: '100%',
              label: {
                show: false,
                position: 'top', // position
                color: '#FFDC73',
                fontSize: 30,
                distance: 15, // distance
              }, // Value above column
            };
          } else {
            serie = {
              type: this.type,
              data: d,
              barWidth: that.barWidth,
            };

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
                            offset: 0.5,
                            color: that.legends[index].from,
                          },
                          {
                            offset: 1,
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
                            offset: 0.5,
                            color: that.legends[index].from,
                          },
                          {
                            offset: 1,
                            color: that.legends[index].to,
                          },
                        ]
                      );
                    }
                  }
                },
                label: {
                  show: this.labelshow,
                  position: this.labelposition,
                  textStyle: {
                    color: 'white',
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
        that.option = that.initOption(that.option);
        that.yData.forEach((n, index) => {
          that.option.series[index].data = n;
        });
        that.$nextTick(() => {
          that.barChart.setOption(that.option);
        });
      },
      deep: false,
    },
    isgl() {
      this.isChangeColor = false;
      this.barChart.setOption(this.option, true);
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
