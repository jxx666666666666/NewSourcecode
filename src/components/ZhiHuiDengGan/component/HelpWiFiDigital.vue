<template>
  <div class="sensorPanelBox">
    <div class="sensorPaneltitle">{{ titleName }}</div>
    <div class="sensorPaneldownBox">
      <div class="sensorPanelPhoto">
        <img :src="imgTop" alt="" />
      </div>
      <div class="styleList">
        <div class="contentbox" v-for="(item, index) in ValueData" :key="index">
          <div class="name">{{ item.name }}</div>
          <div class="downBox">
            <img :src="imglist" alt="" />
            <span class="value" :title="item.value">{{ item.value }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    ValueData: {
      type: Array,
      default: () => {
        return [
          { name: "WiFi", value: "Normal" },
          { name: "Signal strength", value: "-40dbm~-85dbm" },
        ];
      },
    },
    imglist: {
      type: String,
      default: () => {
        return require("../img/namepoint.png");
      },
    },
    imgTop: {
      type: String,
      default: () => {
        return require("../img/wifi.png");
      },
    },
    titleName: {
      type: String,
      default: "WiFi",
    },
  },
};
</script>

<style lang="less" scoped>
.sensorPanelBox {
  width: 100%;
  height: 100%;
  background: url("../img/sensorPanelBG.png") no-repeat center center;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  pointer-events: all;

  .sensorPaneltitle {
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

  .sensorPaneldownBox {
    width: 95%;
    height: 390px;
    position: relative;
    top: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .sensorPanelPhoto {
      width: 296px;
      height: 356px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid #1c9dcc;
      box-shadow: 0px 0px 30px -9px #1c9dcc;
    }

    .styleList {
      width: 500px;
      height: 300px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      position: relative;
      top: -30px;

      .contentbox:nth-of-type(2) {
        .downBox {
          .value {
            height: 162px;
            position: absolute;
            top: -12px;
            left: 40px;
          }
        }
      }

      .contentbox {
        width: 85%;
        height: 200px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;

        .name {
          width: 250px;
          height: 40px;
          background: url("../img/Namebg.png") no-repeat center center;
          text-align: center;
          color: #fff;
          font-size: 24px;
          line-height: 40px;
        }

        .downBox {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          position: relative;
          top: 20px;

          .value {
            background-image: -webkit-linear-gradient(bottom, #ffffff, #facf76);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-size: 28px;
            position: relative;
            left: 20px;
            width: 340px;
            word-wrap: break-word;
          }
        }
      }
    }
  }
}
</style>