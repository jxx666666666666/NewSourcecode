<template>
  <div class="Shelter_Box">
    <div class="close"
         @click="closePanel"></div>
    <div class="Shelter_Box_top">
      <span>Shelter</span>
    </div>
    <div class="Shelter_Box_Bottom">
      <div>
        <span>Site Area</span>
        <span>{{ data.Area }}</span>
      </div>
      <div>
        <span>Equipment And Materials</span>
        <span>{{ data.Equipment }}</span>
      </div>
      <div>
        <span>Site Functions</span>
        <span>{{ data.Functions }}</span>
      </div>
      <div>
        <span>Location</span>
        <span>{{ data.Location }}</span>
      </div>
      <div>
        <span>Longitude And Latitude</span>
        <span>{{ data.Longitude }}</span>
      </div>
      <div>
        <span>Name Of The Person In Charge</span>
        <span>{{ data.Name }}</span>
      </div>
      <div>
        <span>Phone Number</span>
        <span>{{ data.Number }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Shelter",
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
.Shelter_Box {
  width: 680px;
  height: 400px;
  background: url("../../../assets/img/popupIMG/Shelter.png") no-repeat;
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
  .Shelter_Box_top {
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
  .Shelter_Box_Bottom {
    width: 650px;
    height: 320px;
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
        width: 340px;
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
