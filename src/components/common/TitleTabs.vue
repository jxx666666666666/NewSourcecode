<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-11-21 19:21:11
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-12-04 17:49:58
 * @FilePath: \东莞理工\src\components\common\TitleTabs.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="tabs">
    <div
      class="tab"
      :style="{ width: cssWidth, height: cssHeight }"
      @click="changeTabs($event, item)"
      v-for="(item, index) in tabs"
      :key="index"
      :class="current == item ? 'ac1' : 'tab'"
    >
      <div>{{ item }}</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'TitleTabs',
  props: {
    cssWidth: {
      type: String,
      default: '82px',
    },
    cssHeight: {
      type: String,
      default: '30px',
    },
    tabs: {
      type: Array,
      default() {
        return ['btn1', 'btn2', 'btn3']
      },
    },
    current: {
      type: String,
      default: 'btn1',
    },
  },
  data() {
    return {}
  },
  computed: {
    ...mapState(['topic']),
  },
  methods: {
    changeTabs(e, item) {
      e.stopPropagation()
      this.$emit('changeTabs', item)
    },
  },
}
</script>

<style lang="less" sopced>
.tabs {
  display: flex;
  border-radius: 2px;
  overflow: hidden;
  position: absolute;

  .tab {
    width: 58px;
    height: 24px;
    border: 1px #475f70 solid;
    background-color: #0d2033;
    font-size: 22px;
    div {
      font-family: 'Helvetica';
      background-image: linear-gradient(to bottom, #fff, #c5fcf3);
      -webkit-background-clip: text;
      color: transparent;
      text-align: center;
      line-height: 30px;
    }
  }
  .ac1 {
    border: 1px rgb(37, 138, 239) solid;
    background-color: rgba(31, 187, 239, 0.2);
    text-align: center;
    div {
      font-family: 'Helvetica';
    }
  }
}
</style>
