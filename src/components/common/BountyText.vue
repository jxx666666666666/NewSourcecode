<template>
  <div class="content" ref="content" :style="{ fill: color }" :class="color == '#D95E52' ? 'fadein' : ''"></div>
</template>

<script>
export default {

  props: {
    number: '',
    color: {
      type: String,
      default: () => {
        return '#ffffff'
      },
    }
  },
  mounted() {
    bounty.default({ el: this.$refs.content, value: this.number })
  },
  watch: {
    number: {
      handler(val) {
        bounty.default({ el: this.$refs.content, value: val })
      },
      deep: true
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  font-family: "Roboto";
  font-size: 80px;
  text-align: center;
  width: 100%;
  text-shadow: 1px 1px 5px rgb(0 0 0 / 50%);
}

.fadein {
  -webkit-animation: fade-in 3s cubic-bezier(0.39, 0.575, 0.565, 1) both infinite;
  animation: fade-in 3s cubic-bezier(0.39, 0.575, 0.565, 1) both infinite;
}

@-webkit-keyframes fade-in {
  0% {
    opacity: 0.2;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0.2;
  }
}

@keyframes fade-in {
  0% {
    opacity: 0.2;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0.2;
  }
}
</style>