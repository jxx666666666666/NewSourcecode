<template>
  <div class="plan_botton">
    <div class="botton_item" @click="floorClick()">
      <img :src="'/img/legend/F2AC.png'" v-show="isSelect" />
      <img :src="'/img/legend/F2.png'" v-show="!isSelect" />
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      czjdlist: ['park', 'F3', 'F2', 'F1', 'B1'], //Delete F4
      isSelect: false,
    };
  },
  computed: {
    ...mapState(['topic', 'isStreaming']),
  },
  methods: {
    floorClick() {
      this.isSelect = !this.isSelect;
      if (this.isSelect) {
        this.showFloor2();
        this.showRoomColor();
      } else {
        this.resetBuilding();
      }
    },
    /**Reset floors */
    resetBuilding() {
      window.gisManager.model.resetBuildingFloor(
        {
          id: 'Building1',
          animation: 1,
        },
        () => {
          //Restore the current theme perspective
          window.gisManager.camera.setCameraByName(
            window.currentLayer.defaultView.cameraName
          );
        }
      );
    },

    /**
     * Show floors
     */
    showFloor2() {
      // Floor perspective
      window.gisManager.camera.setCameraByName('Floor 2');
      window.gisManager.model.showBuildingFloor({
        id: 'Building1',
        floor: '2',
        animation: 1,
      });
      //Hide the light strip
      window.gisManager.model.setModelStyle({
        id: 'SSH-DengDai_2',
        alpha: 0,
      });
    },
    // Display room box color
    showRoomColor() {
      let colorList = ['#00ff00', '#0000ff', '#ff6700'];
      let roomNumMax = 18;
      for (let i = 1; i <= roomNumMax; i++) {
        let roomNum = i < 10 ? '0' + i : '' + i;
        //Boxes hidden on the first and third floors, color changing on the second floor
        let floor1 = {
          id: `SSH-1C_SJ_Box0${roomNum}`,
          alpha: 0,
        };
        let floor2 = {
          id: `SSH-2C_SJ_Box0${roomNum}`,
          alpha: 1,
          maskAlpha: 0.3,
          maskType: 'color',
          maskColor: colorList[Math.floor(Math.random() * 3)],
        };
        let floor3 = {
          id: `SSH-3C_SJ_Box0${roomNum}`,
          alpha: 0,
        };
        window.gisManager.model.setModelStyle(floor1);
        window.gisManager.model.setModelStyle(floor2);
        window.gisManager.model.setModelStyle(floor3);
      }
      for (let i = 1; i <= roomNumMax; i++) {
        let roomNum = i < 10 ? '0' + i : '' + i;
        let jsonData = {
          id: `SSH-2C_SJ_Box0${roomNum}`,
          alpha: 1,
          maskAlpha: 0.3,
          maskType: 'color',
          maskColor: colorList[Math.floor(Math.random() * 3)],
          maskFlowDirection: 180,
        };
        window.gisManager.model.setModelStyle(jsonData);
      }
    },
  },

  watch: {
    topic: {
      handler(val) {
        if (this.isStreaming) {
          this.resetBuilding();
          this.isSelect = false;
        }
      },
      deep: true,
    },
  },
};
</script>
<style lang="less" scoped>
.plan_botton {
  pointer-events: all;
  // position: absolute;
  // bottom: 520px;
  // right: 704px;
  .botton_item {
    margin-bottom: 10px;
    width: 80px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    img {
      width: 80px;
      height: 40px;
    }
  }
}
</style>
