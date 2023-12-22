<template></template>
  <div class="delete">
<img src="../assets/img/Common/close.png" @click="closePanel" alt="" />
</template>

<script>
export default {
  props: ["id", "data"],
  mounted() {},
  methods: {
    closePanel() {
      let that = this;
      window.appInstance.uniCall("removeOverlayTip", {
        id: that.id,
        overlayType: "landmarkLayer",
      });
      let jsonData = {
        id: that.id,
        overlayType: "landmarkLayer",
      };

      appInstance.uniCall("removeOverlay", jsonData, (result) => {
        console.log(result);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.delete {
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>