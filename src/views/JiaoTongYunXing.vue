<template>
  <div class="traffic_operation_box">
    <!-- Left section -->
    <div class="layer-left">
      <div class="top">
        <div class="law_box">
          <OneTitle :title="'Law Enforcement Force'" :width="'800'" />
          <div class="law_box_content">
            <div class="law_box_content_item" v-for="(item, i) in LEFdata" :key="i">
              <div class="title">{{ item.name }}</div>
              <div class="number">{{ item.value }}</div>
              <div class="content">
                <div class="circle_box">
                  <div class="circle circle_1"></div>
                  <div class="circle circle_2"></div>
                  <div class="circle circle_3"></div>
                </div>
              </div>
            </div>
            <!-- <div class="law_box_content_item">
              <div class="title">Number of Police Officers on Duty</div>
              <div class="number">95</div>
              <div class="content">
                <div class="circle_box">
                  <div class="circle circle_1"></div>
                  <div class="circle circle_2"></div>
                  <div class="circle circle_3"></div>
                </div>
              </div>
            </div>
            <div class="law_box_content_item">
              <div class="title">Number of Police Officers on Patrol</div>
              <div class="number">74</div>
              <div class="content">
                <div class="circle_box">
                  <div class="circle circle_1"></div>
                  <div class="circle circle_2"></div>
                  <div class="circle circle_3"></div>
                </div>
              </div>
            </div> -->
          </div>
        </div>
        <div class="road_analysis_box">
          <OneTitle :title="'Road Analysis'" :width="'818'" />
          <div class="road">
            <div class="TotalMileage">
              <div>Total Mileage</div>
              <div>
                120
                <div>km</div>
              </div>
            </div>
            <TwoTitle :title="'Road Grade Distribution'" style="margin-top: 20px" />
            <div class="RoadGradeDistribut">
              <div>
                <div class="item" v-for="(e, i) in TotalMileage" :key="i">
                  <div class="item_name">{{ e.name }}</div>
                  <div class="item_val">{{ e.value }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="count">
        <OneTitle :title="'Traffic Operation Situation'" :width="'1680'" />
        <div class="middle">
          <div class="middle_left">
            <TwoTitle :title="'Traffic Volume at Checkpoint'" />
            <div class="Traffic_Checkpoint">
              <!-- <ChartBar/> -->
              <BarAndLine :rowData="TOSdata" />
            </div>
          </div>
          <div class="middle_right">
            <TwoTitle :title="'Checkpoint Camera'" />
            <div class="CheckpointCamera">
              <!-- <img :src="CKCimgData"></img> -->
              <div class="video">
                <div class="videoTop" @click="videoClick1(videoSrc)">
                  <img src="../assets/img/ZhiHuiDengGan/dag-icon.png" alt="" />
                </div>
                <div class="videoBottom">
                  <div class="one">
                    <div class="name">
                      <img src="../assets/img/ZhiHuiDengGan/before-icon.png" alt="" />
                      <span>{{ VideoName }}</span>
                    </div>
                  </div>
                  <span class="day">{{ day }}</span>
                  <span class="time">{{ time }}</span>
                </div>
                <video class="videoContent" width="820px" height="300px" :src="videoSrc" autoplay loop muted></video>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="below">
        <OneTitle :title="'Traffic Incident Analysis'" :width="'1680'" />
        <div class="below_box">
          <div class="listItem">
            <div class="item_title">
              <div v-for="(item, index) in headerData" :key="index">
                {{ item.name }}
              </div>
            </div>
            <vueSeamlessScroll :data="headerData" :class-option="classOption" ref="vueScoll" class="vueScroll">
              <div class="item_cont">
                <div class="body-item" v-for="(item, index) in boderdata" :key="index">
                  <div class="item_column" v-for="(citem, cindex) in headerData" :key="cindex">
                    {{ item[citem.key] }}
                  </div>
                </div>
              </div>
            </vueSeamlessScroll>
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
    <!-- Right section-->
    <div class="layer-right">
      <!-- Headline in the upper right corner -->
      <OneTitle :title="'Traffic Violation Incident Analysis'" :width="'1680'" />
      <div class="displays-box">
        <div class="box1">
          <TwoTitle title="Total Violation Type Statistics" />
          <div class="list">
            <div class="list_l">
              <div class="ratue_ball">
                <div class="value">
                  <div class="baifenbi">
                    {{ baifenbi }}
                  </div>
                  <div class="english">
                    {{ TotalValue }}
                  </div>
                </div>
              </div>
              <div class="ratue_incircle"></div>
              <div class="ratue_middle"></div>
              <div class="ratue_outcirlce"></div>
            </div>
            <div class="list_r">
              <div class="item" v-for="(el, i) in TVTSdata.listData" :key="i">
                <div class="item_border" :style="{ background: TVTSdata.color[i] }"></div>
                <div class="item_name">{{ el.name }}</div>
                <div class="item_val" :style="{ color: TVTSdata.color[i] }">
                  {{ el.value }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="box2">
          <TwoTitle title="Total Violation Period Statistics" />
          <ChartLineArea2 :rowData="TVPSdata" :barColor="['#00DD8A', '#00DD8A00']" />
        </div>
        <div class="box3">
          <TwoTitle title="Violing Area Ranking" />
          <div class="listItem">
            <div class="item" v-for="(item, i) in VARdata" :key="i">
              <div class="item_border"></div>
              <div class="item_name">{{ item.name }}</div>
              <div class="item_slider">
                <div :style="{ width: item.item + '%' }"></div>
              </div>
              <div class="item_val">{{ item.value }}</div>
            </div>
          </div>
        </div>
        <div class="box4">
          <TwoTitle title="Monthly Violation Trend Analysis" />
          <ChartLineArea2 :rowData="TVPSdata" :barColor="['#2FABFF', '#2FACFF00']" />
        </div>
        <div class="box5">
          <TwoTitle title="Statistic of Checkpoint Violation" />
          <div class="box5_main">
            <div class="item" v-for="(item, i) in SOCVdata" :key="i">
              <div class="item_val">{{ item.value }}</div>
              <div class="item_name">{{ item.name }}</div>
            </div>
          </div>
        </div>
        <div class="box6">
          <TwoTitle title="Statistic of Checkpoint Violation Time " />
          <BarChartsHVue class="zdrqShuLiang" :zidingyi="true" :ysplitshow="true" :unit="''" :rowData="midbar"
            :width="'800'" :gridLeft="'0%'" :height="'265'"></BarChartsHVue>
        </div>
        <div class="box7">
          <TwoTitle title="Electric Police Violation Statistics" />
          <div class="list">
            <div class="list_l">
              <RoseChart :rowData="EPVSdata.listData" :legends="EPVSdata.color" :center="['50%', '45%']"
                :radius="[0, 100]" width="228px" height="228px" />
            </div>
            <div class="list_r">
              <div class="item" v-for="(el, i) in EPVSdata.listData" :key="i">
                <div class="item_border" :style="{ background: EPVSdata.color[i] }"></div>
                <div class="item_name">{{ el.dimension }}</div>
                <div class="item_val" :style="{ color: EPVSdata.color[i] }">
                  {{ el.measure }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="box8">
          <TwoTitle title="Electric Police Violation Statistics Time " />
          <BarCharts :measurebox="5" :rowData="pwsltjBarData" width="800" :barWidth="4" :unit="['']" height="265"
            :legends="pwsltjBarLegend" gridTop="10%" :max="100" gridRight="0%" />
        </div>

        <!-- <ChartLineArea/> -->
      </div>
    </div>
  </div>
</template>

<script>
import BarCharts from '../components/charts/ChartBar/ChartBar.vue'
import BarChartsHVue from '../components/charts/ChartBar/BarChartsH.vue'
// Introducing a Level one Title
import OneTitle from '../components/common/OneTitle.vue'
// Introducing Secondary Headings
import TwoTitle from '../components/common/twoTitle.vue'
import DataStatistics from '../components/ZhiHuiDengGan/DataStatistics.vue'
// Import Line chart
import ChartLineArea from '../components/charts/ChartLine/ChartLineArea.vue'
import ChartLineArea2 from '../components/charts/ChartLine/ChartLineArea2.vue'

// Introducing a multi column chart
import ChartBar from '../components/charts/ChartBar/DuoZhuTu.vue'
// Introducing Table Components
import TableTwo from '../components/charts/Table/TableTwo.vue'
// Introducing Page Indicator Components
import TodayList from '../components/common/TodayList.vue'
// Introducing circular components
import ChartLoop from '../components/charts/ChartLoop/ChartLoop.vue'
// Introducing Rose Chart Components
import RoseChart from '../components/charts/RoseChart/RoseChart.vue'
// Introducing video components
import videoTop from '../components/ZhiHuiDengGan/video.vue'
// Introducing tab components
import TabButton from '../components/common/TabButton.vue'
// Import tab content
import TabLable from '../components/ZhiHuiDengGan/TabLable.vue'
// Introducing video pop-up components
import VideoAlart from '../components/ZhiHuiDengGan/VideoAlart.vue'
import BarAndLine from '../components/charts/BarLine/BarAndLine.vue'
import Time from '@/utils/common/time'
import vueSeamlessScroll from 'vue-seamless-scroll'

export default {
  name: 'GongGongAnQuan',
  components: {
    OneTitle,
    TwoTitle,
    DataStatistics,
    ChartLineArea,
    ChartBar,
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
    BarAndLine,
    ChartLineArea2,
    vueSeamlessScroll,
  },
  data () {
    return {
      timer: null,
      now: '',
      day: '',
      time: '',
      baifenbi: '18%',
      TotalValue: 'Type of Violation 1',
      LEFdata: [
        {
          name: 'Number of Police Officers',
          value: 126,
        },
        {
          name: 'Number of police officers on duty',
          value: 95,
        },
        {
          name: 'Number of police officers on patrol',
          value: 74,
        },
      ],
      TotalMileage: [
        {
          name: 'Level 01',
          value: 39,
        },
        {
          name: 'Level 02',
          value: 21,
        },
        {
          name: 'Level 03',
          value: 45,
        },
        {
          name: 'Level 04',
          value: 35,
        },
        {
          name: 'Level 05',
          value: 42,
        },
      ],
      VideoName: '001',
      // Traffic Operation Situation
      TOSdata: [
        {
          name: '01',
          value: 60,
          item: 50,
        },
        {
          name: '02',
          value: 85,
          item: 75,
        },
        {
          name: '03',
          value: 55,
          item: 40,
        },
        {
          name: '04',
          value: 80,
          item: 60,
        },
        {
          name: '05',
          value: 90,
          item: 40,
        },
        {
          name: '06',
          value: 50,
          item: 50,
        },
        {
          name: '07',
          value: 60,
          item: 25,
        },
      ],
      headerData: [
        {
          name: 'Occurrence Time',
          key: 'OccurrenceTime',
        },
        {
          name: 'Location',
          key: 'Location',
        },
        {
          name: 'Type',
          key: 'Type',
        },
        {
          name: 'Occurrence Time',
          key: 'OccurrenceTime2',
        },
        {
          name: 'Location',
          key: 'Location2',
        },
        {
          name: 'Type',
          key: 'Type2',
        },
      ],
      boderdata: [
        {
          OccurrenceTime: '2022-11-15 13:45:12',
          Location: 'Location1',
          Type: 'Type1',
          OccurrenceTime2: '2022-11-15 13:45:12',
          Location2: 'Location1',
          Type2: 'Type1',
        },
        {
          OccurrenceTime: '2022-11-15 13:45:12',
          Location: 'Location2',
          Type: 'Type2',
          OccurrenceTime2: '2022-11-15 13:45:12',
          Location2: 'Location2',
          Type2: 'Type2',
        },
        {
          OccurrenceTime: '2022-11-15 13:45:12',
          Location: 'Location3',
          Type: 'Type3',
          OccurrenceTime2: '2022-11-15 13:45:12',
          Location2: 'Location3',
          Type2: 'Type3',
        },
        {
          OccurrenceTime: '2022-11-15 13:45:12',
          Location: 'Location4',
          Type: 'Type4',
          OccurrenceTime2: '2022-11-15 13:45:12',
          Location2: 'Location4',
          Type2: 'Type4',
        },
        {
          OccurrenceTime: '2022-11-15 13:45:12',
          Location: 'Location5',
          Type: 'Type5',
          OccurrenceTime2: '2022-11-15 13:45:12',
          Location2: 'Location5',
          Type2: 'Type5',
        },
        {
          OccurrenceTime: '2022-11-15 13:45:12',
          Location: 'Location6',
          Type: 'Type6',
          OccurrenceTime2: '2022-11-15 13:45:12',
          Location2: 'Location6',
          Type2: 'Type6',
        },
      ],
      TVTSdata: {
        listData: [
          {
            name: 'Type of Violation 01',
            value: 35,
          },
          {
            name: 'Type of Violation 02',
            value: 48,
          },
          {
            name: 'Type of Violation 03',
            value: 27,
          },
          {
            name: 'Type of Violation 04',
            value: 36,
          },
        ],
        color: ['#2872EC', '#00F4EA', '#00DD8A', '#CDFC2E'],
      },
      TVPSdata: [
        {
          name: '00:00',
          value: 60,
        },
        {
          name: '04:00',
          value: 65,
        },
        {
          name: '08:00',
          value: 50,
        },
        {
          name: '12:00',
          value: 75,
        },
        {
          name: '16:00',
          value: 75,
        },
        {
          name: '20:00',
          value: 60,
        },
        {
          name: '24:00',
          value: 50,
        },
      ],
      SOCVdata: [
        {
          name: 'Violation Type 01',
          value: 2182,
        },
        {
          name: 'Violation Type 02',
          value: 2182,
        },
        {
          name: 'Violation Type 03',
          value: 2182,
        },
        {
          name: 'Violation Type 04',
          value: 2182,
        },
      ],
      EPVSdata: {
        listData: [
          {
            dimension: 'Violation Type 01',
            measure: 35,
          },
          {
            dimension: 'Violation Type 02',
            measure: 48,
          },
          {
            dimension: 'Violation Type 03',
            measure: 27,
          },
          {
            dimension: 'Violation Type 04',
            measure: 36,
          },
        ],
        color: ['#2872EC', '#00F4EA', '#00DD8A', '#CDFC2E'],
      },
      pwsltjBarLegend: [{ name: '', from: '#43BFFF', to: '#4360E4' }],
      // pwsltjBarData: [
      //   { legend: "Type 1 ", measure: 420, dimension: "Type 01" },
      //   { legend: "Type 1 ", measure: 310, dimension: "Type 02" },
      //   { legend: "Type 1 ", measure: 270, dimension: "Type 03" },
      //   { legend: "Type 1 ", measure: 440, dimension: "Type 04" },
      //   { legend: "Type 1 ", measure: 320, dimension: "Type 05" },
      //   { legend: "Type 1 ", measure: 320, dimension: "Type 06" },
      //   { legend: "Type 1 ", measure: 320, dimension: "Type 07" },
      // ],
      pwsltjBarData: [
        { legend: 'Type 1 ', measure: 50, dimension: '00:00' },
        { legend: 'Type 1 ', measure: 75, dimension: '04:00' },
        { legend: 'Type 1 ', measure: 60, dimension: '08:00' },
        { legend: 'Type 1 ', measure: 50, dimension: '12:00' },
        { legend: 'Type 1 ', measure: 70, dimension: '16:00' },
        { legend: 'Type 1 ', measure: 60, dimension: '20:00' },
        { legend: 'Type 1 ', measure: 40, dimension: '24:00' },
      ],
      midbar: [
        { legend: '1', measure: 50, dimension: '00:00' },
        { legend: '1', measure: 75, dimension: '04:00' },
        { legend: '1', measure: 25, dimension: '08:00' },
        { legend: '1', measure: 40, dimension: '12:00' },
        { legend: '1', measure: 80, dimension: '16:00' },
        { legend: '1', measure: 73, dimension: '20:00' },
        { legend: '1', measure: 50, dimension: '24:00' },
      ],
      // midbar: [
      //   { legend: "1", measure: 50, dimension: "01" },
      //   { legend: "1", measure: 75, dimension: "02" },
      //   { legend: "1", measure: 25, dimension: "03" },
      //   { legend: "1", measure: 40, dimension: "04" },
      //   { legend: "1", measure: 80, dimension: "05" },
      //   { legend: "1", measure: 73, dimension: "06" },
      //   { legend: "1", measure: 50, dimension: "07" },
      //   { legend: "1", measure: 70, dimension: "08" },
      //   { legend: "1", measure: 46, dimension: "09" },
      //   { legend: "1", measure: 38, dimension: "10" },
      //   { legend: "1", measure: 69, dimension: "11" },
      //   { legend: "1", measure: 86, dimension: "12" },
      // ],
      VideoAlartUrl: '',
      VideoShow: false,
      TabData: [
        { name: 'Smart lamp poles', num: 80 },
        { name: 'Common lamp poles', num: 60 },
      ],
      VARdata: [
        {
          name: 'Illegal Area 01',
          value: 386,
          item: 80,
        },
        {
          name: 'Illegal Area 02',
          value: 397,
          item: 90,
        },
        {
          name: 'Illegal Area 03',
          value: 405,
          item: 70,
        },
        {
          name: 'Illegal Area 04',
          value: 421,
          item: 90,
        },
        {
          name: 'Illegal Area 05',
          value: 396,
          item: 60,
        },
      ],
      CKCimgData: require('../assets/img/JiaoTongYunXiang/CheckpointCamera.png'),
      StatisticsCurrentTab: 'Total Number of Lamps',
      StatisticsTabs: [
        'Total Number of Lamps',
        'Lighting Status Statistics',
        'Energy Consumption',
      ],
      videoSrc: require('../../public/video/04.mp4'),
      videoList: [
        {
          url: '/video/02.mp4',
          name: '001',
        },
        {
          url: '/video/03.mp4',
          name: '002',
        },
        {
          url: '/video/04.mp4',
          name: '003',
        },
        {
          url: '/video/05.mp4',
          name: '004',
        },
      ],
      DisplaysData: [
        {
          measure: 42,
          dimension: 'Fault Level 01',
        },
        {
          measure: 35,
          dimension: 'Fault Level 02',
        },
        {
          measure: 29,
          dimension: 'Fault Level 03',
        },
        {
          measure: 17,
          dimension: 'Fault Level 04',
        },
        {
          measure: 17,
          dimension: 'Fault Level 05',
        },
      ],
      Statisticsdata: [
        { legend: 'Type 01', measure: 35, rate: '26' },
        { legend: 'Type 02', measure: 48, rate: '30' },
        { legend: 'Type 03', measure: 27, rate: '50' },
        { legend: 'Type 04', measure: 36, rate: '50' },
        { legend: 'Type 05', measure: 42, rate: '80' },
      ],
      LeftData: [
        {
          title: 'Number of Shelters',
          icon: require('../assets/img/GongGongAnQuan/title1.png'),
          value: 94,
        },
        {
          title: 'Number of Medical Personnel',
          icon: require('../assets/img/GongGongAnQuan/title2.png'),
          value: 58,
        },
        {
          title: 'Number of Security Personnel',
          icon: require('../assets/img/GongGongAnQuan/title3.png'),
          value: 280,
        },
        {
          title: 'Number of Firefighters',
          icon: require('../assets/img/GongGongAnQuan/title4.png'),
          value: 350,
        },
        {
          title: 'Number of Law Enforcement Officers',
          icon: require('../assets/img/GongGongAnQuan/title5.png'),
          value: 248,
        },
        {
          title: 'Number of Police Officers On Duty',
          icon: require('../assets/img/GongGongAnQuan/title6.png'),
          value: 58,
        },
        {
          title: 'Number of Police Vehicles On Duty',
          icon: require('../assets/img/GongGongAnQuan/title7.png'),
          value: 280,
        },
        {
          title: 'Number of Major Hazard Sources',
          icon: require('../assets/img/GongGongAnQuan/title8.png'),
          value: 113,
        },
      ],
      RightData: [
        {
          title: 'AQI index',
          icon: require('../assets/img/GongGongAnQuan/right1.png'),
          value: 58,
        },
        {
          title: 'Air Quality',
          icon: require('../assets/img/GongGongAnQuan/right2.png'),
          value: 'Good',
        },
        {
          title: 'PM2.5 Concentration',
          icon: require('../assets/img/GongGongAnQuan/right3.png'),
          value: 47,
        },
        {
          title: 'Rescue team',
          icon: require('../assets/img/GongGongAnQuan/right4.png'),
          value: 90,
        },
        {
          title: 'Total number of rescue teams',
          icon: require('../assets/img/GongGongAnQuan/right5.png'),
          value: 360,
        },
        {
          title: 'Rescue specialist',
          icon: require('../assets/img/GongGongAnQuan/right6.png'),
          value: 43,
        },
      ],
      Faultslegend: ['Grade 1', 'Grade 2', 'Grade 3'],
      ReleasHeader: [
        { name: 'Released Content', width: '270px' },
        { name: 'Release Time', width: '270px' },
        { name: 'Ad Screen ID', width: '278px' },
      ],
      Displaysdata: [
        { name: 'Online Quantity', num: '88' },
        { name: 'Offline Quantity', num: '30' },
      ],
      planHeader: [
        { name: 'Area Type', width: '275px' },
        { name: 'Time Segment', width: '275px' },
        { name: 'Light Level', width: '278px' },
      ],
      Releasdata: [
        {
          id: 'XXXXXX1',
          time: '2022-03-22 10:00:00',
          content: '15151010',
        },
        {
          id: 'XXXXXX2',
          time: '2022-03-22 10:00:00',
          content: '15151010',
        },
        {
          id: 'XXXXXX3',
          time: '2022-03-22 10:00:00',
          content: '15151010',
        },
        {
          id: 'XXXXXX4',
          time: '2022-03-22 10:00:00',
          content: '15151010',
        },
        {
          id: 'XXXXXX5',
          time: '2022-03-22 10:00:00',
          content: '15151010',
        },
        {
          id: 'XXXXXX6',
          time: '2022-03-22 10:00:00',
          content: '15151010',
        },
      ],
      Plandata: [
        {
          id: 'Type 01',
          time: '2021-6-10',
          content: 'Grade 1',
        },
        {
          id: 'Type 02',
          time: '2021-6-10',
          content: 'Grade 2',
        },
        {
          id: 'Type 03',
          time: '2021-6-10',
          content: 'Grade 3',
        },
        {
          id: 'Type 04',
          time: '2021-6-10',
          content: 'Grade 1',
        },
        {
          id: 'Type 05',
          time: '2021-6-10',
          content: 'Grade 2',
        },
        {
          id: 'Type 06',
          time: '2021-6-10',
          content: 'Grade 3',
        },
        {
          id: 'Type 07',
          time: '2021-6-10',
          content: 'Grade 1',
        },
        {
          id: 'Type 08',
          time: '2021-6-10',
          content: 'Grade 2',
        },
      ],
      Numberdata: [
        {
          name: 'Region A',
          value: '79',
          item: '65',
          val: '50',
        },
        {
          name: 'Region B',
          value: '70',
          item: '65',
          val: '75',
        },
        {
          name: 'Region C',
          value: '55',
          item: '70',
          val: '50',
        },
        {
          name: 'Region D',
          value: '65',
          item: '75',
          val: '50',
        },
        {
          name: 'Region E',
          value: '70',
          item: '55',
          val: '65',
        },
      ],
      linedata: [
        { name: 'onLine', num: '135' },
        { name: 'offLine', num: '6' },
      ],
      Energydata: [
        {
          name: '01',
          value: 75,
        },
        {
          name: '02',
          value: 80,
        },
        {
          name: '03',
          value: 75,
        },
        {
          name: '04',
          value: 75,
        },
        {
          name: '05',
          value: 65,
        },
        {
          name: '06',
          value: 70,
        },
        {
          name: '07',
          value: 65,
        },
      ],
      ratedata: [
        {
          name: '01',
          value: 70,
        },
        {
          name: '02',
          value: 80,
        },
        {
          name: '03',
          value: 70,
        },
        {
          name: '04',
          value: 90,
        },
        {
          name: '05',
          value: 75,
        },
        {
          name: '06',
          value: 75,
        },
        {
          name: '07',
          value: 80,
        },
      ],
    }
  },
  computed: {
    classOption () {
      return {
        step: 0.3, // The higher the value, the faster the scrolling speed
        limitMoveNum: 3, // The amount of data that starts seamless scrolling is this. dataList. length
        hoverStop: true, // Enable mouse hover stop
        direction: 1, // 0 Down 1 Up 2 Left 3 Right
        openWatch: false, // Enable real-time data monitoring and refresh dom
        singleHeight: 0, // The height at which a single step motion stops (the default value is 0 for seamless rolling without stopping) direction=>0/1
        singleWidth: 0, // Width of single step motion stop (default value 0 is seamless and unstoppable rolling) direction=>2/3
        waitTime: 1000, // Time to stop single step motion (default value 1000ms)
      }
    },
  },
  created () {
    this.initDay()
    this.timer = setInterval(() => {
      this.initDay()
    }, 1000)
  },
  methods: {
    videoClick1 (e) {
      this.VideoShow = true
      this.VideoAlartUrl = e
    },
    initDay () {
      this.now = new Date()
      // this.week = Time.getWeek(this.now);
      this.day = Time.format('yyyy-MM-dd', this.now)
      this.time = Time.format('HH:mm:ss', this.now)
    },
    // Click on the table on the right
    ReleasClick (item) {
      this.$refs.AdvertisementStatistics.clearHigh()
      this.$refs.lampDataStatistics.clearHigh()
      this.$refs.leftTable.clearHigh()
      this.$store.commit('setHighLight', 'planAdvertisement')
    },
    // Click on the left table
    PlanClick (item) {
      this.$refs.AdvertisementStatistics.clearHigh()
      this.$refs.lampDataStatistics.clearHigh()
      this.$refs.rightTable.clearHigh()
      this.$store.commit('setHighLight', 'planLamp')
    },
    // Video click
    videoClick (e) {
      this.VideoAlartUrl = e.url
      this.VideoShow = true
      console.log(e)
    },
    // Close Video Popup
    VideoClose () {
      this.VideoShow = false
    },
    // Tab switch in the upper left corner
    StatisticsChange (e) {
      console.log(e)
      this.StatisticsCurrentTab = e

      switch (e) {
        case 'Total Number of Lamps':
          this.TabData = [
            { name: 'Smart lamp poles', num: 80 },
            { name: 'Common lamp poles', num: 60 },
          ]
          break
        case 'Lighting Status Statistics':
          this.TabData = [
            { name: 'full-bright', num: 120 },
            { name: 'semi-bright', num: 205 },
            { name: 'micro-bright', num: 102 },
            { name: 'close', num: 95 },
          ]
          break
        case 'Energy Consumption':
          this.TabData = [
            { name: 'Total Energy  Consumption', num: 80 },
            { name: 'Estimated Energy  Consumption', num: 60 },
          ]
          break
      }
    },
    lampItemClick (item) {
      this.$refs.AdvertisementStatistics.clearHigh()
      this.$refs.leftTable.clearHigh()
      this.$refs.rightTable.clearHigh()
      if (item == 'onLine') {
        this.$store.commit('setHighLight', 'onLineLamp')
      } else if (item == 'offLine') {
        this.$store.commit('setHighLight', 'offLineLamp')
      } else {
        this.$store.commit('setHighLight', '')
      }
    },
    AdvertisementItemClick (item) {
      this.$refs.lampDataStatistics.clearHigh()
      this.$refs.leftTable.clearHigh()
      this.$refs.rightTable.clearHigh()
      if (item == 'Online Quantity') {
        this.$store.commit('setHighLight', 'onLineAdvertisement')
      } else if (item == 'Offline Quantity') {
        this.$store.commit('setHighLight', 'offLineAdvertisement')
      } else {
        this.$store.commit('setHighLight', '')
      }
    },
  },
}
</script>

<style lang="less" scoped>
.traffic_operation_box {
  pointer-events: none;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;

  .layer-left {
    pointer-events: all;
    width: 1680px;
    height: 100%;

    .top {
      display: flex;
      width: 100%;
      justify-content: space-between;

      .law_box {
        width: 800px;

        .law_box_content {
          display: flex;
          margin-top: 20px;

          .law_box_content_item {
            margin-top: 25px;

            .title {
              width: 100%;
              font-family: 'Helvetica';
              font-size: 28px;
              color: white;
              text-align: center;
            }

            .number {
              font-family: 'Roboto';
              font-size: 80px;
              color: white;
              text-align: center;
              margin-top: 45px;
            }

            .content {
              background: url('../assets/img/JiaoTongYunXiang/number_bg.png') no-repeat;
              width: 266px;
              height: 144px;
              margin-top: -50px;
              position: relative;

              .circle_box {
                transform: rotateX(78deg);
                position: absolute;
                left: 54px;
                top: 102px;

                .circle {
                  width: 160px;
                  height: 160px;
                  border: 2px solid #ffff00;
                  border-radius: 80px;
                  position: absolute;
                  opacity: 0.6;
                }

                .circle_1 {
                  -webkit-animation: slide-top 2s linear infinite;
                  animation: slide-top 2s linear infinite;
                }

                .circle_2 {
                  -webkit-animation: slide-top 1s 0.7s linear infinite;
                  animation: slide-top 2s 0.7s linear infinite;
                }

                .circle_3 {
                  -webkit-animation: slide-top 1s 1.4s linear infinite;
                  animation: slide-top 2s 1.4s linear infinite;
                }
              }
            }
          }
        }
      }

      .road_analysis_box {
        width: 820px;

        .road {
          .TotalMileage {
            margin-top: 20px;
            width: 820px;
            height: 43px;
            background: url('../assets/img/JiaoTongYunXiang/TotalMileage_bg.fw.png') center center no-repeat;
            display: flex;
            // justify-content: space-evenly;
            align-items: center;

            >div:nth-child(1) {
              width: 300px;
              font: 28px 'Helvetica';
              color: #fff;
              margin-left: 66px;
            }

            >div:nth-child(2) {
              width: 150px;
              font: 34px 'Roboto';
              display: flex;
              align-items: center;
              color: #26ffff;
              margin-left: 250px;

              div {
                font: 24px 'Helvetica';
                color: #fff;
                margin-left: 35px;
              }
            }
          }

          .RoadGradeDistribut {
            width: 820px;
            height: 300px;
            background: red;
            background: url('../assets/img/JiaoTongYunXiang/RoadGradeDistribut_bg.fw.png') center bottom no-repeat;
            position: relative;

            >div:nth-child(1) {
              width: 100%;
              height: 100%;

              .item {
                width: 164px;
                height: 151px;
                background: url('../assets/img/JiaoTongYunXiang/arrow01.fw.png') no-repeat center center;

                // overflow: hidden;
                .item_name {
                  width: 100%;
                  height: 31px;
                  white-space: nowrap;
                  font: 28px 'Helvetica';
                  background-image: linear-gradient(to bottom, #fff, #8dedf8);
                  -webkit-background-clip: text;
                  color: transparent;
                  // margin: 26px 0 0 60px;
                }

                .item_val {
                  font: 54px 'Adobe Heiti Std';
                  background-image: linear-gradient(to bottom, #fff, #73dcff);
                  -webkit-background-clip: text;
                  color: transparent;
                  // margin: -25px 0 0 55px;
                }
              }

              >div:nth-child(1) {
                position: absolute;
                top: 104px;
                left: 0%;

                .item_name {
                  margin: 26px 0 0 60px;
                }

                .item_val {
                  margin: -25px 0 0 55px;
                }
              }

              >div:nth-child(2) {
                width: 158px;
                height: 138px;
                background: url('../assets/img/JiaoTongYunXiang/arrow02.fw.png') no-repeat center center;
                position: absolute;
                padding: 0 0 0 55px;
                box-sizing: border-box;
                top: -15px;
                left: 108px;

                .item_name {
                  margin-top: 30px;
                  margin-right: 50px;
                }

                .item_val {
                  // width: 100%;
                  height: 50px;
                  line-height: 50px;
                }
              }

              >div:nth-child(3) {
                width: 139px;
                height: 79px;
                background: url('../assets/img/JiaoTongYunXiang/arrow03.fw.png') no-repeat center center;
                // background: red;
                position: absolute;
                top: 0px;
                left: 408px;

                .item_name {
                  margin-left: 50px;
                }

                .item_val {
                  width: 100%;
                  height: 50px;
                  line-height: 50px;
                  margin-left: 50px;
                }
              }

              >div:nth-child(4) {
                width: 152px;
                padding: 0 0 0 25px;
                box-sizing: border-box;
                height: 134px;
                background: url('../assets/img/JiaoTongYunXiang/arrow04.fw.png') no-repeat center center;
                // background: red;
                position: absolute;
                top: 0px;
                right: 50px;

                .item_name {
                  margin-top: 30px;
                  margin-right: 50px;
                }

                .item_val {
                  width: 100%;
                  height: 50px;
                  line-height: 50px;
                  margin-right: 50px;
                }
              }

              >div:nth-child(5) {
                width: 160px;
                height: 151px;
                background: url('../assets/img/JiaoTongYunXiang/arrow05.fw.png') no-repeat center center;
                // background: red;
                position: absolute;
                top: 120px;
                right: 10px;

                .item_name {
                  margin-top: 30px;
                  margin-right: 50px;
                  padding: 0 0 0 25px;
                  box-sizing: border-box;
                }

                .item_val {
                  // width: 100%;
                  height: 50px;
                  line-height: 50px;
                  padding: 0 0 0 25px;
                  box-sizing: border-box;
                }
              }
            }
          }
        }
      }
    }

    .count {
      width: 100%;
      height: 380px;

      .middle {
        margin-top: 30px;
        display: flex;
        justify-content: space-between;

        .middle_left {
          width: 800px;

          .Traffic_Checkpoint {
            margin-top: 20px;
            width: 796px;
            height: 284px;
            // background: url("../assets/img/JiaoTongYunXiang/TrafficVolumeofLastMonth.png")
            //   center center no-repeat;
            // background: red;
          }
        }

        .middle_right {
          width: 820px;

          .CheckpointCamera {
            .video {
              width: 820px;
              height: 300px;
              position: relative;

              .videoContent {
                object-fit: fill;
              }

              .videoTop {
                width: 50px;
                height: 50px;
                z-index: 9;
                pointer-events: all;
                position: absolute;
                top: 10px;
                right: 10px;
              }

              >div {
                pointer-events: all;
              }

              // background: url('../assets/img/ZhiHuiDengGan/MengCeng.png') center bottom no-repeat;
              .videoBottom {
                position: absolute;
                bottom: 0;
                right: 20px;
                font-family: 'Helvetica';

                font-size: 22px;
                display: flex;

                .one {
                  position: absolute;
                  left: -590px;

                  .name {
                    span {
                      font-family: 'Helvetica';
                      font-size: 22px;
                      color: #ffffff;
                    }
                  }
                }

                .day {
                  color: #fff;
                  margin-right: 10px;
                }

                .time {
                  color: #bfff00;
                }
              }
            }

            margin-top: 20px;
            width: 820px;
            height: 289px;
            // background: url("../assets/img/JiaoTongYunXiang/CheckpointCamera.png")
            // center center no-repeat;
          }
        }
      }
    }

    .below {
      width: 100%;
      height: 360px;
      margin-top: 40px;

      .below_box {
        width: 1673px;
        height: 260px;

        // background: url("../assets/img/JiaoTongYunXiang/TrafficIncidentAnalysis.png")
        //   center center no-repeat;
        // background: red;
        .vueScroll {
          height: 230px;
          overflow: hidden;
        }

        margin-top: 50px;

        .listItem {
          width: 100%;
          height: 100%;

          // background: orange;
          .item_title {
            width: 100%;
            height: 42px;
            display: flex;
            justify-content: space-between;
            // align-items: center;
            font: 24px 'Helvetica';
            color: #bfebff;
            background: url('../assets/img/JiaoTongYunXiang/tableTitle_bg.fw.png') no-repeat center bottom;
            padding: 0 40px;
            box-sizing: border-box;

            div {
              width: 250px;
            }
          }

          .item_cont {
            width: 100%;
            height: 220px;
            overflow: auto;

            &::-webkit-scrollbar {
              width: 0;
              height: 0;
            }

            >div {
              display: flex;
              background: url('../assets/img/JiaoTongYunXiang/tableItem_bg.fw.png') no-repeat center bottom;
              justify-content: space-between;
              margin: 35px 0 0 0;
              padding: 0 40px;
              box-sizing: border-box;
            }
          }

          .item_column {
            width: 250px;
            height: 40px;
            // display: flex;
            // justify-content: space-between;
            // align-items: center;
            color: #bfebff;
            font: 22px 'Helvetica';
            display: flex;
          }
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
      top: 20px;
      left: 0;
    }

    .centerRight {
      position: absolute;
      top: 20px;
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
      width: 1686px;
      height: 1181px;
      // background: #ffff00;
      // background: url("../assets/img/JiaoTongYunXiang/TotalViolationType.png")
      //   center center no-repeat;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-content: space-between;

      .box1 {
        width: 840px;
        height: 276px;

        // background: red;
        .list {
          width: 100%;
          height: 230px;
          background: url('../assets/img/JiaoTongYunXiang/r_box1_bg.fw.png') no-repeat center center;
          margin-top: 20px;
          display: flex;
          justify-content: space-evenly;

          .list_l {
            width: 240px;
            height: 230px;
            position: relative;

            // background: #2e0d5c;
            .ratue_ball {
              width: 227px;
              height: 227px;
              position: absolute;
              left: 10px;
              // top: 19px;
              background: url('../assets/img/JiaoTongYunXiang/ball.fw.png') center center no-repeat;

              // animation: imgRotateRe 10s infinite linear;
              .value {
                .baifenbi {
                  color: #ffffff;
                  font-family: 'Roboto';
                  font-size: 34px;
                  margin-top: 75px;
                  width: 100%;
                  text-align: center;
                }

                .english {
                  color: #ffffff;
                  font-family: 'Helvetica';
                  font-size: 16px;
                  width: 75px;
                  margin: 0 auto;
                  text-align: center;
                }
              }
            }

            .ratue_incircle {
              width: 240px;
              height: 230px;
              position: absolute;
              // left: 69px;
              // top: 19px;
              background: url('../assets/img/JiaoTongYunXiang/incircle.fw.png') center center no-repeat;
              animation: imgRotateRe 10s infinite linear reverse;
            }

            .ratue_middle {
              width: 245px;
              height: 230px;
              position: absolute;
              // left: 69px;
              // top: 19px;
              background: url('../assets/img/JiaoTongYunXiang/middle.fw.png') center center no-repeat;
              animation: imgRotateRe 10s infinite linear;
            }

            .ratue_outcirlce {
              width: 245px;
              height: 230px;
              position: absolute;
              // left: 69px;
              // top: 19px;
              background: url('../assets/img/JiaoTongYunXiang/outcirlce.fw.png') center center no-repeat;
              animation: imgRotateRe 10s infinite linear;
            }

            @keyframes imgRotateRe {
              0% {
                transform: rotate(360deg);
              }

              100% {
                transform: rotate(0deg);
              }
            }
          }

          .list_r {
            width: 344px;
            height: 230px;
            // background: #26ffff;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;

            .item {
              width: 100%;
              display: flex;
              align-items: center;

              .item_border {
                width: 5px;
                height: 27px;
                background: #2872ec;
                margin-right: 15px;
              }

              .item_name {
                width: 250px;
                font: 24px 'Helvetica';
                color: #bfebff;
              }

              .item_val {
                width: 50px;
                font: 34px 'Roboto';
                color: #2872ec;
                margin-left: 35px;
                white-space: nowrap;
              }
            }
          }
        }
      }

      .box2 {
        width: 800px;
        height: 276px;
        // background: rgb(90, 14, 196);
      }

      .box3 {
        width: 840px;
        height: 276px;

        .listItem {
          width: 100%;
          height: 230px;
          margin-top: 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .item {
            width: 100%;
            display: flex;
            align-items: center;

            .item_border {
              width: 8px;
              height: 8px;
              border-radius: 8px;
              background: #fff;
              box-shadow: 0px 0px 8px 2px #007fff;
            }

            .item_name {
              width: 180px;
              font: 24px 'Helvetica';
              color: #fff;
              text-shadow: 0px 0px 10px #007fff;
              margin-left: 10px;
              white-space: nowrap;
            }

            .item_slider {
              width: 515px;
              height: 12px;
              background: url('../assets/img/JiaoTongYunXiang/slider.fw.png') no-repeat center center;

              div {
                width: 200px;
                height: 12px;
                border-radius: 12px;
                background-image: linear-gradient(to right, #2693ff, #4dffff);
              }
            }

            .item_val {
              width: 100px;
              font: 34px 'Roboto';
              color: #fff;
              text-align: right;
            }
          }
        }
      }

      .box4 {
        width: 800px;
        height: 276px;
      }

      .box5 {
        width: 840px;
        height: 284px;

        // background: red;
        .box5_main {
          width: 100%;
          height: 245px;
          margin-top: 15px;
          background: url('../assets/img/JiaoTongYunXiang/socv_bg.fw.png') no-repeat center center;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-evenly;

          // align-content: space-between;
          .item {
            width: 300px;
            height: 96px;
            display: flex;
            flex-direction: column;
            align-items: center;
            background: url('../assets/img/JiaoTongYunXiang/item_bot_bg.fw.png') no-repeat center bottom;
            margin-left: 80px;

            .item_val {
              font: 46px 'Voltage';
              color: #26ffff;
            }

            .item_name {
              font: 24px 'Helvetica';
              color: #fff;
              white-space: nowrap;
              margin-top: -5px;
              text-shadow: 0px 0px 10px #007fff;
            }
          }

          >div:nth-child(1) {
            margin-left: 0px;
          }

          >div:nth-child(2) {}

          >div:nth-child(3) {
            margin-left: 0px;
          }

          >div:nth-child(4) {}
        }
      }

      .box6 {
        width: 800px;
        height: 284px;
        // background: rgb(90, 14, 196);
      }

      .box7 {
        width: 840px;
        height: 280px;

        // background: red;
        .list {
          width: 100%;
          height: 230px;
          background: url('../assets/img/JiaoTongYunXiang/r_box1_bg.fw.png') no-repeat center center;
          margin-top: 20px;
          display: flex;
          justify-content: space-evenly;

          .list_l {
            width: 228px;
            height: 230px;
            background: url('../assets/img/JiaoTongYunXiang/rose_bg.fw.png') no-repeat center center;
          }

          .list_r {
            width: 344px;
            height: 230px;
            // background: #26ffff;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;

            .item {
              width: 100%;
              display: flex;
              align-items: center;

              .item_border {
                width: 8px;
                height: 8px;
                background: #2872ec;
                border-radius: 8px;
                margin-right: 10px;
              }

              .item_name {
                width: 250px;
                font: 24px 'Helvetica';
                color: #bfebff;
              }

              .item_val {
                width: 50px;
                font: 34px 'Roboto';
                color: #2872ec;
                margin-left: 35px;
                white-space: nowrap;
              }
            }
          }
        }
      }

      .box8 {
        width: 800px;
        height: 280px;
        // background: rgb(90, 14, 196);
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
          background: url('../assets/img/GongGongAnQuan/air.png') center center no-repeat;
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
            background: url('../assets/img/GongGongAnQuan/Ave.png') center center no-repeat;
          }
        }
      }

      .Excel {
        width: 303px;
        height: 100%;

        .content {
          width: 266px;
          height: 247px;
          background: url('../assets/img/GongGongAnQuan/air.png') center center no-repeat;
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
            background: url('../assets/img/GongGongAnQuan/RegChart.png') center center no-repeat;
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

@-webkit-keyframes slide-top {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }

  100% {
    -webkit-transform: translateY(-130px) scale(0.8);
    transform: translateY(-130px) scale(0.8);
  }
}

@keyframes slide-top {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }

  100% {
    -webkit-transform: translateY(-130px) scale(0.8);
    transform: translateY(-130px) scale(0.8);
  }
}
</style>
