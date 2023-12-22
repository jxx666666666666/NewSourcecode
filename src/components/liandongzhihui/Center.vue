<template>
  <div class="wraper">
    <OneTitle title="Emergency Prevention" width="580px"></OneTitle>
    <TodayList :info="LeftData" :rowData="rowData" style="margin-top: 20px" />
  </div>
</template>

<script>
import OneTitle from '../common/OneTitle.vue';
import TodayList from '../common/TodayListV2.vue';
export default {
  components: { TodayList, OneTitle },
  data() {
    return {
      LeftData: [
        {
          title: 'Number of Hazards',
          icon: require('../../assets/img/ldzf/icon1.png'),
          value: 'noh',
        },
        {
          title: 'Number Of Protection Targets',
          icon: require('../../assets/img/ldzf/icon2.png'),
          value: 'nopt',
        },
        {
          title: 'Number Of Rescue Teams',
          icon: require('../../assets/img/ldzf/icon3.png'),
          value: 'nort',
        },
        {
          title: 'Number Of Shelters',
          icon: require('../../assets/img/ldzf/icon4.png'),
          value: 'nos',
        },
        {
          title: 'Emergency Material Warehouse',
          icon: require('../../assets/img/ldzf/icon5.png'),
          value: 'emw',
        },
        {
          title: 'Number Of Expert Teams',
          icon: require('../../assets/img/ldzf/icon6.png'),
          value: 'noet',
        },
      ],
      rowData: {
        noh: 803,
        nopt: 1002,
        nort: 19,
        nos: 16,
        emw: 3201,
        noet: 103,
      },
    };
  },
  created() {
    this.getCenterData();
  },
  methods: {
    async getCenterData() {
      this.rowData = await this.$http.LDZFApi.getCenterData();
    },
  },
};
</script>

<style lang="less" scoped>
.wraper {
  width: 100%;
  z-index: 0;
}
</style>
