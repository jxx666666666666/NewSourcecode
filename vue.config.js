module.exports = {
  publicPath: "./", // basic path
  devServer: {
    port: 3066,
    hot: false,
    open: false,
    liveReload: false,
    proxy: {
      "/newretail": {
        target: "http://172.16.1.186:8026",
        changeOrigin: true,
        pathRewrite: {
          "^/newretail": "http://172.16.1.186:8026",
        },
      },
      "/IVSUrl": {
        target: "https://10.200.55.20:18531/",
        changeOrigin: true,
        pathRewrite: {
          "^/IVSUrl": "",
        },
      },
      "/weatherApi": {
        target: "https://api.openweathermap.org/data/2.5/",
        changeOrigin: true,
        pathRewrite: {
          "^/weatherApi": "",
        },
      },
      "/netecoApi": {
        target: "https://192.168.8.14:32102/",
        changeOrigin: true,
        pathRewrite: {
          "^/netecoApi": "",
        },
      },
      "/aaaApi": {
        target: "https://10.246.37.203:8001/",
        changeOrigin: true,
        pathRewrite: {
          "^/aaaApi": "",
        },
      },
      "/middleApi": {
        //Middle platform
        target: "https://10.246.37.89:8084/",
        changeOrigin: true,
        pathRewrite: {
          "^/middleApi": "",
        },
      },
    },
  },
  // Use when packaging
  // configureWebpack: () => {
  //   return {
  //     plugins: [
  //       new UglifyJsPlugin({
  //         uglifyOptions: {
  //           compress: {
  //             drop_console: true, // explanatory note console
  //             drop_debugger: true, // explanatory note debugger
  //             pure_funcs: ['console.log'], //  remove console.log
  //           }
  //         }
  //       })
  //     ]
  //   }
  // }
};
