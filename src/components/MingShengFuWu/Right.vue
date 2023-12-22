<!--
 * @Author: user name
 * @Date: 2023-12-05 12:00:22
 * @LastEditTime: 2023-12-05 16:48:55
 * @LastEditors: user name
 * @Description: 
-->
<template>
  <div class="Elderly_Max">
    <div class="Elderly_Left">
      <OneTitle title="Elderly Care Services" width="800px" imgTop="-5px" />
      <div class="Elderly">
        <TwoTitle title="Elderly Care Service Statistics" />
        <div class="Elderly_sj">
          <div v-for="(item, index) in Elderly_Data" :key="index">
            <div class="name">{{ item.name }}</div>
            <div class="value">{{ item.value }}</div>
          </div>
        </div>
      </div>
      <div class="Trend">
        <TwoTitle title="Trend Of The Number Of Elderly Care Residents In..." />
        <ChartLineArea2 :rowData="Trend_Data" :barColor="['#00F0F0', '#00F0F000']" />
      </div>
      <div class="Distribution">
        <twoTitle title="Distribution Of Nursing Homes"></twoTitle>
        <ChartBar
          width="100%"
          height="270px"
          :legIsShow="false"
          :barColor="['#008CEB', '#008CEB00']"
          :rowData="Distribution_Data"
          unit=""
          :grid="{
            left: '1%',
            right: '2%',
            top: '15%',
            bottom: '0%',
            containLabel: true,
          }" />
      </div>
    </div>
    <div class="Social_Right">
      <OneTitle title="Social Security" width="800px" imgTop="-5px" />
      <div class="Social">
        <TwoTitle title="Social Security Statistics" />
        <div class="Social_sj">
          <!-- <div v-for="(item, index) in Social_Data" :key="index">
            <div class="name">{{ item.name }}</div>
            <div class="value">{{ item.num }}</div>
          </div> -->
          <TabLableList :Datalist="Social_Data"></TabLableList>
        </div>
      </div>
      <div class="Trend">
        <TwoTitle title="Trend Of Unemployment In The Past Five Years" />
        <ChartLineArea2 :rowData="Unemployment_Data" :barColor="['#EBCE02', '#EBCE0200']" />
      </div>
      <div class="Age">
        <twoTitle title="Age Distribution Of Unemployed People"></twoTitle>
        <div class="Age_Data">
          <ChartLoop
            :legends="['#EECC46', '#FF9326', '#FF9999']"
            :rowData="Statisticsdata"
            :height="'240px'"
            :width="'240px'"
            :fonts="'60'"
            :fontText="'24'"
            :radius="['90%', '80%']"
            :flexLegends="5" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OneTitle from '../common/OneTitle.vue';
import TwoTitle from '../common/twoTitle.vue';
import ChartLineArea2 from '../../components/charts/ChartLine/ChartLineArea2.vue';
import ChartBar from '../../components/charts/ChartBar/DuoZhuTu.vue';
import ChartLoop from '../../components/charts/ChartLoop/ChartLoop.vue';

import TabLableList from '../../components/GongGongAnQuan/TabLableList2.vue';
export default {
  components: {
    OneTitle,
    TwoTitle,
    ChartLineArea2,
    ChartBar,
    ChartLoop,
    TabLableList,
  },
  data() {
    return {
      Elderly_Data: [
        {
          name: 'Number Of Nursing Homes',
          value: 12,
        },
        {
          name: 'Number Of Beds In Nursing Homes',
          value: 1023,
        },
        {
          name: 'Number Of Elderly Helpers',
          value: 660,
        },
        {
          name: 'Number Of Elderly People',
          value: 68510,
        },
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
      Distribution_Data: [
        {
          name: 'Type 01',
          value: '42',
        },
        {
          name: 'Type 02',
          value: '36',
        },
        {
          name: 'Type 03',
          value: '32',
        },
        {
          name: 'Type 04',
          value: '22',
        },
        {
          name: 'Type 05',
          value: '42',
        },
        {
          name: 'Type 06',
          value: '38',
        },
        {
          name: 'Type 07',
          value: '32',
        },
      ],
      Social_Data: [
        {
          name: 'Number Of PeoplePaying Social Security',
          num: 2245,
        },
        {
          name: 'Social SecurityPayment Amount',
          num: 3650,
        },
        {
          name: 'Promote Employment',
          num: 6477,
        },
        {
          name: 'Number Of Unemployed',
          num: 2882,
        },
      ],
      Unemployment_Data: [
        {
          name: '2019',
          value: 140,
        },
        {
          name: '2020',
          value: 200,
        },
        {
          name: '2021',
          value: 150,
        },
        {
          name: '2022',
          value: 320,
        },
        {
          name: '2023',
          value: 260,
        },
      ],
      Statisticsdata: [
        { legend: '0-15 Years Old', measure: 263, rate: '26' },
        { legend: '15-64 Years Old', measure: 108, rate: '30' },
        { legend: 'Over 65 Years Old', measure: 355, rate: '50' },
      ],
    };
  },
  methods: {
    async getElderly() {
      let res = await this.$http.MSFW.getElderly();
      this.Elderly_Data = res;
    },
    async getTrend_Data() {
      let res = await this.$http.MSFW.getTrend_Data();
      this.Trend_Data = res;
    },
    async getNursing() {
      let res = await this.$http.MSFW.getNursing();
      this.Distribution_Data = res;
    },
    async getStatistics() {
      let res = await this.$http.MSFW.getStatistics();
      this.Social_Data = res;
    },
    async getUnemployment() {
      let res = await this.$http.MSFW.getUnemployment();
      this.Unemployment_Data = res;
    },
    async getAge() {
      let res = await this.$http.MSFW.getAge();
      this.Statisticsdata = res;
    },
  },
  created() {
    this.getElderly();
    this.getTrend_Data();
    this.getNursing();
    this.getStatistics();
    this.getUnemployment();
    this.getAge();
  },
};
</script>

<style lang="less" scoped>
.Elderly_Max {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  .Elderly_Left {
    width: 800px;
    height: 100%;
    box-sizing: border-box;
    .Elderly {
      margin-top: 50px;
      width: 100%;
      height: 465px;
      box-sizing: border-box;
      .Elderly_sj {
        margin-top: 30px;
        width: 842px;
        height: 379px;
        background: url('../../assets/img/MingShengFuWu/Elderly_bj.png') no-repeat center center;
        box-sizing: border-box;
        position: relative;
        > div {
          width: 223px;
          height: 150px;
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
            margin-top: 5px;
            box-sizing: border-box;
            font-family: 'Roboto';
            font-size: 64px;
            color: #26ffff;
          }
        }
        > div:nth-child(1) {
          position: absolute;
          top: 20px;
          left: 0px;
        }
        > div:nth-child(2) {
          position: absolute;
          top: 20px;
          right: 0px;
        }
        > div:nth-child(3) {
          position: absolute;
          bottom: 0px;
          left: 0px;
        }
        > div:nth-child(4) {
          position: absolute;
          bottom: 0px;
          right: 0px;
        }
      }
    }
    .Trend {
      margin-top: 50px;
    }
    .Distribution {
      margin-top: 50px;
    }
  }
  .Social_Right {
    width: 800px;
    height: 100%;
    box-sizing: border-box;
    .Social {
      margin-top: 50px;
      width: 100%;
      height: 465px;
      box-sizing: border-box;

      .Social_sj {
        margin-top: 30px;
        width: 799px;
        height: 388px;
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        background: url('../../assets/img/MingShengFuWu/Social_bj.png') no-repeat;
        background-size: 100% 100%;
        // > div {
        //   width: 312px;
        //   height: 180px;
        //   box-sizing: border-box;
        //   background: url('../../assets/img/MingShengFuWu/Data.png') no-repeat;
        //   text-align: center;
        //   .name {
        //     width: 100%;
        //     height: 62px;
        //     font-family: 'Helvetica';
        //     font-size: 26px;
        //     color: #ffffff;
        //     line-height: 30px;
        //     overflow: hidden;
        //   }
        //   .value {
        //     margin-top: 5px;
        //     box-sizing: border-box;
        //     font-family: 'Roboto';
        //     font-size: 64px;
        //     color: #ffffff;
        //   }
        // }
      }
    }
    .Trend {
      margin-top: 50px;
    }
    .Age {
      margin-top: 50px;
      .Age_Data {
        margin-top: 30px;
      }
    }
  }
}
</style>
