<template>
  <div class="bg">
    <div class="circle_box">
      <div class="outcircle">
      </div>
      <div class="incircle"></div>
    </div>
    <BountyText :number="num"
                :color="color"
                class="title"></BountyText>
    <div class="light"></div>
  </div>

</template>

<script>
import BountyText from './BountyText.vue'
export default {
  props: {
    num: "",
    color: {
      type: String,
      default: () => {
        return '#ffffff'
      },
    }
  },
  mounted () {
    // bounty.default({ el: this.$refs.title, value: this.num })
  },
  components: {
    BountyText
  }
}
</script>

<style lang="less" scoped>
.bg {
  background: url("../../assets/img/Common/staticItem/static_bg.png") no-repeat;
  width: 289px;
  height: 173px;
  position: relative;
  left: 66px;
  top: 55px;
  .title {
    font-family: "Roboto";
    font-size: 80px;
    color: white;
    position: absolute;
    text-align: center;
    width: 100%;
    top: 0px;
    text-shadow: 1px 1px 5px rgb(0 0 0 / 50%);
    fill: #fff;
  }
  .light {
    background: url("../../assets/img/Common/staticItem/light.png") no-repeat;
    width: 167px;
    height: 52px;
    position: absolute;
    left: 57px;
    top: 118px;
    -webkit-animation: fade-in 3s infinite linear;
    animation: fade-in 3s infinite linear;
  }
  .circle_box {
    transform: rotateX(77deg);
    position: absolute;
    left: 19px;
    top: 86px;
    .outcircle {
      background: url("../../assets/img/Common/staticItem/outcircle.png")
        no-repeat;
      width: 260px;
      height: 260px;
      -webkit-animation: rotate-in-center 2s infinite linear;
      animation: rotate-in-center 2s infinite linear;
      position: absolute;
      left: 0px;
      top: 0px;
    }
    .incircle {
      background: url("../../assets/img/Common/staticItem/incircle.png")
        no-repeat;
      width: 186px;
      height: 186px;
      -webkit-animation: rotate-in-center 2s infinite linear reverse;
      animation: rotate-in-center 2s infinite linear reverse;
      position: absolute;
      left: 35px;
      top: 34px;
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

@-webkit-keyframes fade-in {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes fade-in {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>