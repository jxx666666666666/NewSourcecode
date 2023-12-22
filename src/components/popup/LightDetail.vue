<template>
  <div class="light_detail_box">
    <div class="header">
      <div @click="onClick('Camera')"></div>
      <div @click="onClick('Billboard')"></div>
      <div @click="onClick('close')"></div>
    </div>
    <div class="body">
      <div class="item_content" v-for="(item, index) in detalListTemp" :key="index">
        <div class="title"><span>{{ item.name }}</span></div>
        <div class="content"><span>{{ item.value }}</span></div>
      </div>

    </div>
    <div class="bottom_title">{{ bottomType }}</div>
    <div class="camera_content" v-if="bottomType === 'Camera'">
      <div class="camera_item" v-for="(item, index) in camreaListTemp" :key="index">
        <div class="name"><span>Name</span></div>
        <div class="name_value"><span>{{ item.name }}</span></div>
        <div class="type"><span>Type</span></div>
        <div class="type_value"><span>{{ item.type }}</span></div>
        <div class="camera_icon" @click="playCamrea"></div>
      </div>
    </div>
    <div class="billboard_content" v-if="bottomType === 'Billboard'">
      <p ref="billboard_content">A cold front is swinging in from Canada while a warm front is moving up from the
        Pacific.Meanwhile,precipitation is developing in the southern part of the state while strong wind is moving down
      </p>
    </div>
    <div class="camera_box" v-if="isShowCamera">
      <video autoplay src="../../../public/video/04.mp4" loop></video>
      <div class="close" @click="closeVideo"></div>

    </div>
    <div class="info" @click="onClick('info')"></div>
  </div>
</template>

<script>
import LightScene from '../../utils/other/LightScene';
export default {
  data () {
    return {
      detalList: [
        {
          name: "Pole Name",
          value: "smartPole"
        },
        {
          name: "Pole ID",
          value: "22645"
        },
        {
          name: "Pole Type",
          value: "Single-arm light with screen"
        },
        {
          name: "State",
          value: "Full bright"
        },
        {
          name: "Temperature",
          value: "20°C"
        },
        {
          name: "Humidity",
          value: "60%"
        },
        {
          name: "PM2.5",
          value: "20ug/m³"
        },
        {
          name: "Noise",
          value: "35dB"
        },
        {
          name: "AD Screen",
          value: "Normal"
        },
        {
          name: "Region(Color，Area Type)",
          value: "Blue      Area A"
        },
        {
          name: "Help Status",
          value: "No"
        },
        {
          name: "Wifi",
          value: "Normal"
        },
        {
          name: "Broadcast",
          value: "Normal"
        }
      ],
      camreaList: [
        {
          name: "camera_001",
          type: "Dome Camrea"
        },
        {
          name: "camera_002",
          type: "Dome Camrea"
        }, {
          name: "camera_003",
          type: "Dome Camrea"
        }, {
          name: "camera_004",
          type: "Dome Camrea"
        }
      ],
      detalListTemp: [],
      camreaListTemp: [],
      bottomType: 'Camera',
      isShowCamera: false
    }
  },
  props: ['data'],
  mounted () {
    for (let index = 0; index < this.detalList.length; index++) {
      setTimeout(() => {
        this.detalListTemp.push(this.detalList[index]);
      }, index * 40);

    }
    for (let index = 0; index < this.camreaList.length; index++) {
      setTimeout(() => {
        this.camreaListTemp.push(this.camreaList[index]);
      }, index * 40);

    }

  },
  methods: {
    onClick (type) {
      let that = this;
      if (type == 'Camera') {
        this.bottomType = 'Camera'
      }
      else if (type == 'Billboard') {
        this.bottomType = 'Billboard';
        this.$nextTick(() => {
          this.renderBillboard();
        })

      }
      else if (type == 'info') {

        let sceneName = "";
        if (that.data.sourceData.TO_INSTALL == "Light_Type01_A" || that.data.sourceData.TO_INSTALL == "Light_Type01_B") {
          sceneName = "SmartPole-A"
        }
        else if (that.data.sourceData.TO_INSTALL == "Light_Type02_A" || that.data.sourceData.TO_INSTALL == "Light_Type02_B") {
          sceneName = "SmartPole"
        }
        window.appInstance.uniCall("switchScene", {
          name: sceneName,
          duration: 0
        }, res => {
          LightScene.init(that.data.sourceData, sceneName);
          if (that.data.sourceData.TO_INSTALL == "Light_Type01_B" || that.data.sourceData.TO_INSTALL == "Light_Type02_B") {
            that.$eventBus.$emit('showBillbord', false);
          }
          else {
            that.$eventBus.$emit('showBillbord', true);
          }

        })

        that.$eventBus.$emit('SmartSelected', true);
      }
      else if (type == 'close') {
        window.appInstance.uniCall("removeModelTip", {
          id: "",
        });

        window.appInstance.uniCall("removeOverlayTip", { overlayType: 'landmarkLayer' });
        window.appInstance.uniCall('clearOverlaySelected', {});
        window.gisManager.camera.setCamera();
      }
    },
    playCamrea () {
      this.isShowCamera = true;
    },
    closeVideo () {
      this.isShowCamera = false;
    },
    renderBillboard () {
      var title = this.$refs.billboard_content;
      var CHAR_TIME = 30;

      var text = void 0, index = void 0;

      function requestCharAnimation (char, value) {
        setTimeout(function () {
          char.textContent = value;
          char.classList.add("fade-in");
        }, CHAR_TIME);
      }

      function addChar () {
        var char = document.createElement("span");
        char.classList.add("char");
        char.textContent = "▌";
        title.appendChild(char);
        requestCharAnimation(char, text.substr(index++, 1));
        if (index < text.length) {
          requestChar();
        }
      }

      function requestChar () {
        var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        setTimeout(addChar, CHAR_TIME + delay);
      }

      function start () {
        index = 0;
        text = title.textContent.trim();
        title.textContent = "";
        requestChar(1000);
      }
      start();
    }
  }

}
</script>

<style lang="less" scoped>
.light_detail_box {
  font-family: "Helvetica";
  -webkit-animation: slide-in-elliptic-top-fwd 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation: slide-in-elliptic-top-fwd 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  background: url("../../assets/img/popupIMG/lightbackgroundnew.png") no-repeat;
  width: 480px;
  height: 570px;

  .header {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 36px;

    div {
      background: transparent;
      height: 22px;
      width: 22px;
      margin-right: 5px;
      cursor: pointer;
    }
  }

  .info {
    background: transparent;
    height: 30px;
    width: 200px;
    margin-right: 7px;
    cursor: pointer;
    bottom: 14px;
    right: 133px;
    position: absolute;
  }

  .body {
    padding: 15px;

    .item_content {
      display: flex;
      margin-top: 1px;

      .title {
        width: 212px;
        height: 24px;
        color: #bfebff;
        font-size: 16px;
        background: rgba(0, 0, 0, 0.2);
        text-align: left;
        line-height: 24px;
        margin-left: 1px;

        span {
          margin-left: 10px;
          -webkit-animation: focus-in-expand 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
          animation: focus-in-expand 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
        }
      }

      .content {
        margin-left: 3px;
        width: 237px;
        height: 24px;
        color: white;
        font-size: 16px;
        background: rgba(0, 0, 0, 0.2);
        text-align: left;
        line-height: 23px;

        span {
          margin-left: 10px;
          -webkit-animation: focus-in-expand 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
          animation: focus-in-expand 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
        }
      }
    }
  }

  .bottom_title {
    font-size: 16px;
    color: white;
    text-align: left;
    margin-left: 23px;
    margin-top: -10px;
  }

  .camera_content {
    padding: 10px;
    margin-left: 5px;
    height: 16%;

    .camera_item {
      display: flex;
      margin-top: 1px;

      span {
        margin-left: 10px;
        -webkit-animation: focus-in-expand 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
        animation: focus-in-expand 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
      }

      .name {
        height: 24px;
        width: 72px;
        color: #bfebff;
        font-size: 16px;
        background: rgba(0, 0, 0, 0.2);
        text-align: left;
        line-height: 23px;
      }

      .type {
        height: 24px;
        width: 72px;
        color: #bfebff;
        font-size: 16px;
        background: rgba(0, 0, 0, 0.2);
        text-align: left;
        line-height: 23px;
        margin-left: 1px;
      }

      .name_value {
        height: 24px;
        width: 151px;
        color: white;
        font-size: 16px;
        background: rgba(0, 0, 0, 0.2);
        text-align: left;
        line-height: 23px;
        margin-left: 1px;
      }

      .type_value {
        height: 24px;
        width: 151px;
        color: white;
        font-size: 16px;
        background: rgba(0, 0, 0, 0.2);
        text-align: left;
        line-height: 23px;
        margin-left: 1px;
      }

      .camera_icon {
        background: url("../../assets/img/popupIMG/camrea_icon.png") no-repeat;
        width: 20px;
        height: 20px;
        cursor: pointer;
        position: absolute;
        right: 20px;
        margin-top: 3px;

        video {}
      }
    }
  }

  .billboard_content {
    padding: 10px;
    margin-top: 10px;
    margin-left: 14px;
    background: rgba(0, 0, 0, 0.2);
    width: 90%;
    height: 16%;
    color: white;

    p {
      padding: 0px;
      margin: 0px;
      text-align: left;
      word-break: break-all;
    }
  }

  .camera_box {
    position: absolute;
    left: 0px;
    top: 36px;
    padding: 17px;
    height: 320px;
    -webkit-animation: scale-in-ver-bottom 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
    animation: scale-in-ver-bottom 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;

    video {
      width: 100%;
      height: 100%;
      object-fit: fill;
    }

    .close {
      background: url("../../assets/img/popupIMG/close.png") no-repeat;
      width: 20px;
      height: 20px;
      position: absolute;
      right: 19px;
      top: 20px;
      cursor: pointer;
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

@-webkit-keyframes focus-in-expand {
  0% {
    letter-spacing: -0.5em;
    -webkit-filter: blur(12px);
    filter: blur(12px);
    opacity: 0;
  }

  100% {
    -webkit-filter: blur(0px);
    filter: blur(0px);
    opacity: 1;
  }
}

@keyframes focus-in-expand {
  0% {
    letter-spacing: -0.5em;
    -webkit-filter: blur(12px);
    filter: blur(12px);
    opacity: 0;
  }

  100% {
    -webkit-filter: blur(0px);
    filter: blur(0px);
    opacity: 1;
  }
}

@-webkit-keyframes slide-in-elliptic-top-fwd {
  0% {
    -webkit-transform: translateY(-600px) rotateX(-30deg) scale(0);
    transform: translateY(-600px) rotateX(-30deg) scale(0);
    -webkit-transform-origin: 50% 100%;
    transform-origin: 50% 100%;
    opacity: 0;
  }

  100% {
    -webkit-transform: translateY(0) rotateX(0) scale(1);
    transform: translateY(0) rotateX(0) scale(1);
    -webkit-transform-origin: 50% 1400px;
    transform-origin: 50% 1400px;
    opacity: 1;
  }
}

@keyframes slide-in-elliptic-top-fwd {
  0% {
    -webkit-transform: translateY(-600px) rotateX(-30deg) scale(0);
    transform: translateY(-600px) rotateX(-30deg) scale(0);
    -webkit-transform-origin: 50% 100%;
    transform-origin: 50% 100%;
    opacity: 0;
  }

  100% {
    -webkit-transform: translateY(0) rotateX(0) scale(1);
    transform: translateY(0) rotateX(0) scale(1);
    -webkit-transform-origin: 50% 1400px;
    transform-origin: 50% 1400px;
    opacity: 1;
  }
}

@-webkit-keyframes scale-in-ver-bottom {
  0% {
    -webkit-transform: scaleY(0);
    transform: scaleY(0);
    -webkit-transform-origin: 0% 100%;
    transform-origin: 0% 100%;
    opacity: 1;
  }

  100% {
    -webkit-transform: scaleY(1);
    transform: scaleY(1);
    -webkit-transform-origin: 0% 100%;
    transform-origin: 0% 100%;
    opacity: 1;
  }
}

@keyframes scale-in-ver-bottom {
  0% {
    -webkit-transform: scaleY(0);
    transform: scaleY(0);
    -webkit-transform-origin: 0% 100%;
    transform-origin: 0% 100%;
    opacity: 1;
  }

  100% {
    -webkit-transform: scaleY(1);
    transform: scaleY(1);
    -webkit-transform-origin: 0% 100%;
    transform-origin: 0% 100%;
    opacity: 1;
  }
}
</style>