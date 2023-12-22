<template>
  <div class="wraper">
    <div class="Data">
      <div v-for="(item, index) in cen_Data" :key="index">
        <div class="name">{{ item.name }}</div>
        <div class="bott">
          <div class="popo">
            <img :src="AwareUIcon[index]" alt="" />
          </div>
          <div class="value">{{ item.value }}</div>
          <div class="val">
            <div v-for="(int, k) in item.data" :key="k">
              <div class="val_name">{{ int.name }}</div>
              <div class="val_value" :class="int.value > 0 ? 'add' : ''">{{ int.value }}%</div>
              <div class="val_popo">
                <img v-if="int.value > 0" src="../../assets//img//MingShengFuWu/sj.png" alt="" />
                <img v-else src="../../assets//img//MingShengFuWu/js.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OneTitle from '../common/OneTitle.vue';
import TodayList from '../common/TodayListV2.vue';
export default {
  components: { TodayList, OneTitle },
  data() {
    return {
      AwareUIcon: [
        require('../../assets/img/MingShengFuWu/Total.png'),
        require('../../assets/img/MingShengFuWu/Resident.png'),
      ],
      cen_Data: [
        {
          name: 'Total Population',
          value: 800368,
          data: [
            {
              name: 'YoY',
              value: 2.6,
            },
            {
              name: 'MoY',
              value: -1.2,
            },
          ],
        },
        {
          name: 'Resident Population',
          value: 1020060,
          data: [
            {
              name: 'YoY',
              value: 2.6,
            },
            {
              name: 'MoY',
              value: -1.2,
            },
          ],
        },
      ],
    };
  },

  methods: {
    async getCenden() {
      let res = await this.$http.MSFW.getCenden();
      this.cen_Data = res;
    },
  },
  created() {
    this.getCenden();
  },
};
</script>

<style lang="less" scoped>
.wraper {
  width: 100%;
  .Data {
    width: 495px;
    height: 100%;
    box-sizing: border-box;
    > div {
      width: 100%;
      height: 120px;
      margin-bottom: 20px;
      background: url('../../assets/img/MingShengFuWu/cen.png') no-repeat center center;
      box-sizing: border-box;
      .name {
        width: 100%;
        padding-left: 20px;
        font-family: 'Helvetica';
        font-size: 26px;
        color: #fff;
        font-weight: Regular;
      }
      .bott {
        margin-top: 15px;
        width: 100%;
        height: 67px;
        box-sizing: border-box;
        display: flex;
        .popo {
          margin-left: 10px;
          width: 67px;
          height: 67px;
          position: relative;
          > img {
          }
        }
        .value {
          margin-left: 20px;
          width: 250px;
          height: 100%;
          font-family: 'Roboto';
          font-size: 60px;
          font-weight: Regular;
          color: #ffffff;
        }
        .val {
          margin-left: 10px;
          width: 135px;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          > div {
            width: 100%;
            height: 25px;
            display: flex;
            align-items: center;
            .val_name {
              width: 47px;
              font-family: 'Helvetica';
              font-size: 20px;
              color: #bfefff;
            }
            .val_value {
              width: 70px;
              text-align: center;
              font-family: 'Roboto';
              font-size: 24px;
              color: #ff9672;
            }
            .add {
              color: #4cff79;
            }
            .val_popo {
              width: 20px;
              height: 20px;
            }
          }
        }
      }
    }
  }
}
</style>
