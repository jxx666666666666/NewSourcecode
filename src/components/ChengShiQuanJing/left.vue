<template>
  <div class="boxs">
    <div class="head">
      <OneTitle width="100%" title="Traffic Operation" />
      <div class="models">
        <!-- Traffic Data Awareness -->
        <div class="head_left">
          <TwoTitle width="463px" title="Traffic Data Awareness" />
          <div class="cards">
            <div
              class="per"
              v-for="(item, index) in TrafficAwareness"
              :key="index"
            >
              <div class="name">{{ item.name }}</div>
              <div class="value">
                <p>{{ item.value }}</p>
                <span v-if="item.unit">{{ item.unit }}</span>
              </div>
            </div>
          </div>
        </div>
        <!-- Analysis Of Urban Road Congestion -->
        <div class="head_right">
          <TwoTitle width="100%" title="Analysis Of Urban Road Congestion" />
          <TitleTabs
            class="TitleTabs"
            :tabs="['Today', 'Month']"
            cssWidth="97px"
            :current="urbanCongestion"
            @changeTabs="urbanCongestionChangeTabs"
          />
          <div class="top">
            <div class="name">{{ urbanCongestionData.name }}</div>
            <div class="value">
              <p>{{ urbanCongestionData.value }}</p>
              <span>{{ urbanCongestionData.unit }}</span>
            </div>
          </div>
          <tablist
            :headerListData="headerListData"
            :bodyListData="urbanCongestionList"
            tableHeight="200px"
          />
        </div>
      </div>
    </div>
    <div class="foot">
      <OneTitle width="100%" title="Linkage Comman" />
      <div class="models">
        <!-- Rescue Force Analysis -->
        <TwoTitle width="100%" title="Rescue Force Analysis" />
        <div class="foot_top">
          <div class="per" v-for="(item, i) in RescueForceAnalysis" :key="i">
            <img :src="RescueForceAnalysisImg[i]" alt="" />
            <div class="cards">
              <p>{{ item.name }}</p>
              <span>{{ item.value }}</span>
            </div>
          </div>
        </div>
        <div class="foot_bottom">
          <!-- Risk Warning Analysis -->
          <div class="left">
            <TwoTitle width="100%" title="Risk Warning Analysis" />
            <div class="cards">
              <div
                class="per"
                v-for="(item, i) in RiskWarningAnalysis"
                :key="i"
              >
                <div>{{ item.name }}</div>
                <BountyTextVue
                  class="value"
                  :number="item.value"
                ></BountyTextVue>
              </div>
            </div>
          </div>
          <!-- Analysis Of Incident Reception In Each... -->
          <div class="right">
            <TwoTitle
              width="100%"
              title="Analysis Of Incident Reception In Each..."
            />
            <TitleTabs
              class="TitleTabs"
              :tabs="['Today', 'Month']"
              cssWidth="97px"
              :current="IncidentReception"
              @changeTabs="IncidentReceptionChangeTabs"
            />
            <BarChartsHVue
              height="300"
              zidingyi
              ysplitshow
              unit=""
              gridTop="7%"
              :rowData="IncidentReceptionData"
              style="margin-top: 20px"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OneTitle from "../common/OneTitle.vue";
import TwoTitle from "../common/twoTitle.vue";
import TitleTabs from "../common/TitleTabs.vue";
import tablist from "./common/TableList.vue";
import BarChartsHVue from "@/components/charts/ChartBar/BarChartsH.vue";
import BountyTextVue from "../../components/common/BountyText.vue";
export default {
  components: {
    OneTitle,
    TwoTitle,
    TitleTabs,
    tablist,
    BarChartsHVue,
    BountyTextVue,
  },
  data() {
    return {
      // Traffic Data Awareness
      TrafficAwareness: [
        {
          name: "Congestion Mileage",
          value: 34,
          unit: "km",
        },
        {
          name: "Traffic Congestion Index",
          value: 5.8,
        },
        {
          name: "Total Number Of Congested Roads",
          value: 9,
        },
      ],
      // Analysis Of Urban Road Congestion
      urbanCongestion: "Today",
      urbanCongestionData: {
        name: "Average Congestion Duration",
        value: 12,
        unit: "min",
      },
      headerListData: [
        {
          name: "Congestion Occurrence Time",
          width: "303px",
          key: "Time",
        },
        {
          name: "Road Section Name",
          width: "210px",
          key: "Name",
        },
        {
          name: "Congestion Duration",
          width: "221px",
          key: "Duration",
        },
        {
          name: "Congestion Level",
          width: "190px",
          key: "Level",
        },
      ],
      urbanCongestionList: [
        {
          Time: "2022-03-22 10:00:00",
          Name: "XXXXXX",
          Duration: "15min",
          Level: "XXXXXX",
        },
        {
          Time: "2022-03-22 10:00:00",
          Name: "XXXXXX",
          Duration: "15min",
          Level: "XXXXXX",
        },
        {
          Time: "2022-03-22 10:00:00",
          Name: "XXXXXX",
          Duration: "15min",
          Level: "XXXXXX",
        },
        {
          Time: "2022-03-22 10:00:00",
          Name: "XXXXXX",
          Duration: "15min",
          Level: "XXXXXX",
        },
        {
          Time: "2022-03-22 10:00:00",
          Name: "XXXXXX",
          Duration: "15min",
          Level: "XXXXXX",
        },
        {
          Time: "2022-03-22 10:00:00",
          Name: "XXXXXX",
          Duration: "15min",
          Level: "XXXXXX",
        },
      ],
      // Rescue Force Analysis
      RescueForceAnalysisImg: [
        require("@/assets/img/ChengShiQuanJing/Rescue.png"),
        require("@/assets/img/ChengShiQuanJing/Shelters.png"),
        require("@/assets/img/ChengShiQuanJing/Supplies.png"),
        require("@/assets/img/ChengShiQuanJing/ExpertTeams.png"),
      ],
      RescueForceAnalysis: [
        {
          name: "Rescue Teams",
          value: 16,
        },
        {
          name: "Shelters",
          value: 102,
        },
        {
          name: "Emergency Supplies",
          value: 2053,
        },
        {
          name: "ExpertTeams",
          value: 9,
        },
      ],
      // Risk Warning Analysis
      RiskWarningAnalysis: [
        {
          name: "Hidden Risks",
          value: 205,
        },
        {
          name: "Protection Targets",
          value: 38,
        },
      ],
      // Analysis Of Incident Reception In Each
      IncidentReception: "Today",
      IncidentReceptionData: [
        {
          dimension: "area 1",
          measure: 55,
        },
        {
          dimension: "area 2",
          measure: 80,
        },
        {
          dimension: "area 3",
          measure: 73,
        },
        {
          dimension: "area 4",
          measure: 50,
        },
        {
          dimension: "area 5",
          measure: 73,
        },
      ],
    };
  },
  created() {
    this.getTrafficAwareness();
    this.geturbanCongestionData();
    this.geturbanCongestionList();
    this.getRescueForceAnalysis();
    this.getRiskWarningAnalysis();
    this.getIncidentReceptionData();
  },
  methods: {
    urbanCongestionChangeTabs(val) {
      this.urbanCongestion = val;
      this.geturbanCongestionData();
      this.geturbanCongestionList();
    },
    IncidentReceptionChangeTabs(val) {
      this.IncidentReception = val;
      this.getIncidentReceptionData();
    },
    async getTrafficAwareness() {
      this.TrafficAwareness = await this.$http.CSQJApi.getTrafficAwareness();
    },
    async geturbanCongestionData() {
      this.urbanCongestionData =
        await this.$http.CSQJApi.geturbanCongestionData(this.urbanCongestion);
    },
    async geturbanCongestionList() {
      this.urbanCongestionList =
        await this.$http.CSQJApi.geturbanCongestionList(this.urbanCongestion);
    },
    async getRescueForceAnalysis() {
      this.RescueForceAnalysis =
        await this.$http.CSQJApi.getRescueForceAnalysis();
    },
    async getRiskWarningAnalysis() {
      this.RiskWarningAnalysis =
        await this.$http.CSQJApi.getRiskWarningAnalysis();
    },
    async getIncidentReceptionData() {
      this.IncidentReceptionData =
        await this.$http.CSQJApi.getIncidentReceptionData(
          this.IncidentReception
        );
    },
  },
};
</script>

<style scoped lang="less">
.boxs {
  .TitleTabs {
    position: absolute;
    top: 20px;
    right: 0;
  }
  .head {
    height: 557px;
    .models {
      display: flex;
      justify-content: space-between;
      margin-top: 27px;
      .head_left {
        width: 706px;
        .cards {
          display: flex;
          justify-content: space-between;
          width: 705px;
          height: 388px;
          background: url(~@/assets/img/ChengShiQuanJing/traffic.png) no-repeat;
          background-size: 100% 100%;
          box-sizing: border-box;
          padding-top: 130px;
          .per {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            width: 198px;
            height: 175px;
            .name {
              font: 24px "Helvetica";
              margin-top: 20px;
            }
            .value {
              display: flex;
              align-items: center;
              p {
                font: 70px "Roboto";
              }
              span {
                font: 18px "Helvetica";
                color: #72dcff;
                text-shadow: 1px 1px 2px #000;
                margin-left: 20px;
                margin-top: 30px;
              }
            }
            &:nth-child(2) {
              margin-top: 80px;
              .value {
                p {
                  background: linear-gradient(to bottom, #fffae9, #ffd24d);
                  -webkit-background-clip: text;
                  background-clip: text;
                  color: transparent;
                }
              }
            }
          }
        }
      }
      .head_right {
        position: relative;
        width: 927px;

        .top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 925px;
          height: 84px;
          background: url(~@/assets/img/ChengShiQuanJing/urbanCongestion.png)
            no-repeat;
          background-size: 100% 100%;
          margin-top: 24px;
          margin-bottom: 20px;
          box-sizing: border-box;
          padding: 0 39px;
          .name {
            font: 32px "Helvetica";
          }
          .value {
            display: flex;
            align-items: center;
            p {
              font: 70px "Roboto";
              background: linear-gradient(to bottom, #fffae9, #ffd24d);
              -webkit-background-clip: text;
              background-clip: text;
              color: transparent;
            }
            span {
              font: 20px "Helvetica";
              color: #72dcff;
              text-shadow: 1px 1px 2px #000;
              margin-left: 20px;
              margin-top: 30px;
            }
          }
        }
      }
    }
  }
  .foot {
    height: 693px;
    .models {
      margin-top: 43px;
      .foot_top {
        display: flex;
        justify-content: space-between;
        margin-top: 35px;
        .per {
          display: flex;
          img {
            width: 115px;
            height: 115px;
          }
          .cards {
            margin-left: 23px;
            p {
              font: 32px "Helvetica";
            }
            span {
              font: 74px "Roboto";
            }
          }
        }
      }
      .foot_bottom {
        display: flex;
        justify-content: space-between;
        margin-top: 40px;
        .left {
          width: 785px;
          .cards {
            display: flex;
            justify-content: space-between;
            width: 780px;
            height: 290px;
            background: url(~@/assets/img/ChengShiQuanJing/RiskWarning.png)
              no-repeat;
            background-size: 100% 100%;
            margin-top: 29px;
            box-sizing: border-box;
            padding: 40px 70px 0;
            .per {
              text-align: center;
              width: 293px;
              height: 236px;
              div {
                font: 32px "Helvetica";
              }
              .value {
                font: 80px "Roboto";
                margin-top: 40px;
              }
            }
          }
        }
        .right {
          position: relative;
          width: 820px;
        }
      }
    }
  }
}
</style>
