<template>
  <div class="tabsbox">
    <div :class="current == item ? 'tab selet' : 'tab'"
         :style="{ width: cssWidth }"
         @click="changeTabs($event, item, index)"
         v-for="(item, index) in tabs"
         :key="index">
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "commonTabs",
  props: {
    cssWidth: {
      type: String,
      default: "105px",
    },
    tabs: {
      type: Array,
      default () {
        return ["dyfz", "dyfz"];
      },
    },
    current: {
      type: String,
      default: "dyfz",
    },
  },
  data () {
    return {
      tabsData: this.tabs,
      currentItem: this.current,
    };
  },
  methods: {
    changeTabs (e, item, index) {
      e.stopPropagation();
      this.current = item;
      this.$emit("changeTabs", item, index);
    },

  },
};
</script>

<style lang="less" sopced>
.tabsbox {
  pointer-events: all;
  display: flex;
  border-radius: 2px;
  overflow: hidden;
  .tab {
    width: 38px;
    height: 30px;
    line-height: 30px;
    // border: solid 1px #1fbbef;
    // border: solid 1px #475f70;

    // background: #0d2033;
    font-size: 16px;
    text-align: center;
    // &:nth-child(2) {
    //   border-left: none;
    // }
    // &:nth-child(3) {
    //   border-left: none;
    // }
    span {
      display: block;
      font-family: "Helvetica";
      //   background: linear-gradient(to bottom, #f4fefd, #c8fcf4);
      //   -webkit-background-clip: text;
      //   color: transparent;
      color: #bfebff;
      font-size: 16px;
      position: relative;
    }
  }

  .selet {
    span {
      color: #ffffff !important;
    }

    background: url("../../assets/img/ZhiHuiDengGan/Tab-bg.png") no-repeat;
    background-size: 80% 10%;
    background-position: 40% 100%;
    // border: solid 1px #1fbbef !important;
    // border: solid 1px #258aef !important;
    // background: rgba(17, 63, 89, 0.2) !important;
    // border: solid 1px #1fbbef !important;
    // background: #1fbbef !important;
    // background-color: red;
  }
}
</style>
