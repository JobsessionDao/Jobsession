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
        praiseJudge: 2,
        likeNum: 0,
        textColor: "rgba(0, 0, 0, 1)",
        commentTest: null,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        console.log(options.data)
        let item = options.data
        console.log("++++" + item)
        console.log(options.data)

        //获取点赞
        let Art = await getArticle.getArticle.getArticleMethod(item);
        this.setData({
            likeNum: Art.likeList.length,
            item: Art
        })
        for (var a = 0; a < this.data.item.time.length; a++) {
            var unixTimestamp = new Date(this.data.item.time)
            var datestr = unixTimestamp.getFullYear() + "-" + (unixTimestamp.getMonth() + 1) + "-" + unixTimestamp.getDate();
            this.data.item.time = datestr;
        }
        console.log(this.data.likeNum)

        //获得当前用户点赞状态
        for (let i = 0; i < this.data.item.likeList.length; i++) {
            if (app.globalData.userInfo[2] == this.data.item.likeList[i]) {
                this.setData({
                    praiseJudge: 1,
                    textColor: "rgba(0, 81, 255, 1)"
                })
                break;
            }

        }
        console.log(this.data.praiseJudge)
    },

    praise: async function (e) {
        console.log(app.globalData.userInfo[2]);
        console.log(this.data.item._id);
        let res = await addLike.addLike.addMethod(this.data.item._id, app.globalData.userInfo[2]);
        if (res == "点赞成功") {
            this.setData({
                likeNum: this.data.likeNum + 1,
                textColor: "rgba(0, 81, 255, 1)",
                praiseJudge: 1
            })
        } else if (res == "取消点赞成功") {
            this.setData({
                likeNum: this.data.likeNum - 1,
                textColor: "rgba(0, 0, 0, 1)",
                praiseJudge: 2
            })
        } else if (res == "点赞失败") {
            wx.showToast({
                title: '点赞失败',
                icon: "error",
            })
        } else if (res == "取消点赞失败") {
            wx.showToast({
                title: '取消点赞失败',
                icon: "error",
            })
        }


        console.log(this.data.praiseJudge)
        console.log("*****" + res)

    },

    commentSet: function (e) {
        this.setData({
            commentTest: e.detail.value,
        })
    },

    Publish: async function (e) {
        console.log(this.data.commentTest)
        let res = await addComment.addComment.addMethod(this.data.item._id, app.globalData.userInfo[2], this.data.commentTest, app.globalData.userInfo[0]);
        if (res == "评论成功") {
            this.setData({
                commentTest: ""
            })
        }else if(res == "评论失败"){
            wx.showToast({
                title: '评论失败',
                icon: "error",
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