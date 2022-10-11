// pages/goal/index.js
// 声明 globalData
let app = getApp();
let getAim = require("../../utils/getAim.js");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    goaltitle: "成为前端工程师",
    goalcontent: "进入大厂工作，赚到第一桶金",
    startime: "2022-10-08",
    endtime: "2022-10-19",
    year: "",
    day: " ",
    hour: "",
    min: " ",
    sec: "",
    userInfo: [],
    myAim: [],
    daojishi: "",
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    this.setData({
      userInfo: app.globalData.userInfo,
    });
    let res = await getAim.getAim.getAimMethod(app.globalData.userInfo[2]);
    this.setData({
      myAim: res,
    });
    console.log("myAim = ", this.data.myAim);
    this.countDown(this.data.myAim.endDate);
    this.setData({
      startime: new Date(this.data.myAim.startDate).toString(),
      endtime: new Date(this.data.myAim.endDate).toString(),
    });
    把startime转为字符串;
    // let startime = this.data.startime.toString();
    // 对 endTime 格式化为 年-月-日 的格式
    let endTime = new Date(this.data.myAim.endDate);
    // 计算从 myAim.beginDate 到 myAim.endDate 的时间差（年、天、时、分、秒）
  },
  countDown: function (endTime) {
    var that = this;

    var end_time = new Date(endTime).getTime();
    that.setData({
      timer: setInterval(function () {
        //周期计时器，每隔1秒执行一次方法里的代码
        //得到一个从现在时间开始到活动结束的时间戳
        var downTime = parseInt(
          new Date(end_time).getTime() - new Date().getTime()
        );
        // 倒计时结束
        if (downTime <= 0) {
          that.setData({
            day: "00",
            hour: "00",
            min: "00",
            sec: "00",
          });
          //结束周期计时器
          clearInterval(that.data.timer);
          return;
        }
        //计算距离活动还有多少天、时、分、秒
        var d = parseInt(downTime / 1000 / 3600 / 24);
        var h = parseInt((downTime / 1000 / 3600) % 24);
        var m = parseInt((downTime / 1000 / 60) % 60);
        var s = parseInt((downTime / 1000) % 60);
        //统一格式的显示
        d < 10 ? (d = "0" + d) : d;
        h < 10 ? (h = "0" + h) : h;
        m < 10 ? (m = "0" + m) : m;
        s < 10 ? (s = "0" + s) : s;
        //同步显示
        that.setData({
          day: d,
          hour: h,
          min: m,
          sec: s,
        });
        // console.log("day = ", that.data.day);
      }, 1000),
    });
  },
  timecount() {
    var that = this;
    // 计算从现在到 myAim.endDate 的时间倒计时，更新到页面
    timer: setInterval(function () {
      let now = new Date();
      let endDate = new Date(that.data.myAim.endDate);
      let time = endDate.getTime() - now.getTime();
      let year = Math.floor(time / (1000 * 60 * 60 * 24 * 365));
      let day = Math.floor(
        (time % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24)
      );
      let hour = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let min = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
      let sec = Math.floor((time % (1000 * 60)) / 1000);
      that.setData({
        year: year,
        day: day,
        hour: hour,
        min: min,
        sec: sec,
      });
      console.log("year = ", year);
    }, 1000);
  },
  //跳转页面
  gotoPage: function () {
    wx.navigateTo({
      url: "/pages/changeaim/index",
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},
});
