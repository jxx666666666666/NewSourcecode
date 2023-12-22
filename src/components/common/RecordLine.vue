<template>
  <div class="RecordLine">
    <div class="lujingliebiao" :key="lujingindex">
      <!-- <div class="lujingitem" v-for="(item, index) in alllujingdata" :key="index">
        <div class="pathname" @click="pathclick(item, index)">line{{ index }}</div>
        <div class="deletepath" @click="deletepathdata(item, index)">delete</div>
      </div>-->
      <TableTwo
        class="lujingitem"
        :tableWidth="'574px'"
        :tableItemHeight="'45px'"
        :tableHeight="'408px'"
        :isbool="true"
        :startsScroll="6"
        :bodyListData="Plandata"
        :headerListData="planHeader"
        @hxtableclick="PlanClick"
        ref="MYTable"
      />
    </div>
    <!-- <button @click="statejilu">startRecord</button>
    <button @click="endjilu">endRecord</button>-->
    <div class="manyou">
      <div class="add">
        <div class="addName">Add</div>
        <div :class="AddStart ? 'Add' : 'Over'" @click="AddClick"></div>
      </div>
      <div class="delete">
        <div class="deleteName">Delete</div>
        <div class="Del" @click="DelClick"></div>
      </div>
      <div class="start">
        <div class="startName">Stop/Start</div>
        <div :class="Start ? 'Start' : 'Stop'" @click="StartClick"></div>
      </div>
      <!-- <div class="Up" @click="UpClick"></div>
      <div class="Down" @click="DownClick"></div>-->

      <!-- <div class="Restart" @click="RestartClick"></div> -->
    </div>
  </div>
</template>

<script>
// Introducing Table Components
import TableTwo from "../charts/Table/lineTable.vue";
import { CommonClick } from "../../utils/GisManagers/UeActionCallback.js";
import PathMark from "../../utils/GisManagers/PathMark";
import UEapi from "../../utils/GisManagers/UEapi";

export default {
  name: "RecordLine",
  components: {
    TableTwo,
  },
  computed: {},
  data() {
    return {
      lujingindex: 0,
      alllujingdata: [],
      datalistarr: [],
      Plandata: [],
      indexadd: 1,
      AddStart: true,
      Start: true,
      xuanzhong: true,
      lineindex: null,
      continue: true,
      planHeader: [
        { name: "Number", width: "30%" },
        { name: "Route Name", width: "35%" },
        { name: "Check", width: "35%" },
      ],
      poiTempList: [],
      isMark: false,
    };
  },
  created() {},
  mounted() {
    // this.alllujingdata = JSON.parse(localStorage.getItem("datalist"));
    //  // Store data locally
    this.KaiShi();
  },
  methods: {
    KaiShi() {
      let dataset = JSON.parse(localStorage.getItem("datalist"));
      let point = [];
      if (dataset != null) {
        if (dataset.length > 0) {
          this.Plandata = dataset;
        }
      }
    },
    //add
    AddClick() {
      //Determine whether to add path true, add false, and end counting
      if (this.AddStart) {
        //Start managing
        this.AddStart = false;
        this.statejilu();

        //this.addLandMar();
      } else {
        //   Bundle point generation route
        this.AddStart = true;
        PathMark.finishPath();
      }
    },
    //delete
    DelClick() {
      if (this.lineindex != null) {
        this.deletepathdata(this.lineindex);
      }
    },
    //Previous
    UpClick() {},
    //next
    DownClick() {},
    //Start Pause
    StartClick() {
      //Determine if true has been played, start false, pause
      if (this.lineindex != null) {
        if (this.Start) {
          this.deletepath();
          let newpath = this.Plandata[this.lineindex].path;
          let newid = this.Plandata[this.lineindex].id;
          let pathlist = [];
          newpath.forEach((ele, i) => {
            pathlist.push({
              coord: ele,
              coordZ: 0,
            });
          });
          this.addPath(pathlist, newid, true);
          this.Start = false;
          this.continue = true;
        } else {
          this.setCameraPathingState("pause");
          this.Start = true;
          this.continue = false;
          this.deletepath();
        }
      }
    },
    //replay
    RestartClick() {
      this.deletepath();
      let newpath = this.Plandata[this.lineindex].path;
      let newid = this.Plandata[this.lineindex].id;
      let pathlist = [];
      newpath.forEach((ele, i) => {
        pathlist.push({
          coord: ele,
          coordZ: 0,
        });
      });
      this.addPath(pathlist, newid, true);
      this.Start = false;
    },
    // Click on the left table
    PlanClick(item, index) {
      this.lineindex = index;
      this.Start = true;
      this.continue = true;
      // this.$refs.MYTable.clearHigh();
      // this.$refs.AdvertisementStatistics.clearHigh();
      // this.$refs.lampDataStatistics.clearHigh();
      // this.$refs.rightTable.clearHigh();
      // this.$store.commit('setHighLight', 'planLamp');
    },
    //Set the state of the lens following the path
    setCameraPathingState(state) {
      appInstance.uniCall(
        "setCameraPathingState",
        { state: state },
        (result) => {
          console.log(result);
        }
      );
    },
    // Click to delete the current route record
    deletepathdata(index) {
      this.Plandata.splice(index, 1);
      this.lujingindex++;
      localStorage.setItem("datalist", JSON.stringify(this.Plandata));
    },
    // Click on the path to roam
    pathclick(item, index, flag = true) {
      this.deletepath();
      let pathlist = [];
      item.path.forEach((ele, i) => {
        pathlist.push({
          coord: ele,
          coordZ: 0,
        });
      });
      this.addPath(pathlist, index, flag);
      console.log(item, index);
    },
    // Delete Scatter Layer Objects When Drawing Paths When Stopping
    deleteLandMark() {
      let jsonData = {
        id: "landmarkLayerAdd",
        overlayType: "landmarkLayer",
      };

      appInstance.uniCall("removeOverlay", jsonData, (result) => {
        console.log(result);
      });
    },
    // Add Scatter
    addLandMar() {
      let jsonData = {
        id: "landmarkLayerAdd",
        name: "Landmark layer",
        coordType: 0,
        coordTypeZ: 0,
        autoScale: false,
        visible: true,
        legends: [
          {
            name: "Path Point",
            color: "#73FFFF",
            iconName: "custom-add",
            iconScale: 1,
            labelScale: 1,
          },
        ],
        data: [],
      };
      appInstance.uniCall("addLandmarkLayer", jsonData, (result) => {
        console.log(result);
      });
    },
    // Updating Landmark Data
    unDateMark(JDWD, index, type) {
      let jsonData = {
        id: "landmarkLayerAdd",
        name: "Landmark layer",
        coordType: 0,
        coordTypeZ: 0,
        isAppend: type,
        data: [
          {
            id: index,
            type: "Path Point",
            label: `Point${index - 1}`,
            coord: JDWD, //Taking the Longitude and Latitude of Shenzhen Bay as an Example
            coordZ: -4.99999908447,
          },
        ],
      };

      appInstance.uniCall("updateLandmarkLayerCoord", jsonData, (result) => {
        console.log(result);

        CommonClick.showPanel(index, "landmarkLayer", {
          scatterType: "deletePoint",
        });
      });
    }, // Start recording and clicking to obtain point data

    // Start recording and clicking to obtain point data
    statejilu() {
      let that = this;

      window.appInstance.uniCall(
        "addEventListener",
        {
          eventName: "onSceneClick", // Scene click event
          callback: that.eventCallback, // To register event listening callback functions, multiple callback functions can be registered for the same event. Note that this callback function corresponds to the callback function at the time of the event represented by the first parameter, which should be consistent with the current one addEventListener Distinguish between callback functions that have completed the call.
          // source: "leftButtonUp",
        },
        (result) => {
          console.log(result);
        }
      );
    },

    //Click on the event to obtain the point
    eventCallback(res) {
      if (res.data[1].source == "leftButtonUp") {
        this.Datastorage(res.data[0].coord); // that.addLandMar(event.data[0].coord, (that.indexadd += 1));
      } else {
        return;
      }
      PathMark.markPath(res, this.finishCallback);
    },

    //Complete collection
    finishCallback(list) {
      console.log("Collection completed", list);

      UEapi.Common.removeOnSceneClick(this.eventCallback);
      this.isMark = false;
      this.AddStart = true;

      let data = [];
      if (list.length > 0) {
        list.forEach((item, index) => {
          data.push({
            sort: index + 1, // sort field
            longitude: item.coord[0], // Longitude collected
            latitude: item.coord[1], // Latitude collected
          });
        });
      }
      let that = this;

      if (that.datalistarr.length > 0) {
        let dataset = Number(localStorage.getItem("PathIndex"));
        if (dataset == 0) {
          dataset = 1;
        }
        //Create a new map object
        let dataobj = { path: that.datalistarr, id: "Path" + dataset };
        dataset++;
        // Add data to data
        this.Plandata.push(dataobj);
        this.alllujingdata.push(dataobj);
        this.lujingindex++;
        console.log(that.alllujingdata);

        
        // Store data locally
        localStorage.setItem("datalist", JSON.stringify(that.Plandata));
        localStorage.setItem("PathIndex", dataset);
        // Clear the currently selected set of data
        that.datalistarr = [];
        //this.KaiShi();
      }
    },

    // End recording click to obtain point data
    endjilu() {
      this.deletepath();
      let that = this;
      window.appInstance.uniCall(
        "removeEventListener",
        {
          eventName: "onSceneClick", // Scene click event
          callback: window.eventCallback, // To register event listening callback functions, multiple callback functions can be registered for the same event. Note that this callback function corresponds to the callback function at the time of the event represented by the first parameter, which should be consistent with the current one addEventListener Distinguish between callback functions that have completed the call.
        },
        (result) => {
          console.log(result);
          // Calculate the length of existing data
          console.log(that.alllujingdata);
          that.alllujingdata = JSON.parse(localStorage.getItem("datalist"));
          //
          let arrlength = 0;
          if (that.alllujingdata == null) {
            arrlength = 0;
            that.alllujingdata = [];
          } else {
            arrlength = that.alllujingdata.length;
          }

          if (that.datalistarr.length > 0) {
            let dataset = Number(localStorage.getItem("PathIndex"));
            if (dataset == 0) {
              dataset = 1;
            }
            //Create a new map object
            let dataobj = { path: that.datalistarr, id: "Path" + dataset };
            dataset++;
            // Add data to data
            that.alllujingdata.push(dataobj);
            this.lujingindex++;
            console.log(that.alllujingdata);
            // Store data locally
            localStorage.setItem(
              "datalist",
              JSON.stringify(that.alllujingdata)
            );
            localStorage.setItem("PathIndex", dataset);
            // Clear the currently selected set of data
            that.datalistarr = [];
            this.KaiShi();
          }
        }
      );
    },
    // Add path
    // Add Path Layer
    addPath(path, index, flag) {
      let jsonData = {
        id: index, // Layer object ID, a unique identifier passed in by the caller during creation, used for object recognition for various operations
        name: "path", // Layer name, supports customizing names for layers
        coordType: 0, // XY Axis coordinate category, 0: X longitude, Y latitude; 1: X meters, Y meters, relative to world 00 points
        coordTypeZ: 0, // Z Axis coordinate category, 0: relative 3D world 0 elevation; 1: Relative 3D world surface; 2: Relative 3D model surface (in meters)
        type: "Arrow01", // Alignment Style Categories Arrow01 Arrow02 Arrow03 Arrow04 Arrow05 Arrow06 Segment01 Segment02 Segment03 Segment04 Segment05 Segment06
        color: "#00ff00", // Route color, color transparency (HEX color value) identifies layer names, supports custom names for layers
        colorPass: "#00ff00", // Path color (HEX color value) after model object movement
        width: 5, // Path width in meters
        tag: "custominfo", // User defined tags, user saved user's extended data
        visible: true, // Whether to show or hide by default when adding the current layer
        points: path,
        textureSpeed: 5,
        autoScale: true,
      };

      // Add path
      appInstance.uniCall("addPath", jsonData, (result) => {
        if (flag) {
          if (result.result === 1) {
            this.pathingCamera(index);
          }
        }
      });
    },
    // Add signage
    // Delete Path Map
    deletepath() {
      let jsonData = {
        overlayType: "path",
      };

      appInstance.uniCall("clearOverlayType", jsonData, (result) => {
        console.log(result);
      });
    },

    // Path moving lens
    pathingCamera(pathid) {
      let jsonData = {
        pathId: pathid, // ID of the path
        loopMode: "round", //Loop mode: none, no loop; Round, round-trip; Repeat, loop from scratch
        reverse: false, //Reverse movement or not
        distance: 200, //Distance from lens to cover (in meters)
        pitch: 20, //Lens pitch angle (0-89)
        speed: 10, //Movement speed (in meters/second)
      };
      // Enable path movement lens
      appInstance.uniCall("pathingCamera", jsonData, (result) => {});
    },
    // Method of storing data
    Datastorage(data) {
      this.datalistarr.push(data);
      console.log(this.datalistarr);
      //this.pathclick({ path: this.datalistarr }, "ceshi", false);
    },
  },
  beforeDestroy() {
    this.AddStart = true;
    this.Start = true;
    this.xuanzhong = true;
    this.lineindex = null;
    this.continue = true;
    this.setCameraPathingState("stop");
    this.deletepath();
    window.gisManager.camera.setCamera({
      centerCoord: [37.185558, -1.691673],
      coordType: 0,
      coordTypeZ: 0,
      coordZ: 0,
      distance: 1223,
      heading: 201,
      pitch: 12,
      fly: true,
      duration: 1,
    });
  },
};
</script>

<style lang="less" scoped>
.RecordLine {
  width: 580px;
  height: 408px;
  background: url("../../assets/img/Common/manyou.png") no-repeat;
  background-size: 100% 100%;
  position: relative;
  top: -195px;
  .lujingliebiao {
    width: 280px;
    height: 230px;
    // background-color: #000;
    /deep/ .t-list .t-body {
      &::-webkit-scrollbar-thumb {
        /*Small squares inside the scroll bar*/
        border-radius: 20px;
        box-shadow: inset 0 0 5px rgba(#fff, 0.9);
        background: transparent;
      }
    }
    .lujingitem {
      font-size: 24px;
      color: #fff;
      height: 40px;
      line-height: 40px;
      justify-content: space-between;
    }
  }
  .manyou {
    width: 580px;
    display: flex;
    justify-content: space-between;
    height: 70px;
    pointer-events: all;
    position: relative;
    top: 179px;
    background-color: #172435;
    .add {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 160px;
      .addName {
        color: #fff;
        font-size: 24px;
        margin: 0 10px;
        background: linear-gradient(to bottom, #ffffff, #81bac9);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
      }
    }
    .delete {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 160px;
      .deleteName {
        color: #fff;
        font-size: 24px;
        margin: 0 10px;
        background: linear-gradient(to bottom, #ffffff, #81bac9);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
      }
    }
    .start {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 200px;
      .startName {
        color: #fff;
        font-size: 24px;
        margin: 0 10px;
        background: linear-gradient(to bottom, #ffffff, #81bac9);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
      }
    }
    .Add {
      width: 40px;
      height: 40px;
      background: url("./img/add.png") no-repeat;
    }
    .Over {
      width: 40px;
      height: 40px;
      background: url(../../assets/img/layout/Over.png) no-repeat;
    }
    .Del {
      width: 40px;
      height: 40px;
      background: url(../../assets/img/layout/Del.png) no-repeat;
    }
    .Up {
      width: 40px;
      height: 40px;
      background: url(../../assets/img/layout/Up.png) no-repeat;
      margin-top: 6px;
    }
    .Down {
      width: 40px;
      height: 40px;
      background: url(../../assets/img/layout/Down.png) no-repeat;
      margin-top: 6px;
    }
    .Start {
      width: 40px;
      height: 40px;
      background: url("./img/start.png") no-repeat;
    }
    .Stop {
      width: 40px;
      height: 40px;
      background: url("./img/startimg.png") no-repeat;
    }
    .Restart {
      width: 40px;
      height: 40px;
      background: url(../../assets/img/layout/Restart.png) no-repeat;
    }
  }
  button {
    pointer-events: all;
  }
  div {
    pointer-events: all;
  }
}
</style>
