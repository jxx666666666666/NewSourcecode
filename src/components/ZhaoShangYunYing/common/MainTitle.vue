<!--
 * @Descripttion:
 * @version: 1.0.0
 * @Author: guozhiqing
 * @Date: 2021-06-21 15:22:22
 * @LastEditors: guozhiqing
 * @LastEditTime: 2021-06-21 15:22:22
-->
<template>
  <div class="title_wrap">
    <div class="leftline" :style="{ backgroundColor: bgColor }"></div>
    <div class="botline" :style="{ backgroundColor: bgColor }"></div>
    <div class="rightract" :style="{ backgroundColor: bgColor }"></div>
    <div class="left_txt" :style="{ backgroundImage: titleImg }">
      <img :src="require(`../../assets/img/bg/${topic}_title_bg.png`)" alt="" />
      <span>{{ val }}</span>
    </div>
    <div class="right_cont">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'MainTitle',
  props: {
    val: {
      type: String,
      default: 'Title name',
    },
  },
  data() {
    return {
      titleImg: '',
      // Line color of each theme main title
      bgColorList: {
        CityPanorama: '#258AEF',
        UrbanGovernance: '#16B4F8',
        EcologicalEnvironment: '#0DC882',
        EconomicDevelopment: '#DEBD58',
        TrafficOperation: '#F4952B',
        PublicSafety: '#21F3F3',
        LinkageCommand: '#258AEF',
      },
      bgColor: '',
    };
  },
  computed: {
    ...mapState(['topic']),
  },
  created() {
    this.bgColor = this.bgColorList[this.topic];
  },
};
</script>

<style lang="less">
.title_wrap {
  width: 100%;
  box-sizing: border-box;
  padding-left: 10px;
  height: 40px;
  position: relative;
  .botline {
    width: calc(100% - 7px);
    height: 2px;
    background-color: #9febfb;
    left: 0;
    bottom: 0;
    position: absolute;
  }
  .leftline {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 2px;
    height: 8px;
    background-color: #9febfb;
  }
  .rightract {
    position: absolute;
    bottom: 0px;
    right: 0px;
    width: 4px;
    height: 4px;
    background-color: #bbf1f7;
  }
  .left_txt {
    width: 380px;
    height: 30px;
    position: relative;
    display: flex;
    span {
      position: absolute;
      font-family: 'TanXianWeiZhengCuHeiJianTi';
      font-size: 28px;
      line-height: 30px;
      background: linear-gradient(to bottom, #fff, #dbf2f5);
      -webkit-background-clip: text;
      color: transparent;
      left: 30px;
    }
  }
  .right_cont {
    position: absolute;
    pointer-events: all;
    top: 7px;
    right: 10px;
    display: flex;
  }
}
</style>
