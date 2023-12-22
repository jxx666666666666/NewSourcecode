<template>
  <div class="table">
    <ul class="FJ_GZZDYJLB_Nav"
        :style="{ height: TableStyle.NavHeight, width: TableStyle.TableWidth }">
      <li v-for="(item, index) of NavData"
          :key="index"
          :style="{
          lineHeight: TableStyle.NavlineHeight,
          marginTop: TableStyle.NavTop,
        }">
        {{ item }}
      </li>
    </ul>
    <div :style="{ width: TableStyle.TableWidth }"
         class="swiper_wraper FJ_GZZDYJLB_Content"
         @mouseenter="enterSwiper"
         @mouseleave="leaveSwiper">
      <swiper v-if="Data.length > 1"
              class="wrap"
              ref="mySwiper"
              :options="swiperOptions"
              :auto-update="true"
              :auto-destroy="true"
              :delete-instance-on-destroy="true"
              :cleanup-styles-on-destroy="true">
        <swiperSlide class="swipe_inner"
                     v-for="(item, index) of Data"
                     :key="index">
          <div class="id">{{ item.id }}</div>
          <div class="item">{{ item.time }}</div>
          <div class="content">{{ item.content }}</div>
          <div v-if="item.status">{{ item.status }}</div>
          <div v-if="item.istime">{{ item.istime }}</div>
        </swiperSlide>
      </swiper>
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
export default {
  components: {
    swiper,
    swiperSlide,
  },
  props: {
    NavData: {
      type: Array,
      default: () => {
        return ["number", "time", "info", "Completion status"];
      },
    },
    TableStyle: {
      type: Object,
      default: () => {
        return {
          TableWidth: "400px",
          NavHeight: "30px",
          NavlineHeight: "30px",
          NavTop: "0px",
        };
      },
    },
    Data: {
      type: Array,
      default: () => {
        return [
          {
            id: "B12322",
            time: "2021-6-10",
            content: "Security alarm events",
            status: "processed",
          },
          {
            id: "B12322",
            time: "2021-6-10",
            content: "Security alarm events",
            status: "processed",
          },
          {
            id: "B12322",
            time: "2021-6-10",
            content: "Security alarm events",
            status: "processed",
          },
          {
            id: "B12322",
            time: "2021-6-10",
            content: "Security alarm events",
            status: "processed",
          },
          {
            id: "B12322",
            time: "2021-6-10",
            content: "Security alarm events",
            status: "processed",
          },
          {
            id: "B12322",
            time: "2021-6-10",
            content: "Security alarm events",
            status: "processed",
          },
          {
            id: "B12322",
            time: "2021-6-10",
            content: "Security alarm events",
            status: "processed",
          },
        ];
      },
    },
  },
  data () {
    return {
      // Rotation Chart Configuration
      swiperOptions: {
        direction: "vertical",
        preventLinksPropagation: false,
        initialSlide: 0,
        loop: true,
        slidesPerView: 6,
        mousewheel: true,
        autoHeight: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        on: {
          click: (item) => {
            const arr = item.path[1].innerText.split("\n");
            this.clicktab(arr[0]);
          },
        },
      },
    };
  },
  methods: {
    enterSwiper () { },
    leaveSwiper () { },
    clicktab (item) {
      this.$emit("clickTable", item);
    },
  },
};
</script>

<style lang="less" scoped>
.table {
  width: 408px;
  height: 100%;
  .FJ_GZZDYJLB_Nav {
    margin-top: 10px;
    width: 408px;
    height: 45px;
    display: flex;
    // justify-content: space-between;
    justify-content: flex-start;
    background: #104070;
    padding: 0 20px;
    box-sizing: border-box;
    li {
      flex: 1;
      height: 45px;
      line-height: 45px;
      font-size: 22px;
      color: #fff;
      text-align: left;
      font-family: "Helvetica";
    }
  }

  .FJ_GZZDYJLB_Content {
    width: 408px;
    height: 270px;

    .wrap {
      height: 270px;
    }
    .swipe_inner {
      height: 45px !important;
      line-height: 45px;
      box-sizing: border-box;
      background: #104070;
      font-size: 22px;
      color: #bfebff;
      font-family: "Helvetica";
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
      box-sizing: border-box;

      &:nth-child(odd) {
        background: rgba(255, 255, 255, 0.1);
        div {
          flex: 1;
        }
      }
      &:nth-child(even) {
        background: rgba(0, 0, 0, 0.1);
        div {
          flex: 1;
        }
      }
      //   & > div:nth-child(1) {
      //     width: 71px;
      //   }
      //   & > div:nth-child(2) {
      //     width: 237px;
      //   }
      //   & > div:nth-child(3) {
      //     width: 257px;
      //   }
      //   & > div:nth-child(4) {
      //     width: 222px;
      //   }
    }
  }
}
</style>