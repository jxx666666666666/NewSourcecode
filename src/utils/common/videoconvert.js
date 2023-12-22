import guid from "./guid";
export default class VideoConvert {
  static playVideo(video, url) {
    let player = flvjs.createPlayer({
      type: "flv",
      isLive: true,
      url: `ws://127.0.0.1:8888/rtsp/${guid.newGuid()}/?url=${url}`,
    });

    player.attachMediaElement(video);
    player.load();
    player.play();
  }
  static stopVideo(player) {}
  static closeVideo(player) {
    if (player) {
      player.unload();
      player.detachMediaElement();
      player.destroy();
    }
  }
}