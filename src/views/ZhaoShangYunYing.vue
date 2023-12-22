<template>
  <div class="zhaoshangyunying">
    <div class="layout_left">
      <!-- <OpearationStatisVue class="operation_box"></OpearationStatisVue>
      <div class="nework_opreation_box">
        <NetWorkItemVue class="network_item"
                        v-for="(item,index) in networkOpreationData"
                        :key="index"></NetWorkItemVue>
      </div> -->
      <Left></Left>
    </div>
    <div class="layout_center">
      <!-- <Center></Center> -->
    </div>
    <div class="layout_right">
      <Right></Right>
    </div>
  </div>
</template>

<script>
import OpearationStatisVue from '../components/ZhaoShangYunYing/OpearationStatis.vue';
import NetWorkItemVue from '../components/ZhaoShangYunYing/NetWorkItem.vue';
import Left from '../components/ZhaoShangYunYing/Left.vue';
import Center from '../components/ZhaoShangYunYing/Center.vue';
import Right from '../components/ZhaoShangYunYing/Right.vue';
export default {
  name: "ZhaoShangYunYing",
  components: {
    OpearationStatisVue,
    NetWorkItemVue,
    Left,
    Center,
    Right

  },
  data () {
    return {
      networkOpreationData: [
        {
          name: "",
          vale: 1135
        },
        {
          name: "",
          vale: 1135
        },
        {
          name: "",
          vale: 1135
        },
        {
          name: "",
          vale: 1135
        },
        {
          name: "",
          vale: 1135
        },
        {
          name: "",
          vale: 1135
        },
        {
          name: "",
          vale: 1135
        },
        {
          name: "",
          vale: 1135
        }
      ]
    }
  }
};
</script>

<style lang="less" scoped>
.zhaoshangyunying {
  width: 100%;
  height: 100%;
  .layout_left {
    margin-top: -272px;
    margin-left: -26px;
    width: 1743px;
    height: 1358px;
    // background: url("../assets/img/ZhaoShangYunYing/zsyyleft.png") no-repeat;
    // .operation_box {
    //   display: flex;
    //   width: 773px;
    //   justify-content: space-between;
    //   position: absolute;
    //   left: 72px;
    //   top: 532px;
    // }
    // .nework_opreation_box {
    //   display: flex;
    //   flex-wrap: wrap;
    //   width: 832px;
    //   justify-content: space-between;
    //   position: absolute;
    //   right: 0px;
    //   top: 236px;
    //   .network_item {
    //     margin-top: 10px;
    //   }
    // }
  }
  .layout_center {
    margin-top: -139px;
    margin-left: 926px;
    width: 390px;
    height: 100%;
    // background: url("../assets/img/ZhaoShangYunYing/zsyycenter.png") no-repeat;
  }
  .layout_right {
    margin-top: -272px;
    margin-left: 10px;
    width: 1743px;
    height: 1358px;
    // background: url("../assets/img/ZhaoShangYunYing/zsyyright.png") no-repeat;
  }
}
</style>