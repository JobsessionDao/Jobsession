// pages/login/index.js
let getUserID = require("../../utils/getUserID.js");
let addUser = require("../../utils/addUser.js");
//  使用 globalData
let app = getApp();
let myAppID;
let mySecret;
let result = [];
let resl = [];
let showReal = false;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    buttonTitle: "微信一键登录",
    userID: "",
    userAvatar: "",
    userName: "",
    rt: [],
  },

  async wxlogin() {
    // let resl = await getUserID.getui.getUserID();
    // var resl;
    let dataSS = [];
    wx.cloud.init();
    wx.cloud.callFunction({
      name: "getUserID",
      complete: (res) => {
        console.log("云函数获取到的openid: ", res);
        dataSS[2] = res.result.openid;
      },
    });
    wx.getUserProfile({
      desc: "用于完善会员资料",
      //成功后会返回
      success: (res) => {
        // console.log("*******");
        // console.log(res);
        // 把你的用户信息存到一个变量中方便下面使用
        let userInfo = res.userInfo;
        dataSS[1] = userInfo.avatarUrl;
        dataSS[0] = userInfo.nickName;
        // console.log(dataSS[1]);
        //获取openId（需要code来换取）这是用户的唯一标识符
        // 获取code值
        wx.login({
          //成功放回
          success: (res) => {
            console.log(res);
            let code = res.code;
            wx.showToast({
              title: "成功",
              icon: "success",
            });
            getApp().globalData.userInfo = dataSS;
            // console.log("$$$$$"+resl);
            wx.setStorage({
              key: "userInfo",
              data: dataSS,
              success: function (res) {
                console.log("写入成功");
                wx.showToast({
                  title: "成功",
                  icon: "loading",
                  duration: 1000,
                });
                addUser.addUser.addMethod(dataSS[0], dataSS[1], dataSS[2]);
                wx.switchTab({
                  url: "/pages/index/index",
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
          fail: function (err) {
            wx.showToast({
              title: "网络错误",
              icon: "error",
            });
          },
        });
      },
    });

    //   setTimeout(function(){

    // },500)

    // console.log("跳转");
  },
  onLauch: function () {},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 在数据库 UserList 中查找是否存在 _openid 为 this.data.UserID 的数据，如果有就直接跳转到 index 页面,如果没有，则忽略
    // console.log("onShow");
    // 显示加载中，显示时间为3秒
    // setTimeout(function () {
    // 初始化云以及数据库

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
    wx.cloud.init();
    const db = wx.cloud.database();
    // 声明 settings 表
    const settings = db.collection("settings");

    // 读取 settings 表中的数据中 type 为 config 的数据
    settings
      .where({
        type: "config",
      })
      .get()
      .then((res) => {
        console.log(res);
        showReal = res.data[0].realpage;

        console.log("!!!!!!!!!!!!showReal" + res.data[0].realpage);
        if (res.data[0].realpage) {
          wx.redirectTo({
            url: "/pages/Holland copy/index",
          });
          // 停止执行后面的代码
          return;
        } else if (!res.data[0].realpage) {
          console.log("showReal" + showReal);
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
                fail: function (res) {
                  wx.showToast({
                    title: "网络错误",
                    icon: "error",
                  });
                },
              });
          }, 1000);
        }
      });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    // 向本地缓存写入数组 resl 并返回是否写入成功
  },

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
