// app.js
App({
  globalData: {
    userInfo: [],
  },
  onLaunch: function () {
    //获取系统信息
    wx.getSystemInfo({
      success: (res) => {
        this.system = res;
      },
    });
    //获取胶囊信息
    this.menu = wx.getMenuButtonBoundingClientRect();
    //打印数据
    console.log("系统信息", this.system);
    console.log("胶囊信息", this.menu);
  },
});
