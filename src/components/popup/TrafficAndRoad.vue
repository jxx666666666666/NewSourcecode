<template>
  <div class="TrafficAndRoad_Box">
    <div class="close"
         @click="closePanel"></div>
    <div class="TrafficAndRoad_Box_top">
      <span>Traffic And Road</span>
    </div>
    <div class="TrafficAndRoad_Box_Bottom">
      <div>
        <span>Road Name</span>
        <span>{{ data.Road }}</span>
      </div>
      <div>
        <span>Congestion Level</span>
        <span>{{ data.Level }}</span>
      </div>
      <div>
        <span>Congestion Length</span>
        <span>{{ data.Length }}</span>
      </div>
      <div>
        <span>Average Daily Traffic Volume</span>
        <span>{{ data.Volume }}</span>
      </div>
      <div>
        <span>Congestion Rate</span>
        <span>{{ data.Congestion }}</span>
      </div>
      <div>
        <span>Congestion Status</span>
        <span>{{ data.Status }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TrafficAndRoad",
  props: ["id", "data"],
  mounted () {
    console.log(this.data);
  },
  methods: {
    closePanel () {
      let that = this;
      window.appInstance.uniCall("removeOverlayTip", {
        id: that.data.id,
        overlayType: "path",
      });
      window.appInstance.uniCall('clearOverlaySelected', {});
      window.gisManager.camera.setCamera();
    },
  },
};
</script>

<style lang="less" scoped>
.TrafficAndRoad_Box {
  width: 660px;
  height: 355px;
  background: url("../../assets/img/popupIMG/Economy.png") no-repeat;
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
  .TrafficAndRoad_Box_top {
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
      margin-left: -20px;
      margin-top: 10px;
    }
  }
  .TrafficAndRoad_Box_Bottom {
    width: 630px;
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
        width: 320px;
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
