<template>
  <div class="ZHDG">
    <!-- Left section -->
    <div class="layer-left">
      <!-- Left Headline -->
      <OneTitle :title="'Police Situation Monitoring'" :width="'1680'" />
      <div class="Management-box">
        <div class="row1">
          <div class="left">
            <TwoTitle :title="'Number of Alarm way Modes'" />
            <div class="content">
              <div class="ratue_ball">
                <div class="value">
                  <div class="baifenbi">{{ baifenbi }}</div>
                  <div class="english">{{ TotalValue }}</div>
                </div>
              </div>
              <div class="ratue_incircle"></div>
              <div class="ratue_middle"></div>
              <div class="ratue_outcirlce"></div>
              <div class="ratue_tuli">
                <TuLi :arrlist="alarmList"></TuLi>
              </div>
            </div>
          </div>
          <div class="right">
            <TwoTitle :title="'Alarm Type Analysis of the Month'" />
            <div class="content">
              <duohuantuchart :displayModel="3" :color="['#0080FF', '#06CA84', '#42D0FF', '#7373FF', '#FFBC4D']"
                :rowData="shhyjgfxData" :barWidth="14"></duohuantuchart>
            </div>
          </div>
        </div>
        <div class="row2">
          <div class="left">
            <TwoTitle :title="'Alarm  Quantity Change Trend'" />
            <div class="content">
              <BarChartsHVue class="zdrqShuLiang" :zidingyi="true" :ysplitshow="true" :unit="''" :rowData="midbar"
                :width="'800'" :gridLeft="'0%'" :height="'300'"></BarChartsHVue>
            </div>
          </div>
          <div class="right">
            <TwoTitle :title="'Top 5 Alarm Type Statistics of the Month'" />
            <div class="content">
              <ZerenDanwei2 :list="top5data"></ZerenDanwei2>
            </div>
          </div>
        </div>
        <div class="row3">
          <TwoTitle :title="'Alarm list of the current day (this week)'" />
          <div class="content">
            <ShiJianLieBiao :tableHead="tableHead" :tableBody="tableBody" :scrollCount="5">
            </ShiJianLieBiao>
          </div>
        </div>
      </div>
    </div>
    <!-- Middle -->
    <div class="layer-content">
      <!-- Middle page indicators section -->
      <TodayList :rowData="LeftData" class="centerLeft" />
      <TodayList :rowData="RightData" class="centerRight" />
      <!-- Video pop-up component -->
      <VideoAlart @closeAlart="VideoClose" class="videoAlartClass" v-if="VideoShow" :videosrc="VideoAlartUrl" />
    </div>
    <!-- Right section -->
    <div class="layer-right">
      <!-- Headline in the upper right corner -->
      <OneTitle :title="'Safety Monitoring of Key Projects'" :width="'1680'" />
      <div class="displays-box">
        <div class="NumberofDisplays">
          <div class="left-box">
            <div class="infoLeft">
              <div class="content">
                <TabLableList :Datalist="Datalist"></TabLableList>
              </div>
            </div>
            <div class="infoRight">
              <TwoTitle :title="'Analysis of the types of projects under construction'" />
              <div class="content">
                <BarCharts :measurebox="4" :rowData="pwsltjBarData" width="780" :barWidth="4" :unit="['']" height="269"
                  :legends="pwsltjBarLegend" gridTop="10%" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <OneTitle :title="'Environmental Monitoring'" :width="'1680'" />
      <div class="fault-box">
        <div class="air">
          <div class="content">
            <gdzs :obj="yoydata"></gdzs>
          </div>
        </div>
        <div class="Ave">
          <div class="content">
            <TwoTitle :title="'Average PM2.5 concentration'" />
            <div class="AveChart">
              <rowbar style="margin-top: 15px" xtype="value" ytype="category" width="500" height="204" :colorList="[
                { from: '#73FF96', to: '#00D96D' },
                { from: '#99E5FF', to: '#2693FF' },
              ]" :stack="false" :rowData="bottomData" :isShowRate="true" :ysplitshow="false" :Showlegend="false"
                :active="true" :labelshow="false" :showXaxis="true" :gridRight="'0%'" :gridTop="'0%'" :gridLeft="'0%'"
                :gridBottom="'1%'" :inverse="false" :unit="''" :barMaxWidth="486" :isShowNumer="12" :valFontSize="30"
                :isShowLengend="false" :YaxisLabel="{
                  fontFamily: 'Microsoft YaHei',
                  fontSize: 18,
                  color: '#BFEBFF',
                }"></rowbar>
            </div>
          </div>
        </div>
        <div class="Excel">
          <div class="content">
            <gdzs :obj="airdata"></gdzs>
          </div>
        </div>
        <div class="Reg">
          <div class="content">
            <TwoTitle :title="'Regional ambient noise'" />
            <div class="RegChart">
              <radarChart :rowData="yxzbdfldtrowData"></radarChart>
            </div>
          </div>
        </div>
      </div>
      <div class="video-box">
        <OneTitle :title="'Key Places Video Surveillance'" :width="'1670'" />
        <div class="video">
          <!-- Video rotation in the lower right corner -->
          <videoTop :datalist="videoList" @videoClick="videoClick" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BarCharts from "../components/charts/ChartBar/ChartBar.vue";
import BarChartsHVue from "../components/charts/ChartBar/BarChartsH.vue";
// Introducing a Level 1 Title
import OneTitle from "../components/common/OneTitle.vue";
// Introducing Secondary Headings
import TwoTitle from "../components/common/twoTitle.vue";
import DataStatistics from "../components/ZhiHuiDengGan/DataStatistics.vue";
// Import Line chart
import ChartLineArea from "../components/charts/ChartLine/ChartLineArea.vue";
// Introducing a multi column chart
import chartBar from "../components/charts/ChartBar/DuoZhuTu.vue";
// Import form component
import TableTwo from "../components/charts/Table/TableTwo.vue";
// Introducing Page Indicator Components
import TodayList from "../components/common/TodayList.vue";
// Introducing circular components
import ChartLoop from "../components/charts/ChartLoop/ChartLoop.vue";
// Introducing Rose Chart Components
import RoseChart from "../components/charts/RoseChart/RoseChart.vue";
// Introducing video components
import videoTop from "../components/ZhiHuiDengGan/video.vue";
// Introducing tab components
import TabButton from "../components/common/TabButton.vue";
// Import tab content
import TabLable from "../components/ZhiHuiDengGan/TabLable.vue";
// Introducing video pop-up components
import VideoAlart from "../components/ZhiHuiDengGan/VideoAlart.vue";
//Introducing TOP5
import ZerenDanwei2 from "../components/GongGongAnQuan/ZerenDanwei2.vue";
//Introducing a scrolling table
import ShiJianLieBiao from "../components/GongGongAnQuan/ShiJianLieBiao.vue";
//Introducing digital scrolling chart components
import TabLableList from "../components/GongGongAnQuan/TabLableList.vue";
//Introducing PM2.5
import rowbar from "../components/GongGongAnQuan/rowbar.vue";
//Introducing Chart Components
import gdzs from "../components/GongGongAnQuan/gdzs.vue";
//Introducing multi column chart components
import duohuantuchart from "../components/GongGongAnQuan/duohuantuchart.vue";
//Introducing multi column chart components
import radarChart from "../components/GongGongAnQuan/radarChart.vue";
//Introducing Legend Components
import TuLi from "../components/GongGongAnQuan/TuLi.vue";
export default {
  name: "GongGongAnQuan",
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
    BarChartsHVue,
    BarCharts,
    ZerenDanwei2,
    ShiJianLieBiao,
    TabLableList,
    rowbar,
    gdzs,
    duohuantuchart,
    radarChart,
    TuLi,
  },
  data() {
    return {
      alarmList: [
        {
          text: '112 Telephone Alarm',
          zhanbi: '50%',
          number: 50
        },
        {
          text: '999 Telephone Alarm',
          zhanbi: '22%',
          number: 22
        },
        {
          text: 'Others',
          zhanbi: '28%',
          number: 28
        },
      ],
      alarmTimer: null,
      yxzbdfldtrowData: [
        {
          name: "01",
          max: 100,
          value: 91.1,
          legend: "Excellent indicator score",
        },
        {
          name: "02",
          max: 100,
          value: 78.6,
          legend: "Excellent indicator score",
        },
        {
          name: "03",
          max: 100,
          value: 85.48,
          legend: "Excellent indicator score",
        },
        {
          name: "04",
          max: 100,
          value: 97.92,
          legend: "Excellent indicator score",
        },
        {
          name: "05",
          max: 100,
          value: 95.71,
          legend: "Excellent indicator score",
        },
      ],
      shhyjgfxData: [
        { category: "Network Fraud", value: 40, zb: "20%" },
        { category: "Civil Dispute", value: 40, zb: "20%" },
        { category: "Theft", value: 40, zb: "20%" },
        { category: "Robbery", value: 40, zb: "20%" },
        { category: "Others", value: 40, zb: "20%" },
      ],
      baifenbi: "35.81%",
      TotalValue: "112 Telephone Alarm",
      airdata: [
        {
          title: "Air Excellent Rate and YOY",
          value: "73.2%",
          tb: "-6.2%",
        },
      ],
      yoydata: [
        {
          title: "Good Air Days and YOY",
          value: "125",
          tb: "+4.0%",
        },
      ],
      bottomData: [
        { legend: "", measure: 152, dimension: "this month" },
        { legend: "", measure: 101, dimension: "last year" },
        { legend: "", measure: 90, dimension: "1-3 month" },
        { legend: "", measure: 101, dimension: "last year" },
      ],
      Datalist: [
        { name: "Total Number of Projects Under Construction", num: 80 },
        { name: "Total Hidden Dangers Of Construction In Progress", num: 30 },
      ],
      top5data: [
        {
          name: "Incident Type 01",
          value: "4354",
        },
        {
          name: "Incident Type 02",
          value: "2345",
        },
        {
          name: "Incident Type 03",
          value: "1983",
        },
        {
          name: "Incident Type 04",
          value: "1548",
        },
        {
          name: "Incident Type 05",
          value: "1043",
        },
      ],
      tableHead: [
        { name: "Alarm Time", mesuers: 330 },
        { name: "Alarm Phone Number", mesuers: 330 },
        { name: "Alarm Location", mesuers: 330 },
        { name: "Alarm Content", mesuers: 330 },
        { name: "Alarm Handling", mesuers: 330 },
      ],
      tableBody: [
        {
          name: "2022-03-1 18:00:00",
          value: "458342746",
          lv: "Nairobi",
          hotel: "Traffic Accident",
          daba: "Detain",
        },
        {
          name: "2022-03-2 4:00:00",
          value: "4583344243",
          lv: "Nyeri",
          hotel: "Fire",
          daba: "OutFire",
        },
        {
          name: "2022-03-5 10:00:00",
          value: "4243824643",
          lv: "Mombasa",
          hotel: "Wander Away",
          daba: "Look For",
        },
        {
          name: "2022-03-10 12:00:00",
          value: "533422442",
          lv: "Nyanza",
          hotel: "Come To Blows",
          daba: "Detain",
        },
        {
          name: "2022-03-14 9:00:00",
          value: "1245342",
          lv: "Nakuru",
          hotel: "Rob",
          daba: "Detention For Two Months",
        },
      ],
      pwsltjBarLegend: [{ name: "", from: "#43BFFF", to: "#4360E4" }],
      pwsltjBarData: [
        { legend: "Type 1", measure: 420, dimension: "Type 01" },
        { legend: "Type 1", measure: 310, dimension: "Type 02" },
        { legend: "Type 1", measure: 270, dimension: "Type 03" },
        { legend: "Type 1", measure: 440, dimension: "Type 04" },
        { legend: "Type 1", measure: 320, dimension: "Type 05" },
        { legend: "Type 1", measure: 320, dimension: "Type 06" },
        { legend: "Type 1", measure: 320, dimension: "Type 07" },
      ],
      midbar: [
        { legend: "1", measure: 50, dimension: "01" },
        { legend: "1", measure: 75, dimension: "02" },
        { legend: "1", measure: 25, dimension: "03" },
        { legend: "1", measure: 40, dimension: "04" },
        { legend: "1", measure: 80, dimension: "05" },
        { legend: "1", measure: 73, dimension: "06" },
        { legend: "1", measure: 50, dimension: "07" },
        { legend: "1", measure: 70, dimension: "08" },
        { legend: "1", measure: 46, dimension: "09" },
        { legend: "1", measure: 38, dimension: "10" },
        { legend: "1", measure: 69, dimension: "11" },
        { legend: "1", measure: 86, dimension: "12" },
      ],
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
          url: "/video/02.mp4",
          name: "001",
          code: '00402032009963560101#f4b00b238376482bb719fc54b49add42',
          isDebugger: window.streamingConfig.debugger.PS
        },
        {
          url: "/video/03.mp4",
          name: "002",
          code: '00402032000906370101#f4b00b238376482bb719fc54b49add42',
          isDebugger: window.streamingConfig.debugger.PS
        },
        {
          url: "/video/04.mp4",
          name: "003",
          code: '00402032002037570101#f4b00b238376482bb719fc54b49add42',
          isDebugger: window.streamingConfig.debugger.PS
        }
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
      LeftData: [
        {
          title: "Number of Shelters",
          icon: require("../assets/img/GongGongAnQuan/title1.png"),
          value: 94,
        },
        {
          title: "Number of Medical Personnel",
          icon: require("../assets/img/GongGongAnQuan/title2.png"),
          value: 58,
        },
        {
          title: "Number of Security Personnel",
          icon: require("../assets/img/GongGongAnQuan/title3.png"),
          value: 280,
        },
        {
          title: "Number of Firefighters",
          icon: require("../assets/img/GongGongAnQuan/title4.png"),
          value: 350,
        },
        {
          title: "Number of Law Enforcement Officers",
          icon: require("../assets/img/GongGongAnQuan/title5.png"),
          value: 248,
        },
        {
          title: "Number of Police Officers On Duty",
          icon: require("../assets/img/GongGongAnQuan/title6.png"),
          value: 58,
        },
        {
          title: "Number of Police Vehicles On Duty",
          icon: require("../assets/img/GongGongAnQuan/title7.png"),
          value: 280,
        },
        {
          title: "Number of Major Hazard Sources",
          icon: require("../assets/img/GongGongAnQuan/title8.png"),
          value: 113,
        },
      ],
      RightData: [
        {
          title: "AQI index",
          icon: require("../assets/img/GongGongAnQuan/right1.png"),
          value: 58,
        },
        {
          title: "Air Quality",
          icon: require("../assets/img/GongGongAnQuan/right2.png"),
          value: "Good",
        },
        {
          title: "PM2.5 Concentration",
          icon: require("../assets/img/GongGongAnQuan/right3.png"),
          value: 47,
        },
        {
          title: "Rescue team",
          icon: require("../assets/img/GongGongAnQuan/right4.png"),
          value: 90,
        },
        {
          title: "Total number of rescue teams",
          icon: require("../assets/img/GongGongAnQuan/right5.png"),
          value: 360,
        },
        {
          title: "Rescue specialist",
          icon: require("../assets/img/GongGongAnQuan/right6.png"),
          value: 43,
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
          id: "XXXXXX1",
          time: "2022-03-22 10:00:00",
          content: "15151010",
        },
        {
          id: "XXXXXX2",
          time: "2022-03-22 10:00:00",
          content: "15151010",
        },
        {
          id: "XXXXXX3",
          time: "2022-03-22 10:00:00",
          content: "15151010",
        },
        {
          id: "XXXXXX4",
          time: "2022-03-22 10:00:00",
          content: "15151010",
        },
        {
          id: "XXXXXX5",
          time: "2022-03-22 10:00:00",
          content: "15151010",
        },
        {
          id: "XXXXXX6",
          time: "2022-03-22 10:00:00",
          content: "15151010",
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
    // Click on the table on the right
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
      console.log(e);
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
            { name: "Estimated Energy  Consumption", num: 60 },
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
    async getAlarmMode() {
      let res = await this.$http.GGAQApi.getAlarmModeData();
      if (res && res.data && res.data.length > 0) {
        let data = []
        res.data.forEach(item => {
          data.push({
            text: item['name1'],
            zhanbi: item.rate + '%',
            number: item.num
          })
        })
        this.alarmList = data;
        this.baifenbi = this.alarmList[0].zhanbi;
        this.TotalValue = this.alarmList[0].text;
        this.alarmTimer && clearInterval(this.alarmTimer);
        let index = 1;
        this.alarmTimer = setInterval(() => {
          if (this.alarmList.length <= index)
            index = 0;
          this.baifenbi = this.alarmList[index].zhanbi;
          this.TotalValue = this.alarmList[index].text;
          index++;
        }, 2000)
      }
    },
    async getAlarmAnalysis() {
      let res = await this.$http.GGAQApi.getAlarmAnalysisData();
      if (res && res.data && res.data.length > 0) {
        let data = [];
        res.data.forEach(item => {
          data.push({
            category: item.category,
            zb: item.rate + '%',
            value: Number(item['value_'])
          })
        })
        this.shhyjgfxData = data;
      }
    },
    async getAlarmTrend() {
      let res = await this.$http.GGAQApi.getAlarmTrendData();
      if (res && res.data && res.data.length > 0) {
        let data = [];
        res.data.forEach(item => {
          data.push({
            dimension: item.dimension,
            legend: item.legend,
            measure: Number(item.measure)
          })
        })
        this.midbar = data;
      }
    },
    async getAlarmStatistics() {
      let res = await this.$http.GGAQApi.getAlarmStatisticsData();
      if (res && res.data && res.data.length > 0) {
        let data = [];
        res.data.forEach(item => {
          data.push({
            name: item['name1'],
            value: item['value_'],
          })
        })
        this.top5data = data;
      }
    },
    async getAlarmCurrentDay() {
      let res = await this.$http.GGAQApi.getAlarmCurrentDayData();
      if (res && res.data && res.data.length > 0) {
        let data = [];
        res.data.forEach(item => {
          data.push({
            name: item['name1'],
            value: item['value_'],
            lv: item['lv'],
            hotel: item['hotel'],
            daba: item['daba'],
          })
        })
        this.tableBody = data;
      }
    },
    async getCenterData() {
      let res = await this.$http.GGAQApi.getCenterData();
      if (res && res.data && res.data.length > 0) {
        res.data.forEach(item => {
          switch (item['name1']) {
            case 'Number of Shelters':
              this.LeftData[0].value = Number(item["value_"]);
              break;
            case 'Number of Medical Personnel':
              this.LeftData[1].value = Number(item["value_"]);
              break;
            case 'Number of Security Personnel':
              this.LeftData[2].value = Number(item["value_"]);
              break;
            case 'Number of Firefighters':
              this.LeftData[3].value = Number(item["value_"]);
              break;
            case 'Number of Law Enforcement Officers':
              this.LeftData[4].value = Number(item["value_"]);
              break;
            case 'Number of Police Officers On Duty':
              this.LeftData[5].value = Number(item["value_"]);
              break;
            case 'Number of Police Vehicles On Duty':
              this.LeftData[6].value = Number(item["value_"]);
              break;
            case 'Number of Major Hazard Sources':
              this.LeftData[7].value = Number(item["value_"]);
              break;
            case 'AQI index':
              this.RightData[0].value = Number(item["value_"]);
              break;
            case 'Air Quality':
              this.RightData[1].value = item["value_"];
              break;
            case 'PM2.5 Concentration':
              this.RightData[2].value = Number(item["value_"]);
              break;
            case 'Rescue team':
              this.RightData[3].value = Number(item["value_"]);
              break;
            case 'Total number of rescue teams':
              this.RightData[4].value = Number(item["value_"]);
              break;
            case 'Rescue specialist':
              this.RightData[5].value = Number(item["value_"]);
              break;
          }
        })
      }
    },
    async getSafetyMonitoring() {
      let res = await this.$http.GGAQApi.getSafetyMonitoringData();
      if (res && res.data && res.data.length > 0) {
        let data = [];
        res.data.forEach(item => {
          data.push({
            name: item['name1'],
            num: Number(item['value_'])
          })
        })
        this.Datalist = data;
      }
    },
    async getAnalysisgProjects() {
      let res = await this.$http.GGAQApi.getAnalysisgProjectsData();
      if (res && res.data && res.data.length > 0) {
        let data = [];
        res.data.forEach(item => {
          data.push({
            legend: item.legend,
            dimension: item.dimension,
            measure: Number(item.measure)
          })
        })
        this.pwsltjBarData = data;
      }
    },
    async getEnvironmentalMonitoring() {
      let res = await this.$http.GGAQApi.getEnvironmentalMonitoringData();
      if (res && res.data && res.data.length > 0) {
        let tempLeft = [];
        let tempRight = [];
        res.data.forEach(item => {
          switch (item.title) {
            case 'Good Air Days and YOY':
              tempLeft.push({
                title: "Good Air Days and YOY",
                value: Number(item['value_']),
                tb: (Number(item['rate']) > 0 ? '+' : '-') + Number(item['rate']).toFixed(1) + '%'
              })
              break;
            case 'Air Excellent Rate and YOY':
              tempRight.push({
                title: "Air Excellent Rate and YOY",
                value: Number(item['value_']),
                tb: (Number(item['rate']) > 0 ? '+' : '-') + Number(item['rate']).toFixed(1) + '%'
              })
              break
          }
        })
        this.yoydata = tempLeft;
        this.airdata = tempRight;
      }
    },
    async getAveragePM() {
      let res = await this.$http.GGAQApi.getAveragePMData();
      if (res && res.data && res.data.length > 0) {
        let data = [];
        res.data.forEach(item => {
          data.push({
            dimension: item.dimension,
            legend: item.legend,
            measure: Number(item.measure)
          })
        })
        this.bottomData = data;
      }
    },
    async getRegionalAmbientNoise() {
      let res = await this.$http.GGAQApi.getRegionalAmbientNoiseData();
      if (res && res.data && res.data.length > 0) {
        let data = [];
        res.data.forEach(item => {
          data.push({
            name: item['name1'],
            max: Number(item['max_']),
            value: Number(item['value_']),
            legend: item['legend'],
          })
        })
        this.yxzbdfldtrowData = data;
      }
    },
  },
  mounted() {
  },
  created() {
    if (!window.streamingConfig.debugger.PS) {
      this.getAlarmMode();
      this.getAlarmAnalysis();
      this.getAlarmTrend();
      this.getAlarmStatistics();
      this.getAlarmCurrentDay();
      this.getCenterData();
      this.getSafetyMonitoring();
      this.getAnalysisgProjects();
      this.getEnvironmentalMonitoring();
      this.getAveragePM();
      this.getRegionalAmbientNoise();
    }
  },
  beforeDestroy() {
    this.alarmTimer && clearInterval(this.alarmTimer);
    this.alarmTimer = null;
  }
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

      .row1 {
        width: 100%;
        height: 429px;
        overflow: hidden;
        display: flex;

        .left {
          width: 860px;
          height: 381px;
          margin-top: 40px;

          .content {
            width: 803px;
            height: 297px;
            margin-top: 40px;
            background: url("../assets/img/JiaoTongYunXiang/r_box1_bg.fw.png") center center no-repeat;
            position: relative;

            .ratue_ball {
              width: 280px;
              height: 282px;
              position: absolute;
              left: 69px;
              top: 19px;
              background: url("../assets/img/JiaoTongYunXiang/ball.fw.png") center center no-repeat;

              // animation: imgRotateRe 10s infinite linear;
              .value {
                margin-top: 100px;

                .baifenbi {
                  color: #ffffff;
                  font-family: "Roboto";
                  font-size: 34px;
                  margin-top: 75px;
                  width: 100%;
                  text-align: center;
                }

                .english {
                  color: #ffffff;
                  font-family: "Helvetica";
                  font-size: 16px;
                  width: 130px;
                  margin: 0 auto;
                  text-align: center;
                }
              }
            }

            .ratue_incircle {
              width: 280px;
              height: 282px;
              position: absolute;
              left: 69px;
              top: 19px;
              background: url("../assets/img/GongGongAnQuan/alarm/incircle.png") center center no-repeat;
              animation: imgRotateRe 10s infinite linear reverse;
            }

            .ratue_middle {
              width: 280px;
              height: 282px;
              position: absolute;
              left: 69px;
              top: 19px;
              background: url("../assets/img/GongGongAnQuan/alarm/middle.png") center center no-repeat;
              animation: imgRotateRe 10s infinite linear;
            }

            .ratue_outcirlce {
              width: 280px;
              height: 282px;
              position: absolute;
              left: 69px;
              top: 19px;
              background: url("../assets/img/GongGongAnQuan/alarm/outcirlce.png") center center no-repeat;
              animation: imgRotateRe 10s infinite linear;
            }

            .ratue_tuli {
              width: 280px;
              height: 282px;
              position: absolute;
              right: 110px;
              top: 55px;
            }
          }
        }

        @keyframes imgRotateRe {
          0% {
            transform: rotate(360deg);
          }

          100% {
            transform: rotate(0deg);
          }
        }

        .right {
          width: 809px;
          height: 341px;
          margin-top: 40px;

          .content {
            width: 803px;
            height: 290px;
            margin-top: 40px;
            background: url("../assets/img/JiaoTongYunXiang/r_box1_bg.fw.png") center center no-repeat;
          }
        }
      }

      .row2 {
        width: 100%;
        height: 410px;
        overflow: hidden;
        display: flex;

        .left {
          width: 860px;
          height: 410px;
          margin-top: 20px;

          .content {
            width: 805px;
            height: 293px;
            margin-top: 30px;
          }
        }

        .right {
          width: 813px;
          height: 410px;
          margin-top: 20px;

          .content {
            width: 813px;
            height: 291px;
            margin-top: 30px;
          }
        }
      }

      .row3 {
        width: 100%;
        height: 357px;
        overflow: hidden;
        padding-top: 40px;

        .content {
          width: 1673px;
          height: 280px;
          margin-top: 30px;
          // background: url("../assets/img/GongGongAnQuan/week.png") center center
          //   no-repeat;
        }
      }
    }
  }

  .layer-content {
    height: 100%;
    width: 4000px;
    margin: 0 80px;
    position: relative;

    .centerLeft {
      position: absolute;
      top: 18px;
      left: 0;
    }

    .centerRight {
      position: absolute;
      top: 18px;
      right: 0;
    }

    div {
      pointer-events: none;
    }

    .videoAlartClass {
      position: absolute;
      top: 10%;
      left: 50%;
      transform: translate(-50%);
    }
  }

  .layer-right {
    pointer-events: all;
    width: 1680px;
    height: 100%;

    .displays-box {
      margin-top: 30px;
      width: 100%;
      height: 356px;
      display: flex;

      .NumberofDisplays {
        width: 100%;
        height: 100%;

        .left-box {
          height: 100%;
          width: 100%;
          overflow: hidden;
          display: flex;

          .infoLeft {
            width: 882px;
            height: 318px;
            overflow: hidden;

            .content {
              width: 780px;
              height: 290px;
              background: url("../assets/img/GongGongAnQuan/infoleft.png");
              margin-top: 20px;
            }
          }

          .infoRight {
            width: 808px;
            height: 346px;
            padding-top: 20px;

            .content {
              width: 780px;
              height: 269px;
              margin-top: 20px;
            }
          }
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
      height: 380px;
      display: flex;

      .air {
        width: 303px;
        height: 100%;
        overflow: hidden;

        .content {
          width: 266px;
          height: 247px;
          // background: url("../assets/img/GongGongAnQuan/air.png") center center
          //   no-repeat;
          margin-top: 50px;
        }
      }

      .Ave {
        width: 576px;
        height: 100%;
        overflow: hidden;

        .content {
          width: 500px;
          height: 281px;
          margin-top: 47px;

          .AveChart {
            margin-top: 30px;
            width: 486px;
            height: 204px;
            // background: url("../assets/img/GongGongAnQuan/Ave.png") center
            //   center no-repeat;
          }
        }
      }

      .Excel {
        width: 303px;
        height: 100%;

        .content {
          width: 266px;
          height: 247px;
          // background: url("../assets/img/GongGongAnQuan/air1.png") center center
          //   no-repeat;
          margin-top: 50px;
        }
      }

      .Reg {
        width: 489px;
        height: 100%;

        .content {
          width: 476px;
          height: 270px;
          margin-top: 47px;

          .RegChart {
            margin-top: 20px;
            width: 451px;
            height: 208px;
            // background: url("../assets/img/GongGongAnQuan/RegChart.png") center
            //   center no-repeat;
          }
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