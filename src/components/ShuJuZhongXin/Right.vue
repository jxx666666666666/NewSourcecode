<template>
  <div class="sjzxRight">
    <OneTitle title="Monitoring" width="100%" />
    <div class="videoList">
      <div class="item" v-for="(item, i) in monitoringData" :key="i">
        <video v-if="isDebugger" :src="item.path" autoplay loop muted></video>
        <videoIVS v-else :cameraCode="item.code"></videoIVS>
        <div class="border"></div>
        <div class="fangda">
          <img src="../../assets/img/ldzf/fangda_bg.png" alt="" />
        </div>
        <div class="info" v-if="isDebugger">
          <div class="item_name">{{ item.name }}</div>
          <div class="item_time">
            <span>{{ item.date }}</span> {{ item.time }}
          </div>
        </div>
      </div>
    </div>
    <OneTitle title="Operation And Maintenance" width="100%" style="margin-top: 60px" />
    <div class="plate2">
      <div class="ByDevice">
        <TwoTitle title="Alarms By Device Type" />
        <TitleTabs class="resource_tabs" @changeTabs="deviceChange" :current="deviceCurrent"
          :tabs="['Day', 'Week', 'Month']" />
        <div class="chart">
          <RoseChart class="roseChart" width="100%" height="250px" :legendShow="5" :radius="[18, 100]"
            :center="['50%', '50%']" :rowData="ByDeviceData" />
        </div>
      </div>
      <div class="BySeverity">
        <TwoTitle title="Alarms By Severity" />
        <TitleTabs class="resource_tabs" @changeTabs="severityChange" :current="severityCurrent"
          :tabs="['Day', 'Week', 'Month']" />
        <div class="chart">
          <ChartLoop :height="'240px'" :width="'240px'" :fonts="'60'" :fontText="'24'" :radius="['90%', '80%']"
            :flexLegends="0" :legends="facilityColor" :rowData="BySeverityData" />
          <div class="dataList">
            <div class="card" v-for="(item, index) in BySeverityData" :key="index">
              <div class="rido" :style="{ backgroundColor: facilityColor[index] }"></div>
              <div class="name">{{ item.legend }}</div>
              <div class="rateLength">
                <p :style="{
                  width: item.rate,
                  background: `linear-gradient(to right,${facilityColor[index]}00,${facilityColor[index]})`,
                }"></p>
              </div>
              <div class="rate" :style="{ color: facilityColor[index] }">
                {{ item.rate }}
              </div>
              <div class="value">{{ item.measure }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="plate3">
      <div class="accessEvent">
        <TwoTitle title="Access Event" />
        <div class="chart">
          <tablist :bodyListData="AccessEventData" :headerListData="headerListData"></tablist>
        </div>
      </div>
      <div class="Environment">
        <TwoTitle title="Environment" tableHeartHeight="10px" />
        <div class="chart">
          <img src="../../assets/img/ShuJuZhongXin/environment_bg.png" alt="" />
          <div class="leftData">
            <div class="card" v-for="(item, index) in EnvironmentData.data1" :key="index">
              <div class="name">{{ item.name }}</div>
              <div class="value">
                <p>
                  <span>{{ item.value }}</span>
                  <span>°C</span>
                </p>
                <p>
                  <span>{{ item.val }}</span>
                  <span>%RH</span>
                </p>
              </div>
            </div>
          </div>
          <div class="centerData">
            <p class="sisleLeft" :style="{
              height:
                calculatePercentage(EnvironmentData.leftData, -30, 110) + '%',
            }"></p>
            <p class="sisleRight" :style="{
              height:
                calculatePercentage(EnvironmentData.rightData, -30, 110) +
                '%',
            }"></p>
          </div>
          <div class="rightData">
            <div class="card" v-for="(item, index) in EnvironmentData.data2" :key="index">
              <div class="name">{{ item.name }}</div>
              <div class="value">
                <p>
                  <span>{{ item.value }}</span>
                  <span>°C</span>
                </p>
                <p>
                  <span>{{ item.val }}</span>
                  <span>%RH</span>
                </p>
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
import TwoTitle from "../common/twoTitle.vue";
import RoseChart from "../charts/RoseChart/RoseChart.vue";
import TitleTabs from "../common/TitleTabs.vue";
import ChartLoop from "../charts/ChartLoop/ChartLoop.vue";
import tablist from "./common/TableList.vue";
import Time from "../../utils/common/time";
import ITSToken from "../../utils/common/ITSToken";
import videoIVS from "../../components/common/VideoIVS";
export default {
  components: {
    OneTitle,
    TwoTitle,
    RoseChart,
    TitleTabs,
    ChartLoop,
    tablist,
    videoIVS,
  },
  data() {
    return {
      headerListData: [
        {
          name: "Time",
          width: "223px",
          key: "time",
        },
        {
          name: "EventName",
          width: "255px",
          key: "name",
        },
        {
          name: "Card No",
          width: "130px",
          key: "no",
        },
        {
          name: "OwnerName",
          width: "200px",
          key: "ownerName",
        }
      ],
      facilityColor: ["#FF4D4D", "#FF8000", "#FFD24D", "#4DD2FF"],
      deviceCurrent: "Day",
      severityCurrent: "Day",
      isDebugger: window.streamingConfig.debugger.PDC,
      // Monitoring
      monitoringData: [
        {
          name: "001",
          date: "2021-02-04 ",
          time: "12:30:20",
          path: "/video/01.mp4",
          code: '00402032009963560101#f4b00b238376482bb719fc54b49add42',

        },
        {
          name: "002",
          date: "2021-02-04 ",
          time: "12:30:20",
          path: "/video/02.mp4",
          code: '00402032000906370101#f4b00b238376482bb719fc54b49add42',

        },
      ],
      // Alarms By Device Type
      ByDeviceData: [
        {
          measure: 42,
          dimension: "Power",
        },
        {
          measure: 35,
          dimension: "Cooling",
        },
        {
          measure: 29,
          dimension: "ENV",
        },
        {
          measure: 17,
          dimension: "Security",
        },
        {
          measure: 17,
          dimension: "Others",
        },
      ],
      // Alarms By Severity
      BySeverityData: [
        { legend: "Critical", measure: 12, rate: "45%" },
        { legend: "Major", measure: 39, rate: "32%" },
        { legend: "Minor", measure: 3, rate: "19%" },
        { legend: "Warning", measure: 4, rate: "17%" },
      ],
      // Access Event
      AccessEventData: [
        {
          time: "2022-03-22 10:00:00",
          name: "Door Closed",
          no: "XXXXXXXXXXXXXXXX",
        },
        {
          time: "2022-03-22 10:00:00",
          name: "Door Closed",
          no: "XXXXXXXXXXXXXXXX",
        },
        {
          time: "2022-03-22 10:00:00",
          name: "Door Closed",
          no: "XXXXXXXXXXXXXXXX",
        },
        {
          time: "2022-03-22 10:00:00",
          name: "Door Closed",
          no: "XXXXXXXXXXXXXXXX",
        },
        {
          time: "2022-03-22 10:00:00",
          name: "Door Closed",
          no: "XXXXXXXXXXXXXXXX",
        },
        {
          time: "2022-03-22 10:00:00",
          name: "Door Closed",
          no: "XXXXXXXXXXXXXXXX",
        },
        {
          time: "2022-03-22 10:00:00",
          name: "Door Closed",
          no: "XXXXXXXXXXXXXXXX",
        },
        {
          time: "2022-03-22 10:00:00",
          name: "Door Closed",
          no: "XXXXXXXXXXXXXXXX",
        },
      ],
      // Environment
      EnvironmentData: {
        leftData: 20,
        rightData: 78,
        data1: [
          {
            name: "Cold Aisle",
            value: "22.5",
            val: "48.8",
          },

          {
            name: "AVG",
            value: "22.5",
            val: "48.8",
          },

          {
            name: "MAX",
            value: "22.5",
            val: "48.8",
          },
        ],
        data2: [
          {
            name: "Hot Aisle",
            value: "22.5",
            val: "48.8",
          },

          {
            name: "AVG",
            value: "22.5",
            val: "48.8",
          },

          {
            name: "MAX",
            value: "22.5",
            val: "48.8",
          },
        ],
      },
    };
  },
  created() {
    // this.getTestToken();
    this.getmonitoringData();
    this.getByDeviceData();
    this.getBySeverityData();
    this.getAccessEventData();
    this.getEnvironmentData();
  },
  methods: {
    calculatePercentage(number, min, max) {
      if (number < min) {
        number = min;
      } else if (number > max) {
        number = max;
      }
      return ((number - min) * 100) / (max - min);
    },
    deviceChange(item) {
      this.deviceCurrent = item;
      this.getByDeviceData();
    },
    severityChange(item) {
      this.severityCurrent = item;
      this.getBySeverityData();
    },
    // Monitoring
    async getmonitoringData() {
      this.monitoringData = await this.$http.SJZXApi.getmonitoringData();
    },
    // Alarms By Device Type
    async getByDeviceData() {
      this.ByDeviceData = await this.$http.SJZXApi.getByDeviceData(
        this.deviceCurrent
      );
    },
    // Alarms By Severity
    async getBySeverityData() {
      this.BySeverityData = await this.$http.SJZXApi.getBySeverityData(
        this.severityCurrent
      );
    },
    // Access Event
    async getAccessEventData() {
      if (this.isDebugger) {
        this.AccessEventData = await this.$http.SJZXApi.getAccessEventData();
      } else {
        let startTime = new Date(Time.addDate(new Date(), 0) + ' 00:00:00').getTime();
        let endTime = new Date().getTime();
        let res = await this.$http.SJZXApi.getAccessEvent(JSON.stringify({ "startTime": startTime, "endTime": endTime, "pageIndex": 1, "pageSize": 50 }));
        if (res && res.data && res.data.length > 0) {
          let data = [];
          res.data.forEach(item => {
            data.push({
              time: item.entranceRecordDate,
              name: item.entryDesc,
              no: item.cardNo || '-',
              ownerName: item.ownerName || '-',
            })
          })
          this.AccessEventData = data;
        }

      }
    },
    // Environment
    async getEnvironmentData() {
      this.EnvironmentData = await this.$http.SJZXApi.getEnvironmentData();
    },
    async getTestToken() {
      let res = await ITSToken.getAccessToken('53','10.246.74.27');
    },
  },
};
</script>

<style scoped lang="less">
.sjzxRight {
  height: 100%;
  color: #ffffff;

  .videoList {
    width: 100%;
    height: 370px;
    // background: red;
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: space-between;

    .item {
      width: 818px;
      height: 370px;
      background: url("../../assets/img/ldzf/video_bg.png") no-repeat center center;
      background-size: 100% 100%;
      // padding: 15px;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;

      video {
        width: 803px;
        height: 354px;
        object-fit: fill;
      }

      .border {
        width: 0;
        height: 0;
        border-top: 12px solid transparent;
        border-right: 12px solid #4da6ff;
        border-bottom: 12px solid #4da6ff;
        border-left: 12px solid transparent;
        position: absolute;
        right: 0px;
        bottom: 0px;
      }

      .fangda {
        width: 49px;
        height: 48px;
        position: absolute;
        right: 30px;
        top: 20px;
      }

      .info {
        width: 100%;
        height: 69px;
        position: absolute;
        bottom: 0px;
        background-image: linear-gradient(to bottom, #01172c00, #01172c);
        color: #fff;
        display: flex;
        align-items: center;
        padding: 0 20px;
        box-sizing: border-box;
        justify-content: space-between;

        .item_name {
          position: relative;
          height: 27px;
          line-height: 27px;
          font-size: 26px;
          font-family: "Helvetica";
          padding-left: 15px;
          box-sizing: border-box;

          &::before {
            content: "";
            position: absolute;
            left: 0px;
            width: 4px;
            height: 27px;
            background-image: linear-gradient(to bottom, #00afe1, #bfff00);
          }
        }

        .item_time {
          font: 24px "Roboto";
          color: #ffe426;

          span {
            background-image: linear-gradient(to bottom, #ffffff, #c5fcf3);
            -webkit-background-clip: text;
            color: transparent;
          }
        }
      }
    }
  }

  .plate2 {
    margin-top: 24px;
    display: flex;
    justify-content: space-between;

    >div {
      width: 810px;
      position: relative;

      .resource_tabs {
        position: absolute;
        right: 0;
        top: 15px;
      }

      .chart {
        margin-top: 16px;
        height: 250px;
      }
    }

    .BySeverity {
      .chart {
        margin-top: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .dataList {
          width: 565px;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;

          .card {
            display: flex;

            .rido {
              width: 5px;
              height: 27px;
            }

            .name {
              font: 24px "Helvetica";
              margin-left: 8px;
              width: 110px;
            }

            .rateLength {
              width: 230px;
              height: 14px;

              p {
                height: 100%;
                border-radius: 7px;
              }
            }

            .rate {
              width: 100px;
              text-align: right;
              font: 38px "Roboto";
            }

            .value {
              width: 100px;
              text-align: right;
              font: 38px "Roboto";
              color: #bfebff;
            }
          }
        }
      }
    }
  }

  .plate3 {
    margin-top: 15px;
    display: flex;
    justify-content: space-between;

    >div {
      width: 810px;
    }

    .accessEvent {
      .chart {
        margin-top: 18px;
        height: 280px;
      }
    }

    .Environment {
      .chart {
        margin-top: 17px;
        height: 281px;
        position: relative;
        display: flex;
        justify-content: space-between;

        img {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 787px;
          height: 281px;
        }

        .leftData,
        .rightData {
          margin-top: 30px;

          .card {
            width: 270px;

            &:nth-child(n + 2) {
              margin-top: 28px;
            }

            .name {
              font: 22px "Helvetica";
              color: #15b3f8;
            }

            .value {
              display: flex;
              justify-content: space-between;

              p {
                display: flex;
                align-items: baseline;

                span {
                  &:nth-child(1) {
                    font: 26px "Helvetica";
                  }

                  &:nth-child(2) {
                    margin-left: 10px;
                    font: 22px "Helvetica";
                    color: #bfebff;
                  }
                }
              }
            }

            &:nth-child(1) {
              .name {
                font: 26px "Helvetica";
                color: #ffffff;
              }

              .value {
                p {
                  span {
                    &:nth-child(1) {
                      font: 34px "Helvetica";
                      color: #26ffff;
                    }
                  }
                }
              }
            }
          }
        }

        .leftData {
          margin-left: 20px;
        }

        .rightData {
          margin-right: 45px;
        }

        .centerData {
          width: 24px;
          height: 165px;
          position: absolute;
          top: 17px;
          left: 388px;
          border-radius: 12.5px 12.5px 0 0;
          overflow: hidden;

          display: flex;
          justify-content: space-between;
          align-items: flex-end;

          >p {
            width: 10px;
          }

          .sisleLeft {
            background-color: #ffd24d;
          }

          .sisleRight {
            background-color: #2693ff;
          }
        }
      }
    }
  }
}
</style>
