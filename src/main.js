/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: guozhiqing
 * @Date: 2021-04-22 11:35:54
 * @LastEditors: guozhiqing
 * @LastEditTime: 2021-06-23 13:55:01
 */
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import echarts from 'echarts';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/style/base.css';
import './assets/style/animate.css';
import './utils/common/time';
// import './utils/common/commonHelper';
import * as _ from 'lodash';
import Api from './api/Api';
Vue.prototype.$http = Api;

Vue.use(ElementUI);
Vue.prototype.$axios = axios;
Vue.prototype.$echarts = echarts;
Vue.prototype.$eventBus = new Vue();

Vue.config.productionTip = false;

axios.get('/config.json').then((res) => {
  window.streamingConfig = res.data;
  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount('#app');
});
