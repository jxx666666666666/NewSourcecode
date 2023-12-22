<template>
  <div class="sjzxLeft">
    <OneTitle title="Energy Efficiency" width="100%" />
    <div class="capacity">
      <TwoTitle title="Capacity Usage State" />
      <div class="datalist">
        <div class="card" v-for="(item, index) in CapacityUsageStateData" :key="index">
          <div class="name">{{ item.name }}</div>
          <div class="value">
            <p>{{ item.value }}</p>
            <p>/{{ item.val }}</p>
          </div>
          <div class="rate">
            <div class="rateBar">
              <p :style="{ width: item.rate }"></p>
            </div>
            <div class="rateVal">{{ item.rate }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="plate2">
      <div class="resource">
        <TwoTitle title="Resource" />
        <TitleTabs class="resource_tabs" @changeTabs="changeTabs" :current="resourceCurrent"
          :tabs="['Power', 'Cooling', 'Space']" />
        <div class="contentData" v-if="resourceCurrent === 'Power'">
          <div class="chartLeft">
            <div class="chart">
              <YiBiaoPanTu :rawData="PowerData.ybpData" />
            </div>
            <div class="ybpData">
              <div class="value">{{ PowerData.ybpData.value }}%</div>
              <div class="name">{{ PowerData.ybpData.name }}</div>
            </div>
            <div class="kwList">
              <div class="card" v-for="(item, index) in PowerData.kwData" :key="index">
                <div class="rido"></div>
                <div class="name">{{ item.name }}</div>
                <div class="value">{{ item.value }}</div>
              </div>
            </div>
          </div>
          <div class="chartRight">
            <div class="textList">
              <div class="card" v-for="(item, index) in PowerData.textList" :key="index">
                <div class="rido" :style="{ backgroundColor: resourceColor[index] }"></div>
                <div class="name">{{ item.name }}</div>
              </div>
            </div>
            <div class="chart">
              <DuiTieZhuTuAndZheXian legLeft="200px" :rightShow="false" :legthWZ="['IT Used', 'IT Total']"
                :rowData="PowerData.chartData" />
            </div>
          </div>
        </div>
        <div class="contentData" v-else-if="resourceCurrent === 'Cooling'">
          <div class="chartLeft">
            <div class="chart">
              <YiBiaoPanTu :rawData="CoolingData.ybpData" />
            </div>
            <div class="ybpData">
              <div class="value">{{ CoolingData.ybpData.value }}%</div>
              <div class="name">{{ CoolingData.ybpData.name }}</div>
            </div>
            <div class="kwList">
              <div class="card" v-for="(item, index) in CoolingData.kwData" :key="index">
                <div class="rido"></div>
                <div class="name">{{ item.name }}</div>
                <div class="value">{{ item.value }}</div>
              </div>
            </div>
          </div>
          <div class="chartRight">
            <div class="textList">
              <div class="card" v-for="(item, index) in CoolingData.textList" :key="index">
                <div class="rido" :style="{ backgroundColor: resourceColor[index] }"></div>
                <div class="name">{{ item.name }}</div>
              </div>
            </div>
            <div class="chart">
              <DuiTieZhuTuAndZheXian legLeft="280px" :rightShow="false" :legthWZ="['Used', 'Total']"
                :rowData="CoolingData.chartData" />
            </div>
          </div>
        </div>
        <div class="contentData" v-else>
          <div class="chartLeft">
            <div class="chart">
              <YiBiaoPanTu :rawData="SpaceData.ybpData" />
            </div>
            <div class="ybpData">
              <div class="value">{{ SpaceData.ybpData.value }}%</div>
              <div class="name">{{ SpaceData.ybpData.name }}</div>
            </div>
            <div class="kwList">
              <div class="card" v-for="(item, index) in SpaceData.kwData" :key="index">
                <div class="rido"></div>
                <div class="name">{{ item.name }}</div>
                <div class="value">{{ item.value }}</div>
              </div>
            </div>
          </div>
          <div class="chartRight">
            <div class="textList">
              <div class="card" v-for="(item, index) in SpaceData.textList" :key="index">
                <div class="rido" :style="{ backgroundColor: resourceColor[index] }"></div>
                <div class="name">{{ item.name }}</div>
              </div>
            </div>
            <div class="chart">
              <DuiTieZhuTuAndZheXian legLeft="280px" :rightShow="false" :legthWZ="['Used', 'Total']"
                :rowData="SpaceData.chartData" />
            </div>
          </div>
        </div>
      </div>
      <div class="energy">
        <TwoTitle title="Energy" />
        <HighLight :val="'Energy'">
          <div class="chart">
            <div class="chartHeader">
              <div class="name">{{ EnergyData.title }}</div>
              <div class="value">
                <p>{{ EnergyData.value }}</p>
                <p>{{ EnergyData.unit }}</p>
              </div>
            </div>
            <div class="chartContent">
              <div class="leftDatas">
                <div class="name">{{ EnergyData.name }}</div>
                <div class="timer">{{ EnergyData.timer }}</div>
                <BountyText class="val" :number="EnergyData.val"></BountyText>
              </div>
              <div class="rightDatas">
                <div class="card" v-for="(item, index) in EnergyData.dataList" :key="index">
                  <div class="name">{{ item.name }}</div>
                  <div class="value">{{ item.value }}</div>
                </div>
              </div>
            </div>
          </div>
        </HighLight>
      </div>
    </div>
    <OneTitle title="Asset equipment" style="margin-top: 50px" width="100%" />
    <div class="plate3">
      <div class="device">
        <twoTitleTab title="IT Device Status" title2="Trend of Total Number of IT..." :current="deviceCurrent"
          @changeTabs="deviceChange" />
        <div class="chart" v-if="deviceCurrent === 'IT Device Status'">
          <div class="card" v-for="(item, index) in DeviceStatusData" :key="index">
            <div class="name">{{ item.name }}</div>
            <div class="value">{{ item.value }}</div>
          </div>
        </div>
        <div class="charts" v-else>
          <TwoBarAndLine :rowData="TotalNumberData" />
        </div>
      </div>
      <div class="facility">
        <twoTitleTab title="IT Device" title2="Facility" :current="facilityCurrent" @changeTabs="facilityChange" />
        <div class="chart" v-if="facilityCurrent === 'IT Device'">
          <ChartLoop :height="'240px'" :width="'240px'" :fonts="'60'" :fontText="'24'" :radius="['90%', '80%']"
            :flexLegends="0" :legends="deviceColor" :rowData="ITDeviceData" />
          <div class="dataList">
            <div class="card" v-for="(item, index) in ITDeviceData" :key="index">
              <div class="rido" :style="{ backgroundColor: deviceColor[index] }"></div>
              <div class="name">{{ item.legend }}</div>
              <div class="rateLength">
                <p :style="{
                  width: item.rate,
                  background: `linear-gradient(to right,${deviceColor[index]}00,${deviceColor[index]})`,
                }"></p>
              </div>
              <div class="rate" :style="{ color: deviceColor[index] }">
                {{ item.rate }}
              </div>
              <div class="value">{{ item.measure }}</div>
            </div>
          </div>
        </div>
        <div class="chart" v-else>
          <ChartLoop :height="'240px'" :width="'240px'" :fonts="'60'" :fontText="'24'" :radius="['90%', '80%']"
            :flexLegends="0" :legends="facilityColor" :rowData="FacilityData" />
          <div class="dataList">
            <div class="card" v-for="(item, index) in FacilityData" :key="index">
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
  </div>
</template>

<script>
import OneTitle from "../common/OneTitle.vue";
import TwoTitle from "../common/twoTitle.vue";
import twoTitleTab from "../common/twoTitleTab.vue";
import TitleTabs from "../common/TitleTabs.vue";
import YiBiaoPanTu from "../charts/YibiaopanTu.vue";
import DuiTieZhuTuAndZheXian from "../charts/DuiTieZhuTuAndZheXian.vue";
import TwoBarAndLine from "../charts/BarLine/TwoBarAndLine.vue";
import ChartLoop from "../charts/ChartLoop/ChartLoop.vue";
import BountyText from "../common/BountyText.vue";
import Time from "@/utils/common/time";
import HighLight from "../common/HighLight.vue";
export default {
  components: {
    OneTitle,
    TwoTitle,
    TitleTabs,
    YiBiaoPanTu,
    DuiTieZhuTuAndZheXian,
    twoTitleTab,
    TwoBarAndLine,
    ChartLoop,
    BountyText,
    HighLight
  },
  data() {
    return {
      deviceColor: ["#EECC46", "#00D96D", "#26C9FF", "#265CFF"],
      facilityColor: ["#EECC46", "#FF9326", "#FF9999", "#00FF80"],
      deviceCurrent: "IT Device Status",
      facilityCurrent: "IT Device",
      resourceColor: ["#16B4F8", "#26FF93", "#FFD24D", "#FF7373"],
      resourceCurrent: "Power",
      // chartColor: ["#16B4F8", "#CCCCCC"],
      // Capacity Usage State
      CapacityUsageStateData: [
        {
          name: "Rack Used",
          value: 298,
          val: 148,
          rate: "52%",
        },
        {
          name: "U Space Used (U)",
          value: 643,
          val: 6140,
          rate: "10.47%",
        },
        {
          name: "Power Capacity Used (Rated,kW)",
          value: 146.35,
          val: 920,
          rate: "15.91%",
        },
        {
          name: "Power Capacity Used (Measured,kW)",
          value: 76.1,
          val: 834,
          rate: "9.12%",
        },
        {
          name: "Cooling Capacity Used (kw)",
          value: 146.35,
          val: 1480,
          rate: "9.89%",
        },
        {
          name: "Network Ports Used",
          value: 0,
          val: 85,
          rate: "15.00%",
        },
      ],
      // Power
      PowerData: {
        ybpData: {
          name: "IT Load Rate",
          value: 18,
        },
        kwData: [
          {
            name: "IT Used(KW)",
            value: "87.20",
          },
          {
            name: "IT Total(KW)",
            value: "920.00",
          },
        ],
        textList: [
          {
            name: "Low Load(<60%)",
          },
          {
            name: "Medium Load(>=60%)",
          },
          {
            name: "High Load(>=80%)",
          },
          {
            name: "Over Load(>100%)",
          },
        ],
        chartData: [
          {
            name: "IT Used",
            value: 169,
            item: 676,
            // val: 20,
          },
          {
            name: "XXXXX",
            value: 238,
            item: 557,
            // val: 45,
          },
          {
            name: "Ground Floor",
            value: 50,
            item: 487,
            // val: 30,
          },
        ],
      },
      // Cooling
      CoolingData: {
        ybpData: {
          name: "Usage Rate",
          value: 9.89,
        },
        kwData: [
          {
            name: "Used(KW)",
            value: "146.35",
          },
          {
            name: "Total(KW)",
            value: "1480.00",
          },
        ],
        textList: [
          {
            name: "Low Load(<60%)",
          },
          {
            name: "Medium Load(>=60%)",
          },
          {
            name: "High Load(>=80%)",
          },
          {
            name: "Over Load(>100%)",
          },
        ],
        chartData: [
          {
            name: "First Floor",
            value: 169,
            item: 676,
          },
          {
            name: "XXXXX",
            value: 238,
            item: 557,
          },
          {
            name: "Ground Floor",
            value: 60,
            item: 487,
          },
        ],
      },
      // Space
      SpaceData: {
        ybpData: {
          name: "Usage Rate",
          value: 10.47,
        },
        kwData: [
          {
            name: "Used(U)",
            value: "643",
          },
          {
            name: "Total(U)",
            value: "6140",
          },
        ],
        textList: [
          {
            name: "Low Load(<60%)",
          },
          {
            name: "Medium Load(>=60%)",
          },
          {
            name: "High Load(>=80%)",
          },
        ],
        chartData: [
          {
            name: "First Floor",
            value: 169,
            item: 676,
          },
          {
            name: "XXXXX",
            value: 238,
            item: 557,
          },
          {
            name: "Ground Floor",
            value: 60,
            item: 487,
          },
        ],
      },
      // Energy
      EnergyData: {
        title: "Total Energy Consumption",
        value: "1.65M",
        unit: "kwh",
        name: "Hourly PUE",
        timer: "2023-11-28",
        val: "1.39",
        dataList: [
          {
            name: "IT (Kwh)",
            value: "95.34",
          },
          {
            name: "Cooling (Kwh)",
            value: "37.50",
          },
          {
            name: "Total (Kwh)",
            value: "132.84",
          },
        ],
      },
      //  IT Device Status
      DeviceStatusData: [
        {
          name: "On Rack",
          value: 230,
        },
        {
          name: "In Stock",
          value: 0,
        },
        {
          name: "Plan To Change",
          value: 0,
        },
      ],
      // Trend of Total Number of IT...
      TotalNumberData: [
        {
          name: "2022-01",
          value: "144",
          item: "120",
          val: "360",
        },
        {
          name: "2022-02",
          value: "124",
          item: "100",
          val: "320",
        },
        {
          name: "2022-03",
          value: "134",
          item: "110",
          val: "380",
        },
        {
          name: "2022-04",
          value: "144",
          item: "120",
          val: "360",
        },
        {
          name: "2022-05",
          value: "144",
          item: "120",
          val: "380",
        },
        {
          name: "2022-06",
          value: "144",
          item: "120",
          val: "370",
        },
      ],
      // IT Device
      ITDeviceData: [
        { legend: "Server", measure: 210, rate: "45%" },
        { legend: "Network", measure: 105, rate: "32%" },
        { legend: "Storage", measure: 99, rate: "19%" },
        { legend: "Others", measure: 107, rate: "17%" },
      ],
      // Facility
      FacilityData: [
        { legend: "Server", measure: 46, rate: "19%" },
        { legend: "Network", measure: 506, rate: "43%" },
        { legend: "Storage", measure: 7, rate: "8%" },
        { legend: "Others", measure: 152, rate: "25%" },
      ],
    };
  },
  created() {
    this.getCapacityUsageStateData();
    this.getPowerData();
    this.getCoolingData();
    this.getSpaceData();
    this.getEnergyData();
    this.getDeviceStatusData();
    this.getTotalNumberData();
    this.getITDeviceData();
    this.getFacilityData();
  },
  methods: {
    changeTabs(item) {
      this.resourceCurrent = item;
    },
    deviceChange(item) {
      this.deviceCurrent = item;
    },
    facilityChange(item) {
      this.facilityCurrent = item;
    },
    // Capacity Usage State
    async getCapacityUsageStateData() {
      if (window.streamingConfig.debugger.PDC) {
        this.CapacityUsageStateData =
          await this.$http.SJZXApi.getCapacityUsageStateData();
      } else {
        let code = 'NE=33554444';
        //  
        let res1 = await this.$http.SJZXApi.getCapacityStatistics(JSON.stringify({ "domainDn": code, "pageIndex": 1, "pageSize": 4000 }));
        // let num = 840;
        if (res1 && res1.data && res1.data.length > 0) {
          // num = 0;
          let racks = 0;
          let usedRack = 0;
          res1.data.forEach(item => {
            racks += item.racks;
            usedRack += item.usedRack;
            // if (item.currentPower != '-') {
            //   num += Number(item.powers)
            // }
          })
          this.CapacityUsageStateData[0].value = usedRack;
          this.CapacityUsageStateData[0].val = racks;
          this.CapacityUsageStateData[0].rate = (usedRack * 100 / racks).toFixed(2) + '%';
        }
        let res2 = await this.$http.SJZXApi.getCapacityData(JSON.stringify({ "dn": code, "pageIndex": 1, "pageSize": 4000 }));
        if (res2 && res2.data && res2.data.length > 0) {
          res2.data.forEach(item => {
            switch (item.capType) {
              case 'space':
                this.CapacityUsageStateData[1].value = item.useNum;
                this.CapacityUsageStateData[1].val = item.totalNum;
                this.CapacityUsageStateData[1].rate = (Number(item.useNum) * 100 / Number(item.totalNum)).toFixed(2) + '%';
                break;
              case 'power':
                this.CapacityUsageStateData[2].value = Number(item.useNum).toFixed(2);
                this.CapacityUsageStateData[2].val = item.totalNum;
                this.CapacityUsageStateData[2].rate = (Number(item.useNum) * 100 / Number(item.totalNum)).toFixed(2) + '%';
                break;
              case 'currentPower':
                this.CapacityUsageStateData[3].value = Number(item.useNum).toFixed(2);
                this.CapacityUsageStateData[3].val = item.totalNum;
                this.CapacityUsageStateData[3].rate = (Number(item.useNum) * 100 / Number(item.totalNum)).toFixed(2) + '%';
                break;
              case 'cooling':
                this.CapacityUsageStateData[4].value = Number(item.useNum).toFixed(2);
                this.CapacityUsageStateData[4].val = item.totalNum;
                this.CapacityUsageStateData[4].rate = (Number(item.useNum) * 100 / Number(item.totalNum)).toFixed(2) + '%';
                break;
              case 'network':
                this.CapacityUsageStateData[5].value = item.useNum;
                this.CapacityUsageStateData[5].val = item.totalNum;
                this.CapacityUsageStateData[5].rate = (Number(item.useNum) * 100 / Number(item.totalNum)).toFixed(2) + '%';
                break;
            }
          })
        }
        // let typeData = ['power', 'space', 'cooling']
        // for (var i = 0; i < 3; i++) {
        //   let res = await this.$http.SJZXApi.getCapacitySpcn({
        //     "domainDns": [code],
        //     "type": typeData[i]
        //   });
        //   if (res && res.length > 0) {
        //     let temp = res[0]
        //     switch (typeData[i]) {
        //       case 'power':
        //         this.CapacityUsageStateData[2].value = temp.used.toFixed(2);
        //         this.CapacityUsageStateData[2].val = temp.total.toFixed(0);
        //         this.CapacityUsageStateData[2].rate = (temp.used * 100 / temp.total).toFixed(2) + '%';
        //         this.CapacityUsageStateData[3].value = temp.currentPower.toFixed(2);
        //         this.CapacityUsageStateData[3].val = num.toFixed(0);
        //         this.CapacityUsageStateData[3].rate = (temp.currentPower * 100 / num).toFixed(2) + '%';
        //         break;
        //       case 'space':
        //         this.CapacityUsageStateData[1].value = temp.used.toFixed(0);
        //         this.CapacityUsageStateData[1].val = temp.total.toFixed(0);
        //         this.CapacityUsageStateData[1].rate = (temp.used * 100 / temp.total).toFixed(2) + '%';
        //         break;
        //       case 'cooling':
        //         this.CapacityUsageStateData[4].value = temp.used.toFixed(2);
        //         this.CapacityUsageStateData[4].val = temp.total.toFixed(0);
        //         this.CapacityUsageStateData[4].rate = (temp.used * 100 / temp.total).toFixed(2) + '%';
        //         break;
        //     }
        //   }
        // }
      }
    },
    // Power
    async getPowerData() {
      if (window.streamingConfig.debugger.PDC) {
        this.PowerData = await this.$http.SJZXApi.getPowerData();
      } else {
        let code = 'NE=33554444';
        let res = await this.$http.SJZXApi.getMoTree(JSON.stringify({
          pageIndex: 1,
          pageSize: 4000
        }));
        let floorDns = [];
        if (res && res.data && res.data.length > 0) {
          res.data.forEach(item => {
            if (item.typeName == 'Floor' && item.parentDn == code) {
              floorDns.push({
                name: item.name,
                dn: item.dn
              })
            }
          })
        }
        if (floorDns.length > 0) {
          var itTotal = 0;
          var itUsed = 0;
          var coolingTotal = 0;
          var coolingUsed = 0;
          var spaceTotal = 0;
          var spaceUsed = 0;
          var itData = [];
          var spaceData = [];
          var coolingData = [];
          for (var i = 0; i < floorDns.length - 1; i++) {
            let res2 = await this.$http.SJZXApi.getCapacityData(JSON.stringify({ "dn": floorDns[i].dn, "pageIndex": 1, "pageSize": 4000 }));

            if (res2 && res2.data && res2.data.length > 0) {
              itData.push({
                name: floorDns[i].name,
                value: 0,
                item: 0,
              });
              res2.data.forEach(item => {
                if (item.totalNum && Number(item.totalNum) > 0) {
                  switch (item.capType) {
                    case 'space':
                      spaceData.push({
                        name: floorDns[i].name,
                        value: item.useNum,
                        item: item.totalNum,
                      });
                      spaceTotal += Number(item.totalNum);
                      spaceUsed += Number(item.useNum);
                      break;
                    case 'currentPower':
                      itData[itData.length - 1].value = item.useNum;
                      // itTotal += Number(item.totalNum);
                      itUsed += Number(item.useNum);
                      break;
                    case 'power':
                      itData[itData.length - 1].item = item.totalNum;
                      itTotal += Number(item.totalNum);
                      // itUsed += Number(item.useNum);
                      break;
                    case 'cooling':
                      coolingData.push({
                        name: floorDns[i].name,
                        value: item.useNum,
                        item: item.totalNum,
                      });
                      coolingTotal += Number(item.totalNum);
                      coolingUsed += Number(item.useNum);
                      break;
                  }
                }

              })

            }
          }
          this.PowerData.ybpData.value = (itUsed * 100 / itTotal).toFixed(1)
          this.CoolingData.ybpData.value = (coolingUsed * 100 / coolingTotal).toFixed(1)
          this.SpaceData.ybpData.value = (spaceUsed * 100 / spaceTotal).toFixed(1)
          this.PowerData.kwData[0].value = itUsed.toFixed(2)
          this.PowerData.kwData[1].value = itTotal.toFixed(2)
          this.CoolingData.kwData[0].value = coolingUsed.toFixed(2)
          this.CoolingData.kwData[1].value = coolingTotal.toFixed(2)
          this.SpaceData.kwData[0].value = spaceUsed.toFixed(2)
          this.SpaceData.kwData[1].value = spaceTotal.toFixed(2)
          itData.sort((a, b) => {
            return b.item - a.item;
          })
          coolingData.sort((a, b) => {
            return b.item - a.item;
          })
          spaceData.sort((a, b) => {
            return b.item - a.item;
          })
          this.PowerData.chartData = itData;
          this.CoolingData.chartData = coolingData;
          this.SpaceData.chartData = spaceData;
        }
      }
    },

    // Cooling
    async getCoolingData() {
      this.CoolingData = await this.$http.SJZXApi.getCoolingData();
    },
    // Space
    async getSpaceData() {
      this.SpaceData = await this.$http.SJZXApi.getSpaceData();
    },
    // Energy
    async getEnergyData() {
      if (window.streamingConfig.debugger.PDC) {
        this.EnergyData = await this.$http.SJZXApi.getEnergyData();
      } else {
        let dateStr = Time.format("yyyy-MM-dd", new Date());
        let dateStr1 = Time.format("yyyy-MM-dd HH", new Date());
        let code = "NE=33554444";
        let data = await this.$http.SJZXApi.getEnergyAnalysis(
          {
            "dns": [code],
            "signals": ["PUE", "TOTAL_VAL", "TOTAL_INC", "IT_VAL", "IT_INC", "COOLING_VAL", "COOLING_INC", "POWER", "CURRENT"],
            "period": "PERIOD_1_HOUR",
            "startTime": dateStr + " 00:00:00",
            "endTime": dateStr1 + ":00:00"
          }
        );
        if (data && data[code] && data[code].length > 0) {
          let temp = data[code][data[code].length - 1]
          this.EnergyData.timer = Time.format("yyyy-MM-dd", new Date());
          this.EnergyData.val = temp['PUE'];
          this.EnergyData.value = (Number(temp['TOTAL_VAL']) / 1000000).toFixed(2) + 'M'
          this.EnergyData.dataList[0].value = temp['IT_INC'];
          this.EnergyData.dataList[1].value = temp['COOLING_INC'];
          this.EnergyData.dataList[2].value = temp['TOTAL_INC'];
        }
      }

    },
    // IT Device Status
    async getDeviceStatusData() {
      if (window.streamingConfig.debugger.PDC) {
        this.DeviceStatusData = await this.$http.SJZXApi.getDeviceStatusData();
      } else {
        let dataStr = ['IT1', 'IT2', 'IT3'];
        for (var i = 0; i < 3; i++) {
          let res = await this.$http.SJZXApi.getITDevice(JSON.stringify({ "reportType": "DEVICE_NUM", "param": "deviceType", "type": dataStr[i], "domainDn": "NE=33554444" }));
          if (res && res.data && res.data.length > 0) {
            let num = 0;
            res.data.forEach(item => {
              num += Number(item.value);
            })
            switch (dataStr[i]) {
              case 'IT1':
                this.DeviceStatusData[0].value = num;
                break;
              case 'IT2':
                this.DeviceStatusData[1].value = num;
                break;
              case 'IT3':
                this.DeviceStatusData[2].value = num;
                break;
            }
          }
        }
      }
    },
    // Trend of Total Number of IT...
    async getTotalNumberData() {
      this.TotalNumberData = await this.$http.SJZXApi.getTotalNumberData();
    },
    // IT Device
    async getITDeviceData() {
      if (window.streamingConfig.debugger.PDC) {
        this.ITDeviceData = await this.$http.SJZXApi.getITDeviceData();
      } else {
        let res = await this.$http.SJZXApi.getITDevice(JSON.stringify({ "reportType": "DEVICE_NUM", "param": "deviceType", "type": "IT0", "domainDn": "NE=33554444" }));
        if (res && res.data && res.data.length > 0) {
          let data = [];
          let num = 0;
          res.data.forEach(item => {
            data.push({ legend: item.key, measure: Number(item.value), rate: "0%" });
            num += Number(item.value);
          })
          data.forEach(item => {
            item.rate = (Number(item.measure) * 100 / num).toFixed(1) + '%'
          })
          this.ITDeviceData = data;
        }
      }
    },
    // Facility
    async getFacilityData() {
      if (window.streamingConfig.debugger.PDC) {
        this.FacilityData = await this.$http.SJZXApi.getFacilityData();
      } else {
        let res = await this.$http.SJZXApi.getITDevice(JSON.stringify({ "reportType": "DEVICE_NUM", "param": "deviceType", "type": "Infrastructure", "domainDn": "NE=33554444" }));
        if (res && res.data && res.data.length > 0) {
          let data = [];
          let num = 0;
          res.data.forEach(item => {
            data.push({ legend: item.key, measure: Number(item.value), rate: "0%" });
            num += Number(item.value);
          })
          data.forEach(item => {
            item.rate = (Number(item.measure) * 100 / num).toFixed(1) + '%'
          })
          this.FacilityData = data;
        }
      }
    },
  },
  beforeDestroy() {
    this.$http.SJZXApi.logoutNetEco();
  }
};
</script>

<style scoped lang="less">
.sjzxLeft {
  color: #ffffff;
  height: 100%;

  .capacity {
    margin-top: 40px;

    .datalist {
      margin-top: 24px;
      display: flex;
      justify-content: space-between;
      height: 166px;

      .card {
        width: 249px;
        height: 100%;
        background: url("../../assets/img/ShuJuZhongXin/card1.png") no-repeat;
        background-size: 100% 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

        .name {
          width: 225px;
          height: 55px;
          display: flex;
          align-items: center;
          justify-content: center;
          font: 24px "Helvetica";
          color: #bfebff;
          text-align: center;
        }

        .value {
          margin-top: 5px;
          display: flex;
          align-items: baseline;

          p {
            &:nth-child(1) {
              font: 48px "Roboto";
            }

            &:nth-child(2) {
              font: 22px "Roboto";
              color: #bfebff;
            }
          }
        }

        .rate {
          margin-top: 8px;

          display: flex;
          align-items: center;

          .rateBar {
            width: 150px;
            height: 10px;
            background-color: rgba(56, 108, 160, 0.5);

            p {
              height: 100%;
              background-color: #14d4f4;
            }
          }

          .rateVal {
            width: 80px;
            line-height: 24px;
            text-align: right;
            font: 24px "Roboto";
            color: #13d3f3;
          }
        }

        &:nth-child(1) {
          .value {
            p {
              &:nth-child(1) {
                background: linear-gradient(to bottom, #fffae9, #ffd24d);
                -webkit-background-clip: text;
                color: transparent;
              }
            }
          }

          .rate {
            .rateBar {
              p {
                background-color: #ffdb71;
              }
            }

            .rateVal {
              color: #ffdb71;
            }
          }
        }
      }
    }
  }

  .plate2 {
    margin-top: 45px;
    display: flex;
    justify-content: space-between;

    >div {
      width: 800px;
    }

    .resource {
      position: relative;

      .resource_tabs {
        position: absolute;
        top: -10px;
        right: 0;
      }

      .contentData {
        width: 100%;
        margin-top: 35px;
        display: flex;
        justify-content: space-between;

        .chartLeft {
          display: flex;
          flex-direction: column;
          align-items: center;

          .chart {
            width: 284px;
            display: flex;
            justify-content: center;
            background: url("../../assets/img/ShuJuZhongXin/YiBiaoPan_bg.png") no-repeat;
            background-size: 216px 179px;
            background-position: center top;
          }

          .ybpData {
            width: 284px;
            position: absolute;
            left: 0;
            display: flex;
            flex-direction: column;
            align-items: center;

            .value {
              margin-top: 78px;
              font: 44px "Helvetica";
              font-weight: bold;
            }

            .name {
              margin-top: 50px;
              font: 22px "Helvetica";
            }
          }

          .kwList {
            margin-top: 15px;

            .card {
              display: flex;
              align-items: center;

              .rido {
                width: 14px;
                height: 14px;
                background-color: #cccccc;
              }

              .name {
                margin-left: 10px;
                //   width: 120px;
                font: 22px "Helvetica";
              }

              .value {
                margin-left: 18px;
                font: 38px "Roboto";
                color: #ced6d8;
              }

              &:nth-child(1) {
                .rido {
                  background-color: #16b4f8;
                }

                .value {
                  color: #16b4f8;
                }
              }

              &:nth-child(2) {
                margin-top: 18px;
              }
            }
          }
        }

        .chartRight {
          width: 485px;

          .textList {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;

            .card {
              width: 220px;
              display: flex;
              align-items: center;

              &:nth-child(n + 3) {
                margin-top: 12px;
              }

              .rido {
                width: 8px;
                height: 8px;
                border-radius: 50%;
              }

              .name {
                margin-left: 8px;
                font: 20px "Helvetica";
                color: #bfebff;
              }
            }
          }

          .chart {
            margin-top: 10px;
            width: 100%;
            height: 260px;
          }
        }
      }
    }

    .energy {
      width: 824px;

      .chart {
        margin-top: 26px;
        width: 824px;
        height: 332px;
        background: url("../../assets/img/ShuJuZhongXin/energy_bg.png") no-repeat;
        background-size: 824px 332px;

        .chartHeader {
          height: 82px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-sizing: border-box;
          padding: 0 55px 0 38px;

          .name {
            font: 32px "Helvetica";
          }

          .value {
            display: flex;
            align-items: baseline;

            p {
              &:nth-child(1) {
                font: 64px "Roboto";
                background: linear-gradient(to bottom, #fffae9, #ffd24d);
                -webkit-background-clip: text;
                color: transparent;
              }

              &:nth-child(2) {
                margin-left: 18px;
                font: 20px "Helvetica";
                color: #72dcff;
              }
            }
          }
        }

        .chartContent {
          display: flex;
          justify-content: space-between;

          .leftDatas {
            width: 310px;
            display: flex;
            flex-direction: column;
            align-items: center;

            .name {
              margin-top: 50px;
              font: 26px "Helvetica";
            }

            .timer {
              margin-top: 8px;
              font: 20px "Helvetica";
              color: #72dcff;
            }

            .val {
              margin-top: 12px;
              font: 70px "Roboto";
            }
          }

          .rightDatas {
            margin: 38px 5px 0 0;
            width: 432px;
            height: 206px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .card {
              height: 60px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              box-sizing: border-box;
              padding: 0 40px 0 25px;

              .name {
                font: 26px "Helvetica";
                color: #bfebff;
                text-shadow: 0 3px 4px #00000075;
              }

              .value {
                font: 38px "Roboto";
              }
            }
          }
        }
      }
    }
  }

  .plate3 {
    margin-top: 40px;
    display: flex;
    justify-content: space-between;

    >div {
      width: 800px;
    }

    .device {
      .chart {
        margin-top: 20px;
        height: 294px;
        background: url("../../assets/img/ShuJuZhongXin/equipment_bg.png") no-repeat;
        background-size: 801px 294px;
        background-position: center center;
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 0 40px;

        .card {
          width: 209px;
          display: flex;
          flex-direction: column;
          align-items: center;

          .name {
            margin-top: 58px;
            height: 38px;
            line-height: 38px;
            font: 26px "Helvetica";
          }

          .value {
            margin-top: 20px;
            font: 72px "Voltage";
            color: #26ffff;
          }
        }
      }

      .charts {
        margin-top: 20px;
        height: 294px;
      }
    }

    .facility {
      .chart {
        margin-top: 20px;
        height: 294px;
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
}
</style>
