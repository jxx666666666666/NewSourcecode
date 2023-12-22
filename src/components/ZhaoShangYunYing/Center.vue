<template>
  <div class="max">
    <div class="max_sj" v-for="(item,index) in max_sj_sj" :key="index">
      <div class="name">{{item.name}}</div>
      <div class="bott" >
        <img src="../../assets/img/ZHTX/CC_tubiao.png" alt="" class="popo">
        <div class="value">{{item.value}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      max_sj_sj:[
        {
          name:'Today`s Weather',
          value:'34'
        },
        {
          name:'Tomorrow`s Weather',
          value:'30'
        },
        {
          name:'Tomorrow`s Weather',
          value:'28'
        },
      ]
    }
  }
}
</script>

<style  lang="less" scoped>
.max{
  width: 100%;
  height: 100%;
  position: absolute;
  top: -30px;
  .max_sj{
    width: 390px;
    height: 100px;
    background: url(../../assets/img/ZHTX/CC_VJ.png);
    .name{
      margin-top: 10px;
      margin-left: 20px;
      width: 300px;
      height: 35px;
      font-family: 'Helvetica';
      font-size: 26px;
      color: #FFFFFF;
    }
    .bott{
      display: flex;
      .popo{
        width: 65px;
        height: 65px;
        // margin-top: -6px;
        margin-left: 8px;
      }
      .value{
        margin-left: 20px;
        height: 73px;
        width: 200px;
        // background-color: #fff;
        font-family: 'Roboto';
      font-size: 60px;
      color: #FFFFFF;
      }
    }
  }
}
</style>