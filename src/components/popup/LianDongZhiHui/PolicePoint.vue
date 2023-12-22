<template>
  <div class="PolicePoint_Box">
    <div class="close"
         @click="closePanel"></div>
    <div class="PolicePoint_Box_top">
      <span>Medical Staff</span>
    </div>
    <div class="PolicePoint_Box_Bottom">
      <div>
        <span>Name</span>
        <span>{{ data.Name }}</span>
      </div>
      <div>
        <span>Gender</span>
        <span>{{ data.Gender }}</span>
      </div>
      <div>
        <span>Employee ID</span>
        <span>{{ data.Employee }}</span>
      </div>
      <div>
        <span>Belonging Unit</span>
        <span>{{ data.Belonging }}</span>
      </div>
      <div>
        <span>Contact Information</span>
        <span>{{ data.Information }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PolicePoint",
  props: ["id", "data"],
  mounted () {
    console.log(this.data);
  },
  methods: {
    closePanel () {
      let that = this;
      window.appInstance.uniCall("removeOverlayTip", {
        id: that.data.id,
        overlayType: "trailLayer",
      });
      window.appInstance.uniCall('clearOverlaySelected', {});
      window.gisManager.camera.setCamera();
    },
  },
};
</script>

<style lang="less" scoped>
.PolicePoint_Box {
  width: 590px;
  height: 310px;
  background: url("../../../assets/img/popupIMG/fiveBJ.png") no-repeat;
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
  .PolicePoint_Box_top {
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
  .PolicePoint_Box_Bottom {
    width: 560px;
    height: 230px;
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
        width: 250px;
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
