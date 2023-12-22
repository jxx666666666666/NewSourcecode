<template>
  <div class="wraper">
    <TodayList :info="LeftData" :rowData="rowData" style="margin-top: 20px" />
  </div>
</template>

<script>
import OneTitle from "../common/OneTitle.vue";
import TodayList from "../common/TodayListV2.vue";
export default {
  components: { TodayList, OneTitle },
  data() {
    return {
      LeftData: [
        {
          title: "Total Resident Population",
          icon: require("../../assets/img/ChengShiQuanJing/center1.png"),
          value: "noh",
        },
        {
          title: "Total Floating Population",
          icon: require("../../assets/img/ChengShiQuanJing/center2.png"),
          value: "nopt",
        },
        {
          title: "Population Growth Rate",
          icon: require("../../assets/img/ChengShiQuanJing/center3.png"),
          value: "nort",
        },
        {
          title: "Growth Rate Of GDP Of The Whole City",
          icon: require("../../assets/img/ChengShiQuanJing/center4.png"),
          value: "nos",
        },
        {
          title: "Urban Afforestation Coverage Rate",
          icon: require("../../assets/img/ChengShiQuanJing/center5.png"),
          value: "emw",
        },
        {
          title: "Average Concentration Of PM2.5 In The Whole City",
          icon: require("../../assets/img/ChengShiQuanJing/center6.png"),
          value: "noet",
        },
        {
          title: "Citywide AQI Index",
          icon: require("../../assets/img/ChengShiQuanJing/center7.png"),
          value: "AQI",
        },
      ],
      rowData: {
        noh: 800368,
        nopt: 1020060,
        nort: "3.86%",
        nos: "8%",
        emw: "52",
        noet: 52,
        AQI: 61,
      },
    };
  },
  created() {
    this.getCenterData();
  },
  methods: {
    async getCenterData() {
      this.rowData = await this.$http.CSQJApi.getCenterData();
    },
  },
};
</script>

<style lang="less" scoped>
.wraper {
  width: 100%;
}
</style>
