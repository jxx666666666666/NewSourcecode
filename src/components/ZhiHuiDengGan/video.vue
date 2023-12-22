<template>
  <div class="conten-box">
    <div class="box">
      <!-- <vueSeamlessScroll class="box" :data="dataList" :class-option="classOption">
      <div class="item" v-for="(item, index) in datalist" :key="index">
        <video :src="item.url" autoplay loop muted></video>
        <div class="ZheZhao">
          <img
            class="dag-img"
            src="../../assets/img/ZhiHuiDengGan/dag-icon.png"
            alt=""
            @click="dagClick(item)"
          />
          <img
            class="MengCeng"
            src="../../assets/img/ZhiHuiDengGan/MengCeng.png"
            alt=""
          />
          <div class="title">
            <div class="name">
              <img
                src="../../assets/img/ZhiHuiDengGan/before-icon.png"
                alt=""
              />
              <span>{{ item.name }}</span>
            </div>
            <div class="time">{{ item.time }}</div>
            <div class="num">{{ item.num }}</div>
          </div>
        </div>
      </div>
      </vueSeamlessScroll> -->
      <swiper v-if="datalist.length > 1" class="wrap" ref="mySwiper" :options="swiperOptions" :auto-update="true"
        :auto-destroy="true" :delete-instance-on-destroy="true" :cleanup-styles-on-destroy="true">
        <swiperSlide class="swipe_inner item" v-for="(item, index) of datalist" :key="index">
          <video v-if="item.isDebugger" :src="item.url" autoplay loop muted></video>
          <videoIVS :cameraCode="item.code" v-else></videoIVS>
          <div class="ZheZhao">
            <img class="dag-img" src="../../assets/img/ZhiHuiDengGan/dag-icon.png" alt="" index="222" />
            <img class="MengCeng" src="../../assets/img/ZhiHuiDengGan/MengCeng.png" alt="" />
            <div class="title">
              <div class="name">
                <img src="../../assets/img/ZhiHuiDengGan/before-icon.png" alt="" />
                <span>{{ item.name }}</span>
              </div>
              <div class="time">{{ day }}</div>
              <div class="num">{{ time }}</div>
            </div>
          </div>
        </swiperSlide>
      </swiper>
    </div>
  </div>
</template>

<script>
import vueSeamlessScroll from "vue-seamless-scroll";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import Time from '@/utils/common/time';
import "swiper/dist/css/swiper.css";
import videoIVS from "../../components/common/VideoIVS.vue";
export default {
  components: {
    vueSeamlessScroll,
    swiper,
    swiperSlide,
    videoIVS,
  },
  data() {
    return {
      now: "",
      day: '',
      time: "",
      dataList: this.dataList,
      // Carousel configuration
      swiperOptions: {
        direction: "horizontal", //Control the direction of carousel
        preventLinksPropagation: false, //Stop event propagation
        initialSlide: 0,
        loop: true, //Whether to enable carousel
        slidesPerView: 3, //Number of items per display
        autoplay: {
          delay: 6000, //Duration of the carousel
          disableOnInteraction: false,
        },
        //Bind click event
        on: {
          click: (item) => {
            // this.clicktab(item.target.outerText)
            // console.log(item);
            // const arr = item.path[1].innerText.split("\n");
            // console.log(arr);
            // this.clicktab(item.path[1].innerText)
            if (item.path[0].attributes[3].value == 222) {
              const arr = item.path[1].innerText.split("\n");
              this.dagClick(arr);
            }
          },
        },
      },
    };
  },
  computed: {
    classOption() {
      return {
        step: 0.2, // The larger the numerical value, the faster the scrolling speed.
        limitMoveNum: 3, // The amount of data required to start seamless scrolling. this.dataList.length
        hoverStop: true, // Whether to enable mouse hovering.stop
        direction: 2, // 0down 1up 2left 3right
        openWatch: true, // Enable real-time monitoring and refreshing of data.dom
        singleHeight: 0, // The height at which single-step motion stops (default value 0 means seamless continuous scrolling) direction => 0/1
        singleWidth: 0, // The width at which single-step motion stops (default value 0 means seamless continuous scrolling) direction => 2/3
        waitTime: 1000, // The time at which single-step motion stops(default value 1000ms)
      };
    },
  },
  props: {
    datalist: {
      type: Array,
      default: () => {
        return [
          {
            url: "",
            name: "001",

          },
          {
            url: "",
            name: "001",

          },
          {
            url: "",
            name: "001",

          },
        ];
      },
    },
  },
  created() {
    this.initDay()
    this.timer = setInterval(() => {
      this.initDay();
    }, 1000);
  },
  methods: {
    dagClick(e) {
      this.datalist.forEach((item) => {
        if (item.name == e[0]) {
          this.$parent.videoClick(item);
        }
      })
    },
    initDay() {
      this.now = new Date();
      // this.week = Time.getWeek(this.now);
      this.day = Time.format('yyyy-MM-dd', this.now);
      this.time = Time.format('HH:mm:ss', this.now);
    }
    // clicktab(item) {
    //   // console.log(item.path[0].attributes[3].value);
    //   console.log(item);
    //   this.$emit("clickTable", item[0]);
    // },
  },
};
</script>

<style lang="less" scoped>
.conten-box {
  width: 1680px;
  height: 300px;

  .box {
    width: 1680px;
    height: 300px;
    // display: flex;

    // background-color: #fff;
    padding-top: 30px;
    white-space: nowrap;
    overflow: hidden;

    .item {
      display: inline-block;
      width: 540px !important;
      height: 300px;
      position: relative;
      //   background-color: pink;
      padding-right: 20px;

      video {
        width: 550px;
        height: 300px;
      }

      .ZheZhao {
        width: 550px;
        height: 300px;
        position: absolute;
        top: 0;
        left: 0;

        .dag-img {
          width: 32px;
          height: 32px;
          position: absolute;
          right: 35px;
          top: 15px;
          z-index: 3;
        }

        .MengCeng {
          position: absolute;
          bottom: -1px;
          left: 8px;
          width: 97%;
          height: 107px;
        }

        .title {
          position: absolute;
          bottom: 10px;
          left: 10px;
          display: flex;

          .name {
            span {
              font-family: "Helvetica";
              font-size: 22px;
              color: #ffffff;
            }
          }

          .time {
            margin-left: 240px;
            font-family: "Helvetica";
            color: #fff;
            font-size: 22px;
            white-space: nowrap;
          }

          .num {
            margin-left: 10px;
            font-family: "Helvetica";
            color: #bfff00;
            font-size: 22px;
            white-space: nowrap;
          }
        }
      }
    }
  }
}
</style>