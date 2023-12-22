<template>
  <div class="sensorPanelBox">
    <div class="sensorPaneltitle">{{ titleName }}</div>
    <div class="sensorPaneldownBox">
      <div class="sensorPanelPhoto">
        <img :src="imgTop" alt="" />
      </div>
      <div class="styleList">
        <div class="contentList" v-for="(item, index) in ValueData" :key="index">
          <div class="imgname">
            <img :src="imgList[index].img" alt="" />
            <div class="name">{{ item.name }}</div>
          </div>
          <div class="valueBox">
            <span class="value">{{ item.value }}</span>
            <span class="unit">{{ item.unit }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imgList: {
      type: Array,
      default: () => {
        return [
          { img: require("../img/shandian.png") },
          { img: require("../img/light.png") },
          { img: require("../img/suo.png") },
        ];
      },
    },
    ValueData: {
      type: Array,
      default: () => {
        return [
          { name: "Power", value: "50", unit: "W" },
          { name: "Smart Lighting State", value: "Full Bright", unit: "" },
          {
            name: "Region",
            value: "Color【blue】Area Type【area A】",
            unit: "",
          },
        ];
      },
    },
    imgTop: {
      type: String,
      default: () => {
        return require("../img/POLE.png");
      },
    },
    titleName: {
      type: String,
      default: "Smart Pole Properties ",
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

      .contentList:nth-of-type(1) {
        .valueBox {
          .value {
            font-size: 40px;
            width: 110px;
            position: relative;
            left: 36px;
          }

          .unit {
            position: relative;
            left: 40px;
          }
        }
      }

      .contentList:nth-of-type(2) {
        .img {
          position: relative;
          top: -5px;
        }

        .valueBox {
          height: 75px;
          position: relative;
          top: -10px;

          .value {
            font-size: 28px;
            position: relative;
            left: 13px;
          }
        }
      }

      .contentList:nth-of-type(3) {
        .img {
          position: relative;
          top: -5px;
        }

        .valueBox {
          height: 75px;
          position: relative;
          top: -10px;

          .value {
            font-size: 28px;
            position: relative;
            left: 65px;
          }
        }
      }

      .contentList {
        width: 85%;
        height: 120px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;

        .imgname {
          width: 337px;
          display: flex;
          justify-content: space-between;
          align-items: center;

          img {
            width: 58px;
            height: 61px;
          }

          .name {
            color: #fff;
            font-size: 24px;
            position: relative;
            left: 30px;
            width: 300px;
          }
        }

        .valueBox {
          width: 300px;

          .value {
            width: 250px;
            background-image: -webkit-linear-gradient(bottom, #ffffff, #facf76);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            display: inline-block;
            text-align: center;
            position: relative;
            left: 15px;
          }

          .unit {
            position: relative;
            top: 8px;
            color: #00a3d8;
            font-size: 20px;
            position: relative;
            left: 20px;
            width: 40px;
            display: inline-block;
          }
        }
      }
    }
  }
}
</style>