let Ws = {
  websocket: null,
  isConnetion: false,
  OpenServer: function (WSURL, param, callback) {
    let that = this;
    this.CloseSever()
    this.websocket = new WebSocket(WSURL)
    this.websocket.onopen = function () {
      callback("Successfully connected");
      let data = JSON.stringify(param);
      that.websocket.send(data);
    }
    this.websocket.onerror = function (e, mess) {
      callback(mess);
    }
    this.websocket.onclose = function (e) {
      callback("connection closed");
    }
  },
  CloseSever: function () {
    if (this.videoWebsocket != null) {
      this.videoWebsocket.close()
      this.videoWebsocket = null
    }
  }
};