<template>
  <transition name="el-zoom-in-center">
    <div class="layout_wraper">
      <div class="layout_left">
        <div class="animate_wrap">
          <div class="down_animate_dely1">
            <div class="PlanningandConstructionProcess">
              <img src="../assets/img/pageCard/CSGH/1.png" alt="" />
            </div>
          </div>
        </div>
        <div class="animate_wrap">
          <div class="down_animate_dely2">
            <div class="SupplyCapacityofLandResources">
              <img src="../assets/img/pageCard/CSGH/2.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div class="layout_center">
        <div class="animate_wrap animate_wrap_left">
          <div class="down_animate_dely3">
            <div class="LEFT">
              <img src="../assets/img/pageCard/CSGH/5.png" alt="" />
            </div>
          </div>
        </div>
        <!-- <div class="animate_wrap animate_wrap_right">
          <div class="down_animate_dely4">
            <div class="RIGHT">
              <img src="../assets/img/pageCard/CSGH/6.png" alt="" />
            </div>
          </div>
        </div> -->
        <div class="sub_legends">
          <img
            v-show="legendType == 1"
            src="@/assets/img/pageCard/CSGH/building_time.png"
            alt=""
          />
          <img
            v-show="legendType == 2"
            src="@/assets/img/pageCard/CSGH/building_type.png"
            alt=""
          />
        </div>
      </div>
      <div class="layout_right">
        <div class="animate_wrap">
          <div class="down_animate_dely1">
            <div class="UrbanSpaceDevelopment">
              <img src="../assets/img/pageCard/CSGH/3.png" alt="" />
            </div>
          </div>
        </div>
        <div class="animate_wrap">
          <div class="down_animate_dely2">
            <div class="ConstructionProjectAnalysis">
              <img src="../assets/img/pageCard/CSGH/4.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(['isShowCrad', 'legendType']),
  },
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
    .PlanningandConstructionProcess {
      width: 846px;
      height: 438px;
      & > img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }

    .SupplyCapacityofLandResources {
      width: 846px;
      height: 431px;
      & > img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
  }
  .layout_center {
    transform: scale(1.2);
    left: 21%;
    top: 17%;
    .animate_wrap_left {
      width: 296px;
      height: 241px;
      .LEFT {
        width: 296px;
        height: 241px;
        & > img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
    }
    .animate_wrap_right {
      width: 283px;
      height: 392px;
      .RIGHT {
        width: 283px;
        height: 392px;
        & > img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
    }
    .sub_legends {
      position: absolute;
      bottom: 20px;
      right: 20px;
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
    .UrbanSpaceDevelopment {
      width: 843px;
      height: 501px;
      & > img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }

    .ConstructionProjectAnalysis {
      width: 852px;
      height: 370px;
      & > img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
