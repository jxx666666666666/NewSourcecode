<template>
  <div class="lightscene_box">
    <div class="video_surveillance"></div>
    <div class="video_surveillance1"></div>
    <div class="video_surveillance2"></div>
    <div class="smart_pole"></div>
    <div class="digihail_signage"
         v-if="showDigihail"></div>
    <div class="other_moudel"></div>
  </div>
</template>

<script>
export default {
  props: {
    showDigihail: false
  }
}
</script>

<style lang="less" scoped>
.lightscene_box {
  animation: fade-in 4s linear;
  .video_surveillance {
    background: url("../../../assets/img/popupIMG/lightscene/video_surveillance.fw.png")
      no-repeat;
    width: 606px;
    height: 361px;
    position: absolute;
    left: 3193px;
    top: 226px;
    -webkit-animation: scale-up-br 0.4s 2.3s cubic-bezier(0.39, 0.575, 0.565, 1)
      both;
    animation: scale-up-br 0.4s 2.3s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  }
  .video_surveillance1 {
    background: url("../../../assets/img/popupIMG/lightscene/video_surveillance1.fw.png")
      no-repeat;
    width: 590px;
    height: 162px;
    position: absolute;
    left: 3183px;
    top: 423px;
    -webkit-animation: scale-up-br 0.4s 2.6s cubic-bezier(0.39, 0.575, 0.565, 1)
      both;
    animation: scale-up-br 0.4s 2.6s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  }
  .video_surveillance2 {
    background: url("../../../assets/img/popupIMG/lightscene/video_surveillance2.fw.png")
      no-repeat;
    width: 495px;
    height: 184px;
    position: absolute;
    left: 3237px;
    top: 605px;
    -webkit-animation: scale-up-tr 0.4s 2.9s cubic-bezier(0.39, 0.575, 0.565, 1)
      both;
    animation: scale-up-tr 0.4s 2.9s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  }
  .smart_pole {
    background: url("../../../assets/img/popupIMG/lightscene/smart_pole.fw.png")
      no-repeat;
    width: 590px;
    height: 268px;
    position: absolute;
    left: 3833px;
    top: 293px;
    -webkit-animation: scale-up-bl 0.4s 3.2s cubic-bezier(0.39, 0.575, 0.565, 1)
      both;
    animation: scale-up-bl 0.4s 3.2s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  }
  .digihail_signage {
    background: url("../../../assets/img/popupIMG/lightscene/digihail_signage.fw.png")
      no-repeat;
    width: 694px;
    height: 134px;
    position: absolute;
    left: 3868px;
    top: 558px;
  }
  .other_moudel {
    background: url("../../../assets/img/popupIMG/lightscene/other_moudel.fw.png")
      no-repeat;
    width: 580px;
    height: 337px;
    position: absolute;
    left: 3823px;
    top: 641px;
    -webkit-animation: scale-up-tl 0.4s 3.8s cubic-bezier(0.39, 0.575, 0.565, 1)
      both;
    animation: scale-up-tl 0.4s 3.8s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  }
}
@-webkit-keyframes scale-up-bl {
  0% {
    -webkit-transform: scale(0);
    transform: scale(0);
    -webkit-transform-origin: 0% 100%;
    transform-origin: 0% 100%;
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-transform-origin: 0% 100%;
    transform-origin: 0% 100%;
  }
}
@keyframes scale-up-bl {
  0% {
    -webkit-transform: scale(0);
    transform: scale(0);
    -webkit-transform-origin: 0% 100%;
    transform-origin: 0% 100%;
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-transform-origin: 0% 100%;
    transform-origin: 0% 100%;
  }
}

@-webkit-keyframes scale-up-tl {
  0% {
    -webkit-transform: scale(0);
    transform: scale(0);
    -webkit-transform-origin: 0% 0%;
    transform-origin: 0% 0%;
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-transform-origin: 0% 0%;
    transform-origin: 0% 0%;
  }
}
@keyframes scale-up-tl {
  0% {
    -webkit-transform: scale(0);
    transform: scale(0);
    -webkit-transform-origin: 0% 0%;
    transform-origin: 0% 0%;
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-transform-origin: 0% 0%;
    transform-origin: 0% 0%;
  }
}
@-webkit-keyframes scale-up-tr {
  0% {
    -webkit-transform: scale(0);
    transform: scale(0);
    -webkit-transform-origin: 100% 0%;
    transform-origin: 100% 0%;
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-transform-origin: 100% 0%;
    transform-origin: 100% 0%;
  }
}
@keyframes scale-up-tr {
  0% {
    -webkit-transform: scale(0);
    transform: scale(0);
    -webkit-transform-origin: 100% 0%;
    transform-origin: 100% 0%;
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-transform-origin: 100% 0%;
    transform-origin: 100% 0%;
  }
}
@-webkit-keyframes scale-up-br {
  0% {
    -webkit-transform: scale(0);
    transform: scale(0);
    -webkit-transform-origin: 100% 100%;
    transform-origin: 100% 100%;
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-transform-origin: 100% 100%;
    transform-origin: 100% 100%;
  }
}
@keyframes scale-up-br {
  0% {
    -webkit-transform: scale(0);
    transform: scale(0);
    -webkit-transform-origin: 100% 100%;
    transform-origin: 100% 100%;
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-transform-origin: 100% 100%;
    transform-origin: 100% 100%;
  }
}
@-webkit-keyframes fade-in {
  0% {
    opacity: 0;
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
    opacity: 0;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>