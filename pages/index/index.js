// index.js
let getUserID = require("../../utils/getUserID.js");
let addUser= require("../../utils/addUser.js");

Page({
  data: {
    navHeight: 0,
    top: 0,
    stateHeight: 0,
    userID: "",
    userAvatar:"",
    userName:"",
  },
  onLoad: async function (options) {
    wx.cloud.init();
    let resl = await getUserID.getui.getUserID();
    this.setData({
      userID: resl[2],
      userAvatar:resl[1],
      userName:resl[0],
    });
    console.log("!!"+this.data.userID+this.data.userAvatar);
    this.fn();
  },
  onLaunch: function () {
    // this.getMenuButtonBound();
  },
  async addme() {
    let res=await addUser.addUser.addMethod(this.data.userName,this.data.userAvatar,this.data.userID)
    console.log(res);
  },
  //  获取状态栏信息
  fn() {
    let stateHeight = 0; //  接收状态栏高度
    let navHeight = wx.getMenuButtonBoundingClientRect().height; //  获取胶囊高度
    let top = 0;
    wx.getSystemInfo({
      success(res) {
        console.log("状态栏：" + res.statusBarHeight);
        stateHeight = res.statusBarHeight;
      },
    });
    top = wx.getMenuButtonBoundingClientRect().top - stateHeight; //  获取top值
    //  然后将取到的值返回在data里面
    this.setData({
      navHeight: navHeight + top * 2, //  导航栏高度
      stateHeight: stateHeight, //  状态栏高度
    });
  },
});
