// pages/push/index.js
// 声明 globalData
let addArticle = require("../../utils/addArticle.js");

let app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // arrary 保研、考研、校招、招聘、其他
    array: ["保研", "考研", "校招", "招聘", "其他"],
    sslected: "保研",
    title: "",
    content: "",
    images: [],
  },
  bindPickerChange: function (e) {
    console.log("picker发送选择改变，携带值为", e.detail.value);
    this.setData({
      sslected: this.data.array[e.detail.value],
    });
    console.log(this.data.sslected);
  },
  titleInput: function (e) {
    this.setData({
      title: e.detail.value,
    });
  },
  contentInput: function (e) {
    this.setData({
      content: e.detail.value,
    });
  },
  addimg: function () {
    // 如果 images 的数组长度大于等于4，提示用户，不再执行
    if (this.data.images.length >= 4) {
      wx.showToast({
        title: "最多上传4张图片",
        icon: "none",
      });
      return;
    }
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
      success: function (res) {
        console.log(res);
        that.setData({
          images: that.data.images.concat(res.tempFilePaths),
        });
        console.log(that.data.images);
      },
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

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
  /**
   * 用于向集合 articleList 添加一条文章信息
   * 参数列表，必须按顺序传入
   * @param {string} title 文章标题
   * @param {string} tag 文章标签
   * @param {string} content 文章内容
   * @param {string} type 文章类型
   * @param {List} images 图片列表
   * @param {string} author 文章作者
   * @param {string} authorID 文章作者ID
   * @param {string} authorAvatar 文章作者头像
   */
  publish1: async function () {
    //   加载两秒
    wx.showLoading({
      title: "加载中",
      mask: true,
    });
    //   如果内容和标题为空，提示用户
    if (this.data.title == "" || this.data.content == "") {
      wx.showToast({
        title: "标题和内容不能为空",
        icon: "error",
      });
      return;
    }
    //   标题超过9个字，提示用户
    if (this.data.title.length > 9) {
      wx.showToast({
        title: "标题超过9个字",
        icon: "none",
      });
      return;
    }
    var type = 1;
    // 获取 content 的内容，检查是否超出1600字，如果超出，提示用户并返回
    if (this.data.content.length > 1600) {
      wx.showToast({
        title: "内容超出1600字",
        icon: "none",
      });
      return;
    }
    // 将 content 的内容\r替换为<br/>,空白替换为 &nbsp; tab替换为 &nbsp;&nbsp;&nbsp;&nbsp;
    var content = this.data.content
      .replace(/\r/g, "<br/>")
      .replace(/\s/g, "&nbsp;")
      .replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;")
      .replace(/\n/g,"<br/>");
    // 获取当前时间
    var date = new Date();
    //   获取 globalData 中的 userInfo
    var userInfo = app.globalData.userInfo;
    // 当 images 非空时，上传图片到云存储的 images 文件夹中获取图片的 fileID 生成新的数组
    var imagesA = [];
    if (this.data.images.length != 0) {
      for (var i = 0; i < this.data.images.length; i++) {
        var res = await wx.cloud.uploadFile({
          cloudPath: "images/" + date.getTime() + i + ".png",
          filePath: this.data.images[i],
        });
        imagesA.push(res.fileID);
      }
    }
    const db = wx.cloud.database();
    const userList = db.collection("userList");
    userList
      .where({
        _openid: userInfo[2],
      })
      .update({
        // 更新 likeCre的值为+10
        data: {
          //自加10
          expCre: db.command.inc(1),
        },
        success: function (res) {
          console.log(res.data);
        },
      });
    // 调用
    let resa = await addArticle.addArticle.addMethod(
      this.data.title,
      this.data.sslected,
      content,
      type,
      imagesA,
      userInfo[0],
      userInfo[2],
      userInfo[1]
    );
    if (resa == "添加成功") {
      //   告知用户添加成功
      wx.showToast({
        title: "添加成功",
        icon: "success",
        duration: 2000,
      });
      // 返回上一页
      wx.navigateBack({
        delta: 1,
      });
    } else {
      wx.showToast({
        title: "添加失败",
        icon: "error",
        duration: 2000,
      });
    }
  },
  publish2: async function () {
    //   加载两秒
    wx.showLoading({
      title: "加载中",
      mask: true,
    });
    //   如果内容和标题为空，提示用户
    if (this.data.title == "" || this.data.content == "") {
      wx.showToast({
        title: "标题和内容不能为空",
        icon: "error",
      });
      return;
    }
    //   标题超过9个字，提示用户
    if (this.data.title.length > 9) {
      wx.showToast({
        title: "标题超过9个字",
        icon: "none",
      });
      return;
    }
    var type = 2;
    // 获取 content 的内容，检查是否超出1600字，如果超出，提示用户并返回
    if (this.data.content.length > 100) {
      wx.showToast({
        title: "内容超出100字",
        icon: "none",
      });
      return;
    }
    // 将 content 的内容\r替换为<br/>,空白替换为 &nbsp; tab替换为 &nbsp;&nbsp;&nbsp;&nbsp;
    var content = this.data.content
      .replace(/\r/g, "<br/>")
      .replace(/\s/g, "&nbsp;")
      .replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;");
    // 获取当前时间
    var date = new Date();
    //   获取 globalData 中的 userInfo
    var userInfo = app.globalData.userInfo;
    // 当 images 非空时，上传图片到云存储的 images 文件夹中获取图片的 fileID 生成新的数组
    var imagesA = [];
    if (this.data.images.length != 0) {
      wx.showModal({
        title: "警告",
        content: "问答不允许配图，图片将被忽略",
        showCancel: true,
        cancelText: "取消",
        cancelColor: "#000000",
        confirmText: "确定",
        confirmColor: "#3CC51F",
        success: (result) => {
          if (result.confirm) {
          }
        },
        fail: () => {},
        complete: () => {},
      });
    }

    // 调用
    let resa = await addArticle.addArticle.addMethod(
      this.data.title,
      this.data.sslected,
      content,
      type,
      imagesA,
      userInfo[0],
      userInfo[2],
      userInfo[1]
    );
    if (resa == "添加成功") {
      //   告知用户添加成功
      wx.showToast({
        title: "添加成功",
        icon: "success",
        duration: 2000,
      });
      // 返回上一页
      wx.navigateBack({
        delta: 1,
      });
    } else {
      wx.showToast({
        title: "添加失败",
        icon: "error",
        duration: 2000,
      });
    }
  },
  delete: function (e) {
    // 清除 images 中的对应图片

    var images = this.data.images;
    images.splice(e.currentTarget.dataset.index, 1);
    this.setData({
      images: images,
    });
    console.log(this.data.images);
    // 提示用户删除成功
    // wx.showToast({
    //   title: "删除成功",
    //   icon: "success",
    //   duration: 2000,
    // });
  },
});
