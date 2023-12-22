<template>
  <div class="lable"
       :key="key">
    <!-- Part One -->
    <div v-if="className == 'Total Number of Lamps'"
         class="lable-item">
      <div v-for="(item, index) in Datalist"
           :key="index"
           class="item-style">
        <div class="name">{{ item.name }}</div>
        <BountyTextVue class="num"
                       :number="item.num"></BountyTextVue>

      </div>
    </div>
    <!-- Part Two -->
    <div v-if="className == 'Lighting Status Statistics'"
         class="content-box">
      <!-- Bottom bar -->
      <div class="bottom-box">
        <div :class="'vertical' + index"
             v-for="(item, index) in Datalist"
             :key="index">
          <h2>{{ item.name }}</h2>
          <span class="span_bg"></span>
          <span>{{ item.num }}</span>
        </div>
      </div>
    </div>
    <!-- Part Three -->
    <div v-if="className == 'Energy Consumption'"
         class="lable-item1">
      <div v-for="(item, index) in Datalist"
           :key="index"
           class="item-style">
        <div class="name">{{ item.name }}</div>
        <BountyTextVue class="num"
                       :number="item.num"></BountyTextVue>
        <!-- <div class="num">{{ item.num }}</div> -->
      </div>
    </div>
  </div>
</template>

<script>
import BountyTextVue from '../common/BountyText.vue';
export default {
  props: {
    className: {
      type: String,
      default: "",
    },
    Datalist: {
      type: Array,
      default: () => {
        return [
          { name: "Total Energy  Consumption", num: 80 },
          { name: "Estimated Energy  Consumption", num: 30 },
        ];
      },
    },
  },
  data () {
    return {
      key: 0,
    };
  },
  watch: {
    className: {
      handler (neval) {
        this.key += 1;
        this.Datalist.forEach((item) => {
          item.num = this.add(item.num);
        });
      },
    },
  },
  created () {
    this.Datalist.forEach((item) => {
      item.num = this.add(item.num);
    });
  },
  methods: {
    add (num) {
      var num = (num || 0).toString();
      var num1 = num.indexOf(".");
      var num3 = num.indexOf("-");
      if (num1 == "-1") {
        if (num3 != "-1") {
          var result = "";
          var num4 = num.substring(1, num.length);
          while (num4.length > 3) {
            result = "," + num4.slice(-3) + result;
            num4 = num4.slice(0, num4.length - 3);
          }
          if (num4) {
            result = num4 + result;
          }
          return "-" + result;
        } else {
          var result = "";
          while (num.length > 3) {
            result = "," + num.slice(-3) + result;
            num = num.slice(0, num.length - 3);
          }
          if (num) {
            result = num + result;
          }
          return result;
        }
      } else {
        if (num3 != "-1") {
          var num2 = num.substring(1, num1);
          var num3 = num.substring(num1, num.length);
          var result = "";
          while (num2.length > 3) {
            result = "," + num2.slice(-3) + result;
            num2 = num2.slice(0, num2.length - 3);
          }
          if (num2) {
            result = num2 + result;
          }
          return "-" + result + num3;
        } else {
          var num2 = num.substring(0, num1);
          var num3 = num.substring(num1, num.length);
          var result = "";
          while (num2.length > 3) {
            result = "," + num2.slice(-3) + result;
            num2 = num2.slice(0, num2.length - 3);
          }
          if (num2) {
            result = num2 + result;
          }
          return result + num3;
        }
      }
    },
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
  height: 330px;
  .lable-item {
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
        padding: 0 22%;
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