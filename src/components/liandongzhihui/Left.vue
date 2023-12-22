<template>
  <div class="wraper">
    <div class="card card1">
      <OneTitle title="Duty Overview" width="1681px" imgTop="-5px" />
      <div class="con">
        <TwoTitle title="Dynamics On Duty" />
        <div class="list">
          <div class="left">
            <div class="l_img">
              <img src="../../assets/img/ldzf/l_portrait.png" alt="" />
            </div>
            <div class="l_info">
              <div class="item">
                <div class="item_name">Name</div>
                <div class="item_value">
                  {{ DynamicsOnDuty[0].name }}
                </div>
              </div>
              <div class="item">
                <div class="item_name">Position</div>
                <div class="item_value">
                  {{ DynamicsOnDuty?.[0].Position }}
                </div>
              </div>
              <div class="item">
                <div class="item_name">Contact information</div>
                <div class="item_value">
                  {{ DynamicsOnDuty?.[0].ContactInformation }}
                </div>
              </div>
              <div class="item">
                <div class="item_name">Unit</div>
                <div class="item_value">{{ DynamicsOnDuty?.[0].Unit }}</div>
              </div>
            </div>
          </div>
          <div class="right">
            <template v-for="(item, i) in DynamicsOnDuty">
              <div class="item_card" v-if="i != 0" :key="i">
                <div class="posi">
                  <div class="name">{{ item.name }}</div>
                  <div class="value">Position</div>
                </div>
                <div class="item">
                  <div class="item_name">Contact Information</div>
                  <div class="item_value">{{ item.ContactInformation }}</div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <div class="card card2">
      <one-title title="Event Information" width="1681px" imgTop="-5px" />
      <div class="con">
        <div class="box">
          <two-title :title="'Incident Report'" />
          <div class="info_card">
            <div class="l_list">
              <div
                class="item"
                :class="{ item_act: Cindex == i }"
                v-for="(item, i) in IncidentReportInfo"
                :key="i"
                @click="selectInfo(item, i)"
              >
                <div class="item_arrow" v-if="Cindex == i"></div>
                <div class="item_name">{{ item.name }}</div>
                <div class="item_time">{{ item.time }}</div>
                <div class="item_icon">
                  <img src="../../assets/img/ldzf/text_icon.png" alt="" />
                </div>
                <div class="item_value">{{ item.value }}</div>
              </div>
            </div>
            <div class="r_info">
              <div class="alarm">
                <div class="icon">
                  <img src="../../assets/img/ldzf/alarm_icon.png" alt="" />
                </div>
                <div class="time">
                  {{ IncidentReportInfoinfoList.alarm.time }}
                </div>
                <div class="txt">
                  {{ IncidentReportInfoinfoList.alarm.txt }}
                </div>
              </div>
              <div class="infobox">
                <div class="infobox_l">
                  <div class="infoList">
                    <div
                      class="item"
                      v-for="(item, i) in IncidentReportInfoinfoList.infolist"
                      :key="i"
                    >
                      <div class="item_name">{{ item.name }}</div>
                      <div class="item_value">{{ item.value }}</div>
                    </div>
                  </div>
                  <div class="EventDetails">
                    <div class="title">Event Details :</div>
                    <div class="time">2021-02-23 10:46:20</div>
                    <div class="txt">
                      Received a report from Xu Xiaoming (131-3451-1234) from
                      the District Fire Brigade,2020 On the morning of February
                      23, in the south of Longgang District
                    </div>
                  </div>
                  <div class="itemList">
                    <div
                      class="item"
                      v-for="(item, i) in IncidentReportInfoinfoList.itemList"
                      :key="i"
                    >
                      <div class="item_name">{{ item.name }}</div>
                      <div class="item_value">
                        {{ item.value }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="infobox_r">
                  <div class="PhotosFromTheScene">
                    <div class="title"><span>Photos From The Scene</span></div>
                    <div class="imgList">
                      <div class="imgBorder">
                        <img src="../../assets/img/ldzf/alarm_img.png" alt="" />
                      </div>
                      <div class="imgBorder">
                        <img src="../../assets/img/ldzf/alarm_img.png" alt="" />
                      </div>
                    </div>
                  </div>
                  <div class="CurrentEventList">
                    <div class="title">
                      <span>Current Event Progress And Data</span>
                    </div>
                    <div class="itemList">
                      <div
                        class="item"
                        v-for="(
                          item, i
                        ) in IncidentReportInfoinfoList.CurrentEventData"
                        :key="i"
                      >
                        <div class="item_name">{{ item.name }}</div>
                        <div
                          class="item_value"
                          :class="{ value_act: parseInt(item.value) != 0 }"
                        >
                          {{ item.value }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="box box2">
          <TwoTitle
            :title="'Regional Distribution Of Reported'"
            style="transform: translateY(15px)"
          >
          </TwoTitle>
          <TitleTabs
            class="TitleTabs"
            cssWidth="98px"
            cssHeight="32px"
            :tabs="['Month', 'Year']"
            :current="current1"
            @changeTabs="changeTabs"
          />
          <div class="box_con">
            <ChartBar
              width="100%"
              height="270px"
              :legIsShow="false"
              :barColor="['#4DD7FF', '#4DD7FF00']"
              :rowData="RegionalDistributionReported"
              unit=""
              :grid="{
                left: '1%',
                right: '2%',
                top: '15%',
                bottom: '0%',
                containLabel: true,
              }"
            />
          </div>
        </div>
        <div class="box box3">
          <two-title
            :title="'Time Distribution Of Reported Incidents'"
            style="transform: translateY(15px)"
          />
          <TitleTabs
            class="TitleTabs"
            cssWidth="98px"
            cssHeight="32px"
            :tabs="['Month', 'Year']"
            :current="current2"
            @changeTabs="changeTabs2"
          />

          <div class="box_con">
            <!-- <chart-line-area-2 /> -->
            <ChartLineArea2
              height="270px"
              barWidth="20"
              top="15%"
              width="100%"
              :barColor="['#01EBA0', '#10525200']"
              :rowData="TimeDistributionReportedIncidents"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OneTitle from '../common/OneTitle.vue'
import TwoTitle from '../common/twoTitle.vue'
import ChartBar from '../../components/charts/ChartBar/DuoZhuTu.vue'
import ChartLineArea2 from '../charts/ChartLine/ChartLineArea2.vue'
import TitleTabs from '../common/TitleTabs.vue'
export default {
  components: { OneTitle, TwoTitle, ChartBar, ChartLineArea2, TitleTabs },
  data() {
    return {
      current1: 'Month',
      current2: 'Month',
      //Dynamics On Duty
      DynamicsOnDuty: [
        {
          name: 'Bruce Lee',
          Position: 'XXXXXXXX',
          ContactInformation: '12032021000',
          Unit: 'XXXXXXXX',
        },
        {
          name: 'JACK',
          ContactInformation: '1880253254',
        },
        {
          name: 'SIMON',
          ContactInformation: '1880253254',
        },
        {
          name: 'LAW',
          ContactInformation: '1880253254',
        },
        {
          name: 'KRISTY',
          ContactInformation: '1880253254',
        },
      ],
      IncidentReportInfo: [],
      Cindex: 0,
      RegionalDistributionReported: [],
      TimeDistributionReportedIncidents: [],
      IncidentReportInfoinfoList: {
        alarm: {
          time: 'February 23, 2021',
          txt: 'A fire broke out in an office building',
        },
        infolist: [
          {
            name: 'Area',
            value: 'XXXXXXXX',
          },
          {
            name: 'Time Type',
            value: 'XXXXXXXX',
          },
          {
            name: 'The Cause Of The Incident',
            value: 'XXXXXXXX',
          },
        ],
        EventDetails: {
          time: '2021-02-23 10:46:20',
          txt: 'Received a report from Xu Xiaoming (131-3451-1234) from the District Fire Brigade,2020 On the morning of February 23, in the south of Longgang District',
        },
        itemList: [
          {
            name: 'Consequences Have Been Caused',
            value: 'Partial Facility Incineration',
          },
          {
            name: 'Event Development Trend',
            value: 'Controlled',
          },
          {
            name: 'Measures Have Been Taken',
            value: 'Firefighters Rushed To The Scene',
          },
        ],
        CurrentEventData: [
          {
            name: 'Death Toll',
            value: '0',
          },
          {
            name: 'Number Of Trapped Individuals',
            value: '0',
          },
          {
            name: 'The Injured',
            value: '30',
          },
          {
            name: 'Number Of People Affected By...',
            value: '2',
          },
          {
            name: 'Missing Persons',
            value: '0',
          },
          {
            name: 'Economic Losses',
            value: '$M2.4',
          },
        ],
      },
    }
  },
  created() {
    this.getDynamicsOnDutyData()
    this.getIncidentReportInfo()
    this.getIncidentReportInfoinfoList()
    this.getRegionalDistributionReported(this.current1)
    this.getTimeDistributionReportedIncidents(this.current2)
  },
  methods: {
    async getDynamicsOnDutyData() {
      this.DynamicsOnDuty = await this.$http.LDZFApi.getDynamicsOnDutyData()
    },
    async getIncidentReportInfo() {
      this.IncidentReportInfo = await this.$http.LDZFApi.getIncidentReportInfo()
    },
    async getIncidentReportInfoinfoList() {
      this.IncidentReportInfoinfoList =
        await this.$http.LDZFApi.getIncidentReportInfoinfoList()
    },
    async getRegionalDistributionReported() {
      this.RegionalDistributionReported =
        await this.$http.LDZFApi.getRegionalDistributionReported(this.current1)
    },
    async getTimeDistributionReportedIncidents() {
      this.TimeDistributionReportedIncidents =
        await this.$http.LDZFApi.getTimeDistributionReportedIncidents(
          this.current2
        )
    },
    changeTabs(item) {
      this.current1 = item
      this.getRegionalDistributionReported(this.current1)
    },
    changeTabs2(item) {
      this.current2 = item
      this.getTimeDistributionReportedIncidents(this.current2)
    },
    selectInfo(item, i) {
      this.Cindex = i
    },
  },
}
</script>

<style lang="less" scoped>
.card {
  color: #fff;
}
.item_name {
  font-family: 'Helvetica';
  font-size: 26px;
}
.TitleTabs {
  position: absolute;
  right: 0px;
  top: 20px;
}
.card1 {
  width: 100%;
  height: 380px;
  // margin-top: 10px;
  .con {
    width: 100%;
    height: 300px;
    margin-top: 50px;
    .list {
      width: 100%;
      height: 235px;
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      .left {
        width: 781px;
        height: 235px;
        display: flex;
        justify-content: space-between;
        .l_img {
          width: 204px;
          height: 235px;
          background: url('../../assets/img/ldzf/l_portrait_bg.png') no-repeat
            center center;
          display: flex;
          align-items: center;
          // justify-content: center;
          padding-left: 6px;
          box-sizing: border-box;
        }
        .l_info {
          width: 581px;
          height: 235px;
          background: url('../../assets/img/ldzf/l_portrait_info.png') no-repeat
            center center;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
          align-content: space-around;
          padding-top: 20px;
          box-sizing: border-box;

          .item {
            width: 240px;
            height: 90px;
            .item_name {
              width: 100%;
              height: 34px;
              background-image: linear-gradient(to right, #4dd2ff20, #4dd2ff00);
              position: relative;
              padding-left: 10px;
              box-sizing: border-box;
              color: #bfebff;
              line-height: 34px;
              &::before {
                content: '';
                width: 2px;
                height: 34px;
                background: #4dd2ff;
                position: absolute;
                left: 0px;
                display: block;
              }
            }
            .item_value {
              height: 50px;
              font: 28px 'Helvetica';
              color: #fff;
              line-height: 50px;
            }
          }
        }
      }
      .right {
        width: 869px;
        height: 235px;
        display: flex;
        flex-wrap: wrap;
        align-content: space-between;
        justify-content: space-between;
        .item_card {
          width: 420px;
          height: 108px;
          background: url('../../assets/img/ldzf/r_info.png') no-repeat center
            center;
          display: flex;
          align-items: center;
          padding-left: 30px;
          box-sizing: border-box;
          .posi {
            width: 120px;
            height: 73px;
            background: url('../../assets/img/ldzf/name_bg.png') no-repeat
              center center;
            text-align: center;
            .name {
              font: 26px 'Helvetica';
              font-weight: bold;
            }
            .value {
              font: 22px 'Helvetica';
              color: #26ffff;
            }
          }
        }
        .item {
          width: 232px;
          height: 75px;
          margin-left: 15px;
          .item_name {
            width: 100%;
            height: 30px;
            background-image: linear-gradient(to right, #4dd2ff20, #4dd2ff00);
            position: relative;
            padding-left: 10px;
            box-sizing: border-box;
            color: #bfebff;
            line-height: 30px;
            font-size: 22px;
            &::before {
              content: '';
              width: 2px;
              height: 30px;
              background: #4dd2ff;
              position: absolute;
              left: 0px;
              display: block;
            }
          }
          .item_value {
            height: 40px;
            font: 26px 'Helvetica';
            color: #fff;
            line-height: 40px;
          }
        }
      }
    }
  }
}
.card2 {
  width: 100%;
  height: 830px;
  margin-top: 40px;
  .con {
    width: 100%;
    height: 740px;
    margin-top: 25px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .box {
      width: 100%;
      height: 400px;
      .info_card {
        width: 100%;
        height: 360px;
        border: 1px solid #bfebff;
        border-radius: 2px;
        margin-top: 10px;
        background-image: linear-gradient(to bottom, #0e2234, #0e223400);
        display: flex;
        .l_list {
          width: 310px;
          height: 360px;
          border: 1px solid #bfebff;
          background: #ffffff10;
          box-sizing: border-box;
          overflow: auto;
          &::-webkit-scrollbar {
            width: 5px;
            height: 5px;
          }
          .item {
            width: 280px;
            height: 70px;
            background: #1f2d36;
            border: 1px solid #ffffff30;
            box-sizing: border-box;
            display: flex;
            flex-wrap: wrap;
            margin: 15px auto;
            position: relative;
            .item_arrow {
              width: 0;
              height: 0;
              border-top: 10px solid transparent;
              border-right: 10px solid transparent;
              border-bottom: 10px solid transparent;
              border-left: 10px solid #efa210;
              position: absolute;
              right: -20px;
              top: 50%;
              transform: translate(0%, -50%);
            }
            .item_name {
              width: 119px;
              height: 35px;
              background: #1e9bf9;
              font-size: 22px;
              line-height: 35px;
              text-align: center;
            }
            .item_time {
              width: 159px;
              height: 35px;
              font: 22px 'Roboto';
              color: #bfebff;
              line-height: 35px;
              text-align: center;
              background: #243345;
              border: 1px solid #ffffff30;
              box-sizing: border-box;
            }
            .item_icon {
              width: 21px;
              height: 32px;
              display: flex;
              align-items: center;
              justify-content: center;
              margin-left: 15px;
              img {
                width: 21px;
                height: 21px;
              }
            }
            .item_value {
              width: 240px;
              height: 32px;
              line-height: 27px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              padding-left: 10px;
              box-sizing: border-box;
              font-size: 24px;
              font-family: 'Helvetica';
              color: #5fe6ff;
            }
          }
          .item_act {
            border: 1px solid #efa210;
          }
        }
        .r_info {
          width: calc(100% - 310px);
          height: 360px;
          padding: 10px 15px;
          box-sizing: border-box;
          .alarm {
            width: 100%;
            height: 36px;
            border: 1px solid #eb846d;
            background: #d5483b10;
            border-radius: 2px;
            display: flex;
            align-items: center;
            .icon {
              width: 26px;
              height: 22px;
              margin-left: 8px;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .time {
              width: 200px;
              color: #bfebff;
              font: 22px 'Helvetica';
              margin-left: 10px;
            }
            .txt {
              width: 800px;
              color: #ffffff;
              font: 22px 'Helvetica';
            }
          }
          .infobox {
            width: 100%;
            height: 295px;
            padding-top: 5px;
            display: flex;
            justify-content: space-between;
            .infobox_l {
              width: 747px;
              height: 295px;
              .infoList {
                width: 100%;
                height: 67px;
                display: flex;
                justify-content: space-between;
                margin-top: 10px;

                .item {
                  width: 134px;
                  height: 67px;
                  .item_name {
                    width: 100%;
                    height: 26px;
                    background-image: linear-gradient(
                      to right,
                      #4dd2ff20,
                      #4dd2ff00
                    );
                    position: relative;
                    padding-left: 10px;
                    box-sizing: border-box;
                    color: #bfebff;
                    line-height: 26px;
                    font-size: 22px;
                    font-family: 'PingFang SC';
                    &::before {
                      content: '';
                      width: 2px;
                      height: 26px;
                      background: #4dd2ff;
                      position: absolute;
                      left: 0px;
                      display: block;
                    }
                  }
                  .item_value {
                    height: 40px;
                    font: 24px 'Helvetica';
                    color: #fff;
                    line-height: 40px;
                  }
                }
                .item:nth-child(1) {
                  .item_value {
                    color: #ebcc46;
                  }
                }
                .item:nth-child(3) {
                  width: 310px;
                }
              }
              .EventDetails {
                width: 747px;
                height: 109px;
                border: 1px solid #dfddca30;
                background: #0e223470;
                padding: 5px 5px 5px 10px;
                box-sizing: border-box;
                margin-top: 10px;
                .title {
                  font: 22px 'Helvetica';
                  color: #fff;
                }
                .time {
                  font: 18px '微软雅黑';
                  color: #bfebff;
                }
                .txt {
                  font: 18px 'Helvetica';
                  color: #bfebff;
                  //超出两行省略号
                  text-overflow: -o-ellipsis-lastline;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  -webkit-line-clamp: 2;
                  line-clamp: 2;
                  -webkit-box-orient: vertical;
                }
              }
              .itemList {
                width: 100%;
                height: 92px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                margin-top: 10px;

                .item {
                  width: 100%;
                  height: 30px;
                  display: flex;
                  justify-content: space-between;
                  line-height: 30px;
                  .item_name {
                    width: 326px;
                    height: 30px;
                    background: #ffffff10;
                    font-size: 20px;
                    color: #bfebff;
                    padding-left: 10px;
                    box-sizing: border-box;
                  }
                  .item_value {
                    width: 418px;
                    height: 30px;
                    background: #ffffff05;
                    font-size: 20px;
                    color: #fff;
                    padding-left: 10px;
                    box-sizing: border-box;
                  }
                }
              }
            }
            .infobox_r {
              width: 542px;
              height: 295px;
              padding-top: 10px;
              box-sizing: border-box;
              .title {
                width: 280px;
                height: 26px;
                position: relative;
                padding-left: 8px;
                box-sizing: border-box;
                line-height: 26px;
                font-size: 22px;
                font-family: 'PingFang SC';
                color: #bfebff;
                white-space: nowrap;
                background-image: linear-gradient(
                  to right,
                  #4dd2ff20,
                  #4dd2ff00
                );
                ::before {
                  content: '';
                  width: 2px;
                  height: 26px;
                  background: #1f87ef;
                  position: absolute;
                  left: 0px;
                  top: 0px;
                }
              }
              .PhotosFromTheScene {
                width: 100%;
                height: 140px;

                .imgList {
                  width: 100%;
                  height: 264px;
                  height: 107px;
                  display: flex;
                  justify-content: space-between;
                  .imgBorder {
                    width: 264px;
                    height: 107px;
                    border: 1px solid #1f87ef;
                    padding: 1px;
                    box-sizing: border-box;
                    margin-top: 5px;
                    img {
                      width: 100%;
                      height: 100%;
                    }
                  }
                }
              }
              .CurrentEventList {
                margin-top: 15px;
                .itemList {
                  width: 100%;
                  height: 92px;
                  display: flex;
                  flex-wrap: wrap;
                  margin-top: 10px;
                  justify-content: space-between;
                  align-content: space-between;
                  .item {
                    width: 204px;
                    height: 30px;
                    display: flex;
                    // justify-content: space-between;
                    line-height: 30px;
                    background: #ffffff10;
                    padding: 0 5px;
                    box-sizing: border-box;
                    .item_name {
                      width: 150px;
                      height: 30px;
                      font-size: 20px;
                      color: #bfebff;
                      white-space: nowrap;
                    }
                    .value_act {
                      color: #26ffff !important;
                    }
                    .item_value {
                      width: 40px;
                      height: 30px;
                      font-size: 20px;
                      color: #fff;
                      box-sizing: border-box;
                      text-align: right;
                    }
                  }
                  .item:nth-child(2n) {
                    width: 335px;
                    .item_name {
                      width: 297px;
                    }
                    .item_value {
                      width: 40px;
                    }
                  }
                  .item:nth-child(6) {
                    justify-content: space-between;
                    .item_name {
                      width: 160px;
                    }
                    .item_value {
                      width: 70px;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    .box2 {
      width: 825px;
      height: 320px;
      position: relative;
      margin-top: 50px;
      .box_con {
        width: 100%;
      }
    }
    .box3 {
      width: 825px;
      height: 320px;
      margin-top: 50px;
      position: relative;

      .box_con {
        width: 100%;
      }
    }
  }
}
</style>
