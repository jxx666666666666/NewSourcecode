<template>
  <div class="cont-box" :key="key">
    <div
      class="item-box"
      v-for="(item, index) in data"
      :key="index"
      @click="itemClick(item)"
      :class="activeName == item.name ? 'active' : ''"
    >
      <div class="name">
        {{ item.name }}
        <StaticItemVue
          :num="item.num"
          :color="index == 0 ? '#44E470' : '#D95E52'"
        ></StaticItemVue>
      </div>
    </div>
  </div>
</template>

<script>
import StaticItemVue from "../common/StaticItem.vue";
export default {
  components: {
    StaticItemVue,
  },
  props: {
    data: {
      type: Array,
      default: () => {
        return [
          {
            name: "",
            num: "",
          },
          {
            name: "",
            num: "",
          },
        ];
      },
    },
  },
  data() {
    return {
      key: 0,
      activeName: "",
    };
  },
  created() {
    this.data.forEach((item) => {
      item.num = this.add(item.num);
    });
  },
  methods: {
    add(num) {
      var num = (num || 0).toString();
      var num1 = num.indexOf(".");
      var num3 = num.indexOf("-");
      if (num1 == "-1") {
        if (num3 != "-1") {
          var result = "";
          var num4 = num.substring(1, num.length);
          while (num4.length > 3) {
            result = "," + num4.slice(-3) + result;
            num4 = num4.slice(0, num4.length - 3);
          }
          if (num4) {
            result = num4 + result;
          }
          return "-" + result;
        } else {
          var result = "";
          while (num.length > 3) {
            result = "," + num.slice(-3) + result;
            num = num.slice(0, num.length - 3);
          }
          if (num) {
            result = num + result;
          }
          return result;
        }
      } else {
        if (num3 != "-1") {
          var num2 = num.substring(1, num1);
          var num3 = num.substring(num1, num.length);
          var result = "";
          while (num2.length > 3) {
            result = "," + num2.slice(-3) + result;
            num2 = num2.slice(0, num2.length - 3);
          }
          if (num2) {
            result = num2 + result;
          }
          return "-" + result + num3;
        } else {
          var num2 = num.substring(0, num1);
          var num3 = num.substring(num1, num.length);
          var result = "";
          while (num2.length > 3) {
            result = "," + num2.slice(-3) + result;
            num2 = num2.slice(0, num2.length - 3);
          }
          if (num2) {
            result = num2 + result;
          }
          return result + num3;
        }
      }
    },
    itemClick(item) {
      if (this.activeName == item.name) {
        this.activeName = "";
        // this.$store.commit('setHighLight', '');
      } else {
        this.activeName = item.name;
      }
      this.$emit("itemClick", this.activeName);
    },
    clearHigh() {
      this.activeName = "";
    },
  },

  watch: {
    data: {
      handler(neval) {
        this.key += 1;
      },
    },
  },
};
</script>

<style lang="less" scoped>
.cont-box {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  //   background-color: #000;
  box-sizing: border-box;
  padding-top: 25px;

  .item-box {
    width: 100%;
    height: 100%;
    // background: url(../../assets/img/Common/ST-bg.png) no-repeat center center;
    // background-size: 80% 60%;

    .name {
      width: 100%;
      text-align: center;
      font-size: 32px;
      color: #fff;
      font-family: "Helvetica";
      font-weight: Regular;
    }

    .num {
      width: 100%;
      text-align: center;
      margin-top: 40px;
      font-size: 80px;
      font-family: "Roboto";
      font-weight: Regular;
      color: #fff;
    }
  }

  .active {
    background: url(../../assets/img/Common/ST-bg_active.png) no-repeat center
      center;
    background-size: 80% 60%;
  }
}
</style>