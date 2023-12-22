<template>
  <div class="popupPanelBox">
    <div class="title">{{ popupTitle }}</div>
    <div class="Contentbox">
      <div class="cmareaBox">
        <img :src="img" alt="" />
      </div>
      <div class="cotainerbox">
        <div class="cameraNameBox">
          <div class="cameraName" v-for="(item, index) in cameraName" :key="index">
            <div class="nametitle">{{ item.name }}</div>
            <div class="name">
              <img src="../img/namepoint.png" alt="" />
              <span>{{ item.value }}</span>
            </div>
          </div>
          <!-- <div class="cameraName">
            <div class="nametitle">Camera Name</div>
            <div class="name">
              <img src="../img/namepoint.png" alt="" />
              <span>XXXXXXXXXXXXX</span>
            </div>
          </div> -->
        </div>
        <div class="videoBox">
          <video class="video" :src="video" autoplay="autoplay" controls="controls" loop="loop"></video>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    popupTitle: {
      type: String,
      default: "Video Surveillance Properties",
    },
    cameraName: {
      type: Array,
      default: () => {
        return [
          { name: "Camera Name", value: "NumberThree Camera" },
          { name: "Camera Type", value: "Dome Camera" },
        ];
      },
    },
    img: {
      type: String,
      default: () => {
        return require("../img/yuanxiangji.png");
      },
    },
    video: {
      type: String,
      default: () => {
        return require("../../../../public/video/01.mp4");
      },
    },
  },
};
</script>

<style lang="less" scoped>
.popupPanelBox {
  width: 100%;
  height: 100%;
  background: url("../img/PopupPanelBG.png") no-repeat center center;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  pointer-events: all;

  .Contentbox {
    display: flex;
    justify-content: space-between;
    width: 95%;
    position: relative;
    top: 60px;

    .cmareaBox {
      width: 300px;
      height: 360px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid #1c9dcc;
      box-shadow: 0px 0px 50px -9px #1c9dcc;
    }

    .cotainerbox {
      width: 660px;
      height: 480px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;

      .videoBox {
        width: 99%;
        height: 355px;
        border: 1px solid #1c9dcc;

        .video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .cameraNameBox {
        width: 93%;
        height: 110px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .cameraName {
          width: 40%;
          height: 100%;

          .nametitle {
            background: url("../img/Namebg.png") no-repeat center center;
            background-size: 100% 100%;
            width: 250px;
            height: 45px;
            font-size: 24px;
            color: #fff;
            text-align: center;
            line-height: 45px;
          }

          .name {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            left: 20px;
            position: relative;
            top: 10px;

            img {
              margin: 0 10px;
            }

            span {
              width: 100%;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              font-size: 28px;
              background-image: -webkit-linear-gradient(right,
                  #ffffff,
                  #facf76);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }
          }
        }
      }
    }
  }

  .title {
    width: 100%;
    text-align: center;
    background-image: -webkit-linear-gradient(right, #ffffff, #d5f7fd);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 30px;
    font-family: "Helvetica";
    position: relative;
    top: 10px;
  }
}
</style>