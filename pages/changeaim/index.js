// pages/goal1/index.js
let updateAim = require("../../utils/updateAim.js");
// 获取 globalData
let app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    startime: "2022-10-18",
    endtime: "2023-10-18",
    goaltitle: "",
    goalcontent: "",
    userInfo: [],
  },

  onLoad() {
    this.setData({
      userInfo: app.globalData.userInfo,
    });
  },

  /**获取设置的时间 显示 */
  bindDateChange: function (e) {
    this.setData({
      startime: e.detail.value,
    });
  },

  bindDateChange111: function (e) {
    // 如果结束时间小于开始时间，提示用户
    if (e.detail.value < this.data.startime) {
      wx.showModal({
        title: "错误",
        content: "结束时间不能小于开始时间",
        success: function (res) {
          if (res.confirm) {
            // console.log("点击确认回调");
          } else {
            // console.log("点击取消回调");
          }
        },
      });
    } else {
      this.setData({
        endtime: e.detail.value,
      });
    }
  },
  /**给目标两个字段赋值 */
  getInputValue(e) {
    this.setData({
      goaltitle: e.detail,
    });
  },
  getInputValuecon(e) {
    this.setData({
      goalcontent: e.detail,
    });
  },
  async save(e) {
    // 检查title是否为空或者是否超过9个字
    if (this.data.goaltitle == "") {
      wx.showToast({
        title: "标题不能为空",
        icon: "none",
        duration: 2000,
      });
      return;
    }
    console.log(this.data.goaltitle);
    if (this.data.goaltitle.cursor > 9) {
      wx.showToast({
        title: "标题不能超过9个字",
        icon: "none",
        duration: 2000,
      });
      return;
    }
    // 检查content是否为空或者是否超过20个字
    if (this.data.goalcontent == "") {
      wx.showToast({
        title: "内容不能为空",
        icon: "none",
        duration: 2000,
      });
      return;
    }
    if (this.data.goalcontent.cursor > 20) {
      wx.showToast({
        title: "内容不能超过20个字",
        icon: "none",
        duration: 2000,
      });
      return;
    }
    console.log(this.data.userInfo);
    let res = await updateAim.updateAim.updateAimMethod(
      this.data.userInfo[2],
      this.data.goaltitle.value,
      this.data.goalcontent.value,
      this.startime,
      this.endtime
    );
    if (res == "修改成功") {
      // 提示成功
      wx.showToast({
        title: "修改成功",
        icon: "success",
        duration: 2000,
      });
      // 回到上一页
      wx.navigateBack({
        delta: 1,
      });
    } else if (res == "修改失败") {
      wx.showToast({
        title: "修改失败",
        icon: "none",
        duration: 2000,
      });
    }
  },
});
