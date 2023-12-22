<!-- @forrmat -->

<template>
  <div class="t-list" :style="{ width: tableWidth }">
    <div class="list-header" :style="{ width: tableWidth }" v-if="showHeader">
      <div
        class="header-item"
        :style="{
          width: item.width,
          height: tableHeartHeight,
        }"
        v-for="(item, index) in headerListData"
        :key="index"
      >
        {{ item.name }}
      </div>
    </div>

    <div class="t-body" ref="bodyBox" :style="{ height: tableHeight }">
      <div
        class="body-content"
        ref="bodyList"
        @mouseenter="tableMouseOver"
        @mouseleave="tableMouseOut"
      >
        <div
          class="body-item"
          v-for="(item, index) in bodyListData"
          :key="index"
          :style="{ height: tableItemHeight }"
          :class="{
            active: index == (isInClickIndex ? rowClickIndex : rowClicki),
          }"
          @click="itemClick(item, index)"
        >
          <!-- <div :class="item.isActive ? 'tdqk' : 'tdpks'"> -->
          <div
            class="item-colom"
            v-for="(citem, cindex) in headerListData"
            :key="cindex"
            :style="{
              width: citem.width,
              lineHeight: '10px',
            }"
          >
            <!-- {{citem.width}} -->
            <div :title="item[citem.key]">
              {{ item[citem.key] ? item[citem.key] : "No data available" }}
            </div>
          </div>
          <!-- </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Switch } from "element-ui";

export default {
  props: {
    // Whether to display the table header.
    showHeader: {
      type: Boolean,
      default: true,
    },
    // Table header data.
    headerListData: {
      type: Array,
      default: () => {
        return [
          {
            name: "Time",
            width: "286px",
            key: "Time",
          },
          {
            name: "Unit",
            width: "256px",
            key: "Unit",
          },
          {
            name: "Mission",
            width: "306px",
            key: "Mission",
          },
        ];
      },
    },
    // Table data.
    bodyListData: {
      type: Array,
      default: () => {
        return [
          {
            Time: "2021-06-16  11:15:23",
            Unit: "Airforce 3#",
            Mission: "Sending Firearm to XX",
          },
          {
            Time: "2021-06-16  11:15:23",
            Unit: "Airforce 3#",
            Mission: "Sending Firearm to XX",
          },
        ];
      },
    },
    // How many data to start scrolling.
    startsScroll: {
      type: Number,
      default: 4,
    },
    // Height of a single row table header.
    tableHeartHeight: {
      type: String,
      default: "40px",
    },
    // Height of a single row table.
    tableItemHeight: {
      type: String,
      default: "40px",
    },
    // Overall width of the table
    tableWidth: {
      type: String,
      default: "100%",
    },
    // Height of the table container.
    tableHeight: {
      type: String,
      default: "286px",
    },
    // Whether to enable external index value change.
    isInClickIndex: {
      type: Boolean,
      default: false,
    },
    // Cancel highlighting on click interaction.
    rowClickIndex: {
      type: Number,
      default: -1,
    },
    // Whether to allow scrolling.
    isScroll: {
      type: Boolean,
      default: true,
    },
    // Whether to allow click interaction.
    isClick: {
      type: Boolean,
      default: false,
    },
    // Whether to display color blocks
    isShowColorBlock: {
      type: Boolean,
      default: false,
    },
    // Highlighted index.
    rowClicki: {
      type: Number,
      default: -1,
    },
  },
  data() {
    return {
      //Timer name
      timers: null,
      currentindex: 0,
      currentScrollTop: 0,
      // //The currently clicked table.
      // rowClicki: -1,
      Colortimer: null,
    };
  },
  watch: {
    // rowClickIndex(newval,old) {
    //   this.rowClickIndex = newval
    // },
  },
  mounted() {
    // this.$bus.$on('updataCard', (number) => {
    //   this.bodyListData.forEach((item) => {
    //     item.isActive = false;
    //     if (number === item.daba) {
    //       item.isActive = true;
    //     }
    //   });
    //   this.$forceUpdate();
    //   this.$refs.vueScoll.reset();
    // });
    if (this.isScroll) {
      this.tableScroll();
    }
    this.Colortimer = setInterval(() => {
      this.setColor();
    }, 200);
  },

  computed: {},
  methods: {
    //Table scrolling
    tableScroll() {
      let that = this;
      clearInterval(this.timers);
      this.timers = setInterval(() => {
        // let ContScroll = document.getElementsByClassName('t-body')[0]
        let ContScroll = that.$refs.bodyBox;
        //Retrieve the current scrolled height
        that.currentScrollTop = parseInt(ContScroll.scrollTop);
        //Retrieve the container's visible height
        let currentBoxHeight = parseInt(ContScroll.scrollHeight);
        if (
          currentBoxHeight - parseInt(that.tableHeight) ==
          that.currentScrollTop
        ) {
          that.currentindex = 0;
          ContScroll.scrollTo(0, 0);
        } else {
          that.currentindex++;
          ContScroll.scrollTo({ top: that.currentindex, left: 0 });
        }
      }, 50);
    },
    setColor() {
      let domList = document.querySelectorAll(".item-colom > div");
      for (let index = 0; index < domList.length; index++) {
        const element = domList[index];
        switch (element.innerText) {
          case "F":
            element.style.color = "#FFC926";
            break;
          case "A":
            element.style.color = "#2693FF";
            break;
        }
      }
    },
    //Click on the table
    itemClick(item, index) {
      if (this.isClick) {
        this.$emit("rowClick", item, index);
        if (!this.isInClickIndex) {
          // this.rowClicki = index;
        }
      }
    },

    // Mouse moves out.
    tableMouseOut() {
      if (this.isScroll) {
        this.tableScroll();
        let ContScroll = this.$refs.bodyBox;
        //Retrieve the current scrolled height.
        this.currentindex = parseInt(ContScroll.scrollTop);
      }
    },

    // Mouse enters.
    tableMouseOver() {
      clearInterval(this.timers);
    },
  },
  // Clear the timer before the page is destroyed.
  beforeDestroy() {
    this.timers && clearInterval(this.timers);
    this.Colortimer && clearInterval(this.Colortimer);
  },
  created() {
    // this.type = this.$route.query.type;
    // console.log(this.bodyListData);
    // this.bodyListData.forEach((item) => {
    //   item.isActive = false;
    //   if (this.type === item.daba) {
    //     item.isActive = true;
    //   }
    // });
    // console.log(this.datalist);
  },
};
</script>

<style lang="less" scoped>
.active {
  // background: rgba(255, 228, 38, 0.35) !important;
  box-shadow: 1px 1px 6px 7px rgba(255, 217, 0, 0.7) inset;
}
.t-list {
  font-size: 14px;
  pointer-events: all;
  .list-header {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    // height: 36px;
    // border-bottom: 1px solid rgba(85, 85, 85, 0.9);
    .header-item {
      // box-sizing: border-box;
      background-color: rgba(0, 83, 135, 0.75);
      color: #bfffff;
      font-size: 20px;
      font-family: "weiruanyahei";
      text-align: left;
      padding-left: 10px;
      display: flex;
      align-items: center;
      // white-space: nowrap;
      // overflow: hidden;
      // text-overflow: ellipsis;
      border-right: 1px solid rgba(#121d2a, 0.9);
      text-align: center;
    }
    .header-item:nth-last-child(1) {
      border-right: none;
    }
  }
  .t-body {
    box-sizing: border-box;
    position: relative;
    overflow-y: auto;
    // overflow-x: hidden;
    &::-webkit-scrollbar {
      position: absolute; /*Overall style of the scrollbar.*/
      width: 0px; /*Height and width correspond to the dimensions of the horizontal and vertical scrollbars, respectively.*/
      height: 5px;
    }
    &::-webkit-scrollbar-thumb {
      /*The small square inside the scrollbar is commonly known as the thumb or scroll thumb.*/
      border-radius: 20px;
      box-shadow: inset 0 0 5px rgba(#545d7c, 0.2);
      background: #545d7c;
    }
    &::-webkit-scrollbar-track {
      /*The track inside the scrollbar is called the scroll track.*/
      box-shadow: inset 0 0 5px rgba(#29355b, 1);
      border-radius: 10px;
      background: transparent;
    }
    .body-content {
      position: absolute;
      width: 100%;
      height: 100%;
      // & > div:nth-child(odd) {
      //   background: transparent;
      // }
      // & > div:nth-child(even) {
      //   background: rgba(255, 255, 255, 0.08);
      // }
      .body-item {
        // background-color: rgba(#000, 0.1);
        display: flex;
        align-items: center;
        // overflow: hidden;
        height: 30px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        position: relative;
        .item-colom {
          height: 100%;
          font-size: 22px;
          box-sizing: border-box;
          color: #bfffff;
          font-family: "weiruanyahei";
          font-family: "Helvetica";
          text-align: left;
          padding-left: 10px;
          // white-space: nowrap;
          // text-overflow: ellipsis;
          // overflow: hidden;
          > div {
            width: 100%;
            height: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            line-height: 30px;
            // text-align: center;
          }
          .block {
            width: 10px;
            height: 10px;
          }
        }
        // .tdpks {
        //   display: flex;
        //   align-items: center;
        // }
        // .tdqk {
        //   display: flex;
        //   align-items: center;
        //   // overflow: hidden;
        //   height: 30px;
        //   box-sizing: border-box;
        //   width: 100%;
        //   height: 100%;
        //   border: 2px #f9fe25 solid;
        //   position: absolute;
        //   top: 0;
        //   left: 0;
        //   box-shadow: 0px 0px 12px 6px rgba(255, 201, 38, 0.65);
        // }
        // .tdqk::before {
        //   isplay: flex;
        //   align-items: center;
        //   content: '';
        //   width: 100%;
        //   height: 100%;
        //   position: absolute;
        //   top: 0;
        //   left: 0;
        //   box-shadow: 0px 0px 12px 6px rgba(255, 201, 38, 0.65) inset;
        //   background-color: rgba(255, 201, 38, 0.15);
        // }
      }
      .body-item:nth-child(odd) {
        background: rgba(255, 255, 255, 0.1);
      }
      .body-item:nth-child(even) {
        background: rgba(255, 235, 255, 0);
      }
      .body-item:hover {
        // background: rgba(#1b8eb2, 0.5);
      }
    }
  }
}
</style>
