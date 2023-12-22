<template>
  <transition name="el-zoom-in-center">
    <div class="layout_wraper">
      <div class="layout_left">
        <div class="animate_wrap">
          <div class="down_animate_dely1">
            <div class="IncidentOverview">
              <img src="../assets/img/pageCard/CSZL/1.png" alt="" />
            </div>
          </div>
        </div>
        <div class="animate_wrap">
          <div class="down_animate_dely2">
            <div class="WorkOrderAnalysis">
              <img src="../assets/img/pageCard/CSZL/2.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div class="layout_center">
        <div class="animate_wrap">
          <div class="down_animate_dely3">
            <div class="LEFT">
              <img src="../assets/img/pageCard/CSZL/5.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div class="layout_right">
        <div class="animate_wrap">
          <div class="down_animate_dely1">
            <div class="FineGovernance">
              <img src="../assets/img/pageCard/CSZL/3.png" alt="" />
            </div>
          </div>
        </div>
        <div class="animate_wrap">
          <div class="down_animate_dely2">
            <div class="AssessmentEvaluation">
              <img src="../assets/img/pageCard/CSZL/4.png" alt="" />
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
    ...mapState(['isShowCrad']),
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
    .IncidentOverview {
      width: 847px;
      height: 421px;
      & > img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }

    .WorkOrderAnalysis {
      width: 843px;
      height: 418px;
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
      width: 409px;
      height: 441px;
      .LEFT {
        width: 409px;
        height: 441px;
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
    .FineGovernance {
      width: 843px;
      height: 446px;
      & > img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }

    .AssessmentEvaluation {
      width: 843px;
      height: 436px;
      & > img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
