<template>
  <div class="signageBox">
    <div class="signageTitle">
      <span>NO.3</span>
      <span>Digital Signage Properties</span>
    </div>
    <div class="signageContent">
      <div class="contentList" v-for="(item, index) in signageData" :key="index">
        <img src="../img/threePoint.png" alt="" />
        <span class="name">{{ item.name }}</span>
        <span class="value" :title="item.value">{{ item.value }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    signageData: {
      type: Array,
      default: () => {
        return [
          { name: "DIgital Signage", value: "Normal" },
          {
            name: "DIgital Signage",
            value:
              "Over the years digital signage in public places has become an increasingly common sight in shopping centers around the world",
          },
        ];
      },
    },
  },
};
</script>

<style lang="less" scoped>
.signageBox {
  width: 100%;
  height: 100%;
  background: url("../img/surveillance.png") no-repeat center center;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  .signageTitle {
    width: 97%;
    position: relative;
    top: -5px;
    left: 1px;

    span:nth-of-type(1) {
      font-size: 28px;
      color: #fff;
      text-shadow: 0px 4px 40px #8bc2f9;
    }

    span:nth-of-type(2) {
      font-family: "Helvetica";
      font-size: 32px;
      font-weight: bold;
      color: #fff;
      text-shadow: 0px 4px 40px #8bc2f9;
      position: relative;
      left: 20px;
      font-style: italic;
    }
  }

  .signageContent {
    width: 95%;
    height: 215px;
    position: relative;
    top: 36px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    .contentList:nth-of-type(2) {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      .name {
        color: #fff;
        font-size: 28px;
        font-family: "Helvetica";
        width: 200px;
        margin: 0px 30px 0px 20px;
      }

      .value {
        width: 90%;
        color: #64f8fd;
        position: absolute;
        top: 100px;
        left: 35px;
        text-indent: 2em;
        letter-spacing: 4px;
        word-wrap: break-word;
        line-height: 40px;
        height: 120px;
        overflow: hidden;
      }
    }

    .contentList {
      line-height: 50px;
    }

    .contentList:nth-of-type(1) {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      .name {
        color: #fff;
        font-size: 28px;
        font-family: "Helvetica";
        width: 200px;
        margin: 0px 30px 0px 20px;
      }

      .value {
        color: #64f8fd;
      }
    }
  }
}
</style>