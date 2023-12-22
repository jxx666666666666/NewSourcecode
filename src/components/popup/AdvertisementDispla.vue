<template>
  <div class="AdvertisementDispla_Box">
    <div class="close" @click="closePanel"></div>
    <div class="AdvertisementDispla_top">
      <span></span>
      <span>Advertisement Display</span>
    </div>
    <div class="AdvertisementDispla_Bottom">
      <div>
        <span>Current Program (Video Stream)</span>
        <span>{{data.Current}}</span>
      </div>
      <div>
        <span>Screenshot</span>
        <span>{{data.Screenshot}}</span>
      </div>
      <div>
        <span>Online Status</span>
        <span>{{data.Online}}</span>
      </div>
      <div>
        <span>And Switch</span>
        <span>{{data.Switch}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SmartLamp",
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
.AdvertisementDispla_Box {
  width: 470px;
  height: 158px;
  background: url("../../assets/img/popupIMG/ShiPingBJBP.png") no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 0px;
  position: relative;
  .close {
    position: absolute;
    top: 21px;
    right: 10px;
    width: 14px;
    height: 14px;
    background: url("../../assets/img/popupIMG/clonse.png") no-repeat;
    background-size: 100% 100%;
  }
  .AdvertisementDispla_top {
    width: 320px;
    height: 35px;
    display: flex;
    line-height: 52px;
    margin-left: 45px;
    span {
      display: inline-block;
    }
    span:nth-child(1) {
      width: 49px;
      height: 49px;
      background: url("../../assets/img/popupIMG/Icon4.png") no-repeat;
      background-size: 100% 100%;
      margin-top: 12px;
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
  .AdvertisementDispla_Bottom {
    width: 445px;
    height: 105px;
    margin: 10px 0 0 15px;
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
}
</style>
