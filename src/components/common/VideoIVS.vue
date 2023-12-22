<template>
  <video ref="video" controls autoplay muted style="object-fit:fill"></video>
</template>

<script>
import videoconvert from "../../utils/common/videoconvert.js";
import { IVSPost } from "../../api/baseAPI.js"
export default {
  props: {
    cameraCode: "",
  },
  data() {
    return {
      player: null,
    }
  },
  methods: {
    async getRtspUrl(code) {
      if (!code) return false;
      let data = await IVSPost('video/rtspurl/v1.0', {
        "cameraCode": code,
        "mediaURLParam": {
          "broadCastType": 0,
          "packProtocolType": 1,
          "protocolType": 2,
          "serviceType": 1,
          "streamType": 1,
          "transMode": 0,
          "clientType": 1
        }
      });
      if (data && data.data && data.data.rtspURL) {
        this.playVideo(data.data.rtspURL)
      }
    },
    playVideo(url) {
      this.player = videoconvert.playVideo(this.$refs.video, encodeURIComponent(url));
    }
  },
  mounted() {
    this.getRtspUrl(this.cameraCode)
  },
  beforeDestroy() {
    videoconvert.closeVideo(this.player);
    this.player = null;
  },
  watch: {
    cameraCode: {
      handler(code) {
        this.getRtspUrl(code)
      },
    },
  },
};
</script>

<style></style>
