export default class WsCustom {
  static websocket = null;
  static isConnetion = false;
  static async init() {
    let that = this;
    this.closeSever();
    this.websocket = new WebSocket(window.streamingConfig.WSURL);

    //Open the ws service and send a message
    this.websocket.onopen = function (param) {
      let data = JSON.stringify(param);
      that.websocket.send(data);
    };
    this.websocket.onerror = function (e, mess) { };
    this.websocket.onclose = function (e) { };
    this.websocket.onmessage = function (evt) {
      let data = {};
      try {
        data = JSON.parse(evt.data);
      } catch (error) {
        return;
      }
      switch (data.Key) {
        case 'playTail':
          that.playTailMessage(data.Value);
          break;
        case 'showTrail':
          that.showTrailMessage(data.Value);
          break;
        case 'closeTrail':
          that.closeTrailMessage();
          break;
        case 'closePanel':
          that.closePanelMessage();
          break;
        default:
          break;
      }
    };
  }

  static closeSever() {
    if (this.videoWebsocket != null) {
      this.videoWebsocket.close();
      this.videoWebsocket = null;
    }
  }

  static playTailMessage(tailId) {
    if (this.playTailEvent == null) {
      this.playTailEvent = new CustomEvent('playTailMessage', {
        detail: {
          tailId: '',
        },
      });
    }
    this.playTailEvent.detail.tailId = tailId;
    window.dispatchEvent(this.playTailEvent);
  }
  // View the trajectory of blacklisted personnel
  static showTrailMessage(data) {
    this.showTrailEvent = new CustomEvent('showTrailMessage', {
      detail: data,
    });
    window.dispatchEvent(this.showTrailEvent);
  }
  // View the trajectory of blacklisted personnel
  static closeTrailMessage() {
    if (this.closeTrailEvent == null) {
      this.closeTrailEvent = new CustomEvent('closeTrailMessage');
    }
    window.dispatchEvent(this.closeTrailEvent);
  }
  // View the trajectory of blacklisted personnel
  static closePanelMessage(data) {
    this.closePanelEvent = new CustomEvent('closePanelMessage', {
      detail: data,
    });
    window.dispatchEvent(this.closePanelEvent);
  }
}
