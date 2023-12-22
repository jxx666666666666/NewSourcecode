<template>
  <div class="PoliceSituation_Box">
    <div class="close" @click="closePanel"></div>
    <div class="PoliceSituation_Box_top">
      <span></span>
      <span>Police Situation</span>
    </div>
    <div class="PoliceSituation_Box_Bottom">
      <div>
        <span>Brief description of the incident</span>
        <span>{{data.Incident}}</span>
      </div>
      <div>
        <span>Incident location</span>
        <span>{{data.location}}</span>
      </div>
      <div>
        <span>Occurrence time</span>
        <span>{{data.time}}</span>
      </div>
      <div>
        <span>Informant</span>
        <span>{{data.Informant}}</span>
      </div>
      <div>
        <span>Contact</span>
        <span>{{data.Contact}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PoliceSituation",
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
.PoliceSituation_Box {
  width: 490px;
  height: 190px;
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
  .PoliceSituation_Box_top {
    width: 320px;
    height: 35px;
    display: flex;
    line-height: 68px;
    margin-left: 45px;
    span {
      display: inline-block;
    }
    span:nth-child(1) {
      width: 28px;
      height: 22px;
      background: url("../../assets/img/popupIMG/lcon11.png") no-repeat;
      background-size: 100% 100%;
      margin-top: 20px;
      margin-left: -27px;
    }
    span:nth-child(2) {
      font-size: 20px;
      font-family: "Helvetica";
      font-weight: Bold;
      color: #fff;
      width: 380px;
      margin-left: 12px;
    }
  }
  .PoliceSituation_Box_Bottom {
    width: 470px;
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
        width: 220px;
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
