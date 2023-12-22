<template>
  <div class="startPoleName">
    <div class="title">{{ titleData }}</div>
    <div class="bodyContent">
      <div class="NameList">
        <div class="NameListBox" v-for="(item, index) in NameListData" :key="index">
          <div class="point"></div>
          <span>{{ item.name }}</span>
          <span>{{ item.value }}</span>
        </div>
      </div>
      <div class="BrightBox">
        <div class="BrightList" v-for="(item, index) in BrightListData" :key="index">
          <img :src="item.img" alt="" />
          <div class="BrightName">
            <div class="BrightPoint">
              <div></div>
            </div>
            <span>{{ item.name }}</span>
          </div>
        </div>
      </div>
      <div class="downName">
        <div class="pointName">
          <div class="pointDown"></div>
          <span>Region</span>
        </div>
        <div class="downNameBox">
          <span>Color 【blue】</span>
          <span>Area Type【area A】</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    titleData: {
      type: String,
      default: "Smart Pole Name",
    },
    NameListData: {
      type: Array,
      default: () => {
        return [
          { name: "Smart Pole ID", value: "15648921548000" },
          { name: "Pole Type", value: "Single-arm light with screen" },
          { name: "Smart Lighting State", value: "Half Bright" },
        ];
      },
    },
    BrightListData: {
      type: Array,
      default: () => {
        return [
          { img: require("../img/FullBright.png"), name: "Full Bright" },
          { img: require("../img/HalfBright.png"), name: "Half Bright" },
          { img: require("../img/DimlyBright.png"), name: "Dimly Bright" },
          { img: require("../img/Off.png"), name: "Off" },
        ];
      },
    },
  },
};
</script>

<style lang="less" scoped>
.startPoleName {
  width: 100%;
  height: 100%;
  background: url("../img/StartPolebc.png") no-repeat center center;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  .bodyContent {
    width: 96%;
    height: 472px;
    position: relative;
    top: 30px;

    .downName {
      width: 92%;
      height: 100px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 auto;

      .downNameBox {
        width: 60%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        span {
          font-family: "Adobe Heiti Std";
          font-size: 28px;
          color: #fff;
        }
      }

      .pointName {
        width: 30%;
        height: 100%;
        display: flex;
        align-items: center;

        span {
          font-family: "Helvetica";
          font-size: 28px;
          color: #fff;
          position: relative;
          left: 15px;
        }

        .pointDown {
          width: 12px;
          height: 12px;
          background-color: #4dffff;
          border-radius: 12px;
        }
      }
    }

    .NameList {
      width: 100%;
      height: 215px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      margin-top: 15px;

      .NameListBox {
        width: 96%;
        height: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .point {
          width: 12px;
          height: 12px;
          background-color: #4dffff;
          border-radius: 12px;
          position: relative;
          left: 15px;
        }

        span:nth-of-type(1) {
          font-family: "Helvetica";
          color: #fff;
          font-size: 28px;
          width: 30%;
          position: relative;
          right: 45px;
        }

        span:nth-of-type(2) {
          color: #fff;
          font-size: 28px;
          width: 50%;
          position: relative;
          right: 20px;
        }
      }
    }

    .BrightBox {
      width: 88%;
      height: 120px;
      display: flex;
      margin: 0 auto;
      justify-content: space-between;
      align-items: center;
      margin-top: 10px;

      .BrightList:nth-of-type(3) {
        position: relative;
        left: 15px;
      }

      .BrightList {
        width: 135px;
        height: 88px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;

        img {
          width: 54px;
          height: 54px;
        }

        .BrightName {
          width: 135%;
          display: flex;
          justify-content: center;
          align-items: center;

          span {
            color: #bfdfff;
            font-size: 24px;
            margin-left: 5px;
          }

          .BrightPoint {
            width: 10px;
            height: 10px;
            border: 1px solid #4dffff;
            border-radius: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 5px;

            div {
              width: 7px;
              height: 7px;
              border-radius: 7px;
              background-color: #fff;
            }
          }
        }
      }
    }
  }

  .title {
    width: 96%;
    height: 50px;
    text-align: center;
    line-height: 50px;
    font-family: "Helvetica";
    font-size: 32px;
    background-image: -webkit-linear-gradient(right, #f8fbae, #eaf213);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    position: relative;
    top: 15px;
  }
}
</style>