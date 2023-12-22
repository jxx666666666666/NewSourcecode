<template>
  <div class="ZHDG">
    <div class="layer-left">
      <OneTitle :title="'Lighting Management'" :width="'1680'" />
      <div class="Management-box">
        <div class="onLine-offLine">
          <TwoTitle :title="'Lamp Statistics'" />
          <div class="content-box">
            <div class="left-box">
              <DataStatistics
                :data="linedata"
                @itemClick="lampItemClick"
                ref="lampDataStatistics"
              />
            </div>
            <div class="right-box">
              <TabButton
                class="StatisticsTab"
                :cssWidth="'260px'"
                @changeTabs="StatisticsChange"
                :current="StatisticsCurrentTab"
                :tabs="StatisticsTabs"
              />
              <TabLable :className="StatisticsCurrentTab" :Datalist="TabData" />
            </div>
          </div>
        </div>
        <div class="lighting-box">
          <div class="LightingRate">
            <TwoTitle :title="'Lighting Rate'" />
            <ChartLineArea
              :rowData="ratedata"
              :width="'820px'"
              :unit="'%'"
              :height="'320px'"
              class="light-chart"
              :barColor="['#02f0f0']"
              :max="100"
              :interval="25"
              :symbolSize="0"
            />
          </div>
          <div class="EnergyConsumption">
            <TwoTitle :title="'Energy Consumption Statistics'" />
            <ChartLineArea
              :rowData="Energydata"
              :width="'830px'"
              :height="'320px'"
              class="Energy-chart"
              :barColor="['#48d98f']"
              :max="100"
              :interval="25"
              :unit="'kw/h'"
              :symbolSize="0"
            />
          </div>
        </div>
        <div class="number-box">
          <div class="NumberOfFaults">
            <TwoTitle :title="'Number Of Faults'" />
            <chartBar
              class="number-chart"
              :rowData="Numberdata"
              :width="'820px'"
              :height="'296px'"
              :legTop="'-20px'"
              :legLeft="'480px'"
              :legthWZ="Faultslegend"
              :interval="25"
            />
          </div>
          <div class="LightingPlan">
            <TwoTitle :title="'Lighting Plan'" />
            <TableTwo
              class="plan-table"
              :tableWidth="'830px'"
              :tableItemHeight="'45px'"
              :tableHeight="'270px'"
              :bodyListData="Plandata"
              :headerListData="planHeader"
              @hxtableclick="PlanClick"
              ref="leftTable"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="layer-content">
      <TodayList :rowData="TodayData" v-if="!showPopup" />
      <VideoAlart
        @closeAlart="VideoClose"
        class="videoAlartClass"
        v-if="VideoShow"
        :videosrc="VideoAlartUrl"
      />
      <PopupPanel v-show="showPopup"></PopupPanel>
      <PopupPage v-show="showPopup"></PopupPage>
    </div>
    <div class="layer-right">
      <OneTitle :title="'Information Release'" :width="'1680'" />
      <div class="displays-box">
        <div class="NumberofDisplays">
          <TwoTitle :title="'Number of Displays'" />
          <div class="left-box">
            <DataStatistics
              :data="Displaysdata"
              @itemClick="AdvertisementItemClick"
              ref="AdvertisementStatistics"
            />
          </div>
        </div>
        <div class="AdStatistics">
          <TwoTitle :title="'Ad Statistics'" />
          <div class="right-box">
            <ChartLoop
              :rowData="Statisticsdata"
              :height="'240px'"
              :width="'240px'"
              :fonts="'60'"
              :fontText="'24'"
              :radius="['90%', '80%']"
              :flexLegends="2"
            />
          </div>
        </div>
      </div>
      <div class="fault-box">
        <div class="FaultStatistics">
          <TwoTitle :title="'Fault Statistics'" />
          <RoseChart
            class="roseChart"
            width="530px"
            height="360px"
            :legendShow="2"
            :radius="[18, 100]"
            :center="['50%', '50%']"
            :rowData="DisplaysData"
          />
        </div>
        <div class="AdvertisementReleas">
          <TwoTitle :title="'Advertisement Releas'" />
          <TableTwo
            class="Releas-table"
            :tableWidth="'820px'"
            :tableItemHeight="'45px'"
            :tableHeight="'270px'"
            :bodyListData="Releasdata"
            :headerListData="ReleasHeader"
            @hxtableclick="ReleasClick"
            ref="rightTable"
          />
        </div>
      </div>
      <div class="video-box">
        <OneTitle :title="'Video Matrix'" :width="'1680'" />
        <div class="video">
          <videoTop :datalist="videoList" @videoClick="videoClick" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OneTitle from "../components/common/OneTitle.vue";
import TwoTitle from "../components/common/twoTitle.vue";
import DataStatistics from "../components/ZhiHuiDengGan/DataStatistics.vue";
import ChartLineArea from "../components/charts/ChartLine/ChartLineArea.vue";
import chartBar from "../components/charts/ChartBar/DuoZhuTu.vue";
import TableTwo from "../components/charts/Table/TableTwo.vue";
import TodayList from "../components/common/TodayList.vue";
import ChartLoop from "../components/charts/ChartLoop/ChartLoop.vue";
import RoseChart from "../components/charts/RoseChart/RoseChart.vue";
import videoTop from "../components/ZhiHuiDengGan/video.vue";
import TabButton from "../components/common/TabButton.vue";
import TabLable from "../components/ZhiHuiDengGan/TabLable.vue";
import VideoAlart from "../components/ZhiHuiDengGan/VideoAlart.vue";
import PopupPanel from "../components/ZhiHuiDengGan/PopupPanel.vue";
import PopupPage from "../components/ZhiHuiDengGan/PopupPage.vue";
export default {
  name: "ZhiHuiDengGan",
  components: {
    OneTitle,
    TwoTitle,
    DataStatistics,
    ChartLineArea,
    chartBar,
    TodayList,
    ChartLoop,
    RoseChart,
    videoTop,
    TabButton,
    TabLable,
    VideoAlart,
    TableTwo,
    PopupPanel,
    PopupPage,
  },
  data() {
    return {
      loopTimer: null,
      showPopup: false,
      VideoAlartUrl: "",
      VideoShow: false,
      TabData: [
        { name: "Smart lamp poles", num: 80 },
        { name: "Common lamp poles", num: 60 },
      ],
      StatisticsCurrentTab: "Total Number of Lamps",
      StatisticsTabs: [
        "Total Number of Lamps",
        "Lighting Status Statistics",
        "Energy Consumption",
      ],
      videoList: [
        {
          url: "/video/01.mp4",
          name: "001",
        },
        {
          url: "/video/02.mp4",
          name: "002",
        },
        {
          url: "/video/03.mp4",
          name: "003",
        },
        {
          url: "/video/04.mp4",
          name: "004",
        },
      ],
      DisplaysData: [
        {
          measure: 42,
          dimension: "Fault Level 01",
        },
        {
          measure: 35,
          dimension: "Fault Level 02",
        },
        {
          measure: 29,
          dimension: "Fault Level 03",
        },
        {
          measure: 17,
          dimension: "Fault Level 04",
        },
        {
          measure: 17,
          dimension: "Fault Level 05",
        },
      ],
      Statisticsdata: [
        { legend: "Type 01", measure: 35, rate: "26" },
        { legend: "Type 02", measure: 48, rate: "30" },
        { legend: "Type 03", measure: 27, rate: "50" },
        { legend: "Type 04", measure: 36, rate: "50" },
        { legend: "Type 05", measure: 42, rate: "80" },
      ],
      TodayData: [
        {
          title: "Today’s Weather",
          icon: require("../assets/img/ZhiHuiDengGan/title_01.png"),
          value: 34,
        },
        {
          title: "Tomorrow’s Weather",
          icon: require("../assets/img/ZhiHuiDengGan/title_01.png"),
          value: 30,
        },
        {
          title: "Tomorrow’s Weather",
          icon: require("../assets/img/ZhiHuiDengGan/title_01.png"),
          value: 28,
        },
        {
          title: "Online",
          icon: require("../assets/img/ZhiHuiDengGan/title_02.png"),
          value: 65,
        },
        {
          title: "Offline",
          icon: require("../assets/img/ZhiHuiDengGan/title_03.png"),
          value: 45,
        },
      ],
      Faultslegend: ["Grade 1", "Grade 2", "Grade 3"],
      ReleasHeader: [
        { name: "Released Content", width: "270px" },
        { name: "Release Time", width: "270px" },
        { name: "Ad Screen ID", width: "278px" },
      ],
      Displaysdata: [
        { name: "Online Quantity", num: "88" },
        { name: "Offline Quantity", num: "30" },
      ],
      planHeader: [
        { name: "Area Type", width: "275px" },
        { name: "Time Segment", width: "275px" },
        { name: "Light Level", width: "278px" },
      ],
      Releasdata: [
        {
          id: "01",
          time: "2022-03-22 10:00:00",
          content: "424534",
        },
        {
          id: "02",
          time: "2022-03-22 10:00:00",
          content: "125446",
        },
        {
          id: "03",
          time: "2022-03-22 10:00:00",
          content: "445682",
        },
        {
          id: "04",
          time: "2022-03-22 10:00:00",
          content: "789364",
        },
        {
          id: "05",
          time: "2022-03-22 10:00:00",
          content: "786424",
        },
        {
          id: "06",
          time: "2022-03-22 10:00:00",
          content: "773424",
        },
      ],
      Plandata: [
        {
          id: "Type 01",
          time: "2021-6-10",
          content: "Grade 1",
        },
        {
          id: "Type 02",
          time: "2021-6-10",
          content: "Grade 2",
        },
        {
          id: "Type 03",
          time: "2021-6-10",
          content: "Grade 3",
        },
        {
          id: "Type 04",
          time: "2021-6-10",
          content: "Grade 1",
        },
        {
          id: "Type 05",
          time: "2021-6-10",
          content: "Grade 2",
        },
        {
          id: "Type 06",
          time: "2021-6-10",
          content: "Grade 3",
        },
        {
          id: "Type 07",
          time: "2021-6-10",
          content: "Grade 1",
        },
        {
          id: "Type 08",
          time: "2021-6-10",
          content: "Grade 2",
        },
      ],
      Numberdata: [
        {
          name: "Region A",
          value: "79",
          item: "65",
          val: "50",
        },
        {
          name: "Region B",
          value: "70",
          item: "65",
          val: "75",
        },
        {
          name: "Region C",
          value: "55",
          item: "70",
          val: "50",
        },
        {
          name: "Region D",
          value: "65",
          item: "75",
          val: "50",
        },
        {
          name: "Region E",
          value: "70",
          item: "55",
          val: "65",
        },
      ],
      linedata: [
        { name: "onLine", num: "135" },
        { name: "offLine", num: "6" },
      ],
      Energydata: [
        {
          name: "01",
          value: 75,
        },
        {
          name: "02",
          value: 80,
        },
        {
          name: "03",
          value: 75,
        },
        {
          name: "04",
          value: 75,
        },
        {
          name: "05",
          value: 65,
        },
        {
          name: "06",
          value: 70,
        },
        {
          name: "07",
          value: 65,
        },
        {
          name: "08",
          value: 75,
        },
        {
          name: "09",
          value: 77,
        },
        {
          name: "10",
          value: 70,
        },
        {
          name: "11",
          value: 82,
        },
      ],
      ratedata: [
        {
          name: "01",
          value: 70,
        },
        {
          name: "02",
          value: 80,
        },
        {
          name: "03",
          value: 70,
        },
        {
          name: "04",
          value: 90,
        },
        {
          name: "05",
          value: 75,
        },
        {
          name: "06",
          value: 75,
        },
        {
          name: "07",
          value: 80,
        },
      ],
    };
  },
  methods: {
    // Click on the table on the righ
    ReleasClick(item) {
      this.$refs.AdvertisementStatistics.clearHigh();
      this.$refs.lampDataStatistics.clearHigh();
      this.$refs.leftTable.clearHigh();
      this.$store.commit("setHighLight", "planAdvertisement");
    },
    // Click on the left table
    PlanClick(item) {
      this.$refs.AdvertisementStatistics.clearHigh();
      this.$refs.lampDataStatistics.clearHigh();
      this.$refs.rightTable.clearHigh();
      this.$store.commit("setHighLight", "planLamp");
    },
    // Video click
    videoClick(e) {
      this.VideoAlartUrl = e.url;
      this.VideoShow = true;
      console.log(e);
    },
    // Close Video Popup
    VideoClose() {
      this.VideoShow = false;
    },
    // Tab switch in the upper left corner
    StatisticsChange(e) {
      this.StatisticsCurrentTab = e;

      switch (e) {
        case "Total Number of Lamps":
          this.TabData = [
            { name: "Smart lamp poles", num: 80 },
            { name: "Common lamp poles", num: 60 },
          ];
          break;
        case "Lighting Status Statistics":
          this.TabData = [
            { name: "full-bright", num: 120 },
            { name: "semi-bright", num: 205 },
            { name: "micro-bright", num: 102 },
            { name: "close", num: 95 },
          ];
          break;
        case "Energy Consumption":
          this.TabData = [
            { name: "Total Energy  Consumption", num: 80 },
            { name: "Estimated Energy  Consumption", num: 30 },
          ];
          break;
      }
    },
    lampItemClick(item) {
      this.$refs.AdvertisementStatistics.clearHigh();
      this.$refs.leftTable.clearHigh();
      this.$refs.rightTable.clearHigh();
      if (item == "onLine") {
        this.$store.commit("setHighLight", "onLineLamp");
      } else if (item == "offLine") {
        this.$store.commit("setHighLight", "offLineLamp");
      } else {
        this.$store.commit("setHighLight", "");
      }
    },
    AdvertisementItemClick(item) {
      this.$refs.lampDataStatistics.clearHigh();
      this.$refs.leftTable.clearHigh();
      this.$refs.rightTable.clearHigh();
      if (item == "Online Quantity") {
        this.$store.commit("setHighLight", "onLineAdvertisement");
      } else if (item == "Offline Quantity") {
        this.$store.commit("setHighLight", "offLineAdvertisement");
      } else {
        this.$store.commit("setHighLight", "");
      }
    },
  },
  mounted() {
    let index = 0;
    let that = this;
    this.loopTimer = setInterval(() => {
      if (index > 2) {
        index = 0;
      }
      let className = that.StatisticsTabs[index];
      that.StatisticsChange(className);
      index++;
    }, 10000);

    this.$eventBus.$on("SmartSelected", (res) => {
      that.showPopup = res;
    });
  },
  destroyed() {
    this.loopTimer && clearInterval(this.loopTimer);
  },
};
</script>

<style lang="less" scoped>
.ZHDG {
  pointer-events: none;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;

  .layer-left {
    pointer-events: all;
    width: 1680px;
    height: 100%;

    .Management-box {
      height: 100%;
      width: 100%;

      .onLine-offLine {
        margin-top: 30px;
        height: 380px;
        width: 100%;

        .content-box {
          width: 100%;
          height: 100%;
          display: flex;

          .left-box {
            height: 100%;
            width: 50%;
          }

          .right-box {
            // margin-left: 15px;
            transform: translateX(15px);
            height: 100%;
            width: 50%;
            position: relative;

            .StatisticsTab {
              position: absolute;
              top: 20px;
              left: 35px;
            }
          }
        }
      }

      .lighting-box {
        width: 100%;
        height: 420px;
        display: flex;

        .LightingRate {
          width: 50%;
          height: 100%;

          .light-chart {
            margin-top: 20px;
          }
        }

        .EnergyConsumption {
          margin-left: 15px;
          width: 50%;
          height: 100%;

          .Energy-chart {
            margin-top: 20px;
          }
        }
      }

      .number-box {
        height: 360px;
        width: 100%;
        display: flex;

        .NumberOfFaults {
          width: 50%;
          height: 100%;

          .number-chart {
            margin-top: 50px;
          }
        }

        .LightingPlan {
          margin-left: 15px;
          width: 50%;
          height: 100%;

          .plan-table {
            margin-top: 30px;
            height: 280px;
            width: 820px;
          }
        }
      }
    }
  }

  .layer-content {
    height: 100%;
    width: 4000px;
    margin: 0 80px;

    /deep/ .todayList {
      margin-top: 20px;
    }

    div {
      pointer-events: none;
    }

    .videoAlartClass {
      position: absolute;
      top: 85px;
      left: 3099px;
    }
  }

  .layer-right {
    pointer-events: all;
    width: 1680px;
    height: 100%;

    .displays-box {
      margin-top: 30px;
      width: 100%;
      height: 376px;
      display: flex;

      .NumberofDisplays {
        width: 50%;
        height: 100%;

        .left-box {
          height: 100%;
          width: 100%;
        }
      }

      .AdStatistics {
        width: 50%;
        height: 100%;

        // transform: translateX(15px);
        .right-box {
          box-sizing: border-box;
          padding-top: 45px;
          height: 100%;
          width: 100%;
        }
      }
    }

    .fault-box {
      width: 100%;
      height: 408px;
      display: flex;

      .FaultStatistics {
        width: 50%;
        height: 100%;

        .roseChart {
          transform: translateX(-40px);
        }
      }

      .AdvertisementReleas {
        // margin-left: 15px;
        width: 50%;
        height: 100%;

        .Releas-table {
          margin-top: 30px;
        }
      }
    }

    .video-box {
      width: 100%;
      height: 360px;

      .video {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
