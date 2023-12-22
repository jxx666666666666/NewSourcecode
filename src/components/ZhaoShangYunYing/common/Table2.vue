<!-- @format -->

<template>
  <div class="t-list" :style="{ width: tableWidth }">
    <div class="list-header" :style="{ width: tableWidth }" v-if="showHeader">
      <div
        class="header-item"
        :style="{
          width: item.width,
          height: tableHeartHeight
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
            active: index == (isInClickIndex ? rowClickIndex : rowClicki)
          }"
          @click.stop="itemClick(item, index)"
        >
          <div
            class="item-colom"
            v-for="(citem, cindex) in headerListData"
            :key="cindex"
            :style="{
              width: citem.width,
              lineHeight: '40px'
            }"
          >
            <div :title="item[citem.key]">
              <div
                v-if="citem.key == 'state'"
                class="cur"
                :style="{ background: compar[item[citem.key]] }"
              ></div>
              <div v-else>
                {{ item[citem.key] ? item[citem.key] : 'No data available' }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // Whether to display the table header.
    showHeader: {
      type: Boolean,
      default: true
    },
    // Table header data.
    headerListData: {
      type: Array,
      default: () => {
        return [
          {
            name: 'Uid',
            width: '110px',
            key: 'Uid'
          },
          {
            name: 'Uname',
            width: '230px',
            key: 'Uname'
          },
          {
            name: 'Mission',
            width: '170px',
            key: 'Mission'
          },
          {
            name: 'People',
            width: '291px',
            key: 'People'
          },
       
        ];
      }
    },
    // Table data.
    bodyListData: {
      type: Array,
      default: () => {
        return [
          {
            Uid: '01',
            Uname: 'ZhangXX',
            Mission: 'Digitalization Department',
            People: 'ZhaoXX',
           
          },
          {
            Uid: '02',
            Uname: 'ZhangXX',
            Mission: 'Digitalization Department',
            People: 'ZhaoXX',
          
          },
          {
            Uid: '03',
            Uname: 'ZhangXX',
            Mission: 'Digitalization Department',
            People: 'ZhaoXX',
           
          },
          {
            Uid: '04',
            Uname: 'ZhangXX',
            Mission: 'Digitalization Department',
            People: 'ZhaoXX',
           
          },
          {
            Uid: '05',
            Uname: 'ZhangXX',
            Mission: 'Digitalization Department',
            People: 'ZhaoXX',
           
          },
          {
            Uid: '06',
            Uname: 'ZhangXX',
            Mission: 'Digitalization Department',
            People: 'ZhaoXX',
           
          },
          {
            Uid: '07',
            Uname: 'ZhangXX',
            Mission: 'Digitalization Department',
            People: 'ZhaoXX',
           
          },
          {
            Uid: '08',
            Uname: 'ZhangXX',
            Mission: 'Digitalization Department',
            People: 'ZhaoXX',
          
          },
          {
            Uid: '09',
            Uname: 'ZhangXX',
            Mission: 'Digitalization Department',
            People: 'ZhaoXX',
          
          }
        ];
      }
    },
    // How many data to start scrolling.
    startsScroll: {
      type: Number,
      default: 5
    },
    // Height of a single row table header.
    tableHeartHeight: {
      type: String,
      default: '30px'
    },
    // Height of a single row table.
    tableItemHeight: {
      type: String,
      default: '30px'
    },
    // Overall width of the table
    tableWidth: {
      type: String,
      default: '840px'
    },
    // Height of the table container.
    tableHeight: {
      type: String,
      default: '180px'
    },
    // Whether to enable external index value change.
    isInClickIndex: {
      type: Boolean,
      default: false
    },
    // Cancel highlighting on click interaction.
    rowClickIndex: {
      type: Number,
      default: -1
    },
    // Whether to allow scrolling.
    isScroll: {
      type: Boolean,
      default: true
    },
    // Whether to allow click interaction.
    isClick: {
      type: Boolean,
      default: false
    },
    // Whether to display color blocks
    isShowColorBlock: {
      type: Boolean,
      default: false
    },
    // Highlighted index.
    rowClicki: {
      type: Number,
      default: -1
    }
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
      compar: {
        1: '#2693FF',
        2: '#FF7A4D',
        3: '#00D9A3'
      }
    };
  },
  watch: {
    // rowClickIndex(newval,old) {
    //   this.rowClickIndex = newval
    // },
  },
  mounted() {
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
      }, 35);
    },
    setColor() {
      let domList = document.querySelectorAll('.item-colom > div');
      for (let index = 0; index < domList.length; index++) {
        const element = domList[index];
        switch (element.innerText) {
          case 'F':
            element.style.color = '#FFC926';
            break;
          case 'A':
            element.style.color = '#2693FF';
            break;
        }
      }
    },
    //Click on the table
    itemClick(item, index) {
      if (this.isClick) {
        this.$emit('rowClick', item, index);
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
    }
  },
  // Clear the timer before the page is destroyed.
  beforeDestroy() {
    this.timers && clearInterval(this.timers);
    this.Colortimer && clearInterval(this.Colortimer);
  }
};
</script>

<style lang="less" scoped>
.active {
  // background: rgba(255, 228, 38, 0.35) !important;
  box-shadow: 1px 1px 6px 7px rgba(255, 217, 0, 0.7) inset;
}
.t-list {
  font-size: 16px;
  pointer-events: all;
  .list-header {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    // height: 36px;
    // border-bottom: 1px solid rgba(85, 85, 85, 0.9);
    .header-item {
      // box-sizing: border-box;
   
      background-color: #BFEBFF10;
      color: #BFEBFF;
      font-family: 'weiruanyahei';
      text-align: left;
      padding-left: 15px;
      display: flex;
      // justify-content: center;
      align-items: center;
      // white-space: nowrap;
      // overflow: hidden;
      // text-overflow: ellipsis;
      border-right: 1px solid rgba(#121d2a, 0.9);
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
    .cur {
      width: 15px;
      height: 15px;
      border-radius: 50%;
      background: red;
      margin-top: 15px;
    }
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
        justify-content: space-evenly;
        // overflow: hidden;
        height: 30px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        .item-colom {
          height: 100%;
          box-sizing: border-box;
          color: #BFEBFF;
          font-family: 'Helvetica';
          font-size: 22px;
          text-align: left;
          padding-left: 10px;
          // white-space: nowrap;
          // text-overflow: ellipsis;
          // overflow: hidden;
          > div {
            // width: 100%;
            height: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            line-height: 30px;
          }
          .block {
            // width: 10px;
            height: 10px;
          }
        }
        .item-colom:nth-child(1){
          width: 200px !important;
        }
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
