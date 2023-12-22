<!-- @format -->

<!--
 * @Author: hp
 * @Date: 2021-03-22 17:51:49
 * @LastEditTime: 2021-03-30 16:19:28
 * @LastEditors: your name
 * @Description: Region selection component
 * @FilePath: /digital_china/src/components/common/AreaSelect.vue
-->
<template>
  <div class="areaselect">
    <!-- Selected area prompt -->
    <div class="tips">
      <span @click="SelectArea">{{ tips }}</span>
    </div>
    <!-- Dropdown selection area -->
    <div class="select-options" @click="downStatus = !downStatus">
      <span>{{ currentItem }}</span>
      <!-- Dropdown icon -->
      <div class="down-select"></div>
    </div>
    <!-- Dropdown display area -->
    <ul class="down-aren" v-if="downStatus">
      <li class="item" v-for="(item, ind) in items" :key="ind" @click="handleSelected(item)">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import Marker3D from "../../utils/GisManagers/Marker3D";
export default {
  name: "areaselect",
  computed: {},
  data () {
    return {
      tips: "Select Area:",
      currentItem: "Area1",
      downStatus: false, // The drop-down list area is not displayed by default
      items: [
        { name: "KonzaComplex", sceneName: "" },
        { name: "pdc", sceneName: "" },
        { name: "serverRoom", sceneName: "" },
        { name: "Area1", sceneName: "" },
        { name: "Area2", sceneName: "" },
        { name: "Area3", sceneName: "" },
        { name: "Area4", sceneName: "" },
        { name: "Area5", sceneName: "" },
        { name: "All areas", sceneName: "" },
      ],
    };
  },
  watch: {},
  methods: {
    // Process Selected Status
    handleSelected (item) {
      this.downStatus = !this.downStatus; //Control Street List Display and Hiding
      this.currentItem = item.name;
      if (item.name == "KonzaComplex") {
        appInstance.uniCall('switchScene', {
          name: 'KNY',
          duration: 1,
        }, (result) => {
          window.gisManager.camera.setCamera({
            centerCoord: [37.187466, -1.690872],
            coordType: 0,
            coordTypeZ: 0,
            coordZ: 50,
            distance: 234,
            heading: 319,
            pitch: 26,
            result: 1,
            fly: true,
            duration: 1,
          });
          Marker3D.remove3DMarker();
        });

      } else if (item.name == 'serverRoom') {
        appInstance.uniCall('switchScene', {
          name: 'L4ComputerRoom',
          duration: 1,
        }, (result) => {
          console.log(result);
          window.gisManager.camera.setCamera({
            centerCoord: [3.19714508057, -3.49679016113],
            coordType: 0,
            coordTypeZ: 0,
            coordZ: 7.44523254395,
            distance: 53,
            heading: 68,
            pitch: 41,
            result: 1,
            fly: true,
            duration: 1,
          });
          this.modelcolor()
          this.showDingSheBei(false)
        });
      } else if (item.name == 'pdc') {
        appInstance.uniCall('switchScene', {
          name: 'KNY',
          duration: 1,
        }, (result) => {
          window.gisManager.camera.setCamera({
            centerCoord: [37.16956336006, -1.69646054113],
            coordType: 0,
            coordTypeZ: 0,
            coordZ: 0,
            distance: 125,
            heading: 109,
            pitch: 22,
            result: 1,
            fly: true,
            duration: 1,
          });
        });
      } else {
        appInstance.uniCall('switchScene', {
          name: 'KNY',
          duration: 1,
        }, (result) => {
          window.gisManager.area.getAddLayer(item.name);
        });
      }
    },
    modelcolor () {
      appInstance.uniCall('setModelStyle', {
        id: '2F',
        alpha: 0.5,
        scale: 1,
        maskType: 'color',
        maskAlpha: 0.3,
        maskColor: '#00ffff',
        maskPicture: 'Arrow01',
        maskPictureScale: 1.0,
        maskFlowSpeed: 1.0,
        maskFlowDirection: 180,
        includeChildren: 'false',
        xRay: 'off',
      }, (result) => {
        console.log(result);
      });
    },
    showDingSheBei (flag) {
      let jsonData = {
        ids: ['Ceiling', 'DingSheBei'],
        visible: flag,
      };
      appInstance.uniCall('setModelVisibility', jsonData, (result) => {
        console.log(result);
      });
    },
    SelectArea () {
      appInstance.uniCall(
        "clearOverlayType",
        {
          overlayType: "colorAreaLayer", // Layer Object Categories
        },
        (result) => {
          console.log(result);
        }
      );
      Marker3D.add3DMarker();
      window.gisManager.camera.setCamera({
        centerCoord: [37.187466, -1.690872],
        coordType: 0,
        coordTypeZ: 0,
        coordZ: 50,
        distance: 1745,
        heading: 311,
        pitch: 19,
        result: 1,
        fly: true,
        duration: 1,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.areaselect {
  position: relative;
  display: flex;
  width: 100px;
  height: 30px;
  margin: 10px 0;
  pointer-events: all;
  font-family: "Helvetica";

  .tips {
    border: solid 1px #2876c4;
    width: 110px;
    height: 30px;
    background: #0d2033;

    span {
      width: 110px;
      font-size: 16px;
      color: #cccccc;
      display: block;
      padding-top: 0px;
      background: url("../../assets/img/layout/area_bg.png") no-repeat;
      padding-left: 10px;
      line-height: 30px;
    }
  }

  .select-options {
    height: 30px;
    width: 184px;
    display: flex;
    margin-left: 5px;

    span {
      width: 103px;
      font-size: 16px;
      color: #cccccc;
      display: block;
      padding-top: 3px;
      border: solid 1px #2876c4;
      background: #0d2033;
      // background: url('../../assets/img/layout/jiedao_bg.png') no-repeat;
      padding-left: 10px;
      line-height: 25px;
    }

    .down-select {
      background: url("../../assets/img/layout/jiedao_icon_s.png") no-repeat;
      width: 13px;
      height: 28px;
      position: absolute;
      left: 216px;
    }
  }
}

.down-aren {
  width: 103px;
  position: absolute;

  top: 30px;
  left: 116px;

  .item {
    background: #0d2033;
    width: 103px;
    height: 25px;
    font-size: 16px;
    line-height: 25px;
    color: #ffffff;
    border: 1px solid rgba(#14d4f4, 0.3);
    padding-left: 10px;
    padding-top: 3px;

    &:not(:first-of-type) {
      border-top: none;
    }

    &:hover {
      color: #00ffff;
      background: rgba(#1fbbef, 0.7);
    }
  }
}

.sanjiao {
  height: 13px;
  width: 8px;
  margin-left: 5px;

  img {
    padding-top: 10px;
  }
}

.selected-area {
  margin-left: 5px;
  background: url("../../assets/img/layout/jiedao_bg.png") no-repeat;
  height: 30px;
  width: 84px;

  span {
    width: 84px;
    font-size: 16px;
    color: #cccccc;
    display: block;
    padding-top: 3px;
    padding-left: 10px;
  }

  .down-select {
    background: url("../../assets/img/layout/jiedao_icon_s.png") no-repeat;
    width: 13px;
    height: 28px;
    position: absolute;
    left: 503px;
    top: 0px;
  }

  .shequbg {
    height: 50px;
    width: 183px;

    span {
      width: 200px;
      font-size: 30px;
      color: #ffffff;
      display: block;
      padding-top: 8px;
      padding-left: 20px;
    }
  }
}

.down-shequ {
  width: 60px;
  position: absolute;
  top: 0px;
  left: 215px;

  .item2 {
    background: rgba(#0d2033, 0.3);
    width: 60px;
    height: 25px;
    font-size: 16px;
    line-height: 25px;
    color: #cccccc;
    border: 1px solid rgba(#14d4f4, 0.3);
    padding-left: 10px;
    padding-top: 3px;

    &:not(:first-of-type) {
      border-top: none;
    }

    &:hover {
      color: #00ffff;
      background: rgba(#1fbbef, 0.7);
    }
  }
}
</style>
