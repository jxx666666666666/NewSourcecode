<template>
  <div
    class="chart"
    :style="{ width: width, height: height }"
    ref="chart"
  ></div>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: "216px",
    },
    height: {
      type: String,
      default: "216px",
    },
    color: {
      type: Array,
      default: () => {
        return ["#16B4F8", "#16B4F8", "#16B4F8"];
      },
    },
    // 数据百分比
    rawData: {
      type: Object,
      default: () => {
        return {
          name: "IT Load Rate",
          value: 18,
        };
      },
    },
    dataMax: {
      type: Number,
      default: 100,
    },
    //轴原点大小
    circleSize: {
      type: String,
      default: "3%",
    },
    // 指针长度
    pointerLength: {
      type: String,
      default: "65%",
    },
    // 指针宽度
    pointerWidth: {
      type: Number,
      default: 1,
    },
    // 环宽度
    ringWidth: {
      type: Number,
      default: 16,
    },
    fontStyle: {
      type: Object,
      default: () => {
        return {
          color: "#BFEBFF",
          fontSize: 22,
          fontFamily: "PingFang",
        };
      },
    },
  },
  data() {
    return { chart: null, option: {}, setTime: null };
  },
  mounted() {
    if (!this.rawData) {
      this.noDataShow();
      return;
    }
    this.initCharts();
    this.rawDataChart();
  },
  methods: {
    initCharts() {
      this.chart = this.$echarts.init(this.$refs.chart);
      this.option = {
        series: [
          // 背景仪表盘
          {
            name: "bg",
            type: "gauge",
            radius: "90%",
            min: 0,
            max: this.dataMax,
            center: ["50%", "50%"],
            splitNumber: 0, //刻度数量
            startAngle: 230,
            endAngle: 310,
            axisLine: {
              show: true,
              lineStyle: {
                width: this.ringWidth,
                color: [
                  [0, "#CCCCCC"],
                  [1, "#CCCCCC"],
                ],
              },
            },
            //分隔线样式。
            splitLine: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            pointer: {
              show: false,
            },

            itemStyle: {
              // 仪表盘指针样式
              color: "#fff",
            },
            //仪表盘详情，用于显示数据。
            detail: {
              show: false,
              offsetCenter: [0, 0],
              color: "#ddd",
              formatter: function (params) {
                return params;
              },
              textStyle: {
                fontSize: 12,
              },
            },
            data: [
              {
                // name: "当前用户总数",
                value: 5,
              },
            ],
          },
          // 数据仪表盘
          {
            title: {
              show: true,
              text: `暂无数据`,
              offsetCenter: [0, 30],
              color: this.fontStyle.color,
              fontSize: this.fontStyle.fontSize,
              fontFamily: this.fontStyle.fontFamily,
            },
            type: "gauge",
            radius: "90%",
            min: 0,
            max: this.dataMax,
            center: ["50%", "50%"],

            splitNumber: 0, //刻度数量
            startAngle: 230,
            endAngle: 240 - parseInt((this.rawData.value * 300) / this.dataMax), // 180 -  数据百分比*180（需要动态计算）
            axisLine: {
              show: true,
              lineStyle: {
                width: this.ringWidth,
                color: [
                  [
                    1,
                    new this.$echarts.graphic.LinearGradient(1, 0, 0, 0, [
                      {
                        offset: 0,
                        color: this.color[0],
                      },
                      {
                        offset: 0.45,
                        color: this.color[1],
                      },
                      {
                        offset: 1,
                        color: this.color[2],
                      },
                    ]),
                  ],
                ],
              },
            },
            //分隔线样式。
            splitLine: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            axisTick: {
              show: false,
            },

            itemStyle: {
              // 仪表盘指针样式
              color: "#fff",
            },
            pointer: {
              show: false,
              length: this.pointerLength, // 指针长度
              width: this.pointerWidth, // 指针宽度
            },
            //仪表盘详情，用于显示数据。
            detail: {
              show: false,
              offsetCenter: [0, 10],
              formatter: function (params) {
                return params;
              },
            },
            data: [
              {
                value: this.dataMax,
              },
            ],
          },
        ],
      };
    },
    rawDataChart() {
      this.chart.setOption(this.option, true);
    },
    noDataShow() {
      this.chart = this.$echarts.init(this.$refs.chart);
      this.chart.setOption({
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
  watch: {
    rawData: {
      handler(val) {
        if (!val) {
          this.noDataShow();
          return;
        }
        this.initCharts();
        this.rawDataChart();
      },
      deep: true,
    },
  },
  beforeDestroy() {
    clearInterval(this.setTime);
    this.chart.dispose();
  },
};
</script>

<style lang="less" scoped>
.ybp-chart {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
