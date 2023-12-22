<template>
  <div class="gisbtns">
    <div class="reset" @click="reset"></div>
    <div :class="rotateStatus ? 'rotate_ac' : 'rotate'" @click="rotateCamera"></div>
    <div :class="changjingStatus ? 'roaming_ac' : 'roaming'" @click="roaming"></div>
    <div class="back" v-if="ztqh || CompRoom" @click="back"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "GisBtn",
  props: {
    ztqh: { type: Boolean, default: false },
    CompRoom: { type: Boolean, default: false }
  },
  computed: {
    ...mapState(["rotateStatus", "changjingStatus"]),
  },
  methods: {
    rotateCamera () {
      console.log(!this.rotateStatus);
      this.$store.commit("setRotate", !this.rotateStatus);
    },
    reset () {
      window.gisManager.camera.setCamera({
        centerCoord: [37.185558, -1.691673],
        coordType: 0,
        coordTypeZ: 0,
        coordZ: 0,
        distance: 1223,
        heading: 201,
        pitch: 12,
        fly: true,
        duration: 1,
      })
      // window.gisManager.camera.setCameraByName(
      //   window.currentLayer.defaultView.cameraName
      // );
    },
    roaming () {
      this.$store.commit("setChangJingStatus", !this.changjingStatus);
      // let points = [
      //   {
      //     coord: [37.181446, -1.686699],
      //     coordZ: 4,
      //     distance: 30,
      //     pitch: 5,
      //     yaw: 163,
      //     speed: 20,
      //   },
      //   {
      //     coord: [37.181587, -1.687317],
      //     coordZ: 3,
      //     distance: 30,
      //     pitch: 5,
      //     yaw: 163,
      //     speed: 20,
      //   },
      //   {
      //     coord: [37.181931, -1.688972],
      //     coordZ: 3,
      //     distance: 30,
      //     pitch: 5,
      //     yaw: 163,
      //     speed: 20,
      //   },
      //   {
      //     coord: [37.181946, -1.688965],
      //     coordZ: 3,
      //     distance: 30,
      //     pitch: 5,
      //     yaw: 247,
      //     speed: 20,
      //   },
      //   {
      //     coord: [37.181946, -1.688965],
      //     coordZ: 3,
      //     distance: 30,
      //     pitch: 5,
      //     yaw: 247,
      //     speed: 20,
      //   },
      //   {
      //     coord: [37.180668, -1.689224],
      //     coordZ: 3,
      //     distance: 30,
      //     pitch: 5,
      //     yaw: 247,
      //     speed: 20,
      //   },
      //   {
      //     coord: [37.179436, -1.689484],
      //     coordZ: 3,
      //     distance: 30,
      //     pitch: 6,
      //     yaw: 247,
      //     speed: 20,
      //   },
      // ];
      // window.gisManager.camera.roamingCamera(points);
    },
    back () {
      window.appInstance.uniCall("switchScene", {
        name: "KNY",
        duration: 0
      });

      this.$eventBus.$emit('SmartSelected', false);
      this.$eventBus.$emit('CompRoom', false)
    }
  },
};
</script>

<style lang="less" scoped>
.gisbtns {
  width: 300px;
  display: flex;
  justify-content: space-between;
  height: 64px;
  pointer-events: all;

  .reset {
    width: 64px;
    height: 64px;
    background-image: url(../../assets/img/layout/reset.png);
  }

  .reset:hover {
    width: 64px;
    height: 64px;
    background-image: url(../../assets/img/layout/reset1.png);
  }

  .rotate {
    width: 64px;
    height: 64px;
    background-image: url(../../assets/img/layout/rotate.png);
  }

  .rotate_ac {
    width: 64px;
    height: 64px;
    background-image: url(../../assets/img/layout/rotate1.png);
  }

  .roaming {
    width: 64px;
    height: 64px;
    background-image: url(../../assets/img/layout/roaming.png);
  }

  .roaming_ac {
    width: 64px;
    height: 64px;
    background-image: url(../../assets/img/layout/roaming_selected.png);
  }

  .back {
    width: 64px;
    height: 64px;
    background-image: url(../../assets/img/layout/back.png);
  }
}
</style>
