// pages/EXPdetail/EXPdetail.js
let getUserID = require("../../utils/getUserID.js");
let addUser = require("../../utils/addUser.js");
let getArticle = require("../../utils/getArticle.js");
let addLike = require("../../utils/addLike.js");
let addComment = require("../../utils/addComment.js");
let addCollect = require("../../utils/addCollect.js");

const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        praiseJudge: 0,
        likeNum: -1,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        console.log(options.data)
        let item = options.data
        item = JSON.parse(item)
        console.log("++++" + item)
        this.setData({
            item: item
        })
        for (var a = 0; a < this.data.item.time.length; a++) {
            var unixTimestamp = new Date(this.data.item.time)
            var datestr = unixTimestamp.getFullYear() + "-" + (unixTimestamp.getMonth() + 1) + "-" + unixTimestamp.getDate();
            this.data.item.time = datestr;
        }
        console.log(this.data)

        let Art = await getArticle.getArticle.getArticleMethod(this.data.item._id);
        // console.log(Art)
        this.setData({
            likeNum : Art.likeList.length,
        })
        console.log(this.data.likeNum)
    },

    praise: async function (e) {
        console.log(app.globalData.userInfo[2]);
        console.log(this.data.item._id);
        let res = await addLike.addLike.addMethod(this.data.item._id, app.globalData.userInfo[2]);
        if (res == "点赞成功") {
            this.data.praiseJudge = 1;
            this.setData({
                likeNum : this.data.likeNum + 1,
            })
        } else if (res == "取消点赞成功") {
            this.data.praiseJudge = 2;
            this.setData({
                likeNum : this.data.likeNum - 1,
            })
        } else if (res == "点赞失败") {
            this.data.praiseJudge = -1;
            wx.showToast({
              title: '点赞失败',
              icon:"error",
            })
        } else if(res == "取消点赞失败"){
            this.data.praiseJudge = -2;
            wx.showToast({
                title: '取消点赞失败',
                icon:"error",
            })
        }


        console.log(this.data.praiseJudge)
        console.log("*****"+res)

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