// app.js
App({
  globalData: {
    userInfo: [],
    appID: "",
    mySecret: "",
  },
  onLaunch: function () {
    //获取系统信息
    wx.getSystemInfo({
      success: (res) => {
        this.system = res;
      },
    });
    wx.cloud.init({
      env: 'cloud1-1g9ks7cx68edebea',
      traceUser: true,
    })
    //获取胶囊信息
    this.menu = wx.getMenuButtonBoundingClientRect();
    //打印数据
    wx.cloud.init();
    let db = wx.cloud.database();
    let settings = db.collection("settings");
    // 获取settings 中 type 为 config 的数据
    settings
      .where({
        type: "config",
      })
      .get({
        success: (res) => {
          // 获取 res 中的config数据
          this.globalData.appID = res.data[0].appID;
          this.globalData.mySecret = res.data[0].mySecret;
        },
      });
  },
});
