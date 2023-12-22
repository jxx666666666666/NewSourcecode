<template>
  <div class="wraper">
    <Energy v-if="this.$store.state.highLight === 'Energy'">
    </Energy>
  </div>
</template>

<script>
import Energy from "../thems/ShuJuZhongXin/Energy.vue";
export default {
  components: {
    Energy
  },
}
</script>

<style  lang="less" scoped>
.wraper {
  width: 100%;
}
</style>