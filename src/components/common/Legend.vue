<template>
  <div v-show="isVisible" class="legend_wraper">
    <div
      class="legned_item"
      v-for="(item, index) of legendList"
      :key="index"
      @click="select(item)"
    >
      <div class="icon"   :style="{ width: `${item.width}`, height: `${item.height}` }">
        <img :src="item.imgUrl" alt />
      </div>
      <div class="txt">{{ item.showName }}</div>
      <div class="checkbox">
        <div :class="item.highlight ? 'active' : ''"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import legendConfig from "@/utils/configs/legends";
export default {
  name: "legend_wraper",
  data() {
    return {
      isVisible: true,
      currentCtrl: "",
      legendList: [],
      //Current Legend Selection
      selectLegends: new Set(),
      cardShowLayers: [],
      cardConfig: null,
    };
  },
  created() {
    legendConfig.allLegends.forEach((legend) => {
      legend.showName = legend.showName ? legend.showName : legend.name;
    });
  },
  methods: {
    /** Control Legend Display */
    changeSelected() {
      this.legendList.forEach((item) => (item.highlight = false));
      this.selectLegends.forEach((select) => {
        this.legendList.forEach((item) => {
          if (select == item.name) {
            item.highlight = true;
          }
        });
      });
    },

    /**Control the visibility of legends (corresponding layer sets)*/
    ctrlLayer(legend, isShow) {
      let key = legend;
      let mapping = window.currentLayer.legendLayerMapping;
      if (mapping && mapping[legend]) {
        key = mapping[legend];
      }
      let layers = this.allLayers[key];
      layers &&
        layers.forEach((layer) => {
          if (isShow) {
            if (layer.status === "false") {
              window.gisManager.addLayer(layer);
            } else if (layer.status === "hide") {
              window.gisManager.showLayer(layer);
            }
          } else {
            window.gisManager.hideLayer(layer);
          }
        });
    },

    /**Check the legend */
    select(item) {
      this.bubbleLayer(item);
      item.highlight = !item.highlight;
      if (item.highlight) {
        this.selectLegends.add(item.name);
        this.ctrlLayer(item.name, true);
      } else {
        this.ctrlLayer(item.name, false);
        this.selectLegends.delete(item.name);
      }
    },
    // Bubble Chart Hidden
    bubbleLayer(item) {
      if (item.showName === "Device Alarm") {
        if (item.highlight) {
          appInstance.uniCall(
            "setOverlayTypeVisibility",
            {
              overlayType: "bubbleLayer",
              visible: false, // Layer Object Categories
            },
            (result) => {
              console.log(result);
            }
          );
        } else {
          appInstance.uniCall(
            "setOverlayTypeVisibility",
            {
              overlayType: "bubbleLayer",
              visible: true, // Layer Object Categories
            },
            (result) => {
              console.log(result);
            }
          );
        }
      }
    },

    /**Card change */
    cardChange(cardName) {
      let cardConfig = window.currentLayer.cardNames[cardName];
      this.cardConfig = cardConfig;
      if (cardConfig) {
        if (cardConfig.cardShowLegends) {
          this.selectLegends.clear();
          cardConfig.cardShowLegends.forEach((legend) =>
            this.selectLegends.add(legend)
          );
          this.changeSelected();
          this.legendChange(this.selectLegends);
        }
        this.isStreaming &&
          this.cardShowLayers &&
          this.cardShowLayers.forEach((item) => this.ctrlLayer(item, false));
        this.cardShowLayers = cardConfig.cardShowLayers;
        //Card control layer
        if (!this.isStreaming) {
          return;
        }
        if (cardConfig.cardShowLayers) {
          this.cardShowLayers.forEach((item) => {
            this.ctrlLayer(item, true);
          });
        }
      }
    },
    /**Handling Legend When Different Theme Legend Controls Are Inconsistent */
    dealLegends() {
      let ctrl = window.currentLayer.legendCtrl;
      if (ctrl == undefined || ctrl == "") {
        ctrl =
          window.currentLayer.cardNames[this.topic + this.subTopic].legendCtrl;
        if (ctrl == undefined || ctrl == "") {
          this.isVisible = false;
        }
      }
      if (ctrl && ctrl != this.currentCtrl) {
        if (legendConfig.legendCtrls.has(ctrl)) {
          this.isVisible = true;
          this.legendList = [];
          legendConfig.legendCtrls.get(ctrl).forEach((t) => {
            let legend = legendConfig.allLegends.find((l) => l.name == t);
            this.legendList.push(legend);
          });
        }
      }
      this.currentCtrl = ctrl;
    },
    /**Layer initialization */
    ReInitLayer() {
      if (this.isStreaming) {
        window.gisManager.removeAlarm();
        //Todo Clear Previous Theme Layer!!! Note that if there are layers such as trajectories that activate Timer, it is necessary to stop Timer
        for (let item in this.allLayers) {
          if (this.allLayers[item]) {
            let layerList = this.allLayers[item];
            layerList &&
              layerList.forEach((layer) => {
                window.gisManager.hideLayer(layer);
              });
          }
        }
      }
      //Initialize the current topic status field
      this.allLayers = window.currentLayer.allLayers;
    },
    /**
     * Legend Change Control Layer Logic
     * @param {array} legends Select Legend
     */
    legendChange(legends) {
      if (!this.isStreaming) {
        return;
      }
      this.legendList.forEach((legend) => {
        let isShow = legends.has(legend.name) ? true : false;
        this.ctrlLayer(legend.name, isShow);
      });
    },
  },
  computed: {
    ...mapState(["topic", "subTopic", "isStreaming", "highLight", "scene"]),
  },
  mounted() {},
  watch: {
    isStreaming: {
      handler(val) {
        if (this.isStreaming) {
          let that = this;
          setTimeout(() => {
            that.legendChange(that.selectLegends);
            that.cardShowLayers.forEach((item) => {
              that.ctrlLayer(item, true, false);
            });
          }, 3000);
        }
      },
      deep: true,
    },
    highLight: {
      handler(cardName) {
        this.cardChange(cardName);
      },
      deep: true,
    },
    topic: {
      handler(val) {
        let that = this;
        this.dealLegends();
        let subTopic = window.currentLayer.subTopic;
        //When there is no secondary theme, there is a logic of secondary themes following secondary themes
        if (subTopic == undefined || subTopic == "") {
          setTimeout(() => {
            that.ReInitLayer();
            that.cardChange(that.topic);
          }, 1000);
        }
      },
      deep: true,
    },
    subTopic: {
      handler(val) {
        if (this.subTopic) {
          this.dealLegends();
          let cardName = this.topic + this.subTopic;
          setTimeout(() => {
            this.ReInitLayer();
            this.cardChange(cardName);
          }, 1000);
        }
      },
      deep: true,
    },
    scene: {
      handler(val) {
        let that = this;
        setTimeout(() => {
          switch (that.scene) {
            case "ABuZhaBi":
              let temp = window.layerConfigs.themes.find(
                (t) => t.topic == "Default"
              );
              temp &&
                temp.allLayers.forEach((layer) => {
                  window.gisManager.addLayer(layer);
                });
              break;
          }
        }, 3000);
        let topicScene = window.currentLayer.defaultView.sceneName;
        if (this.scene == topicScene) {
          this.isVisible = true;
          setTimeout(() => {
            that.legendChange(that.selectLegends);
          }, 3000);
        } else {
          this.isVisible = false;
          this.ReInitLayer();
        }
      },
      deep: true,
    },
  },
};
</script>

<style lang="less" scoped>
.legend_wraper {
  width: 266px;
  background: rgba(23, 36, 53, 0.6);
  border-top: solid 1px #29e4f5;
  padding: 10px;
  box-sizing: border-box;
  pointer-events: all;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.legned_item {
  width: 266px;
  display: flex;
  justify-content: space-between;
  height: 40px;
  align-items: center;
  position: relative;
  margin-bottom: 15px;
  .icon {
    width: 33px;
    height: 34px;
    text-align: center;
    margin-right: 20px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .txt {
    // background-color: rgba(23, 36, 53, 0.6);
    width: 160px;
    font-size: 18px;
    // background-image: -webkit-linear-gradient(top, #fff, #BFEBFF);
    // -webkit-background-clip: text;
    // -webkit-text-fill-color: transparent;
    font-family: "Helvetica";
    color: #bfebff;
  }
  .checkbox {
    width: 20px;
    height: 20px;
    border: solid 1px rgba(255, 255, 255, 0.85);
    box-sizing: border-box;
    cursor: pointer;
    .active {
      width: 26px;
      height: 26px;
      background: url("../../../public/img/legend/legend_checked.png") no-repeat;
      background-size: 10px 10px;
      background-position: 4px 4px;
      cursor: pointer;
    }
  }
}
</style>
