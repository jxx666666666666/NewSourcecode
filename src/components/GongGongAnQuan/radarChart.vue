<template>
  <!-- Radar map component -->
  <div class="radar-charts">
    <div ref="radarCharts" :style="{ width: `${width}`, height: `${height}`,top:`${top}` }"></div>
    <div class="rosethree_legend">
      <div class="legend" v-for="(item, index) in rowData" :key="index">
        <div class="legend_color" ></div>
        <div class="legend_name">{{ item.name }}</div>
        <div class="legend_value">{{ item.value }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // textColor
    textColor: {
      type: String,
      default: () => {
        return "#BFEBFF";
      }
    },
    // textSize
    textSize: {
      type: Number,
      default: () => {
        return 18;
      }
    },
    // legendShow
    legendShow: {
      type: Boolean,
      default: () => {
        return true;
      }
    },
    //width
    width: {
      type: String,
      default: "400px"
    },
    // height
    height: {
      type: String,
      default: "261px"
    },
    // top
    top: {
      type: String,
      default: "0px"
    },
    rowData: {
      type: Array,
      default: () => {
        return [
          { name: "name", max: 10, value: 8.6, legend: "legend" },
          { name: "name", max: 10, value: 6.6, legend: "legend" },
          { name: "name", max: 10, value: 7.6, legend: "legend" },
          { name: "name", max: 10, value: 5.5, legend: "legend" },
          { name: "name", max: 0, value: 8.4, legend: "legend" }
        ];
      }
    },
    // Legend data
    legend: {
      type: Array,
      default: () => {
        return [
          {
            name: "name",
            color: "#265CFF"
          }
        ];
      }
    },
    // Radar map location
    center: {
      type: Array,
      default: () => {
        return ["45%", "45%"];
      }
    },
    // Legend Horizontal and Vertical  horizontal
    orient: {
      type: String,
      default: "vertical"
    },
    // Legend interval
    itemGap: {
      type: Number,
      default: 50
    },
    // Legend Top Margin
    legendTop: {
      type: String,
      default: "0%"
    },
    //Legend Left
    legendLeft: {
      type: String,
      default: "80%"
    },
    //click
    triggerEvent: {
      type: Boolean,
      default: false
    },
    // Radar image size
    radius: {
      type: Number,
      default: 76
    },
   //Automatically display tips
      showTip: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      legends: [],
      indicator: [],
      sjdata: [],
      ColorArray: []
    };
  },
  mounted() {

    this.$nextTick(() => {
      this.draw();
    });
  },
  methods: {
    draw() {
      let that = this;
      this.myChart = this.$echarts.init(this.$refs.radarCharts);
      this.option = this.initOption();
      this.myChart.setOption(this.option, true);
      // this.myChart.on('click', (parms) => {
      //   // this.$eventBus.$emit('zwfwName', parms.name)
      // });
    },
    contains(obj) {
      var i = this.rowData.length;
      while (i--) {
        if (this.rowData[i].name === obj) {
          return i;
        }
      }
      return false;
    },
    initOption() {
      let data = [];
      let that = this;
      let ColorArray = [];
      that.legend.forEach(item => {
        ColorArray.push(item.color);
        let obj = {
          value: [],
          name: "Data",
          areaStyle: {
            normol: {
              color: item.color,
              opcity: 0.5
            }
          }
        };
        that.ColorArray = ColorArray;
        that.rowData.forEach(v => {
          if (v.legend == item.name) {
            obj.value.push(Number(v.value));
          }
        });
        data.push(obj);
        that.sjdata = data;
      });

      this.transformData(that.rowData);

      // Array deduplication
      that.option = {
        color: that.ColorArray,
        tooltip: {},

        radar: {
          radius: this.radius,
          // shape: 'circle',
          center: that.center,
          name: {
            textStyle: {
              color: this.textColor,
              borderRadius: 3,
              fontfamily: "PingFang SC",
              fontSize: this.textSize,
              padding: [0, 0],
              rich: {
                a: {
                  fontSize: 20,
                  align: "center",
                  fontFamily: "Voltage"
                },
                b: {
                  fontSize: 14,
                  align: "center",
                  fontfamily: "PingFang SC"
                },
                c: {
                  fontSize: 14,
                  align: "center",
                  fontfamily: "PingFang SC",
                  padding: [0, 0, 0, 0]
                }
              }
            },
            formatter: function(params, index) {
              
              //   var newParamsName = '';
              //   var paramsNameNumber = params.length;
              //   var provideNumber = 5; //Display a few words in a row
              //   var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
              //   if (paramsNameNumber > provideNumber) {
              //     for (var p = 0; p < rowNumber; p++) {
              //       var tempStr = '';
              //       var start = p * provideNumber;
              //       var end = start + provideNumber;
              //       if (p == rowNumber - 1) {
              //         tempStr = params.substring(start, paramsNameNumber);
              //       } else {
              //         tempStr = params.substring(start, end) + '\n';
              //       }
              //       newParamsName += tempStr;
              //     }
              //   } else {
              //     newParamsName = params;
              //   }
              var percent = that.contains(params);
              // if (percent == 0) {
              //   return (
              //     "{c|" +
              //     params +
              //     "}" +
              //     "{a| " +
              //     that.rowData[percent].value +
              //     " }"
              //   );
              // }
              return (
                // "{a|" +
                // that.rowData[percent].value +
                // "}" +
                // "\n" +
                
                params 
                //Modify here
               
              );
              //   if (indexTemp == 1) {
              //     newParamsName = '1';
              //   } else {
              //     newParamsName =
              //       '{a|' + '8.6}' + '\n' + '{b|' + newParamsName + '}';
              //   }

              //   return newParamsName;
            }
          },
          indicator: that.indicator,
          triggerEvent: this.triggerEvent,
          splitArea: {
            show: true,
            areaStyle: {
              color: "#ffffff00"
            }
          },
          axisLine: {
            show: false
          }
        },
        series: [
          {
            type: "radar",
            symbolOffset: ["0%", "0%"],
            data: that.sjdata,
            areaStyle: {
              color: "#00BFFF",
              opacity: 0.3
            },
            lineStyle: {
              color: "#00BFFF ",
              opacity: 0.8,
              width: 2
            },
            itemStyle: {
              color: "#00BFFF ",
              borderColor: "#00BFFF",
              opacity: 0.8
            }
          }
        ]
      };

      return that.option;
    },
    transformData(rowData) {
      let that = this;
      //Obtain category deduplication
      let dimensions = Array.from(
        new Set(
          rowData.map(r => {
            return r.name;
          })
        )
      );
      // console.log(dimensions);
      // Maximum number of duplicates removed
      let maxnum = Array.from(
        new Set(
          rowData.map(r => {
            return Number(r.max);
          })
        )
      );
      // console.log('zheshiasd', maxnum);
      // Negative maximum number
      that.indicator = [];
      dimensions.forEach((item, index) => {
        that.indicator.push({
          name: dimensions[index],
          max: Number(maxnum[0] + index) //Make the maximum value of each category different
          // max:Number(maxnum[index])
        });
      });
      // console.log(that.indicator);
      // Legend data
      let legends = Array.from(
        new Set(
          rowData.map(r => {
            return r.legend;
          })
        )
      );
      that.legends = legends;
    }
  },
  watch: {
    rowData: {
      handler(value) {
        this.initOption();
        this.draw();
      },
      deep: true
    }
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
  beforeDestroy() {
    this.$echarts.dispose(this.myChart);
    this.myChart = null;
    this.option = null;
  }
};
</script>

<style lang="less" scoped>
.rosethree_legend {
  position: absolute;
  right: -56px;
  top: 590px;
  width: 320px;
  height: 176px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .legend {
    position: relative;
    // margin-bottom: 20px;
    height: 35px;
    // width: 275px;
    display: flex;
    padding-bottom: 6px;
    .legend_color {
      position: absolute;
      left: 0px;
      top: 5px;
      width: 5px;
      height: 20px;
      background-color:#00BFFF
    }
    .legend_name{
      width:61px;
      height: 37px;
      color: #BFEBFF;
      font-family: 'Roboto';
      font-size: 18px;
      position: absolute;
      top: 5px;
      left: 22px;
    }
    .legend_value{
      width:61px;
      height: 37px;
      color: #FFFFFF;
      font-family: 'Roboto';
      font-size: 28px;
      position: absolute;
      top: -3px;
      left: 121px;
    }
  }
}
</style>
