<template>
  <div class="surveillanceBox">
    <div class="title">
      <span>NO.1</span>
      <span>Video Surveillance Properties</span>
    </div>
    <div class="contentBox">
      <div class="boxList" v-for="(item, index) in surveillanceData" :key="index">
        <div class="NameBox">
          <img src="../img/threePoint.png" alt="" />
          <span>Name</span>
          <span :title="item.name">{{ item.name }}</span>
        </div>
        <div class="TypeBox">
          <img src="../img/threePoint.png" alt="" />
          <span>Type</span>
          <span :title="item.type">{{ item.type }}</span>
        </div>
        <div class="carme" @click="OpenCamrea(index + 1)">
          <img v-if="currentIndex != index + 1" src="../img/carame.png" alt="" />
          <img v-if="currentIndex == index + 1" src="../img/carameyellow.png" alt="" />
        </div>
      </div>
    </div>
    <!-- <div class="camera">
      <div
        class="camera1"
        @click="OpenCamrea(1)"
        :class="currentPanelType == 'camera1' ? 'active' : ''"
      ></div>
      <div
        class="camera2"
        @click="OpenCamrea(2)"
        :class="currentPanelType == 'camera2' ? 'active' : ''"
      ></div>
      <div
        class="camera3"
        @click="OpenCamrea(3)"
        :class="currentPanelType == 'camera3' ? 'active' : ''"
      ></div>
      <div
        class="camera4"
        @click="OpenCamrea(4)"
        :class="currentPanelType == 'camera4' ? 'active' : ''"
      ></div>
    </div> -->
  </div>
</template>

<script>
import { mapState } from "vuex";
import LightScene from "../../../utils/other/LightScene";
export default {
  computed: {
    ...mapState(["cameraIndex"]),
  },
  props: {
    surveillanceData: {
      type: Array,
      default: () => {
        return [
          { name: "NumberOne Camera", type: "Dome Camera" },
          { name: "NumberTow Camera", type: "Dome Camera" },
          { name: "NumberThree Camera", type: "Dome Camera" },
          { name: "NumberFour Camera", type: "Dome Camera" },
        ];
      },
    },
  },
  data () {
    return {
      currentPanelType: "",
      currentIndex: -1,
    };
  },
  mounted () {
    let that = this;
    this.$eventBus.$on("closePanel", (res) => {
      that.currentPanelType = "";
    });
  },
  watch: {
    cameraIndex: {
      handler (val) {
        this.currentIndex = val;
      },
    },
  },
  methods: {
    OpenCamrea (type) {
      this.$store.commit("cameraIndex", type);
      let modelId = "";
      if (type == 1) {
        this.$eventBus.$emit("showPanel", "dome_camrea");
        modelId = "SphericalCameraa";
        this.currentPanelType = "camera1";
      } else if (type == 2) {
        this.$eventBus.$emit("showPanel", "bullet_camrea");
        modelId = "GunTypeCamera_A";
        this.currentPanelType = "camera2";
      } else if (type == 3) {
        this.$eventBus.$emit("showPanel", "bullet_camrea");
        modelId = "GunTypeCamera_B";
        this.currentPanelType = "camera3";
      } else if (type == 4) {
        this.$eventBus.$emit("showPanel", "bullet_camrea");
        modelId = "GunTypeCamera_C";
        this.currentPanelType = "camera4";
      }

      //this.blinkingModel(modelId);
      // this.blinkingModel(id + "_A");
      LightScene.blinkingModel(modelId);
    },
  },
};
</script>

<style lang="less" scoped>
.camera {
  border: 1px solid red;
}

.surveillanceBox {
  width: 100%;
  height: 100%;
  background: url("../img/surveillance.png") no-repeat center center;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  .contentBox {
    width: 97%;
    margin-top: 44px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .boxList {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin: 24px 0;

      .NameBox {
        width: 35%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        position: relative;
        left: 20px;

        img {
          width: 12px;
          height: 20px;
        }

        span:nth-of-type(1) {
          font-family: "Helvetica";
          font-size: 28px;
          color: #fff;
          margin: 0px 30px 0px 20px;
        }

        span:nth-of-type(2) {
          font-family: "Helvetica";
          font-size: 30px;
          color: #64f8fd;
          width: 170px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
      }

      .carme {
        width: 34px;
        height: 34px;
        pointer-events: all;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        left: 138px;

        img {
          height: 100%;
          width: 100%;
        }
      }

      .TypeBox {
        width: 35%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-left: 80px;

        img {
          width: 12px;
          height: 20px;
        }

        span:nth-of-type(1) {
          font-family: "Helvetica";
          font-size: 28px;
          color: #fff;
          margin: 0px 30px 0px 20px;
        }

        span:nth-of-type(2) {
          font-family: "Helvetica";
          font-size: 30px;
          color: #64f8fd;
          width: 250px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
      }
    }
  }

  .title {
    width: 97%;
    margin-top: 15px;

    span:nth-of-type(1) {
      font-size: 28px;
      color: #fff;
      text-shadow: 0px 4px 40px #8bc2f9;
    }

    span:nth-of-type(2) {
      font-family: "Helvetica";
      font-size: 32px;
      font-weight: bold;
      color: #fff;
      text-shadow: 0px 4px 40px #8bc2f9;
      position: relative;
      left: 20px;
      font-style: italic;
    }
  }
}
</style>