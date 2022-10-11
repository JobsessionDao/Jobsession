// pages/search/index.js
let count;
let db;
let articleList;
let allLength;
let isAll = false;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    navHeight: 0,
    top: 0,
    stateHeight: 0,
    srh: "",
    itemList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.topnav();
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
  inps: async function () {
    wx.cloud.init();
    db = wx.cloud.database();
    count = await db.collection("articleList").count();
    await this.loadMethod();
    this.onLoad();
  },
  inputTitle: function (e) {
    this.setData({
      srh: e.detail.value,
    });
  },
  onReachBottom: async function () {
    db = wx.cloud.database();
    articleList = db.collection("articleList");
    count = await db.collection("articleList").count();
    console.log("触底");
    await this.loadMethod();
  },
  loadMethod: async function (aType) {
    let sho = this.data.srh;
    let old_data = this.data.itemList;
    console.log(old_data.length + "  " + count);
    if (isAll) {
      return "到底了";
    } else {
      return new Promise((resolve, reject) => {
        articleList = db.collection("articleList");
        // 查找 articleList 集合中的 articleTitle 包含 sho 中的字符的数据
        articleList
          .where({
            articleTitle: db.RegExp({
              regexp: sho,
              options: "i",
            }),
          })
          .skip(this.data.itemList.length)
          .get({
            success: (res) => {
              console.log(res);
              if (old_data.concat(res.data).length === allLength) {
                isAll = true;
              }
              allLength = old_data.concat(res.data).length;
              this.setData({
                itemList: res.data,
              });
            },
          });
      });
    }
  },
  navBack: function () {
    wx.switchTab({
      url: "/pages/index/index",
    });
  },
  goToDetail1: function (e) {
    let item = e.currentTarget.dataset.item;
    console.log(item);
    wx.navigateTo({
      url: "/pages/EXPdetail/index?data=" + JSON.stringify(item),
    });
  },
  goToDetail2: function (e) {
    let item = e.currentTarget.dataset.item;
    console.log(item);
    wx.navigateTo({
      url: "/pages/QaAdetail/index?data=" + JSON.stringify(item),
    });
  },
});
