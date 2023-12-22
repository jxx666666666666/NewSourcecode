<template>
  <div class="max">
    <div class="head">
      <OneTitle title="Investment Promotion And Operation" :width="'1760px'"></OneTitle>
      <div class="head_bott">
        <div class="head_bott_left">
          <div class="head_bott_left_top">
            <twoTitle title="Lease Overview"></twoTitle>
            <div class="hblt">
              <div class="sj" v-for="(item, index) in sj" :key="index">
                <div class="name">{{ item.name }}</div>
                <div class="bejing">
                  <div class="yanse" :style="{
                    width: item.val + '%',
                    backgroundImage: `linear-gradient(to right, ${bjcolor[index * 2]
                      }, ${bjcolor[index * 2 + 1]})`,
                  }"></div>
                </div>
                :
                <div class="value">{{ item.value }}</div>
              </div>
            </div>
          </div>
          <div class="head_bott_left_bott">
            <twoTitle title="Operational Data Statistics"></twoTitle>
            <div class="hesd_name">
              <div class="sds" v-for="(item, index) in h_sds" :key="index" :class="{ tdsx_tit_ac: item == mornzi }"
                @click="changeTit(item)">
                {{ item }}
              </div>
            </div>
            <!-- :style="{ background: `url(${ item == mornzi ? h_sdsbj[index] : ''})` }" -->
            <div class="hesd_bott">
              <div class="sjsjs" :style="{ background: `url(${AwareUIconBJ[index]})` }"
                v-for="(item, index) in sjsjs_sj[mornzi]" :key="index">
                <div class="value">{{ item.value }}</div>
                <div class="name">{{ item.name }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="head_bott_right">
          <twoTitle title="Public Wifi"></twoTitle>
          <div class="head_bott_right_bo">
            <NetWorkItemVue class="network_item" :name="item.name" :value="item.value"
              v-for="(item, index) in networkOpreationData" :key="index"></NetWorkItemVue>
          </div>
        </div>
      </div>
    </div>
    <OneTitle title="Land Resources" :width="'1760px'"></OneTitle>
    <div class="foot">
      <div class="foot_sj">
        <div class="foot_one">
          <twoTitle title="Land Use"></twoTitle>
          <div class="ddd">Land Area Overview</div>
          <div class="foot_one_bott">
            <div class="foot_one_bott_sj" v-for="(item, index) in foot_one_bott_sj" :key="index">
              <div class="name">{{ item.name }}</div>
              <div class="value">{{ item.value }}</div>
            </div>
          </div>
        </div>
        <div class="foot_tow">
          <!-- <twoTitle val=""></twoTitle> -->
          <div class="ddd">Trend of Self-Use Area And Transfer Area</div>
          <div class="foot_tow_bo">
            <DuoZhuTu11 :rowData="foot_tow_bo_sj"></DuoZhuTu11>
          </div>
        </div>
        <div class="foot_three">
          <twoTitle title="Income From Land Transfer"></twoTitle>
          <div class="foot_three_bo">
            <DuoZhuTu :rowData="foot_three_bo_sj"></DuoZhuTu>
          </div>
        </div>
        <div class="foot_four">
          <twoTitle title="Type Of Construction Land"></twoTitle>
          <div class="foot_four_bo">
            <div class="loidou">
              <FunnelChart :rowData="foot_four_bo_sj"></FunnelChart>
            </div>
            <div class="foot_four_bo_sj">
              <div class="sj" v-for="(item, index) in foot_four_bo_sj" :key="index">
                <div class="yauandian" :style="{ backgroundColor: zitiyanse[index] }"></div>
                <div class="name">{{ item.category }}</div>
                <div class="val" :style="{ color: zitiyanse[index] }">
                  {{ item.proportion }}
                </div>
                <div class="value">{{ item.data }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OneTitle from "../common/OneTitle.vue";
import twoTitle from "../common/twoTitle.vue";
import DuoZhuTu from "./common/DuoZhuTu.vue";
import DuoZhuTu11 from "./common/DuoZhuTu11.vue";
import FunnelChart from "./common/FunnelChart.vue";
import NetWorkItemVue from "../../components/ZhaoShangYunYing/NetWorkItem.vue";
export default {
  components: {
    OneTitle,
    twoTitle,
    DuoZhuTu,
    DuoZhuTu11,
    FunnelChart,
    NetWorkItemVue,
  },
  data() {
    return {
      mornzi: "Data Center",
      h_sds: [
        "Data Center",
        "Idear Hub",
        "VDI",
        "Konza Optical Cable",
        "Advertisement screen",
      ],
      h_sdsbj: [
        require("../../assets/img/ZHTX/h_sdsbj_four.png"),
        require("../../assets/img/ZHTX/h_sdsbj_tow.png"),
        require("../../assets/img/ZHTX/h_sdsbj_three.png"),
        require("../../assets/img/ZHTX/h_sdsbj_four.png"),
        require("../../assets/img/ZHTX/h_sdsbj_five.png"),
      ],
      AwareUIconBJ: [
        require("../../assets/img/ZHTX/sjsjs_one.png"),
        require("../../assets/img/ZHTX/sjsjs_three.png"),
        require("../../assets/img/ZHTX/sjsjs_three.png"),
      ],
      networkOpreationData: [
        {
          name: "Number of registered users",
          value: 114,
        },
        {
          name: "Number of online users",
          value: 524,
        },
        {
          name: "Number of paid users",
          value: 74,
        },
        {
          name: "Number of users who pay by data traffic",
          value: 13,
        },
        {
          name: "Number of subscribers who pay by time",
          value: 153,
        },
        {
          name: "Total user payment amount",
          value: 324,
        },
        {
          name: "Total user settlement amount",
          value: 423,
        },
        {
          name: "Expired Subscribers",
          value: 118,
        },
      ],
      sj: [
        {
          name: "Number of Enterprises",
          value: "42",
          val: "90",
        },
        {
          name: "Number of Leased Houses",
          value: "27",
          val: "60",
        },
        {
          name: "Number of Unrented Houses",
          value: "34",
          val: "80",
        },
      ],
      head_bott_right_bo_sj: [
        {
          name: "Number of registered users",
          value: "1135",
        },
        {
          name: "Number of online users",
          value: "1135",
        },
        {
          name: "Number of paid users",
          value: "1135",
        },
        {
          name: "Number of users who pay by data traffic",
          value: "1135",
        },
        {
          name: "Number ofsubscribers who pay by time...",
          value: "1135",
        },
        {
          name: "Total user payment amount",
          value: "1135",
        },
        {
          name: "Total user payment amount",
          value: "1135",
        },
        {
          name: "Expired Subscribers",
          value: "1135",
        },
      ],
      foot_one_bott_sj: [
        {
          name: "Total Area",
          value: "754",
        },
        {
          name: "Self-use Area",
          value: "129",
        },
        {
          name: "Concession Area",
          value: "332",
        },
      ],
      bjcolor: [
        "#CCCCCC00",
        "#80EA15",
        "#CCCCCC00",
        "#00F0F0",
        "#CCCCCC00",
        "#07A5DC",
      ],
      zitiyanse: ["#007FFF", "#06CA84", "#00BFFF", "#7373FF", "#FFBC4D"],
      foot_four_bo_sj: [
        {
          category: "Industrial Land",
          data: "42",
          color: "#007FFF",
          proportion: "42%",
        },
        {
          category: "Commercial Service",
          data: "35",
          color: "#06CA84",
          proportion: "35%",
        },
        {
          category: "Public Management",
          data: "29",
          color: "#00BFFF",
          proportion: "29%",
        },
        {
          category: "Public Facilities Land",
          data: "17",
          color: "#7373FF",
          proportion: "17%",
        },
        {
          category: "Others",
          data: "17",
          color: "#FFBC4D",
          proportion: "17%",
        },
      ],
      foot_tow_bo_sj: [
        {
          name: "2017",
          value: "60",
          item: "70",
        },
        {
          name: "2018",
          value: "100",
          item: "90",
        },
        {
          name: "2019",
          value: "80",
          item: "70",
        },
        {
          name: "2020",
          value: "100",
          item: "60",
        },
        {
          name: "2021",
          value: "60",
          item: "50",
        },
      ],
      foot_three_bo_sj: [
        {
          name: "2017",
          value: "80",
          item: "60",
        },
        {
          name: "2018",
          value: "75",
          item: "45",
        },
        {
          name: "2019",
          value: "70",
          item: "50",
        },
        {
          name: "2020",
          value: "90",
          item: "80",
        },
        {
          name: "2021",
          value: "55",
          item: "30",
        },
      ],
      sjsjs_sj: {
        "Data Center": [
          {
            name: "Total Resources",
            value: "40,542",
          },
          {
            name: "Used Qty",
            value: "34,920",
          },
          {
            name: "Operating Amount",
            value: "12,548",
          },
        ],
        "Idear Hub": [
          {
            name: "Total Resources",
            value: "45,542",
          },
          {
            name: "Used Qty",
            value: "34,920",
          },
          {
            name: "Operating Amount",
            value: "12,548",
          },
        ],
        VDI: [
          {
            name: "Total Resources",
            value: "50,542",
          },
          {
            name: "Used Qty",
            value: "34,920",
          },
          {
            name: "Operating Amount",
            value: "12,548",
          },
        ],
        "Konza Optical Cable": [
          {
            name: "Total Resources",
            value: "55,542",
          },
          {
            name: "Used Qty",
            value: "34,920",
          },
          {
            name: "Operating Amount",
            value: "12,548",
          },
        ],
        "Advertisement screen": [
          {
            name: "Total Resources",
            value: "60,542",
          },
          {
            name: "Used Qty",
            value: "34,920",
          },
          {
            name: "Operating Amount",
            value: "12,548",
          },
        ],
      },
    };
  },
  created() {
    if (!window.streamingConfig.debugger['I&O']) {
      this.getAllData();
    } else {

    }
  },
  methods: {
    changeTit(text) {
      this.mornzi = text;
    },
    async getAllData() {
      let res = await this.$http.ZSYYApi.getAAAData();
      if (res && res.data) {
        this.networkOpreationData[0].value = res.data.all_user_count;
        this.networkOpreationData[1].value = res.data.all_online_users_count;
        let payCount = 0;
        if (res.data.user_products_bind_details.length > 0) {
          res.data.user_products_bind_details.forEach(item => {
            payCount += Number(item.count);
          })
        }
        this.networkOpreationData[2].value = payCount;
        // this.networkOpreationData[3].value=res.data.all_user_count;
        // this.networkOpreationData[4].value=res.data.all_user_count;
        this.networkOpreationData[5].value = res.data.pay_amount.all;
        this.networkOpreationData[6].value = res.data.checkout_amount.all;
        this.networkOpreationData[7].value = res.data.arrears;
      }
    },
    async getLeaseOverview(){

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
    box-sizing: border-box;
    width: 100%;
    height: 610px;

    // background-color: orange;
    .head_bott {
      padding-left: 50px;
      margin-top: 30px;
      width: 100%;
      height: 500px;
      // background-color: #fff;
      display: flex;
      justify-content: space-between;

      .head_bott_left {
        width: 800px;
        height: 100%;

        // background-color: aqua;
        .head_bott_left_top {
          height: 240px;
          width: 100%;

          // background-color: blueviolet;
          .hblt {
            margin-top: 10px;
            width: 100%;

            .sj {
              margin: 10px 0px 10px 0px;
              width: 100%;
              display: flex;
              height: 50px;

              // background-color: blueviolet;
              .name {
                width: 290px;
                line-height: 50px;
                font-family: "Helvetica";
                color: #ffffff;
                font-size: 22px;
              }

              .bejing {
                width: 430px;
                height: 20px;
                margin-top: 15px;
                // background-color: aqua;
                border-radius: 10px;

                .yanse {
                  height: 100%;
                  // background-color: #fff;
                  border-radius: 10px;
                }
              }

              .value {
                margin-left: 15px;
                line-height: 50px;
                font-family: "Roboto";
                color: #ffffff;
                font-size: 40px;
              }
            }
          }
        }

        .head_bott_left_bott {
          height: 260px;
          width: 100%;

          // background-color: brown;
          .hesd_name {
            width: 100%;
            margin-top: 20px;
            margin-bottom: 20px;
            height: 31px;
            // background-color: orange;
            display: flex;
            justify-content: space-around;

            .sds {
              font-family: 'Carbon fiber Mid-Black Simplified', sans-serif;
              font-size: 18px;
              color: #bfebff;
              line-height: 31px;
              text-align: center;
              background: url(../../assets/img/ZHTX/h_sdsbj_five.png) center center;
              background-size: 100% 100%;
            }

            .tdsx_tit_ac {
              font-family: "Helvetica";
              font-size: 20px;
              line-height: 31px;
              text-align: center;
              color: #c5fcf3;
              background: url(../../assets/img/ZHTX/one.png) center center;
              background-size: 100% 100%;
              padding: 0px 20px 0px 20px;
            }
          }

          .hesd_bott {
            width: 100%;
            height: 155px;
            display: flex;
            justify-content: space-between;

            .sjsjs {
              width: 212px;
              height: 100%;

              // background-color: red;
              .value {
                text-align: center;
                width: 100%;
                font-family: "Roboto";
                font-size: 50px;
                color: #ebf2ff;
              }

              .name {
                margin-top: 30px;
                width: 212px;
                height: 45px;
                line-height: 45px;
                text-align: center;
                background: url(../../assets/img/ZHTX/hesd_bott_bj.png);
                font-family: "Helvetica";
                font-size: 24px;
                color: #ffffff;
              }
            }
          }
        }
      }

      .head_bott_right {
        width: 820px;
        height: 100%;

        // background-color: aqua;
        .head_bott_right_bo {
          margin-top: 0px;
          width: 100%;
          height: 200px;
          // background-color: red;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;

          .network_item {
            margin-top: 15px;
          }

          .head_bott_right_bo_sj {
            width: 410px;
            background: url(../../assets/img/ZHTX/head_bott_right_bo_sj_bj.png) no-repeat;
            display: flex;
            justify-content: space-between;
            margin-top: 10px;
            margin-bottom: 15px;

            .left {
              margin-top: 15px;
              margin-left: 20px;
              width: 280px;
              height: 80px;
              word-wrap: break-word;
              // background-color: #fff;
              font-family: "Helvetica";
              font-size: 28px;
              color: #ffffff;
            }

            .right {
              margin-top: 40px;
              margin-right: 20px;
              text-align: right;
              width: 100px;
              height: 50px;
              // background-color: #fff;
              font-family: "Roboto";
              font-size: 40px;
              color: #26ffff;
            }
          }
        }
      }
    }
  }

  .foot {
    width: 100%;
    height: 680px;
    // background-color: aqua;
    box-sizing: border-box;

    .foot_sj {
      padding-left: 50px;
      margin-top: 30px;
      display: flex;
      // background-color: beige;
      justify-content: space-between;
      flex-wrap: wrap;
      width: 100%;

      .foot_one {
        width: 805px;
        height: 260px;

        // background-color: orchid;
        .ddd {
          margin: 20px 0px 30px 0px;
          font-family: "Helvetica";
          font-size: 26px;
          color: #ffffff;
        }

        .foot_one_bott {
          width: 100%;
          // background-color: aquamarine;
          display: flex;
          justify-content: space-evenly;

          .foot_one_bott_sj {
            width: 255px;
            height: 140px;
            background: url(../../assets/img/ZHTX/foot_one_bott_sj_bj.png) no-repeat;

            .name {
              margin-top: 10px;
              margin-left: 35px;
              margin-top: 8px;
              height: 33px;
              font-family: "Helvetica";
              font-size: 24px;
              line-height: 33px;
              color: #ffffff;
            }

            .value {
              margin-top: 10px;
              width: 100%;
              text-align: center;
              font-family: "Roboto";
              font-size: 60px;
              color: rgb(255, 255, 255);
            }
          }
        }
      }

      .foot_tow {
        width: 820px;
        height: 300px;
        // background-color: rosybrown;
        margin-bottom: 20px;

        .ddd {
          margin: 50px 0px 5px 0px;
          font-family: "Helvetica";
          font-size: 26px;
          color: #ffffff;
        }

        .foot_tow_bo {
          width: 100%;
          height: 215px;
          // background-color: lawngreen;
        }
      }

      .foot_three {
        margin-top: -10px;
        width: 805px;
        height: 300px;

        // background-color: red;
        .foot_three_bo {
          // margin-top: 10px;
          width: 100%;
          height: 270px;
          // background-color: #26ffff60;
        }
      }

      .foot_four {
        margin-top: 30px;
        width: 820px;
        height: 250px;

        .foot_four_bo {
          margin-top: 10px;
          width: 805px;
          height: 190px;
          background: url(../../assets/img/ZHTX/foot_four_bo_bj.png) no-repeat;
          display: flex;

          .loidou {
            width: 260px;
            height: 100%;
            margin-top: 20px;
            // background-color: #26ffff;
            margin-left: 80px;
          }

          .foot_four_bo_sj {
            margin-left: 30px;
            width: 400px;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;

            // background-color: #26ffff;
            .sj {
              width: 100%;
              height: 36px;
              display: flex;

              .yauandian {
                margin-top: 10px;
                width: 11px;
                height: 11px;
                border-radius: 50%;
                margin-right: 20px;
                // background-color: #007fff;
              }

              .name {
                line-height: 36px;
                font-family: "Helvetica";
                font-size: 18px;
                color: #bfebff;
                width: 160px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }

              .val {
                line-height: 36px;
                width: 110px;
                text-align: right;
                font-family: "Roboto";
                font-size: 28px;
              }

              .value {
                line-height: 36px;
                width: 80px;
                text-align: right;
                font-family: "Roboto";
                font-size: 28px;
                color: #bfefff;
              }
            }
          }
        }
      }
    }
  }
}
</style>
