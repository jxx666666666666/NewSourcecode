<!--
 * @Author: hp
 * @Date: 2021-03-18 14:43:04
 * @LastEditTime: 2021-04-07 17:50:33
 * @LastEditors: your name
 * @Description:Pyramid chart
 * @FilePath: /langchao_gongqingcheng/src/components/echarts/FunnelChart.vue
-->
<template>
  <div :style="styleFunnelChart" class="funnel-chart">
    <div class="funnel-chart-div" ref="chart"></div>
    <div class="content0" v-if="displayModel == 0">
      <div v-for="(val, int) in value" :key="int">
        <span class="rect" :style="{ background: val['color'] }"></span>
        <span class="content-title">{{ val['category'] }}</span>
        <span class="content-value" :style="{ color: val['color'] }">{{ val['proportion'] }}</span>
        <span class="content-unit" v-if="true">{{ unit }}</span>
      </div>
    </div>
    <div class="content1" v-if="displayModel == 1">
      <div v-for="(val, int) in value" :key="int" class="clearfix">
        <span class="rect" :style="{ background: val['color'] }"></span>
        <!-- Alignment style of the transmitted. -->
        <span class="content-title" :style="{ width: styleFunnelChart.duiqi }">{{ val['category'] }}</span>
        <span class="content-value" :style="{ color: val['color'] }">{{ val['data'] }}</span>
        <span class="content-unit" v-if="unitIsShow">{{ unit }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import * as echarts from 'echarts';
export default {
  props: {
    styleFunnelChart: {
      type: Object,
      default: () => {
        return {
          width: '580px',
          height: '330px',
          duiqi: '0px',
        };
      },
    },
    rowData: {
      type: Array,
      default: () => {
        return [
          {
            category: 'XXstreet',
            data: '799',
            color: '#FFE426',
            proportion: '18%',
          },
          {
            category: 'xxstreet1',
            data: '1041',
            color: '#00DD8A',
            proportion: '20%',
          },
          {
            category: 'xxstreet2',
            data: '1591',
            color: '#95FF2B',
            proportion: '22%',
          },
          {
            category: 'xxstreet3',
            data: '1691',
            color: '#00D9D9',
            proportion: '24%',
          },
          {
            category: 'xxstreet4',
            data: '1791',
            color: '#2693FF',
            proportion: '26%',
          },
        ];
      },
    },
    unitIsShow: { type: Boolean, default: true },
    displayModel: {
      type: Number,
      default: 2, //0: Legend, 1: Progress bar, 2: Legend + Count.
    },
    unit: {
      type: String,
      default: () => {
        return 'million';
      },
    },
  },
  data() {
    return {
      chartInst: null,
      option: {},
      value: [],
      setTime: null,
    };
  },
  methods: {
    instantiation() {
      this.chartInst = echarts.init(this.$refs.chart);

      this.option = {
        color: [],

        calculable: true,
        series: [
          {
            name: 'Funnel chart',
            type: 'funnel',
            width: '80%',
            height: '50%',
            left: 0,
            right: 0,
            top: 0,
            bottom: '10%',
            gap: 5,
            sort: 'ascending',
            emphasis: {
              label: {
                fontSize: 16,
              },
            },
            label: {
              show: false,
              position: 'inside',
            },
            data: [],
          },
        ],
      };
    },
    rowDataChart() {
      let data = [];
      let rowData = new Set(this.rowData);
      rowData = Array.from(rowData);
      rowData.sort((a, b) => {
        return a['data'] - b['data'];
      });
      let count = 1;
      var that = this;
      rowData.forEach((val) => {
        that.option.color.push(val['color']);
        data.push({
          name: val['category'],
          num: val['data'],
          value: count,
        });
        count++;
      });
      // this.option.xAxis.data = name;
      this.option.series[0].data = data;
      this.chartInst.setOption(this.option, true);
      this.value = rowData;
    },
    tooltipShuffling() {
      clearInterval(this.setTime);
      let count = 0;
      this.setTime = setInterval(() => {
        if (count == this.rowData.length) {
          count = 0;
          this.chartInst.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: this.rowData.length - 1,
          });
        }
        if (count != 0) {
          this.chartInst.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: count - 1,
          });
        }

        this.chartInst.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: count,
        });
        count++;
      }, 1000);
    },
  },
  mounted() {
    this.instantiation();
    this.rowDataChart();
    this.tooltipShuffling();
  },
  beforeDestroy() {
    clearInterval(this.setTime);
    this.setTime = null;
    echarts.init(this.$refs.chart).dispose();
  },
  watch: {
    rowData: {
      handler(newV, oldV) {
        this.instantiation();
        this.rowDataChart();
        this.tooltipShuffling();
      },
      deep: true,
    },
  },
};
</script>
<style lang="less" scoped>
.funnel-chart {
  height: 300px;
  // position: absolute;
}
.funnel-chart-div {
  width: 45%;
  height: 100%;
  // float: left;
  &::after {
    clear: left;
  }
}
.content0 {
  height: 100%;
  float: right;
  margin-top: -10px;
  &::after {
    clear: right;
  }
  div {
    .rect {
      display: inline-block;
      width: 12px;
      height: 8px;
      margin-right: 10px;
    }
    .content-title {
      font-size: 16px;
      font-family: 'weiruanyahei';
      color: #bfebff;
      display: inline-block;
      margin-right: 30px;
    }
    .content-value {
      font-size: 28px;
      font-family: 'Voltage';
      display: inline-block;
    }
    .content-unit {
      font-size: 12px;
      color: #13bfff;
      display: inline-block;
    }
  }
}
.content1 {
  height: 100%;
  float: right;
  margin-top: -10px;
  &::after {
    clear: right;
  }
  div {
    .rect {
      display: inline-block;
      width: 4px;
      height: 15px;
      margin-right: 10px;
    }
    .content-title {
      font-size: 16px;
      font-family: 'weiruanyahei';
      color: #bfebff;
      display: inline-block;
      margin-right: 30px;
    }
    .content-value {
      font-size: 32px;
      font-family: 'Voltage';
      display: inline-block;
    }
    .content-unit {
      float: right;
      font-size: 18px;
      font-family: 'weiruanyahei';
      color: #3fcbff;
      display: inline-block;
    }
  }
}
</style>
