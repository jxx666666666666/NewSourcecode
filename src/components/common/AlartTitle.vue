<template>
  <div class="alart_title">
    <div class="leftbox">
      <div class="kuai">
        <img src="../../assets/img/layout/leftkuai.png" alt="" />
      </div>
      <div class="icon">
        <img src="../../assets/img/layout/alartTitleicon.png" alt="" />
      </div>
      <div class="name">{{ alartTitle }}</div>
    </div>
    <div class="close" style="pointer-events: all" @click="closeAlart">
      <img src="../../assets/img/layout/AlartClose.png" alt="" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    boid:{
      type:String,
      boid:""
    },
    alartTitle: {
      type: String,
      default: () => {
        return "Party member structure";
      },
    },
    title: {
      type: String,
      default: () => {
        return "";
      },
    },
  },
  methods: {
    closeAlart() {
      this.$emit("closeAlart")
    },
  },
};
</script>
<style lang="less" scoped>
.alart_title {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .leftbox {
    display: flex;
    align-items: center;
    margin-left: -20px;
    .name {
      font-size: 45px;
      font-family: "Carbon Fiber";
      background: linear-gradient(to bottom, #fff, #99ecfb);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }
    .icon {
      margin-left: 10px;
      margin-right: 15px;
    }
  }
}
</style>
