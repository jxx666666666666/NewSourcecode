<template>
  <div class="lable_tow" :key="key">
    <!-- 第一部分 -->
    <div class="lable_tow-item">
      <div v-for="(item, index) in Datalist" :key="index" class="item-style">
        <div class="name">{{ item.name }}</div>
        <BountyTextVue class="num" :number="item.num"></BountyTextVue>
      </div>
    </div>
  </div>
</template>

<script>
import BountyTextVue from '../common/BountyText.vue';
export default {
  props: {
    Datalist: {
      type: Array,
      default: () => {
        return [
          { name: 'Total Energy  Consumption', num: 80 },
          { name: 'Estimated Energy  Consumption', num: 30 },
        ];
      },
    },
  },
  data() {
    return {
      key: 0,
    };
  },
  watch: {},
  created() {
    // this.Datalist.forEach((item) => {
    //   item.num = this.add(item.num);
    // });
  },
  methods: {},
  // mounted () {
  //   bounty.default({ el: this.$refs.num, value: this.num })
  // },
  components: {
    BountyTextVue,
  },
};
</script>

<style lang="less">
.lable_tow {
  width: 799px;
  height: 388px;
  .lable_tow-item {
    width: 799px;
    height: 388px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .item-style {
      width: 312px;
      height: 180px;
      background: url('../../assets/img/ZhiHuiDengGan/FX-bg.png') no-repeat center bottom;
      background-size: 100% 100%;
      .name {
        width: 100%;
        height: 65px;
        box-sizing: border-box;
        font-size: 28px;
        font-family: 'Helvetica';
        text-align: center;
        color: #ffffff;
      }
      .num {
        margin-top: -10px;
        box-sizing: border-box;
        font-family: 'Roboto';
        font-size: 64px;
        color: #ffffff;
      }
    }
  }
}
@-webkit-keyframes rotate-in-center {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes rotate-in-center {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@-webkit-keyframes scale-in-center {
  0% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  50% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
@keyframes scale-in-center {
  0% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  50% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
</style>
