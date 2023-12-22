<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-12-05 11:06:32
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-12-05 16:25:04
 * @FilePath: \NewSourcecode\src\components\common\twoTitleTab.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <!-- Common Title Component -->
  <div>
    <div class="common-title" :style="{ width: width }" v-if="type == 1">
      <div class="content-box">
        <!-- <img src="../../assets/img/Common/twotitle_icon.png" alt="" /> -->
        <div class="img"></div>
        <span
          class="title"
          @click="changeTabs(title)"
          :class="{ titles: current === title }"
          >{{ title }}</span
        >
        <img src="../../assets/img/ShuJuZhongXin/twoTitle_icon.png" alt="" />
        <span
          @click="changeTabs(title2)"
          class="title2"
          :class="{ titles: current === title2 }"
          >{{ title2 }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // width
    width: {
      type: String,
      default: "330px",
    },
    current: {
      type: String,
      default: "title",
    },
    // title
    title: {
      type: String,
      default: "title",
    },
    title2: {
      type: String,
      default: "title2",
    },
    // type
    type: {
      type: Number,
      default: 1,
    },
  },
  methods: {
    changeTabs(item) {
      this.$emit("changeTabs", item);
    },
  },
};
</script>

<style lang="less" scoped>
.common-title {
  height: 32px;
  background: url("../../assets/img/Common/two_base.png") no-repeat;
  background-size: 100% 100%;
  .content-box {
    position: relative;
    display: flex;
    .img {
      position: absolute;
      top: -5px;
      left: 15px;
      width: 5px;
      height: 32px;
      background-color: #16b4f8;
    }
    span {
      margin-top: -8px;
      font-family: "Helvetica";
      font-size: 32px;
      font-weight: bold;
      color: #ffffff;
      white-space: nowrap;
    }
    .title {
      margin-left: 36px;
    }
    img {
      margin: 0 18px;
    }
    .titles {
      // background: linear-gradient(to bottom, #fff, #ffd34f);
      // -webkit-background-clip: text;
      color: #ffd34f;
      font-weight: bold;
    }
  }
}
</style>
