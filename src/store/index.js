/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: guozhiqing
 * @Date: 2021-04-22 11:35:56
 * @LastEditors: guozhiqing
 * @LastEditTime: 2021-06-21 15:23:06
 */
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isStreaming: false, //UE scene loading completed
    topic: "", //current theme
    highLight: "", // Highlighted Card
    highLightData: "", // Highlighted Card
    scene: "KNY", // current scene
    sceneTime: "", //
    isSceneChanging: false, //Is the scene changing? It is necessary to complete the scene change before proceeding with the monitoring isSceneChanging=false
    rotateStatus: false, //Scene rotation
    changjingStatus: false, //Scene Roaming
    cameraLevel: -1, //0,1,2
    highAction: {
      sceneName: "",
      cameraName: "",
      highLightName: "",
    }, //Highlighting operations, including scene switching, camera, and legend highlighting, are used in conjunction with scene switching. If there are separate scene switching areas, it is important to leave highAction blank
    // Save Model ID
    ModelId: "",
    cameraIndex: "",
    currentIndexs: "",
  },
  mutations: {
    cameraIndex(state, isInit) {
      state.cameraIndex = isInit;
    },
    currentIndexs(state, isInit) {
      state.currentIndexs = isInit;
    },
    setStreaming(state, isInit) {
      state.isStreaming = isInit;
    },
    // set up themes
    setTopic(state, name) {
      state.topic = name;
    },
    //Switching scenarios - the logic here needs to be modified based on specific projects
    setScene(state, sceneName) {
      // if (window.gisManager.currentView != sceneName) {
      //   let cameraName;
      //   let scene;
      //   switch (sceneName) {
      //     case 'zhihuidenggan':
      //       cameraName = 'zhihuidenggan';
      //       scene = 'KNY';
      //       break;
      //   }
      // }
    },
    // Set Highlight
    setHighLight(state, name) {
      if (state.highLight === name || name === "") {
        state.highLight = state.topic;
      } else {
        state.highLight = name;
      }
    },
    //Highlight and pass parameters
    setHighLightData(state, level) {
      state.highLightData = level;
    },
    // Set camera level
    setCameraLevel(state, level) {
      state.cameraLevel = level;
    },
    setRotate(state, info) {
      state.rotateStatus = info;
    },
    setChangJingStatus(state, info) {
      state.changjingStatus = info;
    },
    setHighAction(state, info) {
      state.highAction = info;
    },
    clearHighAction(state, info) {
      state.highAction.sceneName = "";
      state.highAction.cameraName = "";
      state.highAction.highLightName = "";
    },
    setModelId(state, info) {
      state.ModelId = info;
    },
    setSceneTime(state, time) {
      state.sceneTime = time;
    },
  },
  getters: {},
  actions: {},
  modules: {},
});
