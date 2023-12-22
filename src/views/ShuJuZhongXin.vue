<template>
  <div class="SJZX">
    <div class="layout-left">
      <Left />
    </div>
    <div class="layout-center">
      <Center />
    </div>
    <div class="layout-right">
      <Right />
    </div>
  </div>
</template>

<script>
import Left from "../components/ShuJuZhongXin/Left.vue";
import Center from "../components/ShuJuZhongXin/Center.vue";
import Right from "../components/ShuJuZhongXin/Right.vue";
export default {
  components: {
    Left,
    Center,
    Right,
  },
  data () {
    return {};
  },
  methods: {},
};
</script>

<style scoped lang="less">
.SJZX {
  pointer-events: none;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;

  .layout-left {
    pointer-events: all;
    width: 1680px;
    height: 100%;
  }

  .layout-center {
    height: 100%;
    width: 4000px;
    margin: 0 80px;
    position: relative;
  }

  .layout-right {
    width: 1680px;
    height: 100%;
    pointer-events: all;
  }
}
</style>
