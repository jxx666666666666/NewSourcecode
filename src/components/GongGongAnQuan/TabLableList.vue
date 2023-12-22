<template>
  <div class="lable" :key="key">
    <!-- 第一部分 -->
    <div class="lable-item">
      <div v-for="(item, index) in Datalist" :key="index" class="item-style">
        <div class="name">{{ item.name }}</div>
        <BountyTextVue class="num" :number="item.num"></BountyTextVue>
      </div>
    </div>
  </div>
</template>

<script>
import BountyTextVue from "../common/BountyText.vue";
export default {
  props: {
    Datalist: {
      type: Array,
      default: () => {
        return [
          { name: "Total Energy  Consumption", num: 80 },
          { name: "Estimated Energy  Consumption", num: 30 }
        ];
      }
    }
  },
  data() {
    return {
      key: 0
    };
  },
  watch: {},
  created() {
    // this.Datalist.forEach((item) => {
    //   item.num = this.add(item.num);
    // });
  },
  methods: {
  
  },
  // mounted () {
  //   bounty.default({ el: this.$refs.num, value: this.num })
  // },
  components: {
    BountyTextVue
  }
};
</script>

<style lang="less">
.lable {
  width: 830px;
  height: 305px;
  .lable-item {
    width: 100%;
    height: 100%;
    display: flex;
    padding: 0 35px;
    .item-style {
      width: 355px;
      background: url("../../assets/img/ZhiHuiDengGan/FX-bg.png") no-repeat;
      background-size: 80% 50%;
      background-position: 50% 90%;
      .name {
        height: 65px;
        box-sizing: border-box;
        margin-top: 75px;
        padding: 0 22%;
        width: 420px;
        font-size: 28px;
        font-family: "Helvetica";
        text-align: center;
        color: #ffffff;
        margin-left: -30px;
      }
      .num {
        margin-top: 10px;
        width: 100%;
        font-family: "Roboto";
        font-size: 80px;
        text-align: center;
        color: #ffffff;
      }
    }
  }
  .lable-item1 {
    width: 100%;
    height: 100%;
    display: flex;
    padding: 0 65px;
    .item-style {
      width: 355px;
      background: url("../../assets/img/ZhiHuiDengGan/FX-bg.png") no-repeat;
      background-size: 80% 50%;
      background-position: 50% 90%;
      .name {
        height: 65px;
        box-sizing: border-box;
        margin-top: 75px;
        padding: 0 15%;
        width: 100%;
        font-size: 28px;
        font-family: "Helvetica";
        text-align: center;
        color: #ffffff;
      }
      .num {
        margin-top: 10px;
        width: 100%;
        font-family: "Roboto";
        font-size: 80px;
        text-align: center;
        color: #ffffff;
      }
    }
  }
  .content-box {
    margin-top: 7%;
    width: 100%;
    height: 80%;
    position: relative;
    // background-color: #fff;
    .bottom-box {
      width: 100%;
      height: 15px;
      position: absolute;
      bottom: 50px;
      left: 0px;
      background: url("../../assets/img/ZhiHuiDengGan/stripes.png");
      -webkit-animation: scale-in-center 0.5s
        cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
      animation: scale-in-center 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
      // background-image: linear-gradient(
      //   to right,
      //   #057bf900,
      //   #057bf9ff,
      //   #057bf900
      // );
      > div {
        width: 10px;
        border-radius: 4px;
        position: absolute;
        bottom: 15px;
        background-color: #26ffff99;
        span {
          font-size: 40px;
          color: #ffffff;
          line-height: 120px;
          text-align: center;
          font-family: "Roboto";
        }
        h2 {
          font-family: "Helvetica";
          text-align: center;
          color: #bfebff;
          font-size: 28px;
        }
      }
      .vertical0 {
        height: 30px;
        left: 120px;
        span {
          bottom: 30px;
          left: -55px;
          position: absolute;
          width: 120px;
          height: 120px;
        }
        .span_bg {
          // background-color: #fff;
          background: url("../../assets/img/ZhiHuiDengGan/pop-bg1.png")
            no-repeat center center;
          -webkit-animation: rotate-in-center 2s infinite linear;
          animation: rotate-in-center 2s infinite linear;
        }
        h2 {
          position: absolute;
          top: 45px;
          width: 200px;
          left: -100px;
          // background-color: pink;
        }
      }
      .vertical1 {
        height: 60px;
        left: 320px;
        span {
          bottom: 60px;
          left: -55px;
          position: absolute;
          width: 120px;
          height: 120px;
          // background-color: #fff;
        }
        .span_bg {
          // background-color: #fff;
          background: url("../../assets/img/ZhiHuiDengGan/pop-bg2.png")
            no-repeat center center;
          -webkit-animation: rotate-in-center 2s infinite linear;
          animation: rotate-in-center 2s infinite linear;
        }
        h2 {
          position: absolute;
          top: 75px;
          width: 200px;
          left: -100px;
          // background-color: pink;
        }
      }
      .vertical2 {
        height: 30px;
        right: 320px;
        span {
          bottom: 30px;
          left: -55px;
          position: absolute;
          width: 120px;
          height: 120px;
          // background-color: #fff;
        }
        .span_bg {
          background: url("../../assets/img/ZhiHuiDengGan/pop-bg3.png")
            no-repeat center center;
          -webkit-animation: rotate-in-center 2s infinite linear;
          animation: rotate-in-center 2s infinite linear;
        }
        h2 {
          position: absolute;
          top: 45px;
          width: 200px;
          left: -100px;
          // background-color: pink;
        }
      }
      .vertical3 {
        height: 60px;
        right: 120px;
        span {
          bottom: 60px;
          left: -55px;
          position: absolute;
          width: 120px;
          height: 120px;
          // background-color: #fff;
        }
        .span_bg {
          background: url("../../assets/img/ZhiHuiDengGan/pop-bg4.png")
            no-repeat center center;
          -webkit-animation: rotate-in-center 2s infinite linear;
          animation: rotate-in-center 2s infinite linear;
        }
        h2 {
          position: absolute;
          top: 75px;
          width: 200px;
          left: -100px;
          // background-color: pink;
        }
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