<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-12-04 16:49:51
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-12-04 16:49:54
 * @FilePath: \NewSourcecode\src\views\LianDongZhiHui.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="LDZH">
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
import Center from '../components/liandongzhihui/Center.vue'
import Left from '../components/liandongzhihui/Left.vue'
import Right from '../components/liandongzhihui/Right.vue'
export default {
  components: { Left, Right, Center },
  data () {
    return {}
  },
  methods: {},
}
</script>

<style scoped lang="less">
.LDZH {
  pointer-events: none;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
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
  div {
    pointer-events: none;
  }
}
.layout-right {
  width: 1680px;
  height: 100%;
}
</style>
