<template>
  <div class="Shelter">
    <div class="close" @click="closePanel"></div>
    <div class="Shelter_top">
      <span></span>
      <span>Shelter</span>
    </div>
    <div class="Shelter_Bottom">
      <div>
        <span>Site Area</span>
        <span>{{data.Area}}</span>
      </div>
      <div>
        <span>Equipment and Materials</span>
        <span>{{data.Materials}}</span>
      </div>
      <div>
        <span>Site Functions</span>
        <span>{{data.Functions}}</span>
      </div>
      <div>
        <span>Location</span>
        <span>{{data.Location}}</span>
      </div>
      <div>
        <span>Name of Responsible Person</span>
        <span>{{data.Person}}</span>
      </div>
      <div>
        <span>Telephone Number</span>
        <span>{{data.Number}}</span>
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
.Shelter {
  width: 470px;
  height: 215px;
  background: url("../../assets/img/popupIMG/Shelterbj.png") no-repeat;
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
  .Shelter_top {
    width: 320px;
    height: 35px;
    display: flex;
    line-height: 68px;
    margin-left: 45px;
    span {
      display: inline-block;
    }
    span:nth-child(1) {
      width: 30px;
      height: 30px;
      background: url("../../assets/img/popupIMG/lcon5.png") no-repeat;
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
  .Shelter_Bottom {
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
