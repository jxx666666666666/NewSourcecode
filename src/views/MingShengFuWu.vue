<!--
 * @Author: user name
 * @Date: 2023-12-05 09:59:58
 * @LastEditTime: 2023-12-05 12:01:05
 * @LastEditors: user name
 * @Description: 
-->
<template>
  <div class="layout-wraper">
    <div class="layout-left">
      <left />
    </div>
    <div class="layout-center">
      <Center></Center>
    </div>
    <div class="layout-right">
      <Right></Right>
    </div>
  </div>
</template>

<script>
import Left from '../components/MingShengFuWu/Left.vue';
import Right from '../components/MingShengFuWu/Right.vue';
import Center from '../components/MingShengFuWu/Center.vue';
export default {
  components: {
    Left,
    Right,
    Center,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped lang="less">
.layout-wraper {
  pointer-events: none;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  pointer-events: all;
}
.layout-left {
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
}
</style>
