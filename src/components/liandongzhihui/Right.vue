<template>
  <div class="wraper">
    <OneTitle title="Video Matrix" width="1681px" imgTop="-5px" />
    <div class="videoList">
      <div class="item" v-for="(item, i) in list" :key="i">
        <video :src="item.path" autoplay loop muted></video>
        <div class="border"></div>
        <div class="fangda">
          <img src="../../assets/img/ldzf/fangda_bg.png" alt="" />
        </div>
        <div class="info">
          <div class="item_name">{{ item.name }}</div>
          <div class="item_time">
            <span>{{ item.date }}</span> {{ item.time }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OneTitle from '../common/OneTitle.vue'
export default {
  components: { OneTitle },
  data() {
    return {
      list: [
        {
          name: 'Street 001',
          date: '2021-02-04 ',
          time: '12:30:20',
          path: '/video/01.mp4',
        },
        {
          name: 'Street 002',
          date: '2021-02-04 ',
          time: '12:30:20',
          path: '/video/02.mp4',
        },
        {
          name: 'Street 003',
          date: '2021-02-04 ',
          time: '12:30:20',
          path: '/video/03.mp4',
        },
        {
          name: 'Street 004',
          date: '2021-02-04 ',
          time: '12:30:20',
          path: '/video/04.mp4',
        },
        {
          name: 'Street 005',
          date: '2021-02-04 ',
          time: '12:30:20',
          path: '/video/05.mp4',
        },
        {
          name: 'Street 006',
          date: '2021-02-04 ',
          time: '12:30:20',
          path: '/video/06.mp4',
        },
      ],
    }
  },
}
</script>

<style lang="less" scoped>
.wraper {
  .videoList {
    width: 100%;
    height: 1166px;
    // background: red;
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: space-between;
    .item {
      width: 818px;
      height: 370px;
      background: url('../../assets/img/ldzf/video_bg.png') no-repeat center
        center;
      background-size: 100% 100%;
      // padding: 15px;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      video {
        width: 803px;
        height: 354px;
        object-fit: fill;
      }
      .border {
        width: 0;
        height: 0;
        border-top: 12px solid transparent;
        border-right: 12px solid #4da6ff;
        border-bottom: 12px solid #4da6ff;
        border-left: 12px solid transparent;
        position: absolute;
        right: 0px;
        bottom: 0px;
      }
      .fangda {
        width: 49px;
        height: 48px;
        position: absolute;
        right: 30px;
        top: 20px;
      }
      .info {
        width: 100%;
        height: 69px;
        position: absolute;
        bottom: 0px;
        background-image: linear-gradient(to bottom, #01172c00, #01172c);
        color: #fff;
        display: flex;
        align-items: center;
        padding: 0 20px;
        box-sizing: border-box;
        justify-content: space-between;
        .item_name {
          position: relative;
          height: 27px;
          line-height: 27px;
          font-size: 26px;
          font-family: 'Helvetica';
          padding-left: 15px;
          box-sizing: border-box;
          &::before {
            content: '';
            position: absolute;
            left: 0px;
            width: 4px;
            height: 27px;
            background-image: linear-gradient(to bottom, #00afe1, #bfff00);
          }
        }
        .item_time {
          font: 24px 'Roboto';
          color: #ffe426;
          span {
            background-image: linear-gradient(to bottom, #ffffff, #c5fcf3);
            -webkit-background-clip: text;
            color: transparent;
          }
        }
      }
    }
  }
}
</style>
