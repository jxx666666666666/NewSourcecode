<template>
  <!-- Common Title Component -->
  <div class="common-title" :style="{ width: width }">
    <div class="content-box">
      <img
        :style="{ top: imgTop }"
        src="../../assets/img/Common/title_icon.png"
        alt=""
      />
      <span :style="{ fontSize: fontSize, top: titleTop }" ref="title">{{
        title
      }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // Image top value
    imgTop: {
      type: String,
      default: "-5px",
    },
    // Title top value
    titleTop: {
      type: String,
      default: "-20px",
    },
    // font size
    fontSize: {
      type: String,
      default: "42px",
    },
    // width
    width: {
      type: String,
      default: "800px",
    },
    // title
    title: {
      type: String,
      default: "title",
    },
  },
  mounted() {
    var title = this.$refs.title;
    var CHAR_TIME = 50;

    var text = void 0,
      index = void 0;

    function requestCharAnimation(char, value) {
      setTimeout(function () {
        char.textContent = value;
        char.classList.add("fade-in");
      }, CHAR_TIME);
    }

    function addChar() {
      var char = document.createElement("span");
      char.classList.add("char");
      char.textContent = "▌";
      title.appendChild(char);
      requestCharAnimation(char, text.substr(index++, 1));
      if (index < text.length) {
        requestChar();
      }
    }

    function requestChar() {
      var delay =
        arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      setTimeout(addChar, CHAR_TIME + delay);
    }

    function start() {
      index = 0;
      text = title.textContent.trim();
      title.textContent = "";
      requestChar(1000);
    }
    start();
  },
};
</script>

<style lang="less" scoped>
.common-title {
  pointer-events: all;
  height: 40px;
  background: url("../../assets/img/Common/title_bg.png") no-repeat;
  background-size: 100% 100%;
  .content-box {
    position: relative;
    img {
      position: absolute;
      top: -5px;
    }
    span {
      position: absolute;
      top: -20px;
      left: 38px;
      // font-weight: Bold;
      font-family: "Helvetica Bold";
      font-size: 40px;
      // background: linear-gradient(to bottom, #fff, #99ecfb);
      // -webkit-background-clip: text;
      // color: transparent;
      color: #ffffff;
    }
  }
  .char {
    color: #fff;
    transition: color ease-out 0.3s, text-shadow ease-out 0.3s;
    text-shadow: 0 0 4rem #fff;
  }
  .char.fade-in {
    color: #0cf;
    transition: color ease-out 0.3s, text-shadow ease-out 0.3s;
    text-shadow: 0 0 1rem #0cf;
  }
}
</style>
