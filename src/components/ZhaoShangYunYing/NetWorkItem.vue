<template>
  <div class="network_box">
    <LineBoxVue :pathData="item.pathData" :obj="item.obj"></LineBoxVue>
    <div class="title">{{ name }}</div>
    <div class="value">{{ value }}</div>
  </div>
</template>

<script>
import LineBoxVue from "./LineBox.vue";
export default {
  data() {
    return {
      item: {
        pathData:
          "M 15.5,7 C15.5,7 401.5,7 401.5,7 401.5,7 401.5,86 401.5,86 401.5,86 389,99 389,99 389,99 156,99 156,99 156,99 149,92 149,92 149,92 7.5,92 7.5,92 7.5,92 7.5,15 7.5,15 7.5,15 15.5,7 15.5,7 z",
        obj: {
          width: "403px",
          height: "100px",
          id: "line1",
          gradid: "grad1",
          maskid: "mask1",
        },
      },
    };
  },
  components: {
    LineBoxVue,
  },
  props: {
    name: "",
    value: 0,
  },
};
</script>

<style lang="less" scoped>
.network_box {
  background: url("../../assets/img/ZhaoShangYunYing/line_box_bg.png") no-repeat;
  width: 406px;
  height: 103px;
  position: relative;
  .title {
    font-family: "Helvetica";
    font-size: 28px;
    color: #ffffff;
    width: 278px;
    text-align: left;
    float: left;
    margin-left: 29px;
    margin-top: 6px;
  }
  .value {
    font-family: "Roboto";
    color: #26ffff;
    font-size: 40px;
    /* float: right; */
    /* margin-top: 26px; */
    /* margin-right: 7px; */
    position: absolute;
    right: 19px;
    top: 18px;
  }
}
</style>