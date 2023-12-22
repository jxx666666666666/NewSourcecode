<template>
  <!-- Common Title Component -->
  <div>
    <div class="common-title" :style="{ width: width }" v-if="type == 1">
      <div class="content-box">
        <!-- <img src="../../assets/img/Common/twotitle_icon.png" alt="" /> -->
        <div class="img"></div>
        <span>{{ title }}</span>
      </div>
    </div>
    <div class="common-title2" v-else>
      <img src="../../assets/img/Common/two-title-icon.png" alt="" />
      <span>{{ title }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // width
    width: {
      type: String,
      default: '330px',
    },
    // title
    title: {
      type: String,
      default: 'title',
    },
    // type
    type: {
      type: Number,
      default: 1,
    },
  },
}
</script>

<style lang="less" scoped>
.common-title {
  height: 32px;
  background: url('../../assets/img/Common/two_base.png') no-repeat;
  background-size: 100% 100%;
  margin-top: 20px;
  .content-box {
    position: relative;
    .img {
      position: absolute;
      top: -12px;
      left: 15px;
      width: 5px;
      height: 32px;
      background-color: #16b4f8;
    }
    span {
      position: absolute;
      left: 33px;
      top: -18px;
      font-family: 'Helvetica';
      font-size: 32px;
      font-weight: Regular;
      // background: linear-gradient(to bottom, #fff, #99ecfb);
      // -webkit-background-clip: text;
      // color: transparent;
      color: #ffffff;
      white-space: nowrap;
    }
  }
}
.common-title2 {
  position: relative;
  img {
    width: 15px;
    height: 18px;
  }
  span {
    position: absolute;
    left: 20px;
    top: -3px;
    font-family: 'Montserrat', sans-serif;
    font-size: 18px;
    color: #00ffff;
  }
}
</style>
