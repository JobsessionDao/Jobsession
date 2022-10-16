// pages/myCollection/index.js
let getUserID = require("../../utils/getUserID.js");
let addUser = require("../../utils/addUser.js");
let addArticle = require("../../utils/addArticle.js");
let addLike = require("../../utils/addLike.js");
let addComment = require("../../utils/addComment.js");
let addCollect = require("../../utils/addCollect.js");

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
        itemList: [],
        CollectList: [],
        navBgColor: "linear-gradient(90deg, rgba(212, 225, 255, 0.64) 0%, rgba(255, 220, 212, 0.66) 100%)",
        //卡片页脚图片
        EXPleft: "../../images/icons/tag_s2.png",
        EXPright: "../../images/icons/likeicon.png",
        QAleft: "../../images/icons/tag_s1.png",
        QAright: "../../images/icons/commenticon.png",
        EXPcolor: "rgba(0, 81, 255, 0.1)",
        QAcolor: "rgba(255, 87, 51, 0.2)",
        EXPtxcolor: "rgba(0, 81, 255, 1)",
        QAtxcolor: "rgba(255, 87, 51, 1)"
    },
    // loadMethod: async function (aType) {
    //     let old_data = this.data.itemList;
    //     // console.log(old_data.length+"  "+count);
    //     if (isAll) {
    //         return "到底了";
    //     } else {
    //         return new Promise((resolve, reject) => {
    //             articleList
    //                 .where({
    //                     type: aType,
    //                 })
    //                 .skip(this.data.itemList.length)
    //                 .get()
    //                 .then((res) => {
    //                     console.log(res.data);
    //                     console.log(old_data.concat(res.data).length);
    //                     if (old_data.concat(res.data).length === allLength) {
    //                         isAll = true;
    //                     }
    //                     allLength = old_data.concat(res.data).length;
    //                     this.setData({
    //                         itemList: old_data.concat(res.data)
    //                     })
    //                     // resolve(old_data.concat(res.data.data));
    //                 });
    //         });
    //     }
    // },

    onLoad: async function (options) {
        wx.cloud.init();
        var that = this;
        let db = wx.cloud.database();
        let userList = db.collection("userList");
        // 获取 userid 对应的用户的 linkeCre、expCre、collectNum、CollectList、CreateList赋值给data中对应变量
        userList
            .where({
                userID: getApp().globalData.userInfo[2],
            })
            .get({
                success: function (res) {
                    // 获取 res 中的linkeCre、expCre、collectNum、CollectList、CreateList数据
                    console.log(res.data);
                    console.log(res.data[0].CollectList)
                    that.setData({
                        CollectList: res.data[0].CollectList,
                    });
                    //   console.log("!!!"this.data.CollectList);
                },
            });
    },

    onReachBottom: async function () {
        // db = wx.cloud.database();
        // articleList = db.collection("articleList");
        // count = await db.collection("articleList").count();
        // await this.loadMethod(1);
    },

    goToDetail: function (e) {
        let item = e.currentTarget.dataset.item
        if (item.type == 1) {
            console.log(item)
            wx.navigateTo({
                url: '/pages/EXPdetail/index?data=' + item._id,
            })
        } else {
            wx.navigateTo({
                url: '/pages/QaAdetail/index?data=' + item._id,
            })
        }

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})