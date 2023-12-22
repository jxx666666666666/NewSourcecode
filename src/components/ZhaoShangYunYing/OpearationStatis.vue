<template>
  <div class="oper_box">
    <div class="total_resources"></div>
    <div class="used_qty"></div>
    <div class="operat_amount"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      TotalResources: '40,542',
      UsedQty: '34,920',
      OpreatAmount: '12,548',
    }
  }
}
</script>

<style lang="less" scoped>
.oper_box {
  .total_resources {
    background: url("../../assets/img/ZhaoShangYunYing/total_resource.png")
      no-repeat;
    width: 191px;
    height: 152px;
    -webkit-animation: slide-top 3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both
      infinite;
    animation: slide-top 3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite;
  }
  .used_qty {
    background: url("../../assets/img/ZhaoShangYunYing/used_qty.png") no-repeat;
    width: 163px;
    height: 148px;
    -webkit-animation: slide-top 3s 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) both
      infinite;
    animation: slide-top 3s 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) both
      infinite;
  }
  .operat_amount {
    background: url("../../assets/img/ZhaoShangYunYing/operating_amount.png")
      no-repeat;
    width: 212px;
    height: 149px;
    -webkit-animation: slide-top 3s 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) both
      infinite;
    animation: slide-top 3s 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) both
      infinite;
  }
}

@-webkit-keyframes slide-top {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
  50% {
    -webkit-transform: translateY(-10px);
    transform: translateY(-10px);
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
}
@keyframes slide-top {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
  50% {
    -webkit-transform: translateY(-10px);
    transform: translateY(-10px);
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
}
</style>