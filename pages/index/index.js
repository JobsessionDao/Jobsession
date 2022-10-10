// index.js
let getUserID = require("../../utils/getUserID.js");
let addUser = require("../../utils/addUser.js");
let addArticle = require("../../utils/addArticle.js");
let addLike = require("../../utils/addLike.js");
let addComment = require("../../utils/addComment.js");
let addCollect = require("../../utils/addCollect.js");
// let addLike = require("../../utils/addLike.js");
// let load = require("../../utils/load.js");
let count;
let db;
let articleList;
let allLength;
let isAll = false;
Page({
  data: {
    navHeight: 0,
    top: 0,
    stateHeight: 0,
    userID: "",
    userAvatar: "",
    userName: "",
    itemList: [],

    navHeight: 0,
    top: 0,
    stateHeight: 0,
  },
  onLoad: async function (options) {
    this.topnav();
    wx.cloud.init();
    db = wx.cloud.database();
    articleList = db.collection("articleList");
    count = await db.collection("articleList").count();
    this.fn();
    this.loadMethod(1);
  },
  topnav() {
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
  onLaunch: function () {
    // this.getMenuButtonBound();
  },
  onReachBottom: async function () {
    this.loadMethod(1);
  },
  async addme() {
    // let res=await addUser.addUser.addMethod(this.data.userName,this.data.userAvatar,this.data.userID)
    let res = await addArticle.addArticle.addMethod(
      "你好这时符合度额而成的让你焦虑回复俄方和服",
      "校招",
      "这是一篇文章这是一篇文章这是一篇文章这是一篇文章这是一篇文章这是一篇文章这是一篇文章这是一篇文章这是一篇文章这是一篇文章这是一篇文章",
      1,
      [
        "https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/20221008104535.png",
        "https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/1665035307457.png",
      ],
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
    // console.log(old_data.length+"  "+count);
    if (isAll) {
      return "到底了";
    } else {
      return new Promise((resolve, reject) => {
        // 筛选 articleList 数据表中字段 number 大于 40 的数据,只选出前3条，不进行分页加载
        articleList
          .where({
            number: db.command.gt(1),
          })
          .limit(3)
          .orderBy("number", "desc")
          .get({
            success: (res) => {
              this.setData({
                itemList: res,
              });
              console.log(res);
              resolve("加载成功");
            },
          });
      });
    }
  },
  addLike: async function (e) {
    let res = await addLike.addLike.addMethod(
      "6cf53e9d63413019006937fb24b67c3d",
      this.data.userID
    );
    console.log(res);
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
  async like() {
    let res = await addLike.addLike.addMethod(
      "6cf53e9d63413019006937fb24b67c3d",
      this.data.userID
    );
    console.log(res);
    let res1 = await addComment.addComment.addMethod(
      "6cf53e9d63413019006937fb24b67c3d",
      this.data.userID,
      "你好",
      this.data.userName
    );
  },
  async collect() {
    let res = await addCollect.addCollect.addCollectMethod(
      "6cf53e9d63413019006937fb24b67c3d",
      this.data.userID,
      "你好啊",
      1
    );
    console.log(res);
  },
});
