// pages/login/index.js
let getUserID = require("../../utils/getUserID.js");
let addUser = require("../../utils/addUser.js");
//  使用 globalData
let app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    buttonTitle: "微信一键登录",
    userID: "",
    userAvatar: "",
    userName: "",
  },
  async wxlogin() {
    let resl = await getUserID.getui.getUserID();
    this.setData({
      userID: resl[2],
      userAvatar: resl[1],
      userName: resl[0],
      bottonTitle: "正在登录",
    });

    let res = await addUser.addUser.addMethod(
      this.data.userName,
      this.data.userAvatar,
      this.data.userID
    );
    // 向本地缓存写入数组 resl 并返回是否写入成功
    wx.setStorage({
      key: "userInfo",
      data: resl,
      success: function (res) {
        console.log("写入成功");
        wx.showToast({
          title: "成功",
          icon: "loading",
          duration: 1000,
        });
        wx.switchTab({
          url: "../index/index",
        });
      },
      fail: function (res) {
        wx.showToast({
          title: "失败",
          icon: "loading",
          duration: 1000,
        });
        console.log("写入失败");
      },
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 在数据库 UserList 中查找是否存在 _openid 为 this.data.UserID 的数据，如果有就直接跳转到 index 页面,如果没有，则忽略
    // console.log("onShow");
    // 显示加载中，显示时间为3秒
    // setTimeout(function () {
    var that = this;

    wx.getStorage({
      key: "userInfo",
      success: function (res) {
        console.log("读取成功");
        console.log(res.data);
        // resl = res.data;
        that.setData({
          userID: res.data[2],
          userAvatar: res.data[1],
          userName: res.data[0],
        });
        // 为 app.globalData.userInfo 赋值
        getApp().globalData.userInfo = res.data;
      },
      fail: function (res) {
        console.log("读取失败");
      },
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    wx.showToast({
      title: "加载中",
      icon: "loading",
      duration: 2000,
    });
    // }, 200);
    setTimeout(() => {
      console.log("定时");
      console.log("!!!" + this.data.userID);

      wx.cloud.init();
      const db = wx.cloud.database();
      const userList = db.collection("userList");
      userList
        .where({
          userID: this.data.userID,
        })
        .get({
          success: function (res) {
            console.log(res);
            if (res.data.length != 0) {
              console.log("已经登录过了");
              wx.switchTab({
                url: "../index/index",
              });
            }
          },
        });
    }, 1000);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
});
