// index.js
let getUserID = require("../../utils/getUserID.js");
let addUser = require("../../utils/addUser.js");
let addArticle = require("../../utils/addArticle.js");
let addLike = require("../../utils/addLike.js");
let addComment = require("../../utils/addComment.js");
let addCollect = require("../../utils/addCollect.js");
// let load = require("../../utils/load.js");
let count;
let db;
let articleList;
let allLength;
let isAll = false;


Page({

    data: {
        itemList: [],
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
            url: '/pages/EXPdetail/index?data=' + JSON.stringify(item),
        })
    },
})