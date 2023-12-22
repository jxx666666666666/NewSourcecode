<template>
  <div style="display: inline-block" class="ztts-box">
    <div class="back" v-for="(item, index) in obj" :key="index">
      <div class="title">{{ item.title }}</div>
      <BountyTextVue class="value" :number="item.value" :color="'#ffd24d'"> </BountyTextVue>
      <!-- <RunNumVue></RunNumVue> -->
      <!-- <div class="value">{{ item.value }}</div> -->
      <!-- <div class="unit">{{ item.unit }}</div> -->
      <div class="tbz" v-if="item.tb.slice(0, 1) == '-'">
        <div class="tbValue">{{ item.tb.slice(1, item.tb.length) }}</div>
        <div class="up">
          <img src="../../assets/img/GongGongAnQuan/up.png" alt />
        </div>
      </div>
      <div class="tbf" v-else>
        <div class="tbValue">{{ item.tb.slice(1, item.tb.length) }}</div>
        <div class="down">
          <img src="../../assets/img/GongGongAnQuan/down.png" alt />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BountyTextVue from '../common/BountyText.vue';
export default {
  components: {},
  props: {
    obj: {
      type: Array,
      default: () => {
        return [
          {
            title: 'Good Air Days and YOY',
            value: '125',
            unit: '2.6%',
            tb: '+2.0',
          },
        ];
      },
    },
  },
  components: {
    BountyTextVue,

  },
};
</script>

<style lang="less" scoped>
// .back + .back {
//   margin-left: 97px;
// }
.chanyejingjiItem+.chanyejingjiItem {
  margin-left: 97px;
}

.ztts-box {
  //   height: 208px;
  width: 100%;

  .back {
    display: inline-block;
    width: 267px;
    height: 247px;
    background: url('../../assets/img/GongGongAnQuan/Monitbj.png') no-repeat;
    background-position: bottom;
    padding-top: 10px;

    .title {
      position: relative;
      top: 54px;
      width: 199px;
      height: 28px;
      line-height: 28px;
      font-size: 17px;
      color: #ebebf9;
      text-align: center;
      font-family: 'Helvetica';
      margin-left: 40px;
    }

    .value {
      width: 190px;
      height: 70px;
      font-size: 70px;
      line-height: 70px;
      text-align: center;
      font-family: 'Roboto';
      margin-top: 101px;
      margin-left: 40px;

    }

    .unit {
      width: 145px;
      height: 16px;
      line-height: 16px;
      font-size: 16px;
      font-family: 'Microsoft YaHei', sans-serif;
      color: #ffffff;
      text-align: center;
    }

    .tbz {
      width: 188px;
      height: 43px;
      margin-top: 10px;
      display: flex;
      justify-content: center;
      margin-left: 40px;

      .tbValue {
        text-align: center;
        font-family: 'Roboto';
        font-size: 24px;
        color: #ff9672;
      }

      .up {
        width: 20px;
        height: 22px;
        margin-top: 6px;
        margin-left: 20px;
      }
    }

    .tbf {
      width: 188px;
      height: 43px;
      margin-top: 10px;
      display: flex;
      justify-content: center;
      margin-left: 40px;

      .tbValue {
        text-align: center;
        font-family: 'Roboto';
        font-size: 24px;
        color: #4cff79;
      }

      .down {
        width: 20px;
        height: 22px;
        margin-top: 6px;
        margin-left: 20px;
      }
    }
  }
}</style>
