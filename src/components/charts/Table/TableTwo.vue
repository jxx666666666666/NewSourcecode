<template>
  <!-- Click on the table with action button -->
  <div class="t-list" :style="{ width: tableWidth }">
    <!-- gauge outfit -->
    <div class="list-header" v-if="isbool" :style="{ width: tableWidth }">
      <div
        class="header-item"
        :style="{
          width: item.width,
          height: tableItemHeight,
          lineHeight: tableItemHeight,
        }"
        v-for="(item, index) in headerListData"
        :key="index"
      >
        {{ item.name }}
      </div>
    </div>
    <!-- body -->
    <div ref="tabName" class="t-body" :style="{ height: tableHeight }">
      <div class="body-content">
        <div
          class="body-item"
          v-for="(item, index) in bodyListData"
          @click="qyhxClick(item, index)"
          :class="{ active: index == currIndex }"
          :key="index"
          :style="{ height: tableItemHeight, lineHeight: tableItemHeight }"
        >
          <!-- Serial Number -->
          <div class="item-index">{{ item.id }}</div>
          <!-- Party organization name -->
          <div class="item-name">{{ item.time }}</div>
          <!-- Domain -->
          <div class="item-ssly">{{ item.content }}</div>
          <!-- Caring theme -->
          <div class="item-gazt" :title="item.lrl" v-if="item.lrl">
            {{ item.lrl }}
          </div>
          <!-- Care time -->
          <div class="item-time" :title="item.zcfzl" v-if="item.zcfzl">
            {{ item.zcfzl }}
          </div>
          <!-- Number of caring people -->
          <div class="item-gars" :title="item.zls" v-if="item.zls">
            {{ item.zls }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    //Header data
    headerListData: {
      type: Array,
      default: () => {
        return [
          { name: "Enterprise Name", width: "135px" },
          { name: "operating revenue", width: "105px" },
          { name: "Revenue growth rate", width: "105px" },
          { name: "profit margin", width: "90px" },
          { name: "Asset liability ratio", width: "127px" },
          { name: "Number of patents", width: "114px" },
        ];
      },
    },
    //Table Data
    bodyListData: {
      type: Array,
      default: () => {
        return [
          {
            name: "Baoan District",
            qyys: "50 million yuan",
            yszs: "15%",
            lrl: "15%",
            zcfzl: "20%",
            zls: "100 pieces",
          },
          {
            name: "Baoan District",
            qyys: "50 million yuan",
            yszs: "15%",
            lrl: "15%",
            zcfzl: "20%",
            zls: "100 pieces",
          },
          {
            name: "Baoan District",
            qyys: "50 million yuan",
            yszs: "15%",
            lrl: "15%",
            zcfzl: "20%",
            zls: "100 pieces",
          },
          {
            name: "Baoan District",
            qyys: "50 million yuan",
            yszs: "15%",
            lrl: "15%",
            zcfzl: "20%",
            zls: "100 pieces",
          },
        ];
      },
    },
    //A few data starts scrolling
    startsScroll: {
      type: Number,
      default: 10,
    },
    //Single row table height
    tableItemHeight: {
      type: String,
      default: "52px",
    },

    //Overall width of the table
    tableWidth: {
      type: String,
      default: "1403px",
    },
    //Table container height
    tableHeight: {
      type: String,
      default: "519px",
    },
    // Table Container Name
    tableName: {
      type: String,
      default: "",
    },
    // Whether to display the header
    isbool: {
      type: Boolean,
      default: true,
    },
    // 3D data reception
    EquipmentData: {
      type: Array,
      default: () => {
        return null;
      },
    },
  },
  data() {
    return {
      //The currently clicked table
      currIndex: -1,
      //The height that has already rolled up
      scrollHeight: 1,
    };
  },
  created() {},
  methods: {
    //Table scrolling
    tableScroll() {
      let that = this;
      let i = 0;
      clearInterval(this.timer);
      let Scroll = function () {
        let ContScroll = that.$refs.tabName;
        //Obtain the current scrolling height
        let currentScrollTop = parseInt(ContScroll.scrollTop);
        //Obtain container visualization height
        // let currentBoxHeight = parseInt(ContScroll.scrollHeight);
        // console.log(
        //   "Roll up height",
        //   currentBoxHeight - parseInt(that.tableHeight),
        //   currentScrollTop,
        //   currentBoxHeight
        // );
        if (that.scrollHeight == currentScrollTop) {
          // console.log(666);
          ContScroll.scrollTo(0, 0);
        } else {
          //
          that.scrollHeight = currentScrollTop;
          //   console.log(1);
          ContScroll.scrollTo({
            top: ContScroll.scrollTop + parseInt(that.tableItemHeight),
            left: 0,
            behavior: "smooth",
          });
        }
      };

      that.timer = setInterval(Scroll, 3000);
    },
    // Table click
    qyhxClick(item, index) {
      if (this.currIndex == index) {
        this.tableScroll();
        this.currIndex = -1;
        this.$store.commit("setHighLight", "");
      } else {
        this.$emit("hxtableclick", item, index);
        this.currIndex = index;
        clearInterval(this.timer);
      }
    },
    clearHigh() {
      this.tableScroll();
      this.currIndex = -1;
    },
  },
  mounted() {
    this.tableScroll();
  },
  // Clear timer before page destruction
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>

<style lang="less" scoped>
.active {
  background-color: rgba(#ffca28, 0.5) !important;
}

.t-list {
  box-sizing: border-box;

  .list-header {
    box-sizing: border-box;
    display: flex;

    .header-item {
      box-sizing: border-box;
      padding-left: 15px;
      background-color: rgba(#113f59, 1);
      color: #bfebff;
      font-family: "Helvetica";
      font-size: 22px;
      text-align: left;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-right: 1px;
      text-align: center;

      &:nth-last-child(1) {
        margin-right: 0px;
      }
    }
  }

  .t-body {
    box-sizing: border-box;
    position: relative;
    overflow-y: scroll;
    overflow-x: hidden;

    &::-webkit-scrollbar {
      position: absolute;
      /*Scroll bar overall style*/
      width: 3px;
      /*The height and width correspond to the size of the horizontal and vertical scroll bars respectively*/
      height: 6px;
    }

    &::-webkit-scrollbar-thumb {
      /*Small squares inside the scroll bar*/
      border-radius: 20px;
      box-shadow: inset 0 0 5px rgba(#545d7c, 0.2);
      background: transparent;
    }

    &::-webkit-scrollbar-track {
      /*Track inside the scroll bar*/
      box-shadow: inset 0 0 5px rgba(#29355b, 1);
      border-radius: 10px;
      background: transparent;
    }

    .body-content {
      position: absolute;
      width: 100%;
      height: 100%;

      .body-item {
        box-sizing: border-box;

        &:nth-child(odd) {
          background: rgba(221, 249, 255, 0.1);
        }

        display: flex;

        .item-index,
        .item-name,
        .item-ssly,
        .item-gazt,
        .item-time,
        .item-gars {
          box-sizing: border-box;
          padding-left: 15px;
          color: #bfebff;
          font-family: "Helvetica";
          font-size: 22px;
          text-align: left;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .item-index {
          width: 275px;
          text-align: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .item-name {
          width: 275px;
          text-align: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .item-ssly {
          width: 270px;
          text-align: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .item-gazt {
          width: 90px;
          text-align: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .item-time {
          width: 127px;
          text-align: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .item-gars {
          width: 114px;
          text-align: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          // color: #26ffff;
        }
      }
    }
  }
}
</style>
