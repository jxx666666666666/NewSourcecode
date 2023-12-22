<template>
  <div class="EmergencyMaterialWarehouse_Box">
    <div class="close"
         @click="closePanel"></div>
    <div class="EmergencyMaterialWarehouse_Box_top">
      <span>Emergency Material Warehouse</span>
    </div>
    <div class="EmergencyMaterialWarehouse_Box_Bottom">
      <div>
        <span>Personal Protection</span>
        <span>{{ data.Personal }}</span>
      </div>
      <div>
        <span>Medical Assistance</span>
        <span>{{ data.Medical }}</span>
      </div>
      <div>
        <span>Engineering Rescue</span>
        <span>{{ data.Engineering }}</span>
      </div>
      <div>
        <span>Fire Rescue</span>
        <span>{{ data.Fire }}</span>
      </div>
      <div>
        <span>Communications</span>
        <span>{{ data.Communications }}</span>
      </div>
      <div>
        <span>Emergency Lighting</span>
        <span>{{ data.Emergency }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EmergencyMaterialWarehouse",
  props: ["id", "data"],
  mounted () {
    console.log(this.data);
  },
  methods: {
    closePanel () {
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
.EmergencyMaterialWarehouse_Box {
  width: 570px;
  height: 355px;
  background: url("../../../assets/img/popupIMG/Emergency.png") no-repeat;
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
    background: url("../../../assets/img/popupIMG/clonse.png") no-repeat;
    background-size: 100% 100%;
  }
  .EmergencyMaterialWarehouse_Box_top {
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
      color: #fff;
      width: 345px;
      margin-left: -20px;
      margin-top: 10px;
    }
  }
  .EmergencyMaterialWarehouse_Box_Bottom {
    width: 540px;
    height: 275px;
    margin: 25px 0 0 15px;
    display: flex;
    flex-wrap: wrap;
    > div {
      width: 100%;
      height: 40px;
      display: flex;
      box-sizing: border-box;
      line-height: 40px;
      span {
        display: inline-block;
      }
      span:nth-child(1) {
        width: 230px;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6);
        font-size: 22px;
        font-family: "Helvetica";
        color: #bfebff;
        padding-left: 8px;
      }
      span:nth-child(2) {
        width: 300px;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.3);
        margin-left: 2px;
        font-size: 22px;
        font-family: "Helvetica";
        color: #fff;
        padding-left: 6px;
      }
    }
  }
}
</style>
