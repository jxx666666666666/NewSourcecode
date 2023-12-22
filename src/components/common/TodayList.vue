<template>
  <div class="todayList">
    <div class="item" v-for="(item, index) in rowData" :key="index">
      <div class="title">
        <span>{{ item.title }}</span>
        <span v-if="item.unit">(unit: {{ item.unit }})</span>
      </div>
      <div class="content">
        <img :src="item.icon" alt="" />
        <div class="value">
          <span class="num">{{ item.value }}</span>
          <span class="ratio" :class="{ ratioColor: item.ratio[0] == '-' }" v-if="item.ratio">{{ item.ratio }}</span>
          <img src="../../assets/img/Common/sum_bottom_icon.png" alt="" v-if="item.ratio && item.ratio[0] == '-'" />
          <img src="../../assets/img/Common/sum_top_icon.png" alt="" v-if="item.ratio && item.ratio[0] != '-'" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    rowData: {
      type: Array,
      default: () => {
        return [
        //   {
        //     title: 'title',
        //     unit: 'unit',
        //     icon: require('../../../assets/img/YiWangTongBan/today_list_icon1.png'),
        //     value: 123,
        //   },
        ];
      },
    },
  },
};
</script>

<style lang="less" scoped>
.todayList {
  .item {
    margin-bottom: 27px;
    width: 304px;
    height: 100px;
    .title {
      width: 276px;
      height: 29px;
      background: url('../../assets/img/Common/today_list_title.png') no-repeat;
      > span {
        margin-left: 10px;
        white-space: nowrap;
      }
      :nth-child(1) {
        font-family: 'Helvetica';
        font-size: 26px;
        background: linear-gradient(to bottom, #ffffff, #8dedf8);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        font-weight: Regular;
      }
      :nth-child(2) {
        font-family: 'PingFang SC';
        font-size: 20px;
        color: #3fcbff;
      }
    }
    .content {
      margin-top: 10px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      .value {
        padding-left: 10px;
        width: 228px;
        height: 60px;
        line-height: 60px;
        background: url('../../assets/img/Common/today_list_content.png') no-repeat;
        .num {
          font-family: 'Voltage';
          font-size: 65px;
          font-weight: Regular;
          background: linear-gradient(to bottom, #ffffff, #81bac9);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .ratio {
          margin-left: 50px;
          font-family: 'Voltage';
          font-size: 35px;
          color: #f17163;
        }
        .ratioColor {
          color: rgb(0, 221, 138);
        }
        img {
          margin: 30px 0 0 10px;
        }
      }
    }
  }
}
</style>
