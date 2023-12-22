<template>
  <div class="PublicSecuritySituation_Box">
    <div class="close"
         @click="closePanel"></div>
    <div class="PublicSecuritySituation_Box_top">
      <span>Police Information Point</span>
    </div>
    <div class="PublicSecuritySituation_Box_Bottom">
      <div>
        <span>Event title</span>
        <span>{{ data.title }}</span>
      </div>
      <div>
        <span>ID</span>
        <span>{{ data.ID }}</span>
      </div>
      <div>
        <span>Source</span>
        <span>{{ data.Source }}</span>
      </div>
      <div>
        <span>Category</span>
        <span>{{ data.Category }}</span>
      </div>
      <div>
        <span>Status</span>
        <span>{{ data.Status }}</span>
      </div>
      <div>
        <span>Creation Time</span>
        <span>{{ data.CreationTime }}</span>
      </div>
      <div>
        <span>Details</span>
        <span>{{ data.Details }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PublicSecuritySituation",
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
.PublicSecuritySituation_Box {
  width: 515px;
  height: 400px;
  background: url("../../assets/img/popupIMG/PublicSecuritySituationBJ.png")
    no-repeat;
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
  .PublicSecuritySituation_Box_top {
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
  .PublicSecuritySituation_Box_Bottom {
    width: 480px;
    height: 330px;
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
        width: 170px;
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
