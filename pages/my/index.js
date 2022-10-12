// pages/my/index.js
// gloablData
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: [],
    likeCre: 0,
    expCre: 0,
    collectNum: 0,
    CollectList: [],
    CreateList: [],
  },
  // 用于我的经验，我的互助，职业测评，我的目标，收藏 页面函数
  jump1: function () {
    wx.switchTab({
      url: "/pages/index/index",
    });
  },
  jump2: function () {
    wx.switchTab({
      url: "/pages/index/index",
    });
  },
  jump3: function () {
    wx.switchTab({
      url: "/pages/index/index",
    });
  },
  jump4: function () {
    wx.switchTab({
      url: "/pages/index/index",
    });
  },
  collection: function () {
    wx.switchTab({
      url: "/pages/index/index",
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo,
    });
    var userid = this.data.userInfo[2];
    wx.cloud.init();
    let db = wx.cloud.database();
    let userList = db.collection("userList");
    // 获取 userid 对应的用户的 linkeCre、expCre、collectNum、CollectList、CreateList赋值给data中对应变量
    userList
      .where({
        userID: userid,
      })
      .get({
        success: function (res) {
          // 获取 res 中的linkeCre、expCre、collectNum、CollectList、CreateList数据
          console.log(res.data);
          this.setData({
            likeCre: res.data[0].likeCre,
            expCre: res.data[0].expCre,
            collectNum: res.data[0].collectNum,
            CollectList: res.data[0].CollectList,
            CreateList: res.data[0].CreateList,
          });
        },
      });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  exit: function () {
    // 清除 userInfo 缓存
    wx.clearStorageSync("userInfo");
    wx.navigateTo({
      url: "/pages/login/index",
    });
  },
  goholland: function () {
    wx.navigateTo({
      url: "/pages/Holland/index",
    });
  },
  goaim: function () {
    wx.navigateTo({
      url: "/pages/aim/index",
    });
  },
});
