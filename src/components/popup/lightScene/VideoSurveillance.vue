<template>
  <div class="video_surveillance_box">
    <div class="close"
         @click="closePanel"></div>
  </div>
</template>

<script>
export default {
  methods: {
    closePanel () {
      window.appInstance.uniCall('removeModelTip', { id: '' }, res => { });
    }
  }
}
</script >

<style lang="less" scoped>
.video_surveillance_box {
  background: url("../../../assets/img/popupIMG/VideoSurveillanceProperties.png")
    no-repeat;
  width: 450px;
  height: 184px;
  pointer-events: none;
  -webkit-animation: scale-in-bl 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation: scale-in-bl 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  .close {
    width: 20px;
    height: 20px;
    background: transparent;
    position: absolute;
    right: 3px;
    top: 3px;
    pointer-events: all;
  }
}

@-webkit-keyframes scale-in-bl {
  0% {
    -webkit-transform: scale(0);
    transform: scale(0);
    -webkit-transform-origin: 0% 100%;
    transform-origin: 0% 100%;
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-transform-origin: 0% 100%;
    transform-origin: 0% 100%;
    opacity: 1;
  }
}
@keyframes scale-in-bl {
  0% {
    -webkit-transform: scale(0);
    transform: scale(0);
    -webkit-transform-origin: 0% 100%;
    transform-origin: 0% 100%;
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-transform-origin: 0% 100%;
    transform-origin: 0% 100%;
    opacity: 1;
  }
}
</style>