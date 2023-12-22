<!--
 * @Descripttion:
 * @version: 1.0.0
 * @Author: guozhiqing
 * @Date: 2021-04-22 11:35:56
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-12-05 16:53:26
-->
<template>
  <div class="nav">
    <router-link
      tag="div"
      v-for="nav in navList"
      :key="nav.name"
      :to="nav.path"
      class="menu_item"
      exact-active-class="active"
    >
      <div class="txt">{{ nav.showName }}</div>
      <!-- <div class="txt1">{{ nav.showName }}</div> -->
    </router-link>
  </div>
</template>

<script>
export default {
  name: "Nav",
  data() {
    return {
      navList: [],
    };
  },
  created() {
    this.navList = this.$router.options.routes.filter((item) => {
      return item.path != "/";
    });
  },
  methods: {},
  computed: {},
  watch: {},
};
</script>

<style lang="less" scoped>
.nav {
  position: absolute;
  top: 140px;
  left: 50%;
  transform: translateX(-50%);

  height: 76px;
  display: flex;
  justify-content: space-between;
  pointer-events: all;
  .menu_item {
    font-family: "Helvetica Bold";
    // width: 440px;
    padding: 0 40px;
    height: 50px;
    font-size: 36px;
    text-align: center;
    line-height: 38px;
    background: url(../../assets/img/layout/nav-bg.png) no-repeat center center;
    background-size: 100% 100%;
    position: relative;
    .txt {
      // width: 100%;
      background: linear-gradient(to bottom, #fff, #d5f7fd);
      -webkit-background-clip: text;
      color: transparent;
      // position: absolute;
      z-index: 2;
      // left: 22px;
    }
    .txt1 {
      position: absolute;
      // z-index: 1;
      color: transparent;
      text-shadow: 0px 1px 15px rgba(0, 0, 0, 0.75);
      // left: 22px;
    }
  }
  .active {
    background: url(../../assets/img/layout/nav-bg-ac.png) no-repeat center
      center;
    background-size: 100% 100%;
    .txt {
      // width: 100%;
      background: linear-gradient(to bottom, #fff, #d8b14e);
      -webkit-background-clip: text;
      color: transparent;
      // position: absolute;
      z-index: 2;
      // left: 22px;
    }
    .txt1 {
      position: absolute;
      z-index: 1;
      color: transparent;
      text-shadow: 0px 1px 15px rgba(201, 160, 52, 0.45);
      // left: 22px;
    }
  }
}
</style>
