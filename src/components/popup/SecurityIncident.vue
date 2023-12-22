<template>
  <div class="SecurityIncident">
    <div class="close" @click="closePanel"></div>
    <div class="SecurityIncident_top">
      <span></span>
      <span>Security Incident</span>
    </div>
    <div class="SecurityIncident_Bottom">
      <div>
        <span>Accident description</span>
        <span>{{data.Information}}</span>
      </div>
      <div>
        <span>Accident Location</span>
        <span>{{data.Accident}}</span>
      </div>
      <div>
        <span>Occurrence time</span>
        <span>{{data.time}}</span>
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
.SecurityIncident {
  width: 470px;
  height: 140px;
  background: url("../../assets/img/popupIMG/SecurityIncidentbj.png") no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 0px;
  position: relative;
  .close {
    position: absolute;
    top: 12px;
    right: 12px;
    width: 22px;
    height: 22px;
    background: url("../../assets/img/popupIMG/clonse.png") no-repeat;
    background-size: 100% 100%;
  }
  .SecurityIncident_top {
    width: 320px;
    height: 35px;
    display: flex;
    line-height: 68px;
    margin-left: 45px;
    span {
      display: inline-block;
    }
    span:nth-child(1) {
      width: 25px;
      height: 25px;
      background: url("../../assets/img/popupIMG/lcon10.png") no-repeat;
      background-size: 100% 100%;
      margin-top: 16px;
      margin-left: -32px;

    }
    span:nth-child(2) {
      font-size: 20px;
      font-family: "Helvetica";
      font-weight: Bold;
      color: #fff;
      width: 380px;
      margin-left:7px;
      margin-top: -8px;
    }
  }
  .SecurityIncident_Bottom {
    width: 444px;
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
        width: 250px;
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
