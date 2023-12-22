<template>
  <div class="boxs">
    <!-- Economic Operation -->
    <div class="left">
      <OneTitle width="100%"
                title="Economic Operation" />
      <TitleTabs class="TitleTabs"
                 cssWidth="147px"
                 :tabs="['This Year', 'Last 5 Years']"
                 :current="EconomicOperation"
                 @changeTabs="EconomicOperationChangeTabs" />
      <!-- Macroeconomic Analysis By Region -->
      <div class="head">
        <TwoTitle width="100%"
                  title="Macroeconomic Analysis By Region" />
        <div class="model">
          <div class="per"
               v-for="(item, i) in MacroeconomicAnalysis"
               :key="i"
               @click="ceshi(item,i)"
               :class="{ active: i == currIndex }">
            <div class="name">{{ item.name }}</div>
            <div class="value">
              <BountyTextVue class="total"
                             :number="item.value" />
              <span>{{ item.unit }}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- Total Retail Sales Of Social Consumer Goods -->
      <div class="body">
        <TwoTitle width="100%"
                  title="Total Retail Sales Of Social Consumer Goods" />
        <ChartLineArea2 width="839px"
                        height="250px"
                        top="7%"
                        :barColor="['rgba(0, 240, 240, 0.5)', '#00F0F000']"
                        :rowData="SalesSocial"
                        style="margin-top: 20px" />
      </div>
      <!-- Total Import And Export Volume -->
      <div class="foot">
        <TwoTitle width="100%"
                  title="Total Import And Export Volume" />
        <chartBar width="842px"
                  height="256px"
                  :grid="{
            left: '1%',
            right: '2%',
            top: '18%',
            bottom: '0%',
            containLabel: true,
          }"
                  unit=""
                  :legthWZ="['Imports', 'Exports']"
                  legLeft="620px"
                  :rowData="ImportExportVolume"
                  :barColor="['#3C6BEA', '#02FDE3']"
                  :legthColor="['#3C6BEA', '#02FDE3']" />
      </div>
    </div>
    <!-- Public Security -->
    <div class="right">
      <OneTitle width="100%"
                title="Public Security" />
      <TitleTabs class="TitleTabs"
                 cssWidth="107px"
                 :tabs="['Month', 'Year']"
                 :current="PublicSecurity"
                 @changeTabs="PublicSecurityChangeTabs" />
      <!-- Public Security Incident -->
      <div class="head">
        <TwoTitle width="100%"
                  title="Public Security Incident" />
        <div class="model">
          <div class="per"
               v-for="(item, i) in PublicSecurityIncident"
               :key="i">
            <div class="name">{{ item.name }}</div>
            <p>{{ item.value }}</p>
          </div>
        </div>
      </div>
      <!-- Analysis Of Public Health Event Types -->
      <div class="body">
        <TwoTitle width="100%"
                  title="Analysis Of Public Health Event Types" />
        <ChartLoop width="240px"
                   height="240px"
                   :flexLegends="5"
                   :rowData="PublicHealth"
                   :legends="['#00F4EA', '#00DD8A', '#CDFC2E']"
                   style="margin-top: 25px" />
      </div>
      <!-- Statistics On Direct Loss Caused By Accidents -->
      <div class="foot">
        <TwoTitle width="100%"
                  title="Statistics On Direct Loss Caused By Accidents" />
        <ZhuTu :legthWZ="[]"
               :grid="{
            left: '1%',
            right: '2%',
            top: '10%',
            bottom: '0%',
            containLabel: true,
          }"
               unit=""
               width="800px"
               height="253px"
               :rowData="DirectLoss" />
      </div>
    </div>
  </div>
</template>

<script>
import OneTitle from "../common/OneTitle.vue";
import TwoTitle from "../common/twoTitle.vue";
import TitleTabs from "../common/TitleTabs.vue";
import ChartLineArea2 from "@/components/charts/ChartLine/ChartLineArea2.vue";
import chartBar from "./common/DuoZhuTu.vue";
import ZhuTu from "./common/ZhuTu.vue";
import ChartLoop from "./common/ChartLoop.vue";
import BountyTextVue from "../../components/common/BountyText.vue";
import HighLight from "../common/HighLight.vue";

export default {
  components: {
    OneTitle,
    TwoTitle,
    TitleTabs,
    ChartLineArea2,
    chartBar,
    ChartLoop,
    ZhuTu,
    BountyTextVue,
    HighLight
  },
  data () {
    return {
      currIndex: -1,
      // Economic Operation
      EconomicOperation: "This Year",
      // Public Security
      PublicSecurity: "Month",
      // Macroeconomic Analysis By Region
      MacroeconomicAnalysis: [
        {
          name: "City GDP",
          value: 1569,
          unit: "$ M",
        },
        {
          name: "Per Capita Income Of Residents",
          value: 3,
          unit: "$ T",
        },
        {
          name: "Fixed Asset Investment",
          value: 267,
          unit: "$ M",
        },
        {
          name: "City-wide Tax Revenue",
          value: 607,
          unit: "$ M",
        },
      ],
      // Total Retail Sales Of Social Consumer Goods
      SalesSocial: [
        {
          name: "01",
          value: 210,
        },
        {
          name: "02",
          value: 260,
        },
        {
          name: "03",
          value: 270,
        },
        {
          name: "04",
          value: 210,
        },
        {
          name: "05",
          value: 200,
        },
        {
          name: "06",
          value: 220,
        },
        {
          name: "07",
          value: 280,
        },
        {
          name: "08",
          value: 300,
        },
        {
          name: "09",
          value: 280,
        },
        {
          name: "10",
          value: 280,
        },
        {
          name: "11",
          value: 270,
        },
        {
          name: "12",
          value: 280,
        },
      ],
      // Total Import And Export Volume
      ImportExportVolume: [
        {
          name: "January",
          value: 270,
          item: 245,
        },
        {
          name: "February",
          value: 210,
          item: 245,
        },
        {
          name: "March",
          value: 180,
          item: 245,
        },
        {
          name: "April",
          value: 180,
          item: 245,
        },
        {
          name: "May",
          value: 250,
          item: 245,
        },
        {
          name: "June",
          value: 250,
          item: 245,
        },
        {
          name: "July",
          value: 210,
          item: 180,
        },
      ],
      // Public Security Incident
      PublicSecurityIncident: [
        {
          name: "Total Number Of Events",
          value: 1032,
        },
        {
          name: "Total Number Of Public Health",
          value: 206,
        },
        {
          name: "Total Number Of Construction Site Safety Incidents",
          value: 193,
        },
        {
          name: "Total Number Of Public Security Incidents",
          value: 67,
        },
      ],
      // Analysis Of Public Health Event Types
      PublicHealth: [
        {
          legend: "Major Food Poisoning",
          measure: 27,
        },
        {
          legend: "Occupational Poisoning",
          measure: 36,
        },
        {
          legend: "Infectious Disease Control",
          measure: 42,
        },
      ],
      // Statistics On Direct Loss Caused By Accidents
      DirectLoss: [
        {
          name: "January",
          value: 270,
        },
        {
          name: "February",
          value: 210,
        },
        {
          name: "March",
          value: 180,
        },
        {
          name: "April",
          value: 180,
        },
        {
          name: "May",
          value: 250,
        },
        {
          name: "June",
          value: 250,
        },
        {
          name: "July",
          value: 210,
        },
      ],
    };
  },
  created () {
    this.getMacroeconomicAnalysis();
    this.getSalesSocial();
    this.getImportExportVolume();
    this.getPublicSecurityIncident();
    this.getPublicHealth();
    this.getDirectLoss();
  },
  methods: {
    ceshi (val, index) {
      if (val.name === 'City GDP') {
        if (this.currIndex == index) {
          this.currIndex = -1;
          this.$store.commit("setHighLight", "");
        } else {
          this.currIndex = index;
          this.$store.commit("setHighLight", "CityGDP");
        }
      }

    },
    EconomicOperationChangeTabs (val) {
      this.EconomicOperation = val;
      this.getMacroeconomicAnalysis();
      this.getSalesSocial();
      this.getImportExportVolume();
    },
    PublicSecurityChangeTabs (val) {
      this.PublicSecurity = val;
      this.getPublicSecurityIncident();
      this.getPublicHealth();
      this.getDirectLoss();
    },
    async getMacroeconomicAnalysis () {
      this.MacroeconomicAnalysis =
        await this.$http.CSQJApi.getMacroeconomicAnalysis(
          this.EconomicOperation
        );
    },
    async getSalesSocial () {
      this.SalesSocial = await this.$http.CSQJApi.getSalesSocial(
        this.EconomicOperation
      );
    },
    async getImportExportVolume () {
      this.ImportExportVolume = await this.$http.CSQJApi.getImportExportVolume(
        this.EconomicOperation
      );
    },
    async getPublicSecurityIncident () {
      this.PublicSecurityIncident =
        await this.$http.CSQJApi.getPublicSecurityIncident(this.PublicSecurity);
    },
    async getPublicHealth () {
      this.PublicHealth = await this.$http.CSQJApi.getPublicHealth(
        this.PublicSecurity
      );
    },
    async getDirectLoss () {
      this.DirectLoss = await this.$http.CSQJApi.getDirectLoss(
        this.PublicSecurity
      );
    },
  },
};
</script>

<style scoped lang="less">
.boxs {
  display: flex;
  justify-content: space-between;
  height: 100%;
  .TitleTabs {
    position: absolute;
    top: 0;
    right: 0;
  }
  .left {
    position: relative;
    width: 842px;
    .head {
      height: 508px;
      margin-top: 37px;
      .model {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        align-content: space-between;
        width: 829px;
        height: 398px;
        background: url(~@/assets/img/ChengShiQuanJing/Macroeconomic.png)
          no-repeat;
        background-size: 100% 100%;
        margin-top: 40px;
        box-sizing: border-box;
        padding: 0 70px;
        pointer-events: all;
        .per {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 320px;
          height: 176px;
          .name {
            width: 260px;
            height: 50px;
            text-align: center;
            font-size: 26px;
            line-height: 30px;
          }
          .value {
            display: flex;
            align-items: center;
            .total {
              font: 70px "Roboto";
            }
            span {
              font-size: 20px;
              color: #72dcff;
              text-shadow: 1px 1px 2px #000;
              margin-left: 10px;
              margin-top: 20px;
              width: 60px;
            }
          }
        }
      }
    }
    .body {
      height: 333px;
    }
  }
  .right {
    position: relative;
    width: 799px;
    .head {
      height: 508px;
      margin-top: 37px;
      .model {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-content: space-between;
        width: 801px;
        height: 395px;
        background: url(~@/assets/img/ChengShiQuanJing/public.png) no-repeat;
        background-size: 100% 100%;
        margin-top: 40px;
        box-sizing: border-box;
        padding: 15px 0;
        .per {
          width: 373px;
          height: 169px;
          box-sizing: border-box;
          padding-left: 25px;
          .name {
            display: flex;
            align-items: center;
            font-size: 23px;
            margin-top: 10px;
            line-height: 24px;
            height: 67px;
          }
          p {
            font: 70px "Roboto";
            text-shadow: 0 0 6px #0080ff;
          }
          &:nth-child(2n) {
            padding-left: 115px;
          }
        }
      }
    }
    .body {
      height: 333px;
    }
  }
}
.active {
  content: "";
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-shadow: 0px 0px 12px 6px rgba(255, 201, 38, 0.65) inset;
  background-color: rgba(255, 201, 38, 0.15);
}
</style>
