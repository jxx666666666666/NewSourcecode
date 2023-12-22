<template>
  <div class="max">
    <div class="head">
      <OneTitle title="Overview of Investment Promotion" :width="'1710px'"></OneTitle>
      <div class="head_bott">
        <div class="head_bott__one">
          <twoTitle title="Achievements of Investment Promotion Over the Years"></twoTitle>
          <div class="head_bott__one_bott">
            <!-- <div
              class="head_bott__one_bott_sj"
              v-for="(item, index) in head_bott__one_bott_sj"
              :key="index"
            >
              <div class="name">{{ item.name }}</div>
              <div class="value">{{ item.value }}</div>
            </div> -->
            <TabLableList class="ach" :Datalist="head_bott__one_bott_sj"></TabLableList>
          </div>
        </div>
        <div class="head_bott__tow">
          <div class="head_bott__tow_top">
            <div class="usnzf" v-for="(item, index) in head_bott__tow_top_sj" :key="index"
              :class="item == mornzi ? 'tdsx_tit_ac' : ''" @click="changeTit(item)">
              {{ item }}
            </div>
          </div>
          <div class="head_bott__tow_bott">
            <DuoZhuTu22 :rowData="head_bott__tow_bott_sj[mornzi]"></DuoZhuTu22>
          </div>
        </div>
        <div class="head_bott__three">
          <twoTitle title="Investment Industry Distribuion"></twoTitle>
          <div class="head_bott__three_bo">
            <div class="head_bott__three_bo_sj" v-for="(item, index) in head_bott__three_bo_sj" :key="index">
              <div class="name">{{ item.name }}</div>
              <div class="beij">
                <div class="yanse" :style="{ width: item.value + '%' }">
                  <div class="gaoliang"></div>
                </div>
              </div>
              <div class="value">{{ item.value }}</div>
            </div>
          </div>
        </div>
        <div class="head_bott__four">
          <twoTitle title="Key Investment Projects"></twoTitle>
          <div class="head_bott__four_bott">
            <!-- <Table
              :bodyListData="head_bott__four_bott_sj"
              :headerListData="head_bott__four_bott_top"
            ></Table> -->
            <tablist :bodyListData="head_bott__four_bott_sj" :headerListData="head_bott__four_bott_top"></tablist>
          </div>
        </div>
      </div>
    </div>
    <div class="foot">
      <OneTitle title="Business Overview" :width="'1710px'"> </OneTitle>
      <div class="foot_bott">
        <div class="foot_bott_left">
          <div class="ff_left">
            <div class="tt_top">Total Enterprise</div>
            <p class="tt_bott">1,543</p>
          </div>
          <div class="ff_right">
            <div class="tt_top">Total projects under construction</div>
            <p class="tt_bott">1,073</p>
          </div>
        </div>
        <div class="foot_bott_right">
          <twoTitle title="List of key Enterprises"></twoTitle>
          <div class="foot_bott_right_sj">
            <!-- <Table2
              :bodyListData="foot_bott_right_sj_bott"
              :headerListData="foot_bott_right_sj_top"
              :tableHeight="'280px'"
            ></Table2> -->
            <div class="top">
              <div class="one">Name</div>
              <div class="tow">Industry Category</div>
              <div class="three">Number of Accessed Videos</div>
            </div>
            <img src="../../assets/img/ZHTX/fenge.png" alt="" class="popo" />
            <vueSeamlessScroll :data="foot_bott_right_sj_bott" :class-option="classOption" ref="vueScoll"
              class="vueScroll">
              <div class="bottom">
                <div class="sj" v-for="(item, index) in foot_bott_right_sj_bott" :key="index">
                  <div class="one" :title="item.Uid">{{ item.Uid }}</div>
                  <div class="tow" :title="item.Uname">{{ item.Uname }}</div>
                  <div class="three" :title="item.Mission">
                    {{ item.Mission }}
                  </div>
                </div>
              </div>
            </vueSeamlessScroll>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OneTitle from "../common/OneTitle.vue";
import twoTitle from "../common/twoTitle.vue";
import DuoZhuTu22 from "./common/DuoZhuTu22.vue";
import Table from "./common/Table.vue";
import tablist from "./common/TableList.vue";
import Table2 from "./common/Table2.vue";
import vueSeamlessScroll from "vue-seamless-scroll";
import TabLableList from "../../components/GongGongAnQuan/TabLableList.vue";
export default {
  components: {
    OneTitle,
    twoTitle,
    DuoZhuTu22,
    Table,
    Table2,
    vueSeamlessScroll,
    TabLableList,
    tablist,
  },
  data() {
    return {
      mornzi: "Over the Years",
      head_bott__one_bott_sj: [
        {
          name: "Investment Contract Amount",
          num: "2,536",
        },
        {
          name: "Number of Investment Projects",
          num: "1,230",
        },
        {
          name: "Investment Success Rate",
          num: "86.3%",
        },
      ],
      head_bott__three_bo_sj: [
        {
          name: "Type 01",
          value: "90",
        },
        {
          name: "Type 02",
          value: "70",
        },
        {
          name: "Type 03",
          value: "55",
        },
        {
          name: "Type 04",
          value: "60",
        },
        {
          name: "Type 05",
          value: "72",
        },
        {
          name: "Type 06",
          value: "64",
        },
      ],
      head_bott__four_bott_top: [
        {
          name: "Name",
          width: "13%",
          key: "Uid",
        },
        {
          name: "Industry Category",
          width: "29%",
          key: "Uname",
        },
        {
          name: "Type",
          width: "21%",
          key: "Mission",
        },
        {
          name: "Investment Amount",
          width: "37%",
          key: "People",
        },
      ],
      head_bott__four_bott_sj: [
        {
          Uid: "Build",
          Uname: "Architectural Engineering",
          Mission: "Staff",
          People: "10,254",
        },
        {
          Uid: "Manufacturing Ships",
          Uname: "Manufacturing Industry",
          Mission: "Boss",
          People: "14,254",
        },
        {
          Uid: "Manufacturing Ships",
          Uname: "Manufacturing Industry",
          Mission: "President",
          People: "14,254",
        },
        {
          Uid: "Build",
          Uname: "Architectural Engineering",
          Mission: "Director",
          People: "10,254",
        },
        {
          Uid: "Build",
          Uname: "Architectural Engineering",
          Mission: "Staff",
          People: "10,254",
        },
        {
          Uid: "Manufacturing Ships",
          Uname: "Manufacturing Industry",
          Mission: "Boss",
          People: "14,254",
        },
        {
          Uid: "Manufacturing Ships",
          Uname: "Manufacturing Industry",
          Mission: "President",
          People: "14,254",
        },
        {
          Uid: "Build",
          Uname: "Architectural Engineering",
          Mission: "Director",
          People: "10,254",
        },
        {
          Uid: "Build",
          Uname: "Architectural Engineering",
          Mission: "Staff",
          People: "10,254",
        },
        {
          Uid: "Manufacturing Ships",
          Uname: "Manufacturing Industry",
          Mission: "Boss",
          People: "14,254",
        },
        {
          Uid: "Manufacturing Ships",
          Uname: "Manufacturing Industry",
          Mission: "President",
          People: "14,254",
        },
        {
          Uid: "Build",
          Uname: "Architectural Engineering",
          Mission: "Director",
          People: "10,254",
        },
      ],
      head_bott__tow_bott_sj: {
        "Over the Years": [
          {
            name: "2017",
            value: "80",
            item: "100",
          },
          {
            name: "2018",
            value: "70",
            item: "80",
          },
          {
            name: "2019",
            value: "60",
            item: "75",
          },
          {
            name: "2020",
            value: "80",
            item: "90",
          },
          {
            name: "2021",
            value: "70",
            item: "80",
          },
        ],
        "This Year": [
          {
            name: "2017",
            value: "80",
            item: "90",
          },
          {
            name: "2018",
            value: "70",
            item: "80",
          },
          {
            name: "2019",
            value: "60",
            item: "75",
          },
          {
            name: "2020",
            value: "80",
            item: "90",
          },
          {
            name: "2021",
            value: "70",
            item: "80",
          },
        ],
      },
      foot_bott_right_sj_top: [
        {
          name: "Name",
          width: "200px",
          key: "Uid",
        },
        {
          name: "Industry Category",
          width: "300px",
          key: "Uname",
        },
        {
          name: "Number of Accessed Videos  ",
          width: "300px",
          key: "Mission",
        },
      ],
      // foot_bott_right_sj_top_tow:['Name','Industry Category','Number of Accessed Videos'],
      foot_bott_right_sj_bott: [
        {
          Uid: "Kenya Airway",
          Uname: "Aviation",
          Mission: "10254",
        },
        {
          Uid: "Safari Limited",
          Uname: "Limited",
          Mission: "10254",
        },
        {
          Uid: "East African Bewerries Limited",
          Uname: "Bewerries Limited",
          Mission: "10254",
        },
        {
          Uid: "Equity Bank Limited",
          Uname: "Equity",
          Mission: "10254",
        },
        {
          Uid: "Nation Media Group",
          Uname: "Media Group",
          Mission: "10254",
        },
        {
          Uid: "Nakumatt Holdings Ltd",
          Uname: "Holdings",
          Mission: "10254",
        },
        {
          Uid: "Kenolkobil Group",
          Uname: "Kenolkobil",
          Mission: "10254",
        },
        {
          Uid: "kenya power and lighting company",
          Uname: "lighting company",
          Mission: "10254",
        },
      ],
      head_bott__tow_top_sj: ["Over the Years", "This Year"],
    };
  },
  computed: {
    classOption() {
      return {
        step: 0.3, // 
        limitMoveNum: 6, // this.dataList.length
        hoverStop: true, //
        direction: 1, // 0
        openWatch: false, //
        singleHeight: 0, // 
        singleWidth: 0, //
        waitTime: 1000, //
      };
    },
  },
  methods: {
    changeTit(text) {
      this.mornzi = text;
    },
  },
};
</script>

<style lang="less" scoped>
.max {
  width: 100%;
  height: 100%;
  // background-color: olivedrab;
  box-sizing: border-box;
  padding: 90px 10px 0px 20px;

  .head {
    width: 100%;
    height: 860px;

    // background-color: orangered;
    .head_bott {
      margin-top: 20px;
      width: 100%;
      height: 800px;
      // background-color: blue;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      .head_bott__one {
        width: 840px;
        height: 340px;

        // background-color: cadetblue;
        .head_bott__one_bott {
          width: 90%;
          height: 300px;
          box-sizing: border-box;
          padding-top: 0px;
          // background-color: coral;
          display: flex;
          justify-content: space-evenly;

          /deep/ .lable .lable-item .item-style {
            width: 302px;
          }

          /deep/ .lable .lable-item .item-style .name {
            width: 347px;
            margin-top: 45px;
            height: 90px;
          }

          /deep/ .lable-item {
            padding: 0;
          }

          .head_bott__one_bott_sj {
            width: 280px;
            height: 264px;
            background: url(../../assets/img/ZHTX/head_bott__one_bott_sj_bj.png);

            .name {
              width: 100%;
              height: 110px;
              text-align: center;
              word-wrap: break-word;
              font-family: "Helvetica";
              font-size: 28px;
              color: #ffffff;
            }

            .value {
              width: 100%;
              text-align: center;
              font-family: "Roboto";
              font-size: 80px;
              color: #ffffff;
            }
          }
        }
      }

      .head_bott__tow {
        width: 840px;
        height: 340px;

        // background-color: cadetblue;
        .head_bott__tow_top {
          height: 45px;
          width: 100%;
          display: flex;
          justify-content: flex-end;

          // background-color: #ffffff60;
          .usnzf {
            margin-right: 10px;
            width: 260px;
            height: 45px;
            // background-color: #08d6d9;
            background: url(../../assets/img/ZHTX/CC_head_bott__tow_top_22.png) no-repeat;
            font-family: "Helvetica";
            font-size: 24px;
            color: #fff;
            text-align: center;
            line-height: 45px;
          }

          .tdsx_tit_ac {
            margin-right: 10px;
            width: 260px;
            height: 45px;
            // background-color: #08d6d9;
            background: url(../../assets/img/ZHTX/CC_head_bott__tow_top_11.png) no-repeat;
            font-family: "Helvetica";
            font-size: 24px;
            color: #ffe599;
            text-align: center;
            line-height: 45px;
          }
        }

        .head_bott__tow_bott {
          width: 100%;
          height: 300px;
          // background-color: blueviolet;
        }
      }

      .head_bott__three {
        width: 840px;
        height: 400px;

        // background-color: orchid;
        .head_bott__three_bo {
          margin-top: 30px;
          width: 100%;
          height: 330px;
          // background-color: brown;
          overflow: hidden;

          .head_bott__three_bo_sj {
            width: 100%;
            height: 45px;
            // background-color: #fff;
            display: flex;
            margin: 10px 0px 10px 0px;

            .name {
              width: 110px;
              font-family: "Helvetica";
              font-size: 23px;
              line-height: 45px;
              color: #bfebff;
            }

            .beij {
              margin-top: 20px;
              width: 650px;
              height: 12px;
              // background-color: blue;
              border-radius: 12px;

              .yanse {
                display: flex;
                justify-content: right;
                border-radius: 12px;
                height: 100%;
                background-image: linear-gradient(to right, #08d6d940, #08d6d9);

                .gaoliang {
                  width: 12px;
                  height: 12px;
                  border-radius: 12px;
                  background-color: #ffffff;
                }
              }
            }

            .value {
              line-height: 45px;
              width: 75px;
              text-align: right;
              font-family: "Helvetica";
              font-size: 34px;
              color: #bfecff;
            }
          }
        }
      }

      .head_bott__four {
        width: 840px;
        height: 400px;

        // background-color: orchid;
        .head_bott__four_bott {
          margin-top: 30px;
          width: 100%;
          height: 338px;
          // background-color: brown;
        }
      }
    }
  }

  .foot {
    width: 100%;
    height: 380px;

    // background-color: lawngreen;
    .foot_bott {
      margin-top: 35px;
      width: 100%;
      height: 320px;
      // background-color: #bfecff;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;

      .foot_bott_left {
        // background-color: blueviolet;
        width: 820px;
        height: 310px;
        background: url(../../assets/img/ZHTX/foot_bott_left_bj.png);
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 0px 60px 0px 40px;

        .ff_left {
          width: 240px;
          height: 100%;
          // background-color: red;
          text-align: center;

          .tt_top {
            margin-top: 50px;
            width: 240px;
            height: 100px;
            word-wrap: break-word;
            font-family: "Helvetica";
            font-size: 28px;
            color: #ffffff;
            // background-color: blueviolet;
          }

          .tt_bott {
            // background-color: red;
            font-family: "Roboto";
            font-size: 80px;
            color: #00ffff;
          }
        }

        .ff_right {
          width: 240px;
          height: 100%;
          // background-color: aqua;
          text-align: center;

          .tt_top {
            margin-top: 50px;
            width: 240px;
            height: 100px;
            word-wrap: break-word;
            font-family: "Helvetica";
            font-size: 28px;
            color: #ffffff;
            // background-color: blueviolet;
          }

          .tt_bott {
            // background-color: red;
            font-family: "Roboto";
            font-size: 80px;
            color: #00ffff;
          }
        }
      }

      .foot_bott_right {
        margin-top: -10px;
        width: 795px;
        height: 320px;

        // background-color: brown;
        .foot_bott_right_sj {
          margin-top: 15px;
          width: 100%;
          height: 300px;

          // background-color: #08d6d9;
          .vueScroll {
            height: 230px;
            overflow: hidden;
          }

          .top {
            width: 100%;
            height: 30px;
            // background-color: #08d6d9;
            line-height: 30px;
            font-family: "Helvetica";
            font-size: 22px;
            color: #bfebff;
            display: flex;

            .one {
              width: 200px;
              padding-left: 30px;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              text-align: center;
            }

            .tow {
              width: 290px;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              text-align: center;
            }

            .three {
              width: 300px;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              text-align: center;
            }
          }

          .popo {
            margin-top: 5px;
            margin-left: 20px;
          }

          .bottom::-webkit-scrollbar {
            width: 0px;
            height: 1px;
          }

          .bottom::-webkit-scrollbar-thumb {
            width: 0px;
            border-radius: 10px;
            box-shadow: inset 0 0 5px rgba(97, 184, 179, 0.1);
            background: #78b4b4;
          }

          .bottom::-webkit-scrollbar-track {
            width: 0px;
            box-shadow: inset 0 0 5px rgba(87, 175, 187, 0.1);
            border-radius: 10px;
            background: #ededed;
          }

          .bottom {
            width: 100%;
            height: 230px;
            // background-color: #ffe599;
            margin-top: 1px;
            overflow-y: auto;

            .sj {
              width: 100%;
              margin-bottom: 3px;
              background: url(../../assets/img/ZHTX/CC_lll_bj.png) no-repeat;
              display: flex;
              line-height: 44px;
              font-family: "Helvetica";
              font-size: 22px;
              color: #bfebff;

              .one {
                width: 200px;
                padding-left: 30px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                text-align: center;
                height: 37px;
              }

              .tow {
                width: 290px;
                padding-left: 10px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                text-align: center;
                height: 37px;
              }

              .three {
                width: 300px;
                padding-left: 10px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                text-align: center;
                height: 37px;
              }
            }
          }
        }
      }
    }
  }
}</style>
