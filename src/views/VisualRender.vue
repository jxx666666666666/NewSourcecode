<!-- * @Descripttion:  Visual rendering component
* @version: 3.3.4
* @Author: guanzhuyu
* @Date: 2022-11-18 14:24:13
* @LastEditors: kangzesheng
* @LastEditTime: 2023-01-12 13:25:25 -->
<template>
  <div id="visual-render">
    <h2>{{ data[currentDataIndex].title }}</h2>
    <img
      :src="data[currentDataIndex].imageUrl"
      :alt="data[currentDataIndex].altText"
    />
    <p>{{ data[currentDataIndex].description }}</p>
    <div class="controls">
      <button @click="handlePrevClick" :disabled="currentDataIndex === 0">
        Previous
      </button>
      <button
        @click="handleNextClick"
        :disabled="currentDataIndex === data.length - 1"
      >
        Next
      </button>
      <button @click="shuffleItems">Shuffle</button>
      <button @click="toggleAutoPlay">{{ autoPlay ? "Stop" : "Play" }}</button>
    </div>
  </div>
</template>

<script>
import HeatLayer from "./HeatLayer";
import GisBase from "./GisBase";
import LandmarkLayer from "./LandmarkLayer";
import Bubble from "./Bubble";
import BarLayer from "./BarLayer";
import Area from "./Area";
import Path from "./Path";
import Camera from "./Camera";
import CircularArea from "./CircularArea";
import ODLineLayer from "./ODLineLayer";
import TrailLayer from "./TrailLayer";
import GisBaseLayer from "./GisBaseLayer";
import RoadSgHeatLayer from "./RoadSgHeatLayer";
import TypeAreaLayer from "./TypeAreaLayer";
import ColorAreaLayer from "./ColorAreaLayer";
import GridLayer from "./GridLayer";
import Environment from "./Environment";
import Model from "./Model";
import store from "@/store/index";
import GisDataManager from "@/api/gisDataManager";

export default {
  name: "VisualRender",
  props: {
    data: {
      type: Array,
      required: true,
    },
    interval: {
      type: Number,
      default: 3000,
    },
  },
  data() {
    return {
      currentDataIndex: 0,
      autoPlay: false,
      timerId: null,
    };
  },
  methods: {
    handlePrevClick() {
      if (this.currentDataIndex > 0) {
        this.currentDataIndex -= 1;
      }
    },
    handleNextClick() {
      if (this.currentDataIndex < this.data.length - 1) {
        this.currentDataIndex += 1;
      }
    },
    shuffleItems() {
      this.data = this.shuffleArray(this.data);
      this.currentDataIndex = 0;
    },
    toggleAutoPlay() {
      this.autoPlay = !this.autoPlay;

      if (this.autoPlay) {
        this.timerId = setInterval(() => {
          if (this.currentDataIndex < this.data.length - 1) {
            this.currentDataIndex += 1;
          } else {
            this.currentDataIndex = 0;
          }
        }, this.interval);
      } else {
        clearInterval(this.timerId);
        this.timerId = null;
      }
    },
    shuffleArray(array) {
      let currentIndex = array.length,
        randomIndex;

      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex],
        ];
      }

      return array;
    },
  },
};
</script>

<style scoped>
#visual-render {
  text-align: center;
  margin-top: 50px;
}

.controls button {
  margin: 0 10px;
  padding: 10px 20px;
  background-color: #0077cc;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.controls button:hover {
  background-color: #005ea6;
}
</style>
