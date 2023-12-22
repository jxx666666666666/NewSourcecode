<template>
  <div class="Energy">
    <div class="close" @click="closeClick"></div>
    <div class="Energy_Box_Top">
      <TwoTitle title="Pue Change Curve" />
    </div>
    <div class="Energy_Box_date">
      <input type="date" v-model="selectDate" :max="selectDate" :onchange="onChange()" />
    </div>
    <div class="Energy_Box_Bottom">
      <DuiTieZhuTuAndZheXian :width="'840px'" :height="'340px'" :legTop="'10px'" :legLeft="'150px'"
        :legthWZ="['Hourly PUE', 'IT(kwh)', 'Cooling(kwh)', 'Total(kwh)']"
        :barColor="['#FDD801', '#16B4F8', '#A64DFF', '#02FDE3']"
        :legthColor="['#FDD801', '#16B4F8', '#A64DFF', '#02FDE3']" :rowData="rowData">
      </DuiTieZhuTuAndZheXian>
    </div>
  </div>
</template>

<script>
import DuiTieZhuTuAndZheXian from "../../charts/DuiTieZhuTuAndZheXian_Four";
import TwoTitle from "../../common/twoTitle.vue";
import Time from '../../../utils/common/time'
export default {
  components: {
    DuiTieZhuTuAndZheXian,
    TwoTitle
  },
  data() {
    return {
      selectDate: '',
      rowData: [
        {
          name: "00:00",
          value: 90,//Hourly PUE
          item: 10,
          val: 40,
          total: 90
        },
        {
          name: "04:00",
          value: 90,
          item: 10,
          val: 40,
          total: 90
        },
        {
          name: "08:00",
          value: 90,
          item: 10,
          val: 40,
          total: 90
        },
        {
          name: "12:00",
          value: 90,
          item: 10,
          val: 40,
          total: 90
        },
        {
          name: "16:00",
          value: 90,
          item: 10,
          val: 40,
          total: 90
        },
        {
          name: "20:00",
          value: 90,
          item: 10,
          val: 40,
          total: 90
        },
      ]
    }
  },
  methods: {
    closeClick() {
      this.$store.commit("setHighLight", this.$store.state.topic);
    },
    async getEnergyData(date) {
      if (!window.streamingConfig.debugger.PDC) {
        let dateStr = !date ? Time.format("yyyy-MM-dd", new Date()) : date;
        let code = "NE=33554444";
        let data = await this.$http.SJZXApi.getEnergyAnalysis(
          {
            "dns": [code],
            "signals": ["PUE", "TOTAL_VAL", "TOTAL_INC", "IT_VAL", "IT_INC", "COOLING_VAL", "COOLING_INC", "POWER", "CURRENT"],
            "period": "PERIOD_1_HOUR",
            "startTime": dateStr + " 00:00:00",
            "endTime": dateStr + " 23:59:59"
          }
        );
        if (data && data[code] && data[code].length > 0) {
          let tempData = data[code]
          let datas = [];
          tempData.forEach(item => {
            datas.push({
              name: item.time.substring(8),
              value: item.PUE,//Hourly PUE
              item: item.IT_INC,
              val: item.COOLING_INC,
              total: item.TOTAL_INC
            })
          })
          this.rowData = datas;
        }
      }
    },
    onChange() {
      this.getEnergyData(this.selectDate);
    }
  },
  created() {
    this.selectDate = Time.format("yyyy-MM-dd", new Date())
    this.getEnergyData('');
  },
  beforeDestroy() {
    this.$http.SJZXApi.logoutNetEco();
  }
}
</script>

<style  lang="less" scoped>
.Energy {
  width: 861px;
  height: 470px;
  background: url("../../../assets/img/ShuJuZhongXin/Energy_bj.png") no-repeat;
  background-size: 100% 100%;
  position: relative;
  transform: translate(180%, 70%);


  .Energy_Box_Top {
    width: 320px;
    height: 35px;
    position: relative;
    top: 80px;
    left: 30px;
  }

  .Energy_Box_date {
    position: absolute;
    top: 60px;
    right: 40px;
    width: 200px;
    line-height: 35px;
    height: 35px;
    pointer-events: all;


    input {
      width: 200px;
      line-height: 35px;
      height: 40px;
      background-color: #0D2033;
      border: 1px solid #475F70;
      color: #ffffff;
      font-size: 26px;
      padding-left: 10px;
      padding-right: 10px;
    }

    input[type="date"]::-webkit-calendar-picker-indicator {
      background-image: url("../../../assets//img//ShuJuZhongXin//dateIcon.png");
    }
  }

  .Energy_Box_Bottom {
    width: 840px;
    height: 260px;
    position: relative;
    top: 85px;
  }

  .close {
    position: absolute;
    top: 14px;
    right: 11px;
    width: 20px;
    height: 20px;
    background: url("../../../assets/img/popupIMG/clonse.png") no-repeat;
    background-size: 100% 100%;
    pointer-events: all;
  }
}
</style>