<template>
  <div class="pdc" @click="CompRoom">
    Comp Room 1
  </div>
</template>
<script>
export default {
  methods: {
    CompRoom () {
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
        this.$eventBus.$emit("CompRoom", true);
      }
      )
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
  }
}
</script>
<style lang="less" scoped>
.pdc {
  width: 210px;
  height: 60px;
  background: #000;
  color: #FFFFFF;
  font-size: 30px;
  line-height: 60px;
  text-align: center;
}
</style>