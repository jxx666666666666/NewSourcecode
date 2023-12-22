<template>
  <div class="alert-box">
    <AlartTitle :alartTitle="title" @closeAlart="closeAlart"/>
    <div class="video-box">
      <video autoplay loop muted class="video" :src="videosrc"></video>
    </div>
  </div>
</template>

<script>
// Pop-up box title
import AlartTitle from "../common/AlartTitle.vue";
export default {
  props: {
    title: {
      type: String,
      default: "Camera",
    },
    videosrc: {
      type: String,
      default: "",
    },
  },
  components: {
    AlartTitle,
  },
  created() {},
  data() {
    return {};
  },
  methods: {
    closeAlart() {
      this.$emit("closeAlart");
    },
  },
};
</script>
<style lang="less" scoped>
.alert-box {
  width: 1789px;
  height: 1090px;
  box-sizing: border-box;
  padding: 20px;
  background: url("../../assets/img/layout/alartng.png") no-repeat;
  background-size: 100% 100%;
  .table-box {
    margin-top: 20px;
  }
  .video-box {
    width: 100%;
    height: 93%;
    //   background-color: #fff;
    .video {
      width: 100%;
      height: 1000px;
    }
  }
}
</style>
