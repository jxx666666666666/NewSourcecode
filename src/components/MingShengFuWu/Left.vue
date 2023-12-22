<!--
 * @Author: user name
 * @Date: 2023-12-05 10:02:40
 * @LastEditTime: 2023-12-05 15:18:04
 * @LastEditors: user name
 * @Description: 
-->
<template>
  <div class="Service_Max">
    <div class="Services_left">
      <OneTitle title="Medical Services" width="800px" imgTop="-5px" />
      <div class="Medical">
        <TwoTitle title="Dynamics On Duty" />
        <div class="Medical_sj">
          <div v-for="(item, index) in Medical_Data" :key="index">
            <div class="name">{{ item.name }}</div>
            <div class="value">{{ item.value }}</div>
          </div>
        </div>
      </div>
      <div class="Classification">
        <TwoTitle title="Classification Of Medical Institutions" />
        <div class="list">
          <div class="list_l">
            <RoseChart
              :rowData="Classification.listData"
              :legends="Classification.color"
              :center="['50%', '45%']"
              :radius="[20, 100]"
              width="240px"
              height="240px" />
          </div>
          <div class="list_r">
            <div class="item" v-for="(el, i) in Classification.listData" :key="i">
              <div class="item_border" :style="{ background: Classification.color[i] }"></div>
              <div class="item_name">{{ el.dimension }}</div>
              <div class="PerCent">
                <div
                  :style="{
                    'background-image':
                      'linear-gradient(to right, ' +
                      Classification.color[i] +
                      '00' +
                      ',' +
                      Classification.color[i] +
                      'ff' +
                      ')',

                    width: el.val + '%',
                  }"></div>

                <!-- 'background-color': Classification.color[i], -->
              </div>
              <div class="item_val" :style="{ color: Classification.color[i] }">
                {{ el.measure }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="Patient">
        <twoTitle title="Patient Age Structure"></twoTitle>
        <div class="foot_four_bo">
          <div class="loidou">
            <FunnelChart :rowData="Patient_Data"></FunnelChart>
          </div>
          <div class="Patient_Data">
            <div class="sj" v-for="(item, index) in Patient_Data" :key="index">
              <div class="name">{{ item.category }}</div>
              <div class="value" :style="{ color: item.color }">{{ item.data }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="Services_right">
      <OneTitle title="Educational Services" width="800px" imgTop="-5px" />
      <div class="Education">
        <TwoTitle title="Education Statistics" />
        <div class="Education_sj">
          <div v-for="(item, index) in Education_sj_Data" :key="index">
            <div class="name">{{ item.name }}</div>
            <div class="value">{{ item.value }}</div>
          </div>
        </div>
      </div>
      <div class="Distribution">
        <TwoTitle title="Distribution Of Educational Institutions" />
        <div class="content">
          <BarCharts
            :max="100"
            :measurebox="4"
            :rowData="Distribution_Data"
            width="780"
            :barWidth="4"
            :unit="['']"
            height="269"
            :legends="pwsltjBarLegend"
            gridTop="10%" />
        </div>
      </div>
      <div class="Trend">
        <twoTitle title="Trend Of Education Investment In The Past Five Years"></twoTitle>
        <ChartLineArea2 :rowData="Trend_Data" :barColor="['#00F0F0', '#00F0F000']" />
      </div>
    </div>
  </div>
</template>

<script>
import OneTitle from '../common/OneTitle.vue';
import TwoTitle from '../common/twoTitle.vue';
// Introducing Rose Chart Components
import RoseChart from '../../components/charts/RoseChart/RoseChart.vue';
import FunnelChart from '../charts/FunnelChart.vue';
import BarCharts from '../../components/charts/ChartBar/ChartBar.vue';
import ChartLineArea2 from '../../components/charts/ChartLine/ChartLineArea2.vue';
export default {
  components: {
    OneTitle,
    TwoTitle,
    RoseChart,
    FunnelChart,
    BarCharts,
    ChartLineArea2,
  },
  data() {
    return {
      // Medical Statistics
      Medical_Data: [
        {
          name: 'Number Of MedicalInstitutions',
          value: 23,
        },
        {
          name: 'Number Of Medical Beds Approved',
          value: 298,
        },
        {
          name: 'Number Of Medical Personnel',
          value: 507,
        },
        {
          name: 'Number Of Patients',
          value: 941,
        },
      ],
      // Classification Of Medical Institutions
      Classification: {
        listData: [
          {
            dimension: 'Fault Level 01',
            measure: 42,
            val: 90,
          },
          {
            dimension: 'Fault Level 02',
            measure: 35,
            val: 80,
          },
          {
            dimension: 'Fault Level 03',
            measure: 29,
            val: 70,
          },
          {
            dimension: 'Fault Level 04',
            measure: 17,
            val: 60,
          },
          {
            dimension: 'Fault Level 05',
            measure: 17,
            val: 50,
          },
        ],
        color: ['#1180EE', '#FFE426', '#00DD8A', '#95FF2B', '#00D9D9'],
      },
      zitiyanse: ['#007FFF', '#06CA84', '#00BFFF', '#7373FF', '#FFBC4D'],
      Patient_Data: [
        {
          category: 'Helvetica',
          data: '103',
          color: '#C0E2FE',
          proportion: '29%',
        },
        {
          category: '15-64 Years Old',
          data: '225',
          color: '#FEAF38',
          proportion: '35%',
        },
        {
          category: 'Over 65 Years Old',
          data: '361',
          color: '#01CD5E',
          proportion: '42%',
        },
      ],
      Education_sj_Data: [
        {
          name: 'Number Of Schools',
          value: 62,
        },
        {
          name: 'Number Of Degrees',
          value: 203,
        },
        {
          name: 'Number Of Teachers',
          value: 321,
        },
        {
          name: 'Number Of Students',
          value: 1023,
        },
      ],
      pwsltjBarLegend: [{ name: '', from: '#72FEFF', to: '#00BFFF' }],
      Distribution_Data: [
        { legend: 'Type 1', measure: 42, dimension: 'Type 01' },
        { legend: 'Type 1', measure: 31, dimension: 'Type 02' },
        { legend: 'Type 1', measure: 27, dimension: 'Type 03' },
        { legend: 'Type 1', measure: 44, dimension: 'Type 04' },
        { legend: 'Type 1', measure: 32, dimension: 'Type 05' },
        { legend: 'Type 1', measure: 32, dimension: 'Type 06' },
        { legend: 'Type 1', measure: 32, dimension: 'Type 07' },
      ],
      Trend_Data: [
        {
          name: '2019',
          value: 60,
        },
        {
          name: '2020',
          value: 65,
        },
        {
          name: '2021',
          value: 50,
        },
        {
          name: '2022',
          value: 75,
        },
        {
          name: '2023',
          value: 75,
        },
      ],
    };
  },
  methods: {
    async getDynamicsOnDuty() {
      let res = await this.$http.MSFW.getDynamicsOnDuty();
      this.Medical_Data = res;
    },
    async getClassificationOfMedicalInstitutions() {
      let res = await this.$http.MSFW.getClassificationOfMedicalInstitutions();
      this.Classification.listData = res;
    },
    async getPatientAgeStructure() {
      let res = await this.$http.MSFW.getPatientAgeStructure();
      this.Patient_Data = res;
    },
    async getEducationStatistics() {
      let res = await this.$http.MSFW.getEducationStatistics();
      this.Education_sj_Data = res;
    },
    async getDistribution() {
      let res = await this.$http.MSFW.getDistribution();
      this.Distribution_Data = res;
    },
    async getTrend() {
      let res = await this.$http.MSFW.getTrend();
      this.Trend_Data = res;
    },
  },
  created() {
    this.getDynamicsOnDuty();
    this.getClassificationOfMedicalInstitutions();
    this.getPatientAgeStructure();
    this.getEducationStatistics();
    this.getDistribution();
    this.getTrend();
  },
};
</script>

<style lang="less" scoped>
.Service_Max {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  .Services_left {
    width: 800px;
    height: 100%;
    box-sizing: border-box;
    .Medical {
      margin-top: 50px;
      width: 100%;
      height: 465px;
      box-sizing: border-box;
      .Medical_sj {
        margin-top: 30px;
        width: 100%;
        height: 394px;
        background: url('../../assets/img/MingShengFuWu/Medical_bj.png') no-repeat center center;
        box-sizing: border-box;
        position: relative;
        > div {
          width: 265px;
          height: 142px;
          box-sizing: border-box;
          padding: 0px 20px;
          .name {
            width: 100%;
            height: 62px;
            font-family: 'Helvetica';
            font-size: 26px;
            color: #ffffff;
            line-height: 30px;
            overflow: hidden;
          }
          .value {
            box-sizing: border-box;
            padding-left: 90px;
            font-family: 'Roboto';
            font-size: 64px;
            background: linear-gradient(to bottom, #fffae9, #ffd24d);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }
        > div:nth-child(1) {
          position: absolute;
          top: 30px;
          left: 30px;
        }
        > div:nth-child(2) {
          position: absolute;
          top: 30px;
          right: 30px;
        }
        > div:nth-child(3) {
          position: absolute;
          bottom: 20px;
          left: 30px;
        }
        > div:nth-child(4) {
          position: absolute;
          bottom: 20px;
          right: 30px;
        }
      }
    }
    .Classification {
      margin-top: 50px;
      width: 100%;
      height: 320px;
      box-sizing: border-box;
      .list {
        margin-top: 20px;
        display: flex;
        justify-content: space-evenly;
        width: 100%;
        height: 240px;
        .list_r {
          width: 510px;
          height: 240px;
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
              margin-right: 10px;
            }
            .item_name {
              width: 170px;
              overflow: hidden;
              font: 24px 'Helvetica';
              color: #bfebff;
            }
            .PerCent {
              margin-left: 10px;
              width: 250px;
              height: 14px;
              border-radius: 7px;
              > div {
                height: 100%;
                border-radius: 7px;
                background-color: #2872ec50;
                background: linear-gradient(to right, #1180ee00, #1180ee);
              }
            }
            .item_val {
              width: 60px;
              text-align: right;
              font: 34px 'Roboto';
              color: #2872ec;
              white-space: nowrap;
            }
          }
        }
      }
    }
    .Patient {
      margin-top: 50px;
      width: 100%;
      height: 272px;
      .foot_four_bo {
        margin-top: 20px;
        width: 805px;
        height: 190px;
        display: flex;
        .loidou {
          width: 252px;
          height: 190px;
        }
        .Patient_Data {
          margin-left: 30px;
          width: 488px;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          .sj {
            width: 100%;
            height: 49px;
            display: flex;
            background: url('../../assets/img/MingShengFuWu/Patient_Data.png') no-repeat center center;
            box-sizing: border-box;
            padding-left: 25px;
            align-items: center;
            .name {
              font-family: 'Helvetica';
              font-size: 24px;
              color: #bfebff;
              width: 240px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .value {
              width: 160px;
              text-align: right;
              font-family: 'Roboto';
              font-size: 36px;
              color: #bfefff;
            }
          }
        }
      }
    }
  }
  .Services_right {
    width: 800px;
    height: 100%;
    box-sizing: border-box;
    .Education {
      margin-top: 50px;
      width: 100%;
      height: 465px;
      box-sizing: border-box;
      .Education_sj {
        margin-top: 30px;
        width: 100%;
        height: 439px;
        background: url('../../assets/img/MingShengFuWu/Education_bj.png') no-repeat center center;
        box-sizing: border-box;
        position: relative;
        > div {
          width: 150px;
          height: 130px;
          box-sizing: border-box;
          .name {
            width: 100%;
            height: 62px;
            font-family: 'Helvetica';
            font-size: 26px;
            color: #ffffff;
            line-height: 30px;
            overflow: hidden;
          }
          .value {
            box-sizing: border-box;
            font-family: 'Roboto';
            font-size: 64px;
            color: #26ffff;
          }
        }
        > div:nth-child(1) {
          position: absolute;
          top: 20px;
          left: 190px;
        }
        > div:nth-child(2) {
          position: absolute;
          top: 20px;
          right: 160px;
        }
        > div:nth-child(3) {
          position: absolute;
          bottom: 110px;
          left: 70px;
        }
        > div:nth-child(4) {
          position: absolute;
          bottom: 110px;
          right: 60px;
        }
      }
    }
    .Distribution {
      margin-top: 50px;
      width: 100%;
      height: 320px;
      box-sizing: border-box;
      .content {
        width: 780px;
        height: 269px;
        margin-top: 20px;
      }
    }
    .Trend {
      margin-top: 50px;
      width: 100%;
      height: 272px;
      .foot_four_bo {
        margin-top: 20px;
        width: 805px;
        height: 190px;
        display: flex;
        .loidou {
          width: 252px;
          height: 190px;
        }
        .Patient_Data {
          margin-left: 30px;
          width: 488px;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          .sj {
            width: 100%;
            height: 49px;
            display: flex;
            background: url('../../assets/img/MingShengFuWu/Patient_Data.png') no-repeat center center;
            box-sizing: border-box;
            padding-left: 25px;
            align-items: center;
            .name {
              font-family: 'Helvetica';
              font-size: 24px;
              color: #bfebff;
              width: 240px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .value {
              width: 160px;
              text-align: right;
              font-family: 'Roboto';
              font-size: 36px;
              color: #bfefff;
            }
          }
        }
      }
    }
  }
}
</style>
