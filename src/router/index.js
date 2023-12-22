/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: guozhiqing
 * @Date: 2021-04-22 11:35:56
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-12-05 16:39:05
 */
import Vue from "vue";
import VueRouter from "vue-router";

// VueRouter.prototype.push = function(path) {
//   return routerPush.call(this, path).catch(err => err);
// };

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/zhdg",
  },
  {
    path: "/ggzq",
    name: "gonggonganquan",
    showName: "Public Safety",
    component: () => import("../views/GongGongAnQuan.vue"),
  },
  {
    path: "/zsyy",
    name: "zhaoshangyunxing",
    showName: "Investment & Operati",
    component: () => import("../views/ZhaoShangYunYing.vue"),
  },
  {
    path: "/jtyx",
    name: "jiaotongyunxing",
    showName: "Traffic Operation",
    component: () => import("../views/JiaoTongYunXing.vue"),
  },
  {
    path: "/zhdg",
    name: "zhihuidenggan",
    showName: "Smart Pole",
    component: () => import("../views/ZhiHuiDengGan.vue"),
  },
  {
    path: "/csqj",
    name: "ChengShiQuanJing",
    showName: "City Panorama",
    component: () => import("../views/ChengShiQuanJing.vue"),
  },

  {
    path: "/msfw",
    name: "MingShengFuWu",
    showName: "People’s Livelihood Services",
    component: () => import("../views/MingShengFuWu.vue"),
  },
  {
    path: "/ldzh",
    name: "liandongzhihui",
    showName: "Linkage Command",
    component: () => import("../views/LianDongZhiHui.vue"),
  },
  {
    path: "/sjzx",
    name: "shujuzhongxin",
    showName: "PrimaryDC",
    component: () => import("../views/ShuJuZhongXin.vue"),
  },
  // {
  //   path: "/qyqj",
  //   name: "QuYuQuanJing",
  //   showName: "Regional Panorama",
  //   component: () => import("../views/QuYuQuanJing.vue"),
  // },
  // {
  //   path: "/cszl",
  //   name: "ChengShiZhiLi",
  //   showName: "Urban Governance",
  //   component: () => import("../views/ChengShiZhiLi.vue"),
  // },
  // {
  //   path: "/zhgl",
  //   name: "ZhiHuiGuanLang",
  //   showName: "Smart Pipeline",
  //   component: () => import("../views/ZhiHuiGuanLang.vue"),
  // },
  // Configure Smart Lamp Pole for pages with secondary routing
  // {
  //   path: '/',
  //   name: 'Joint command',
  //   redirect: '/ldzh/yjzs',
  //   component: () => import('../views/LianDongZhiHui.vue'),
  //   children: [
  //     {
  //       path: '/ldzh/yjzs',
  //       name: 'Joint command',
  //       component: () => import('../components/LianDongZhiHui/YingJiZhiShou.vue'),
  //     },
  //     {
  //       path: '/ldzh/yjzh',
  //       name: 'Emergency duty',
  //       component: () => import('../components/LianDongZhiHui/YingJiZhiHui.vue'),
  //     },
  //   ]
  // },
];

const router = new VueRouter({
  linkActiveClass: "active",
  // linkExactActiveClass: 'active',
  routes,
});

export default router;
