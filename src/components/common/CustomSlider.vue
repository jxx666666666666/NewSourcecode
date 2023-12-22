<template>
  <div @mousemove="mousemove"
       @mouseleave="mouseleave"
       @mousedown="ballDown"
       @mouseup="ballUp"
       ref="custom_slider">
    <div class="label_container">
      <div>0</div>
      <div>6</div>
      <div>12</div>
      <div>18</div>
      <div>24</div>
    </div>
    <div class="slider_container"
         @mousedown="mousedown">
      <div class="slider_thumb"
           :style="{ width:currentWidth  }">
        <div class="ball"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      currentWidth: "140px",
      isPress: false,
      totalWidth: 0
    }
  },
  mounted () {
    this.totalWidth = this.$refs.custom_slider.clientWidth;
  },
  methods: {
    mousedown (event) {
      this.currentWidth = event.offsetX + "px";
      console.log(event)
    },
    ballDown () {
      this.isPress = true;
    },
    ballUp () {
      this.isPress = false;
      let current = this.currentWidth.replace('px', '');
      let percent = current / this.totalWidth;
      this.$emit('sliderChanged', percent)
    },
    mouseleave () {
      this.isPress = false;
    },
    mousemove (event) {
      if (this.isPress) {
        this.currentWidth = event.offsetX + "px";
      }
    },
    setValue (time) {
      if (time == "morning") {
        this.currentWidth = "140px"
      }
      else if (time == "noon") {
        this.currentWidth = "280px"
      }
      else if (time == "dusk") {
        this.currentWidth = "420px"
      }
      else if (time == "evening") {
        this.currentWidth = "500px"
      }
      else if (time == "night") {
        this.currentWidth = "550px"
      }
    }
  }
}
</script>

<style lang="less" scoped>
.label_container {
  display: flex;
  justify-content: space-between;
  pointer-events: none;
  color: white;
  font-size: 30px;
}
.slider_container {
  height: 15px;
  background: white;
  cursor: pointer;
  margin-top: 15px;
  border-radius: 3px;
}
.slider_thumb {
  height: 15px;
  background: #13bfff;
  pointer-events: none;
  border-radius: 3px;
}
.ball {
  width: 25px;
  height: 25px;
  background: white;
  border-radius: 15px;
  margin-top: -7px;
  margin-right: -10px;
  float: right;
  pointer-events: none;
}
</style>