<template>
  <transition name="traffic_operation_box">
    <div class="layout_wraper">
      <div class="layout_left">
        <div class="animate_wrap">
          <div class="down_animate_dely1">
            <div class="CityOverview">
              <img src="../assets/img/pageCard/CSQJ/1.png" alt="" />
            </div>
          </div>
        </div>
        <div class="animate_wrap">
          <div class="down_animate_dely2">
            <div class="TrafficOperation">
              <img src="../assets/img/pageCard/CSQJ/2.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div class="layout_center">
        <div class="animate_wrap">
          <div class="down_animate_dely3">
            <div class="LEFT">
              <img src="../assets/img/pageCard/CSQJ/5.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div class="layout_right">
        <div class="animate_wrap">
          <div class="down_animate_dely1">
            <div class="IncidentOverview">
              <img src="../assets/img/pageCard/CSQJ/3.png" alt="" />
            </div>
          </div>
        </div>
        <div class="animate_wrap">
          <div class="down_animate_dely2">
            <div class="VideoSurveillance">
              <img src="../assets/img/pageCard/CSQJ/4.png" alt="" />
              <ul class="VideoSurveillance_list">
                <li
                  v-for="(item, index) in ['01', '02', '03', '04']"
                  :key="index"
                >
                  <video
                    :src="`/video/${item}.mp4`"
                    autoplay
                    loop
                    muted
                  ></video>
                  <div class="info">
                    <div class="name">{{ `Intersection-00${index + 1}` }}</div>
                    <!-- <div class="status">{{ day }} {{ time }}</div> -->
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      day: null,
      time: null,
      timer: null,
      week: null,
    };
  },
  computed: {},
  components: {},
  methods: {},
  mounted() {},
};
</script>

<style lang="less" scoped>
.layout_wraper {
  .layout_left {
    transform: scale(1.5);
    left: 3.4%;
    top: 23%;
    display: flex;
    flex-direction: column;
    .CityOverview {
      width: 846px;
      height: 433px;
      & > img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }

    .TrafficOperation {
      width: 846px;
      height: 421px;
      & > img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
  }
  .layout_center {
   transform: scale(1.2);
       left: 21.0%;
    top: 17%;

    .animate_wrap {
      width: 305px;
      height: 479px;
      .LEFT {
        width: 305px;
        height: 479px;
        & > img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
    }

    .animate_wrap {
      width: 279px;
      height: 479px;
      .RIGHT {
        width: 279px;
        height: 479px;
        & > img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .layout_right {
    top: 23%;
    transform: scale(1.5);
    display: flex;
    flex-direction: column;
    position: absolute;
    height: 100%;
    right: 3.4%;
    .IncidentOverview {
      width: 847px;
      height: 404px;
      & > img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }

    .VideoSurveillance {
      width: 846px;
      height: 477px;
      position: relative;
      & > img {
        display: block;
        width: 100%;
        height: 100%;
      }

      .VideoSurveillance_list {
        position: absolute;
        top: 60px;
        left: 5px;
        width: 840px;
        height: 418px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-content: space-between;
        & > li {
          width: 413px;
          height: 200px;
          position: relative;

          & > video {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .info {
            position: absolute;
            bottom: 0px;
            left: 0px;
            width: 100%;
            height: 30px;
            background: linear-gradient(
              to bottom,
              rgba(0, 0, 0, 0),
              rgba(0, 0, 0, 1)
            );
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 10px;
            box-sizing: border-box;

            & > div {
              font-family: 'Helvetica';
              font-size: 14px;
              color: #ffffff;
            }
          }
        }
      }
    }
  }
}
</style>
