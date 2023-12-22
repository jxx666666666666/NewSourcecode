<template>
  <div class="DeviceAlarm_Box">
    <div class="close" @click="closePanel"></div>
    <div class="DeviceAlarm_Box_top">
      <span>Device alarm</span>
    </div>
    <div class="DeviceAlarm_Box_Bottom">
      <div>
        <span>Device Type</span>
        <span>{{ data.DeviceType }}</span>
      </div>
      <div>
        <span>Device Model</span>
        <span>{{ data.DeviceModel }}</span>
      </div>
      <div>
        <span>Device Fault Type</span>
        <span>{{ data.DeviceFaultType }}</span>
      </div>
      <div>
        <span>Fault Occurrence Time</span>
        <span>{{ data.FaultOccurrenceTime }}</span>
      </div>
      <div>
        <span>And Fault Cause</span>
        <span>{{ data.AndFaultCause }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DeviceAlarm",
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
.DeviceAlarm_Box {
  width: 400px;
  height: 180px;
  background: url("../../assets/img/popupIMG/GaoJingBJ.png") no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 0px;
  position: relative;
  .close {
    position: absolute;
    top: 14px;
    right: 11px;
    width: 20px;
    height: 20px;
    background: url("../../assets/img/popupIMG/clonse.png") no-repeat;
    background-size: 100% 100%;
  }
  .DeviceAlarm_Box_top {
    width: 320px;
    height: 35px;
    display: flex;
    line-height: 38px;
    margin-left: 45px;
    span {
      display: inline-block;
    }
    span:nth-child(1) {
      font-size: 20px;
      font-family: "Helvetica";
      font-weight: Bold;
      color: #fceec5;
      width: 345px;
    }
  }
  .DeviceAlarm_Box_Bottom {
    width: 380px;
    height: 205px;
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
        width: 192px;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6);
        font-size: 16px;
        font-family: "Helvetica";
        color: #bfebff;
        padding-left: 6px;
      }
      span:nth-child(2) {
        width: 177px;
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
