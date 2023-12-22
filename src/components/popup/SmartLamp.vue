<template>
  <div class="SmartLamp">
    <div class="SmartLamp_Box">
      <div class="close" @click="closePanel"></div>
      <div class="SmartLamp_Box_top">
        <span></span>
        <span>Smart Lamp Pole</span>
        <span @click="openVideo"></span>
        <span @click="openAdvertising"></span>
      </div>
      <div class="SmartLamp_Box_Bottom">
        <div>
          <span>Lamp Pole Camera</span>
          <span>{{ data.LampPoleCamera }}</span>
        </div>
        <div>
          <span>Lamp (Brightness, Switch)</span>
          <span>{{ data.Lamp }}</span>
        </div>
        <div>
          <span>Sensor-Temperature</span>
          <span>{{ data.SensorTemperature }}</span>
        </div>
        <div>
          <span>Sensor-Thumidity</span>
          <span>{{ data.SensorThumidity }}</span>
        </div>
        <div>
          <span>Sensor-Noise</span>
          <span>{{ data.SensorNoise }}</span>
        </div>
        <div>
          <span>Sensor-Pm2.5</span>
          <span>{{ data.SensorPm }}</span>
        </div>
        <div>
          <span>Advertisement Display Content</span>
          <span>{{ data.AdvertisementDispla }}</span>
        </div>
        <div>
          <span>Area (Color, Area Type)</span>
          <span>{{ data.Area }}</span>
        </div>
      </div>
    </div>
    <!-- Video Popup -->
    <div class="SmartLamp_Video" v-show="videoFlage">
      <video class="video1" v-if="video1Show" autoplay src="../../../public/video/04.mp4"></video>
      <video class="video2" v-if="video2Show" autoplay src="../../../public/video/04.mp4"></video>
      <video class="video3" v-if="video3Show" autoplay src="../../../public/video/04.mp4"></video>
      <!-- <div class="close_Video" @click="closePanel_Video"></div> -->
      <!-- <div class="videoBox"> -->

      <!-- <video class="video2" :style="video2Style" autoplay src="../../../public/video/04.mp4"></video>
        <video class="video3" :style="video3Style" autoplay src="../../../public/video/04.mp4"></video> -->
      <!-- </div> -->
    </div>
    <!-- Advertising pop-up -->
    <div class="SmartLamp_Advertising" v-show="advertising">
      <div class="close_Advertising" @click="close_Advertising"></div>
      <div class="SmartLamp_Advertising_top">Advertisement</div>
      <div class="SmartLamp_Advertising_Bottom">
        xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SmartLamp",
  data() {
    return {
      videoFlage: false,
      advertising: false,
      ModelId: '',
      video1Show: false,
      video2Show: false,
      video3Show: false,

    };
  },
  props: ["id", "data", "videoList"],
  mounted() {
    this.ModelId = this.id;
    this.videoList = Math.ceil(Math.random() * 3);
  },
  methods: {
    closePanel() {
      let that = this;
      window.appInstance.uniCall("removeOverlayTip", { overlayType: "landmarkLayer" });
      window.appInstance.uniCall("removeModelTip", { id: that.id });
      window.appInstance.uniCall("clearModelSelected", {});
      window.appInstance.uniCall('clearOverlaySelected', {});
      window.gisManager.camera.setCamera();
    },
    closePanel_Video() {
      this.videoFlage = false;
    },
    close_Advertising() {
      this.advertising = false;
    },
    openVideo() {
      this.advertising = false;
      this.videoFlage = !this.videoFlage;
      if (this.videoFlage) {
        this.setVideo();
      }
      else {
        this.closeVideo();
      }
    },
    openAdvertising() {
      this.closeVideo();
      this.videoFlage = false;
      this.advertising = !this.advertising;
    },
    setVideo() {
      if (this.videoList == 1) {
        this.video1Show = true;
      }
      else if (this.videoList == 2) {
        this.video1Show = true;
        this.video2Show = true;
      }
      else if (this.videoList == 3) {
        this.video1Show = true;
        this.video2Show = true;
        this.video3Show = true;
      }
    },
    closeVideo() {
      this.video1Show = false;
      this.video2Show = false;
      this.video3Show = false;
    }
  },
};
</script>

<style lang="less" scoped>
.SmartLamp {
  width: 785px;
  height: 390px;

  .SmartLamp_Box {
    width: 470px;
    height: 253px;
    background: url("../../assets/img/popupIMG/biaopaiBJ.png") no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: 0px;
    position: relative;

    .close {
      position: absolute;
      top: 14px;
      right: 11px;
      width: 14px;
      height: 14px;
      background: url("../../assets/img/popupIMG/clonse.png") no-repeat;
      background-size: 100% 100%;
    }

    .SmartLamp_Box_top {
      width: 426px;
      height: 35px;
      display: flex;
      line-height: 45px;
      margin-left: 17px;

      span {
        display: inline-block;
      }

      span:nth-child(1) {
        width: 45px;
        height: 50px;
        background: url("../../assets/img/popupIMG/Icon1.png") no-repeat;
        background-size: 100% 100%;
        margin-top: 5px;
        margin-left: -12px;
      }

      span:nth-child(2) {
        font-size: 20px;
        font-family: "Helvetica";
        font-weight: Bold;
        color: #fff;
        width: 345px;
      }

      span:nth-child(3) {
        width: 20px;
        height: 20px;
        background: url("../../assets/img/popupIMG/SheXiangTouIcon.png") no-repeat;
        background-size: 100% 100%;
        margin-top: 10px;
      }

      span:nth-child(4) {
        width: 20px;
        height: 20px;
        background: url("../../assets/img/popupIMG/GuangGaoIcon.png") no-repeat;
        background-size: 100% 100%;
        margin: 10px 0 0 5px;
      }
    }

    .SmartLamp_Box_Bottom {
      width: 445px;
      height: 205px;
      margin: 10px 0 0 15px;

      >div {
        width: 100%;
        height: 25px;
        display: flex;
        margin-bottom: 1px;
        line-height: 25px;
        box-sizing: border-box;

        span {
          display: inline-block;
        }

        span:nth-child(1) {
          width: 235px;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.6);
          font-size: 16px;
          font-family: "Helvetica";
          color: #bfebff;
          padding-left: 6px;
        }

        span:nth-child(2) {
          width: 210px;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.3);
          margin-left: 2px;
          font-size: 16px;
          font-family: "Helvetica";
          color: #fff;
          padding-left: 6px;
        }
      }
    }
  }

  .SmartLamp_Video {
    width: 289px;
    height: 162px;
    // border: 1px solid #26ffff;
    position: absolute;
    top: 0px;
    // right: 20px;

    .close_Video {
      position: absolute;
      top: 14px;
      right: 11px;
      width: 15px;
      height: 15px;
      background: url("../../assets/img/popupIMG/clonse.png") no-repeat;
      background-size: 100% 100%;
      z-index: 9;
    }

    .video1 {
      width: 471px;
      height: 249px;
      position: absolute;
      left: 472px;
    }

    .video2 {
      width: 471px;
      height: 249px;
      position: absolute;
      left: 945px;
    }

    .video3 {
      width: 471px;
      height: 249px;
      position: absolute;
      left: 472px;
      top:256px;
    }

    video {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .SmartLamp_Advertising {
    width: 300px;
    height: 200px;
    background: url("../../assets/img/popupIMG/GuangGaoBJ.png") no-repeat;
    position: absolute;
    top: 0px;
    left: -300px;
    overflow: hidden;

    .close_Advertising {
      position: absolute;
      top: 14px;
      right: 11px;
      width: 15px;
      height: 15px;
      background: url("../../assets/img/popupIMG/clonse.png") no-repeat;
      background-size: 100% 100%;
    }

    .SmartLamp_Advertising_top {
      width: 240px;
      height: 20px;
      line-height: 20px;
      margin: 12px 0 0 25px;
      font-size: 16px;
      font-family: "Helvetica";
      color: #bfebff;
    }

    .SmartLamp_Advertising_Bottom {
      width: 245px;
      height: 130px;
      margin: 7px 0 0 11px;
      padding: 11px 15px;
      font-size: 16px;
      font-family: "Helvetica";
      color: #fff;
      overflow: hidden;
      word-wrap: break-word;
      text-indent: 16px;
    }
  }
}
</style>
