<template>
  <div class="layer">
    <div class="item" v-for="(item,index) in arrlist" :key="index">
       <div class="msg">
         <div class="done" :style="{backgroundColor:`${colorarr[index]}`}"></div>
         <div class="text" >{{ item.text }}</div>
         <div class="zhanbi" :style="{color:`${colorarr[index]}`}">{{item.zhanbi}}</div>
         <div class="number">{{item.number}}</div>
       </div>
       <div class="bar" :style="{ background:`linear-gradient(to right, #8DF42C01,${colorarr[index]})`,width:`${jswidth(item.zhanbi)}`}">
       </div>


    </div>

  </div>
</template>

<script>
export default {
  props: {
    arrlist: {
      type: Array,
      default: () => {
        return [
        {
          text:'112 Telephone Alarm',
          zhanbi:'42%',
          number:42
        },
        {
          text:'999 Telephone Alarm',
          zhanbi:'27%',
          number:27
        },
        {
          text:'Others',
          zhanbi:'34%',
          number:34
        },
      ];
      },
    },
},
  data(){
    return{
      colorarr:['#8DF42C','#02D7DA','#565CC7'],
    }
  },
  methods:{
    jswidth(data){
       data = (Number(data.slice(0,data.length-1))/100) * 300 
      return data +'px'
    }
  }
}


</script>

<style lang="less" scoped>
 .layer{
  width: 347px;
  height: 195px;

  .item{
   width:  347px;
   height: 42px;
   margin-top: 40px;
   .msg{
    width:  347px;
    height: 36px;
    display: flex;
    align-items: center;
    position: relative;
    .done{
      width: 10px;
      height: 10px;
      border-radius: 50%;
      position: absolute;
     
      left: 15px;
    }
    .text{
      width:185px;
      height: 26px;
      color: #BFEBFF;
      font-family: 'Helvetica';
      font-size: 18px;
      position: absolute;
      top: 6px;
      left: 31px;
    }
    .zhanbi{
      width:61px;
      height: 37px;
      color: #8BF12B;
      font-family: 'Roboto';
      font-size: 28px;
      position: absolute;
      top: -10px;
      left: 231px;
    }
    .number{
      width:61px;
      height: 37px;
      color: #BFEFFF;
      font-family: 'Roboto';
      font-size: 28px;
      position: absolute;
      top: -10px;
      left: 305px;
    }

   }
  }
  .item:nth-child(1){
      margin-top: 0px;
  }
  .bar{
    width: 300px;
    height: 8px;
    border-radius: 3px;
    // background: linear-gradient(to right, #000,#8BF12B);
    margin-left:25px ;
  }
 }

</style>