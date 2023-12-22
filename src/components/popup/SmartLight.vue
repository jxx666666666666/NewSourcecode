<template>
  <div class="SmartLight_Box">
    <div class="close" @click="closePanel"></div>
    <div class="SmartLight_Box_top">
      <span></span>
      <span>Smart Light Pole Weather Sensor</span>
    </div>
    <div class="SmartLight_Box_Bottom">
      <div>
        <span>Temperature</span>
        <span>{{data.Temperature}}</span>
      </div>
      <div>
        <span>Humidity</span>
        <span>{{data.Humidity}}</span>
      </div>
      <div>
        <span>Noise</span>
        <span>{{data.Noise}}</span>
      </div>
      <div>
        <span>Pm</span>
        <span>{{data.Pm}}</span>
      </div>
      <div>
        <span>Lamp Pole Number</span>
        <span>{{data.LampPoleNumber}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SmartLight",
  props: ["id", "data"],
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
.SmartLight_Box {
  width: 440px;
  height: 188px;
  background: url("../../assets/img/popupIMG/ShiPingBJBP.png") no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 0px;
  position: relative;
  .close {
    position: absolute;
    top: 20px;
    right: 12px;
    width: 20px;
    height: 20px;
    background: url("../../assets/img/popupIMG/clonse.png") no-repeat;
    background-size: 100% 100%;
  }
  .SmartLight_Box_top {
    width: 320px;
    height: 35px;
    display: flex;
    line-height: 68px;
    margin-left: 45px;
    span {
      display: inline-block;
    }
    span:nth-child(1) {
      width: 49px;
      height: 49px;
      background: url("../../assets/img/popupIMG/Icon2.png") no-repeat;
      background-size: 100% 100%;
      margin-top: 18px;
      margin-left: -40px;
    }
    span:nth-child(2) {
      font-size: 20px;
      font-family: "Helvetica";
      font-weight: Bold;
      color: #fff;
      width: 380px;
    }
  }
  .SmartLight_Box_Bottom {
    width: 415px;
    height: 130px;
    margin: 18px 0 0 15px;
    > div {
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
        width: 182px;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6);
        font-size: 16px;
        font-family: "Helvetica";
        color: #bfebff;
        padding-left: 6px;
      }
      span:nth-child(2) {
        width: 227px;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.3);
        margin-left: 2px;
        margin-left: 2px;
        font-size: 16px;
        font-family: "Helvetica";
        color: #fff;
        padding-left: 6px;
      }
    }
  }
}
</style>
