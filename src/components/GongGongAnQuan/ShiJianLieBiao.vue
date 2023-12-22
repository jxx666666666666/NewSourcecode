<template>
  <div>
    <div class="tdlb-item" @click.stop="scrollclick">
      <div class="tdlb-title">
        <div v-for="item in tableHead" :key="item.index">
          <div :style="{ width: item.mesuers + 'px', 'text-align': item.align }">{{ item.name }}</div>
        </div>
      </div>

      <vueSeamlessScroll
        :data="tableBody"
        :class-option="classOption"
        ref="vueScoll"
        class="vueScroll"
      >
        <div
          class="tdlb-content"
          v-for="(item2, index) in tableBody"
          :key="index"
          @click="TableClick(item2, index)"
        >
          <!-- <div :class="item2.isActive ? 'tdqk' : ''"> -->
          <div :class="{ active: currentIndex === index }">
            <div style="display: flex">
              <div
                :style="{ width: tableHead[0].mesuers + 'px' }"
                style="
                  text-overflow: ellipsis;
                  overflow: hidden;
                  white-space: nowrap;
                  text-align: center;
                "
                :data-index="item2.name"
                :data-id="item2.lv"
              >{{ item2.name }}</div>
              <div
                class="textcenter"
                :style="{ width: tableHead[1].mesuers + 'px' }"
                style="
                  text-overflow: ellipsis;
                  overflow: hidden;
                  white-space: nowrap;
                  text-align: center;
                "
              >{{ item2.value }}</div>
              <div
                :style="{ width: tableHead[2].mesuers + 'px' }"
                style="
                  text-overflow: ellipsis;
                  overflow: hidden;
                  white-space: nowrap;
                  text-align: center;
                "
              >{{ item2.lv }}</div>
              <div
                :style="{ width: tableHead[3].mesuers + 'px' }"
                style="
                  text-overflow: ellipsis;
                  overflow: hidden;
                  white-space: nowrap;
                  text-align: center;
                "
              >{{ item2.hotel }}</div>
              <div
                :style="{ width: tableHead[4].mesuers + 'px' }"
                style="
                  text-overflow: ellipsis;
                  overflow: hidden;
                  white-space: nowrap;
                  text-align: center;
                "
              >{{ item2.daba }}</div>
             
            </div>
          </div>
        </div>
      </vueSeamlessScroll>
    </div>
  </div>
</template>
  
  <script>
// Introducing seamless rolling components from top to bottom
import vueSeamlessScroll from "vue-seamless-scroll";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      type: "",
      isFristClick: true,
      oldname: "",
      olditem: null,
      currentIndex: -1
    };
  },
  computed: {
    ...mapState(["isTableClick"])
  },
  props: {
    scrollCount: {
      type: Number,
      default: 5
    },
    tableHead: {
      type: Array,
      default: () => {
        return [
          { name: "Alarm Time", mesuers: 330 },
          { name: "Alarm Phone Number", mesuers: 330 },
          { name: "Alarm Location", mesuers: 330 },
          { name: "Alarm Content", mesuers: 330 },
          { name: "Alarm Handling", mesuers: 330 }
        ];
      }
    },
    tableBody: {
      type: Array,
      default: () => {
        return [
          {
            name: "2022-03-22 10:00:00",
            value: "12345678",
            lv: "Location 01",
            hotel: "Content1",
            daba: "Handling1",
          },
          {
            name: "2022-03-22 10:00:00",
            value: "12345678",
            lv: "Location 02",
            hotel: "Content2",
            daba: "Handling2",
          },
          {
            name: "2022-03-22 10:00:00",
            value: "12345678",
            lv: "Location 03",
            hotel: "Content3",
            daba: "Handling3",
          },
          {
            name: "2022-03-22 10:00:00",
            value: "12345678",
            lv: "Location 04",
            hotel: "Content4",
            daba: "Handling4",
          },
          {
            name: "2022-03-22 10:00:00",
            value: "12345678",
            lv: "Location 05",
            hotel: "Content5",
            daba: "Handling5",
          }
        ];
      }
    }
  },
  components: {
    vueSeamlessScroll
  },
  computed: {
    classOption() {
      return {
        step: 0.3, // The higher the value, the faster the scrolling speed
        limitMoveNum: this.scrollCount, // The amount of data that starts rolling seamlessly this.dataList.length
        hoverStop: true, // Enable mouse hover stop
        direction: 1, // 0 Down 1 Up 2 Left 3 Right
        openWatch: true, // Enable real-time data monitoring and refresh dom
        singleHeight: 0, // The height at which a single step motion stops (the default value of 0 is seamless rolling without stopping) direction => 0/1
        singleWidth: 0, // Width of single step motion stop (default value of 0 is seamless rolling without stopping) direction => 2/3
        waitTime: 1000 // Time to stop single step motion (default value 1000ms)
      };
    }
  },
  created() {},
  mounted() {},
  methods: {
    scrollclick(e) {},

    TableClick(item, index) {},

    // update data

    updatedPath() {}
  }
};
</script>
  
  <style lang="less" scoped>
.vueScroll {
  height: 240px;
}
.tdlb-item {
  width: 1673px;
  & > div {
    overflow: auto;
    // overflow-y: auto;
  }
  .tdlb-title {
    width: 1673px;
    height: 40px;
    padding-left: 10px;
    display: flex;
    font-family: 'Microsoft YaHei', sans-serif;
    font-size: 22px;
    color: #ffffff;
    text-align: center;
    background: url("../../assets/img/GongGongAnQuan/listbj.png") center bottom
      no-repeat;
  }
  .tdlb-content {
    padding-left: 12px;
    width: 1670px;
    height: 42px;
    display: flex;
    background: url("../../assets/img/GongGongAnQuan/liebiaobj.png") center
      bottom no-repeat;
    background-size: 100% 100%;
    font-family: 'Microsoft YaHei', sans-serif;
    font-size: 22px;
    color: #bfffff;
    position: relative;
    margin-top: 15px;
    .tdqk {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      border: 2px #f9fe25 solid;
      position: absolute;
      top: 0;
      left: 0;
      box-shadow: 0px 0px 12px 6px rgba(255, 201, 38, 0.65);
    }
    .tdqk::before {
      content: "";
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      box-shadow: 0px 0px 12px 6px rgba(255, 201, 38, 0.65) inset;
      background-color: rgba(255, 201, 38, 0.15);
    }
    .tableContent {
      display: flex;
    }
  }
}
.tdlb-content {
  margin-top: 22px;
  & > div {
    & > div {
      line-height: 40px;
    }
  }
}
.active {
  width: 1240px !important;
  height: 62px !important;
  // background-image: url('../../assets/img/alert/bkkbj.png') !important;
  background-size: 100% 103%;
  background-position-y: 0px;
  background-repeat: no-repeat;
  & > div {
    line-height: 40px;
  }
}
</style>