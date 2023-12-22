<template>
  <div class="Camera_Box">
    <div class="close" @click="closePanel"></div>
    <div class="Camera_Box_top">
      <span></span>
      <span>Camera Signage</span>
    </div>
    <div class="Camera_Box_Bottom">
      <div>
        <span>Real-time Surveillance Image</span>
        <span>{{ data.Surveillance }}</span>
      </div>
      <div>
        <span v-if="!data.CameraName">Camera ID</span>
        <span v-else>Camera Name</span>
        <span>{{ data.CameraName || data.CameraID }}</span>
      </div>
      <div>
        <span>And Online Status</span>
        <span>{{ data.AndOnlineStatus }}</span>
      </div>
    </div>
    <!-- Video Popup -->
    <div class="Camera_Box_Video">

      <video autoplay src="../../../public/video/04.mp4" v-if="isDebugger"></video>
      <videoIVS :cameraCode="data.CameraID" v-else></videoIVS>
    </div>
  </div>
</template>

<script>
import videoIVS from "../../components/common/VideoIVS.vue";
export default {
  name: "Camera",
  components: {
    videoIVS,
  },
  props: ["id", "data"],
  data() {
    return {
      isDebugger: window.streamingConfig.debugger.PS
    }
  },
  mounted() {
    console.log(this.data);
  },
  methods: {
    closePanel() {
      let that = this;
      window.appInstance.uniCall("removeOverlayTip", {
        id: that.data.id,

        overlayType: "landmarkLayer",
      });
      window.appInstance.uniCall('clearOverlaySelected', {});
      window.gisManager.camera.setCamera();
    },
  },
};
</script>

<style lang="less" scoped>
.Camera_Box {
  width: 470px;
  height: 130px;
  background: url("../../assets/img/popupIMG/ShiPingBJBP.png") no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 0px;
  position: relative;

  .close {
    position: absolute;
    top: 15px;
    right: 11px;
    width: 14px;
    height: 14px;
    background: url("../../assets/img/popupIMG/clonse.png") no-repeat;
    background-size: 100% 100%;
  }

  .Camera_Box_top {
    width: 320px;
    height: 35px;
    display: flex;
    line-height: 42px;
    margin-left: 45px;

    span {
      display: inline-block;
    }

    span:nth-child(1) {
      width: 24px;
      height: 19px;
      background: url("../../assets/img/popupIMG/Icon3.png") no-repeat;
      background-size: 100% 100%;
      margin-top: 13px;
      margin-left: -27px;
    }

    span:nth-child(2) {
      font-size: 20px;
      font-family: "Helvetica";
      font-weight: Bold;
      color: #fff;
      width: 380px;
      margin-left: 10px;
    }
  }

  .Camera_Box_Bottom {
    width: 445px;
    // height: 205px;
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
        width: 224px;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6);
        font-size: 16px;
        font-family: "Helvetica";
        color: #bfebff;
        padding-left: 6px;
      }

      span:nth-child(2) {
        width: 207px;
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

  .Camera_Box_Video {
    width: 468px;
    height: 252px;
    margin-top: 13px;
    border: 2px solid #26ffff;

    video {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
