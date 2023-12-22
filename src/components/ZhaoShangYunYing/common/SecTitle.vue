<!--
 * @Author: hp
 * @Date: 2021-03-07 14:51:02
 * @LastEditTime: 2021-03-25 10:41:10
 * @LastEditors: your name
 * @Description: Right sidebar title component
 * @FilePath: /digital_china/src/components/common/SecTitle.vue
-->
<template>
  <div>
    <div class="custom-title" :style="{ background: `url(${backgroundImage}) no-repeat left` }">
      <span class="tips">{{ title }}</span>
      <div class="right_cont">
        <!-- Default slot -->
        <div class="default-slot">
          <slot></slot>
        </div>
        <!-- Dropdown slot -->
        <div class="down-select">
          <slot name="downselect"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'custom-title',
  props: {
    title: {
      type: String,
      default: () => {
        return 'Comparison of complaint volume trends over the years';
      },
    },
    backgroundImage: {
      type: String,
      default: () => {
        return require('../../assets/img/bg/sub_title_bg.png');
      },
    },
  },
};
</script>

<style lang="less" scoped>
.custom-title {
  position: relative;
  width: 100%;
  height: 24px;
  font-size: 20px;
  // background: url('../../assets/img/bg/sub_title_bg.png') no-repeat left;
  & .tips {
    position: absolute;
    left: 0;
    top: 0;
    padding-left: 20px;
    background: linear-gradient(to bottom, #fff, #8dedf8);
    -webkit-background-clip: text;
    color: transparent;
    font-family:  'Carbon fiber Mid-Black Simplified', sans-serif;
  }
  .right_cont {
    position: absolute;
    pointer-events: all;
    top: 0px;
    right: 0px;
    display: flex;
    .default-slot {
      display: flex;
    }
  }
}
</style>
