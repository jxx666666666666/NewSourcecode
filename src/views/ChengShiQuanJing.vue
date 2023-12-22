<template>
  <div class="csqj">
    <div class="layout-left">
      <left />
    </div>
    <div class="layout-center">
      <center />
    </div>
    <div class="layout-right">
      <right />
    </div>
  </div>
</template>

<script>
import left from "@/components/ChengShiQuanJing/left.vue";
import right from "@/components/ChengShiQuanJing/right.vue";
import center from "@/components/ChengShiQuanJing/center.vue";
export default {
  components: {
    left,
    right,
    center,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped lang="less">
.csqj {
  display: flex;
  justify-content: center;
  height: 100%;
  color: #fff;
  .layout-left,
  .layout-right {
    width: 1680px;
    height: 100%;
    pointer-events: all;
  }
  .layout-center {
    width: 4000px;
    height: 100%;
    margin: 0 80px;
  }
}
</style>
