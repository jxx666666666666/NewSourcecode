<template>
  <div class="KeyProject">
    <div class="close" @click="closePanel"></div>
    <div class="KeyProject_top">
      <span></span>
      <span>Key Project</span>
    </div>
    <div class="KeyProject_Bottom">
      <div>
        <span>Project Name</span>
        <span>{{data.Name}}</span>
      </div>
      <div>
        <span>Commencement Time</span>
        <span>{{data.Commencement}}</span>
      </div>
      <div>
        <span>End Time</span>
        <span>{{data.End}}</span>
      </div>
      <div>
        <span>Lnvestment Amount And</span>
        <span>{{data.Lnvestment}}</span>
      </div>
      <div>
        <span>Project Brief Description</span>
        <span>{{data.Description}}</span>
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
.KeyProject {
  width: 470px;
  height: 190px;
  background: url("../../assets/img/popupIMG/KeyProjectBKJ.png") no-repeat;
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
  .KeyProject_top {
    width: 320px;
    height: 35px;
    display: flex;
    line-height: 68px;
    margin-left: 45px;
    span {
      display: inline-block;
    }
    span:nth-child(1) {
      width: 45px;
      height: 40px;
      background: url("../../assets/img/popupIMG/lcon6.png") no-repeat;
      background-size: 100% 100%;
      margin-top: 11px;
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
  .KeyProject_Bottom {
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
