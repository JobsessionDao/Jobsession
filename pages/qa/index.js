// pages/QaA/QaA.js
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
        //   cyExperience: [


        //     {
        //       title:"考研什么时候开始准备比较好呀？",
        //       tag:"考研",
        //       like:"5"
        //     },
        //     {
        //       title:"电子科技大学看学历出身吗？",
        //       tag:"考研",
        //       like:"5"
        //     },
        //     {
        //       title:"有没有小米北京内推？",
        //       tag:"校招",
        //       like:"5"
        //     },
        //     {
        //       title:"北航和浙大选择哪个？",
        //       tag:"考研",
        //       like:"5"
        //     },
        //     {
        //       title:"求2021年建模美赛经验！",
        //       tag:"竞赛",
        //       like:"5"
        //     },
        //     {
        //       title:"有没有上岸中国农大的学长学姐呀！",
        //       tag:"保研",
        //       like:"5"
        //     },
        //     {
        //       title:"保研几乎没有竞赛经历怎么办？",
        //       tag:"保研",
        //       like:"5"
        //     },
        //     {
        //         title:"保研几乎没有竞赛经历怎么办？",
        //         tag:"保研",
        //         like:"5"
        //       },
        //       {
        //         title:"保研几乎没有竞赛经历怎么办？",
        //         tag:"保研",
        //         like:"5"
        //       },
        //       {
        //         title:"保研几乎没有竞赛经历怎么办？",
        //         tag:"保研",
        //         like:"5"
        //       },
        //     // 更多数据...
        //   ] 
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
        this.loadMethod(2);
    },

    onReachBottom: async function () {
        db = wx.cloud.database();
        articleList = db.collection("articleList");
        count = await db.collection("articleList").count();
        await this.loadMethod(2);
    },

    goToDetail: function (e) {
        let item = e.currentTarget.dataset.item
        console.log(item)
        wx.navigateTo({
            url: '/pages/QaAdetail/index?data=' + item._id,
        })
    },



    /**
     * 生命周期函数--监听页面加载
     */

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