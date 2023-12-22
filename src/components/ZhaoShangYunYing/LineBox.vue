<template>
  <div class="linebox" :style="{ width: obj.width, height: obj.height }">
    <svg class="line_item" className="dv-svg-container">
      <defs>
        <path :id="obj.id" :d="pathData" fill="transparent" />
        <radialGradient
          :id="obj.gradid"
          cx="100%"
          cy="100%"
          r="100%"
          fx="100%"
          fy="100%"
        >
          <stop offset="0%" style="stop-color: white; stop-opacity: 1" />
          <stop offset="100%" style="stop-color: white; stop-opacity: 1" />
        </radialGradient>

        <mask :id="obj.maskid">
          <circle
            id="circle"
            cx="0"
            cy="0"
            r="120"
            :fill="'url(#' + obj.gradid + ')'"
          >
            <animateMotion
              dur="1s"
              attributeName="stroke-dasharray"
              :path="pathData"
              rotate="auto"
              repeatCount="indefinite"
            />
          </circle>
        </mask>
      </defs>
      <use :href="'#' + obj.id" stroke="rgba(0, 0, 0, 0)" strokeWidth="1"></use>

      <use
        :href="'#' + obj.id"
        stroke="white"
        :mask="'url(#' + obj.maskid + ')'"
        stroke-width="1"
      >
        <animate
          attributeName="stroke-dasharray"
          dur="1s"
          repeatCount="indefinite"
        />
      </use>
    </svg>
  </div>
</template>

<script>
export default {
  data() {
    return { grad2: "" };
  },
  props: {
    pathData: String,
    obj: {
      width: "0px",
      height: "0px",
      id: "id",
      gradid: "",
      maskid: "",
    },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.linebox {
  position: absolute;
}

.line_item {
  width: 100%;
  height: 100%;
  -webkit-animation: rotate-in-center 2s infinite;
  animation: rotate-in-center 2s infinite;
}

@-webkit-keyframes rotate-in-center {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 1;
  }

  90% {
    opacity: 0;
  }

  100% {
    opacity: 0;
  }
}

@keyframes rotate-in-center {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 1;
  }

  90% {
    opacity: 0;
  }

  100% {
    opacity: 0;
  }
}
</style>