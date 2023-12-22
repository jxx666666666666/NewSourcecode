<!--
 * @Descripttion:
 * @version: 1.0.0
 * @Author: guozhiqing
 * @Date: 2021-07-21 14:31:33
 * @LastEditors: guozhiqing
 * @LastEditTime: 2021-07-21 14:40:47
-->
<template>
  <div
    class="wraper"
    :class="highLight && highLight == val ? 'highlight' : ''"
    :style="css"
    @click="setHighLight"
  >
    <div class="layer"></div>
    <slot></slot>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'HighLight',
  props: {
    val: {
      type: String,
      default: ''
    },
    css: {
      type: Object,
      default() {
        return {
          widht: 'auto',
          height: 'auto'
        };
      }
    }
  },
  computed: {
    ...mapState(['highLight'])
  },
  methods: {
    setHighLight() {
      if (this.highLight && this.highLight == this.val) {
        this.$store.commit('setHighLight', '');
        this.$emit('setHighLight', '');
      } else {
        this.$store.commit('setHighLight', this.val);
        this.$emit('setHighLight', this.val);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.wraper {
  position: relative;
}
.highlight .layer {
  display: block;
}
.layer {
  box-sizing: border-box;
  display: none;
  width: 100%;
  height: 100%;
  position: absolute;
  border: 2px #f9fe25 solid;
  position: absolute;
  top: 0;
  left: 0;
  box-shadow: 0px 0px 12px 6px rgba(255, 201, 38, 0.65);
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-shadow: 0px 0px 12px 6px rgba(255, 201, 38, 0.65) inset;
    background-color: rgba(255, 201, 38, 0.15);
  }
}
</style>
