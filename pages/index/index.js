// index.js
let getUserID = require("../../utils/getUserID.js");
let addUser = require("../../utils/addUser.js");
let addArticle = require("../../utils/addArticle.js");
// let load = require("../../utils/load.js");
let count;
let db;
let articleList;
Page({
  data: {
    navHeight: 0,
    top: 0,
    stateHeight: 0,
    userID: "",
    userAvatar: "",
    userName: "",
    itemList: [],
  },
  onLoad: async function (options) {
    wx.cloud.init();
    db = wx.cloud.database();
    articleList = db.collection("articleList");
    count = await db.collection("articleList").count();
    this.fn();
    this.loadMethod(1);
    // this.setData({
    //   itemList: await load.loadItems.loadMethod(1, this.data.itemList),
    // });
  },
  onLaunch: function () {
    // this.getMenuButtonBound();
  },
  onReachBottom:async function(){
    this.loadMethod(1);
  },
  async addme() {
    // let res=await addUser.addUser.addMethod(this.data.userName,this.data.userAvatar,this.data.userID)
    let res = await addArticle.addArticle.addMethod(
      "你好",
      "校招",
      "这是一段dddd",
      2,
      [],
      this.data.userName,
      this.data.userID,
      this.data.userAvatar
    );

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
  loadMethod: async function (aType) {
    let old_data = this.data.itemList;
    if (old_data.length === count) {
      return "到底了";
    } else {
      return new Promise((resolve, reject) => {
        articleList
          .where({
            type: aType,
          })
          .skip(this.data.itemList.length)
          .get()
          .then((res) => {
            console.log(res.data);
            console.log(old_data.concat(res.data));
            this.setData({
              itemList:old_data.concat(res.data)
            })
            // resolve(old_data.concat(res.data.data));
          });
      });
    }
  },
  async login() {
    // 用户登录
    let resl = await getUserID.getui.getUserID();
    this.setData({
      userID: resl[2],
      userAvatar: resl[1],
      userName: resl[0],
    });
    console.log("!!" + this.data.userID + this.data.userAvatar);
  },
});
