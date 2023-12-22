<template>
  <div class="chartBox">
    <div class="myChart" ref="myChart" :style="{ width: width, height: height }"></div>
    <ul class="legth" :style="{ top: legTop, left: legLeft }" v-if="legIsShow && rowData.length">
      <li v-for="(item, i) in legthWZ" :key="i">
        <h3 :style="{
          backgroundColor: legthColor[i],
        }"></h3>
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
            name: "7兆瓦",
            value: 90,
            item: 10,
            val: 40,
            total: 10
          },
          {
            name: "5兆瓦",
            value: 150,
            item: 20,
            val: 40,
            total: 10
          },
          {
            name: "3-5兆瓦",
            value: 130,
            item: 30,
            val: 40,
            total: 10
          },
          {
            name: "1.5-3兆瓦",
            value: 130,
            item: 40,
            val: 60,
            total: 10
          },
          {
            name: "<1.5兆瓦",
            value: 130,
            item: 50,
            val: 40,
            total: 10
          },
        ];
      },
    },
    barColor: {
      type: Array,
      default: () => {
        return ["#16B4F8", "#CCCCCC", "#FDD801", "#f00"];
      },
    },
    legthColor: {
      type: Array,
      default: () => {
        return ["#16B4F8", "#CCCCCC", "#FDD801"];
      },
    },
    legthWZ: {
      type: Array,
      default: () => {
        return ["IT Used", "IT Total", "IT Rated"];
      },
    },
    unit: {
      type: String,
      default: () => {
        return "万";
      },
    },
    rightShow: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
    barWidth: {
      type: String,
      default: () => {
        return "14";
      },
    },
    width: {
      type: String,
      default: () => {
        return "100%";
      },
    },
    height: {
      type: String,
      default: () => {
        return "260px";
      },
    },
    legTop: {
      type: String,
      default: () => {
        return "5px";
      },
    },
    legLeft: {
      type: String,
      default: () => {
        return "100px";
      },
    },
    legIsShow: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
  },
  data() {
    return {
      Xdata: [],
      Ydata: [],
      valTwo: [],
      valTree: [],
      valFour: [],
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
        this.valTree.push(item.val);
        this.valFour.push(item.total);
      });
    } else {
      this.noDataShow();
      return;
    }
    this.drawWidth();
    this.tooltipShuffling();
  },
  methods: {
    drawWidth() {
      // 基于准备好的dom，初始化echarts实例
      this.chartInst = this.$echarts.init(this.$refs.myChart);
      this.chartInst.setOption({
        color: "#00BFFF",
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        grid: {
          top: "16%",
          left: "1%",
          right: "1%",
          bottom: "1%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: this.Xdata,
            axisTick: {
              show: false,
              alignWithLabel: true,
            },
            axisLabel: {
              //x轴文字的配置
              textStyle: {
                color: "#BFEBFF",
                fontSize: 22,
                fontFamily: "Helvetica",
              },
              interval: 0,
            },
            axisLine: {
              lineStyle: {
                color: "#618C9F",
                width: 1, //这里是为了突出显示加上的
              },
            },
          },
        ],
        yAxis: [
          {
            // name: `单位:${this.unit}`,
            position: "left",
            type: "value",
            nameTextStyle: {
              color: "#BFEBFF",
              fontSize: 22,
              fontFamily: "Helvetica",
            },
            axisTick: {
              show: false,
            },
            max: 2,
            min: 0,
            axisLabel: {
              //y轴文字的配置
              textStyle: {
                color: "#BFEBFF",
                fontSize: 22,
                fontFamily: "Helvetica",
              },
            },
            splitNumber: 5,
            // 设置y轴线条的粗细
            splitLine: {
              show: false,
              lineStyle: {
                color: ["#0A223E"],
                width: 2,
                type: "solid",
              },
            },
            axisLine: {
              lineStyle: {
                color: "#618C9F",
                width: 1, //这里是为了突出显示加上的
              },
            },
            splitArea: {
              show: true,
              areaStyle: {
                color: ["rgba(238,238,238,0.06)", "rgba(238,238,238,0)"],
              },
            },
          },
          {
            // name: `unit:%`,
            position: "right",
            type: "value",
            show: this.rightShow,
            max: 200,
            min: 0,
            axisTick: {
              show: false,
            },
            axisLabel: {
              //y轴文字的配置
              textStyle: {
                color: "#BFEBFF",
                fontSize: 22,
                fontFamily: "Helvetica",
              },
            },
            splitNumber: 5,
            // Set the thickness of the y-axis line
            splitLine: {
              show: false,
              lineStyle: {
                color: ["#0A223E"],
                width: 2,
                type: "solid",
              },
            },
            axisLine: {
              lineStyle: {
                color: "#618C9F",
                width: 1, //This is for highlighting and adding
              },
            },
            splitArea: {
              show: false,
              areaStyle: {
                // color: ['rgba(14,29,52,0.5)', 'rgba(191,235,255,0.12)']
                // color: ['transparent', 'transparent']
                color: ["rgba(238,238,238,0.06)", "rgba(238,238,238,0)"],
              },
            },
          },
        ],
        series: [
          {
            name: this.legthWZ[0],
            type: "line",
            smooth: true,
            barWidth: 2,
            data: this.Ydata,
            yAxisIndex: 0,
            itemStyle: {
              normal: {
                color: this.barColor[0],
              },
            },
          },
          {
            name: this.legthWZ[1],
            type: "bar",
            stack: "广告",
            barWidth: this.barWidth,
            data: this.valTwo,
            yAxisIndex: 1,

            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: this.barColor[0],
                  },
                  {
                    offset: 1,
                    color: this.barColor[0],
                  },
                ]),
              },
            },
          },
          {
            name: this.legthWZ[2],
            type: "bar",
            stack: "广告",
            barWidth: this.barWidth,
            data: this.valTree,
            yAxisIndex: 1,

            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: this.barColor[1],
                  },
                  {
                    offset: 1,
                    color: this.barColor[1],
                  },
                ]),
              },
            },
          },

          {
            name: this.legthWZ[3],
            type: "line",
            smooth: true,
            barWidth: 2,
            data: this.valFour,
            yAxisIndex: 1,
            itemStyle: {
              normal: {
                color: this.barColor[3],
              },
            },
          },
        ],
      });
      //设置默认选中高亮部分
      this.chartInst.dispatchAction({
        type: "downplay",
        seriesIndex: 0,
        dataIndex: 0,
      }); //鼠标进
    },
    tooltipShuffling() {
      clearInterval(this.setTime);
      var currentIndex = -1;
      this.setTime = setInterval(() => {
        var dataLen = this.Ydata.length;
        // 取消之前高亮的图形
        this.chartInst.dispatchAction({
          type: "downplay",
          seriesIndex: 0, //表示series中的第几个data数据循环展示
          dataIndex: currentIndex,
        });
        currentIndex = (currentIndex + 1) % dataLen; //+1表示每次跳转一个
        this.chartInst.dispatchAction({
          type: "showTip",
          seriesIndex: 0,
          dataIndex: currentIndex,
        });
        // 显示 tooltip
        this.chartInst.dispatchAction({
          type: "showTip",
          seriesIndex: 0,
          dataIndex: currentIndex,
        });
      }, 3000);
    },
    noDataShow() {
      this.chartInst = this.$echarts.init(this.$refs.myChart);
      this.chartInst.setOption({
        backgroundColor: "rgba(255,255,255,.03)",
        title: {
          text: `暂无数据`,
          show: true,
          textStyle: {
            align: "center",
            color: "#fff",
            fontSize: 32,
          },
          top: "center",
          left: "center",
        },
      });
    },
  },
  beforeDestroy() {
    clearInterval(this.setTime);
    this.setTime = null;
    this.chartInst.dispose();
  },
  watch: {
    rowData: {
      handler(val) {
        if (!val.length) {
          this.noDataShow();
          return;
        }
        this.Xdata = [];
        this.Ydata = [];
        this.valTwo = [];
        this.valTree = [];
        this.valFour = [];
        this.rowData.forEach((item) => {
          this.Xdata.push(item.name);
          this.Ydata.push(item.value);
          this.valTwo.push(item.item);
          this.valTree.push(item.val);
          this.valFour.push(item.total);
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
        width: 14px;
        height: 14px;
        background-color: red;
        margin-top: 6px;
      }

      span {
        margin-left: 7px;
        font-size: 20px;
        font-family: "Helvetica";
        color: #bfebff;
      }

      &:nth-child(1) {
        h3 {
          margin-top: 10px;
          width: 14px;
          height: 2px;
          position: relative;

          &::before {
            content: "";
            display: block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: #ffffff;
            box-sizing: border-box;
            border: 1px solid #fdd801;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }
        }
      }

      &:nth-child(4) {
        h3 {
          margin-top: 10px;
          width: 14px;
          height: 2px;
          position: relative;

          &::before {
            content: "";
            display: block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: #ffffff;
            box-sizing: border-box;
            border: 1px solid #02FDE3;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }
        }
      }
    }
  }
}
</style>
