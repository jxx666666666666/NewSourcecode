<!--
 * @Descripttion:
 * @version: 1.0.0
 * @Author: guozhiqing
 * @Date: 2021-06-21 15:21:13
 * @LastEditors: guozhiqing
 * @LastEditTime: 2021-06-23 14:07:10
-->
<template>
  <div class="clock">
    <div class="lefttime" v-cloak>{{ time }}</div>
    <div class="date">
      <div class="day" v-cloak>{{ day }}</div>
      <div class="week" v-cloak>{{ EWeek }}</div>
    </div>
  </div>
</template>
<script>
import Time from "@/utils/common/time";
export default {
  data() {
    return {
      timer: null,
      now: null,
      day: null,
      time: null,
      week: null,
      EWeek: "",
    };
  },
  mounted() {
    this.initDay();
    this.timer = setInterval(() => {
      this.initDay();
    }, 1000);
  },
  methods: {
    initDay() {
      this.now = new Date();
      this.week = Time.getWeek(this.now);
      // this.day = Time.format("yyyy/MM/dd", this.now);
      let Month = Time.getMonth(this.now);
      let Year = this.now.getFullYear().toString();
      let day = Time.format("dd", this.now);
      this.day = day + '-' + Month + '-' + Year;
      this.time = Time.format("HH:mm:ss", this.now);
    },
  },
  watch: {
    week: {
      handler(neval) {
        switch (neval) {
          case "Monday":
            this.EWeek = "Monday";
            break;
          case "Tuesday":
            this.EWeek = "Tuesday";
            break;
          case "Wednesday":
            this.EWeek = "Wednesday";
            break;
          case "Thursday":
            this.EWeek = "Thursday";
            break;
          case "Friday":
            this.EWeek = "Friday";
            break;
          case "Saturday":
            this.EWeek = "Saturday";
            break;
          case "Sunday":
            this.EWeek = "Sunday";
            break;
        }
      },
    },
  },
  beforeDestroy() {
    this.timer && clearInterval(this.timer);
  },
};
</script>
<style lang="less" scoped>
.clock {
  width: 300px;
  height: 40px;
  display: flex;
  // background: url("../../assets/img/layout/rightTitle.png") no-repeat;
  // background-position: 0% 100%;
  // background-size: 100% 100%;

  .lefttime {
    width: 180px;
    font-family: "Voltage";
    font-size: 64px;
    color: #e9e9e9;
    letter-spacing: 3px;
  }

  .date {
    width: 120px;

    .day {
      font-family: "Voltage";
      font-size: 30px;
      color: #13bfff;
      line-height: 30px;
    }

    .week {
      font-family: "Helvetica";
      font-size: 22px;
      line-height: 22px;
      color: #bff252;
    }
  }
}</style>
