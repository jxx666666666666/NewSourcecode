<template>
  <div class="qyjylypj">
    <vueSeamlessScroll :data="list" :class-option="classOption" ref="vueScoll" class="vueScroll">
      <div class="item" v-for="(item, index) in list" :key="index">
        <div class="icon" v-if="icon">
          <img src="../../assets/img/GongGongAnQuan/zeren-one.png" v-if="index == 0" alt />
          <img src="../../assets/img/GongGongAnQuan/zeren-two.png" v-if="index == 1" alt />
          <img src="../../assets/img/GongGongAnQuan/zeren-three.png" v-if="index == 2" alt />

          <img src="../../assets/img/GongGongAnQuan/zeren-bg.png" v-if="index > 2" alt />
        </div>
        <div v-if="icon">
          <div class="index" v-if="index > 2">0{{ index + 1 }}</div>
          <div class="index" v-if="index <= 2"></div>
        </div>

        <div class="name">{{ item.name }}</div>
        <div class="bar">
          <div class="sx" :style="{ width: zblist[index] }"></div>
        </div>
        <div class="value">{{ item.value }}</div>
        <div class="unit">{{ unit }}</div>
      </div>
    </vueSeamlessScroll>
  </div>
</template>

<script>
import vueSeamlessScroll from "vue-seamless-scroll";
export default {
  data() {
    return {
      zs: 0,
      zblist: []
    };
  },
  components: {
    vueSeamlessScroll
  },
  mounted() {
    this.zs = 0;
    this.list.forEach(item => {
      this.zs += parseFloat(item.value);
    });
    this.list.forEach(item => {
      this.zblist.push(this.bfb(item.value));
    });
  },
  computed: {
    classOption() {
      return {
        step: 0.8, // The higher the value, the faster the scrolling speed
        limitMoveNum: 6, // The amount of data that starts rolling seamlessly this.dataList.length
        hoverStop: true, // Enable mouse hover stop
        direction: 1, // 0 Down 1 Up 2 Left 3 Right
        openWatch: false, // Enable real-time data monitoring and refresh dom
        singleHeight: 0, // The height at which a single step motion stops (the default value of 0 is seamless rolling without stopping) direction => 0/1
        singleWidth: 0, // Width of single step motion stop (default value of 0 is seamless rolling without stopping) direction => 2/3
        waitTime: 1000 // Time to stop single step motion (default value 1000ms)
      };
    }
  },
  methods: {
    bfb(num) {
      num = parseFloat(num);
      this.zs = parseFloat(this.zs);
      if (isNaN(num) || isNaN(this.zs)) {
        return "-";
      }
      return this.zs <= 0 ? "0%" : Math.round((num / this.zs) * 100) + "%";
    }
  },
  props: {
    unit: {
      type: String,
      default: ""
    },
    icon: {
      type: Boolean,
      default: true
    },
    list: {
      type: Array,
      default: () => {
        return [
          {
            name: "Incident Type 01",
            value: "4354"
          },
          {
            name: "Incident Type 02",
            value: "2345"
          },
          {
            name: "Incident Type 03",
            value: "1983"
          },
          {
            name: "Incident Type 04",
            value: "1548"
          },
          {
            name: "Incident Type 05",
            value: "1043"
          }
        ];
      }
    }
  }
};
</script>

<style lang="less" scoped>
.qyjylypj {
  width: 100%;
  height: 100%;

  .title {
    position: relative;
    font-family: 'Montserrat', sans-serif;
    font-size: 26px;
    background: linear-gradient(to bottom, #fff, #99ecfb);
    -webkit-background-clip: text;
    padding-left: 10px;
    color: transparent;

    &::before {
      position: absolute;
      top: 5px;
      left: 0;

      width: 5px;
      height: 20px;
      background-color: #2ea0f5;
      content: "";
    }
  }

  .item {
    height: 65px;
    display: flex;
    position: relative;
    background: url("../../assets/img/GongGongAnQuan/itembj.png") center bottom
      no-repeat;
    & > div {
      margin: 0 10px;
    }

    .icon {
      position: absolute;
      left: 0;
      top: 16px;
      width: 43px;
      height: 44px;
      img {
        width: 40px;
        height: 36px;
        margin-top: 7px;
      }
    }

    .index {
      width: 43px;
      height: 44px;
      line-height: 44px;
      font-family: Voltage;
      text-align: center;
      font-size: 26px;
      color: #ffffff;
      margin-top: 21px;
    }

    .name {
      height: 60px;
      line-height: 80px;
      width: 157px;
      font-family: "Helvetica";
      // margin-left: 35px;
      font-size: 22px;
      background: linear-gradient(to bottom, #FFFFFF, #FFFFFF);
      -webkit-background-clip: text;
      color: #FFFFFF;
    }

    .bar {
      width: 430px;
      height: 8px;
      background-color: #3e4f61;
      margin-top: 35px;

      .sx {
        height: 100%;
        width: 20%;
        background: linear-gradient(to right, #2693ff, #4dffff);
      }
    }

    .value {
      font-family: "Voltage";
      color: #ffffff;
      font-size: 34px;
      width: 60px;
      height: 60px;
      line-height: 60px;
      margin-top: 13px;
    }

    .unit {
      font-family: "PingFang SC";
      color: #13d2f2;
      font-size: 20px;
      height: 60px;
      line-height: 60px;
      white-space: nowrap;
      margin: 0;
    }
  }
}
</style>