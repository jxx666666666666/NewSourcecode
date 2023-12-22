<template>
  <div id="playWnd" class="playWnd"></div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      constWidth: 1800,
      constHeight: 1100,
      width: 1800,
      height: 1100,
      pubKey: "",
      videoList: [
        { cameraIndexCode: "42e4a2d7abc44618be290e2fd98c33a9" },
        { cameraIndexCode: "31b5460298914a07a8c56af9dbc588bd" },
        { cameraIndexCode: "d287d6b489ab47528bff5f6ae08be172" },
        { cameraIndexCode: "88ee8257fb6e4052a3997dc75b34b90a" },
        { cameraIndexCode: "818ff1dc9d1d464fbd9fb64625962f1f" },
        { cameraIndexCode: "2224e7c2b02a4d7aa8093c6add988433" },
      ],
    };
  },
  created() {
    this.getScale();
    window.addEventListener("resize", this.resize.bind(this));
    window.addEventListener("scroll", this.resize.bind(this));

    this.initPlugin();
  },
  methods: {
    // Create playback instance
    initPlugin() {
      let that = this;
      window.oWebControl = new WebControl({
        szPluginContainer: "playWnd", // Specify container ID
        iServicePortStart: 15900, // Specify the start and end port numbers, it is recommended to use this value
        iServicePortEnd: 15909,
        szClassId: "23BF3B0A-2C56-4D97-9C03-0CB103AA8F11", // Clsid for IE10 using ActiveX
        cbConnectSuccess: function () {
          // Successfully created WebControl instance
          oWebControl
            .JS_StartService("window", {
              // After the WebControl instance is successfully created, the service needs to be started
              dllPath: "./VideoPluginConnect.dll", // value"./VideoPluginConnect.dll"Hard code
            })
            .then(
              function () {
                // Successfully started plugin service
                oWebControl.JS_SetWindowControlCallback({
                  // Set message callback
                  cbIntegrationCallBack: that.cbIntegrationCallBack,
                });

                oWebControl
                  .JS_CreateWnd("playWnd", that.width, that.height)
                  .then(function () {
                    //JS_ Create a video playback window with adjustable width and height
                    that.init(); // Initialize after successfully creating a playback instance
                  });
              },
              function () {
                // Failed to start plugin service
              }
            );
        },
        cbConnectError: function () {
          // Failed to create WebControl instance
          oWebControl = null;
          $("#playWnd").html("The plugin has not started, attempting to start. Please wait...");
          WebControl.JS_WakeUp("VideoWebPlugin://"); // When the program is not started, execute the error function and use wakeup to start the program
          initCount++;
          if (initCount < 3) {
            setTimeout(function () {
              initPlugin();
            }, 3000);
          } else {
            $("#playWnd").html("The plugin failed to start. Please check if the plugin is installed!");
          }
        },
        cbConnectClose: function (bNormalClose) {
          // Abnormal disconnection：bNormalClose = false
          // JS_DisconnectNormally Open：bNormalClose = true
          console.log("cbConnectClose");
          oWebControl = null;
        },
      });
    },
    playVideo() {
      var streamMode = 1; //Main and sub stream identification: 0- main stream, 1- sub stream
      var transMode = 1; //Transmission protocol: 0-UDP，1-TCP
      var gpuMode = 0; //Enable GPU hard unlocking, 0- not enabled, 1- enabled

      this.videoList.forEach((element, index) => {
        let cameraIndexCode = element.cameraIndexCode.replace(/(^\s*)/g, "");
        oWebControl.JS_RequestInterface({
          funcName: "startPreview",
          argument: JSON.stringify({
            cameraIndexCode: cameraIndexCode, //Monitoring point number
            streamMode: streamMode, //Main sub stream identification
            transMode: transMode, //Transport Protocol
            gpuMode: gpuMode, //Is GPU hard unlocking enabled
            wndId: ++index, //Can specify playback window
          }),
        });
      });
    },
    cbIntegrationCallBack(oData) {
      console.log(JSON.stringify(oData.responseMsg));
      return;
    },
    //  * @Descripttion:  Real-time data access service
    //  * @version: 3.3.4
    //  * @Author: guanzhuyu
    //  * @Date: 2022-10-12 13:21:13
    //  * @LastEditors: kangzesheng
    //  * @LastEditTime: 2023-01-12 13:25:25
    init() {
      let that = this;
      this.getPubKey(function () {
        ////////////////////////////////// Please modify the following variable values yourself	////////////////////////////////////
        var appkey = window.streamingConfig.videoAppkey; // Appkey, required
        var secret = that.setEncrypt(window.streamingConfig.videoSecret); // secret，required
        var ip = window.streamingConfig.videoServerIP; // Platform IP address, required
        var playMode = 0; //Initial playback mode: 0-preview, 1-playback
        var port = window.streamingConfig.videoServerPort; //If HTTPS protocol is enabled, the default is 443
        var snapDir = "D:\\SnapDir"; //Snap storage path
        var videoDir = "D:\\VideoDir"; //Emergency recording or video editing storage path
        var layout = "2x2"; //PlayMode specifies the layout of the mode
        var enableHTTPS = 1; //Whether to enable HTTPS protocol to interact with video management platform, always fill in 1 here
        var encryptedFields = "secret"; //Encryption field, default encryption domain is secret
        var showToolbar = 0; //Whether to display the toolbar, 0- not displayed, not 0- displayed
        var showSmart = 1; //Whether to display intelligent information (such as the wireframe on the screen after configuring motion detection)，0- not displayed, not 0- displayed
        var buttonIDs = ""; //Customize toolbar buttons
        ////////////////////////////////// Please modify the above variable values yourself	////////////////////////////////////

        oWebControl
          .JS_RequestInterface({
            funcName: "init",
            argument: JSON.stringify({
              appkey: appkey, //Appkey provided by API gateway
              secret: secret, //Secret provided by API gateway
              ip: ip, //API Gateway IP Address
              playMode: playMode, //Playback mode (determines whether to display preview or playback interface)
              port: port, //port
              snapDir: snapDir, //Snap storage path
              videoDir: videoDir, //Emergency recording or video editing storage path
              layout: layout, //layout
              enableHTTPS: enableHTTPS, //Enable HTTPS protocol
              encryptedFields: encryptedFields, //Encrypted field
              showToolbar: showToolbar, //Show toolbar or not
              showSmart: showSmart, //Whether to display intelligent information
              buttonIDs: buttonIDs, //Customize toolbar buttons
            }),
          })
          .then(function (oData) {
            oWebControl.JS_Resize(that.width, that.height); // Resize once after initialization to avoid the issue of the plugin window not overlapping with the DIV window after the first display in Firefox

            setTimeout(() => {
              that.playVideo();
            }, 1000);
          });
      });
    },

    //Obtain Public Key
    getPubKey(callback) {
      let that = this;
      oWebControl
        .JS_RequestInterface({
          funcName: "getRSAPubKey",
          argument: JSON.stringify({
            keyLength: 1024,
          }),
        })
        .then(function (oData) {
          console.log(oData);
          if (oData.responseMsg.data) {
            that.pubKey = oData.responseMsg.data;
            callback();
          }
        });
    },

    //rsa encryption
    setEncrypt(value) {
      var encrypt = new JSEncrypt();
      encrypt.setPublicKey(this.pubKey);
      return encrypt.encrypt(value);
    },

    // Set window clipping, when the window needs to be covered due to scrolling, JS is required_ CuttingPartWindow
    setWndCover() {
      var iWidth = $(window).width();
      var iHeight = $(window).height();
      var oDivRect = $("#playWnd").get(0).getBoundingClientRect();

      var iCoverLeft = oDivRect.left < 0 ? Math.abs(oDivRect.left) : 0;
      var iCoverTop = oDivRect.top < 0 ? Math.abs(oDivRect.top) : 0;
      var iCoverRight =
        oDivRect.right - iWidth > 0 ? Math.round(oDivRect.right - iWidth) : 0;
      var iCoverBottom =
        oDivRect.bottom - iHeight > 0
          ? Math.round(oDivRect.bottom - iHeight)
          : 0;

      iCoverLeft = iCoverLeft > this.width ? this.height : iCoverLeft;
      iCoverTop = iCoverTop > this.height ? this.height : iCoverTop;
      iCoverRight = iCoverRight > this.width ? this.width : iCoverRight;
      iCoverBottom = iCoverBottom > this.height ? this.height : iCoverBottom;

      oWebControl.JS_RepairPartWindow(0, 0, this.width + 1, this.height); // One more pixel point to prevent missing one pixel bar at the boundary after restoration
      if (iCoverLeft != 0) {
        oWebControl.JS_CuttingPartWindow(0, 0, iCoverLeft, this.height);
      }
      if (iCoverTop != 0) {
        oWebControl.JS_CuttingPartWindow(0, 0, this.width + 1, iCoverTop); // Cut off one more pixel bar to prevent the appearance of a pixel bar after cutting off a portion of the window
      }
      if (iCoverRight != 0) {
        oWebControl.JS_CuttingPartWindow(
          this.width - iCoverRight,
          0,
          iCoverRight,
          this.height
        );
      }
      if (iCoverBottom != 0) {
        oWebControl.JS_CuttingPartWindow(
          0,
          this.height - iCoverBottom,
          this.width,
          iCoverBottom
        );
      }
    },

    getScale() {
      let visibleWidth = window.innerWidth;
      let visibleHeight = window.innerHeight;
      var widthPercentage = (1.0 * visibleWidth) / 7680;
      var heightPercentage = (1.0 * visibleHeight) / 2160;
      let scale = Math.min(widthPercentage, heightPercentage);

      this.width = this.constWidth * scale;
      this.height = this.constHeight * scale;
    },

    resize() {
      this.getScale();
      if (oWebControl != null) {
        oWebControl.JS_Resize(this.width, this.height);
        this.setWndCover();
      }
    },
  },
  destroyed() {
    if (oWebControl != null) {
      oWebControl.JS_HideWnd(); // Hide the window first to avoid the possibility of plugin windows disappearing behind the browser
      oWebControl.JS_Disconnect().then(
        function () {
          // Successfully disconnected from plugin service
        },
        function () {
          // Failed to disconnect from plugin service
        }
      );
    }
  },
};
</script>

<style lang="less" scoped>
.playWnd {
  width: 1800px;
  height: 1100px;
  margin-top: 60px;
}
</style>
