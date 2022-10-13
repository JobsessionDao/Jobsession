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
        navBgColor:"linear-gradient(90deg, rgba(212, 225, 255, 0.64) 0%, rgba(255, 220, 212, 0.66) 100%)",
        //卡片页脚图片
        EXPleft:"../../images/icons/tag_s2.png",
        EXPright:"../../images/icons/likeicon.png",
        QAleft:"../../images/icons/tag_s1.png",
        QAright:"../../images/icons/commenticon.png",
    },
    loadMethod: async function (aType) {
        let old_data = this.data.itemList;
        // console.log(old_data.length+"  "+count);
        if (isAll) {
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
                        console.log(old_data.concat(res.data).length);
                        if (old_data.concat(res.data).length === allLength) {
                            isAll = true;
                        }
                        allLength = old_data.concat(res.data).length;
                        this.setData({
                            itemList: old_data.concat(res.data)
                        })
                        // resolve(old_data.concat(res.data.data));
                    });
            });
        }
    },

    onLoad: async function (options) {
        wx.cloud.init();
        db = wx.cloud.database();
        articleList = db.collection("articleList");
        count = await db.collection("articleList").count();
        this.loadMethod(1);
    },

    onReachBottom: async function () {
        db = wx.cloud.database();
        articleList = db.collection("articleList");
        count = await db.collection("articleList").count();
        await this.loadMethod(1);
    },

    goToDetail: function (e) {
        let item = e.currentTarget.dataset.item
        console.log(item)
        wx.navigateTo({
            url: '/pages/EXPdetail/index?data=' + item._id,
        })
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