<template>
  <div class="RescueTeam_Box">
    <div class="close"
         @click="closePanel"></div>
    <div class="RescueTeam_Box_top">
      <span>Rescue Team</span>
    </div>
    <div class="RescueTeam_Box_Bottom">
      <div>
        <span>Team Name</span>
        <span>{{ data.Team }}</span>
      </div>
      <div>
        <span>Number Of People</span>
        <span>{{ data.Number }}</span>
      </div>
      <div>
        <span>Full-time Number</span>
        <span>{{ data.Full }}</span>
      </div>
      <div>
        <span>Part-time Number</span>
        <span>{{ data.Part }}</span>
      </div>
      <div>
        <span>Person In Charge</span>
        <span>{{ data.Person }}</span>
      </div>
      <div>
        <span>Position</span>
        <span>{{ data.Position }}</span>
      </div>
      <div>
        <span>Main Functions</span>
        <span>{{ data.Functions }}</span>
      </div>
      <div>
        <span>Main Equipment And Members</span>
        <span>{{ data.Equipment }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RescueTeam",
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
.RescueTeam_Box {
  width: 680px;
  height: 455px;
  background: url("../../../assets/img/popupIMG/RescueTeam.png") no-repeat;
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
  .RescueTeam_Box_top {
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
  .RescueTeam_Box_Bottom {
    width: 650px;
    height: 370px;
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
