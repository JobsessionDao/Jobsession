// pages/QaAdetail/QaAdetail.js
let getUserID = require("../../utils/getUserID.js");
let addUser = require("../../utils/addUser.js");
let getArticle = require("../../utils/getArticle.js");
let addLike = require("../../utils/addLike.js");
let addComment = require("../../utils/addComment.js");
let addCollect = require("../../utils/addCollect.js");
let itemo;
let arti;
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
        //   title:"北航考研保护第一志愿吗？",
        //   author:"@swfoodt",
        //   time:"2022-10-05",
        //   detail:"如题，希望考研北京理工大学，请问学长学姐它是否会保护第一志愿？",
        //   viewed:"15",

        //   cyAnswers: [
        //     {
        //       AnswerName:"杰出青年",
        //       Atime:"2022/10/06",
        //       Answer:"全文通俗易懂，趣味性强。 文章线索明朗主题突出，文章开头与结尾时的诗化语言。充满想象与韵律之美，令人愿读爱读，不忍释手。"
        //     },
        //     {
        //       AnswerName:"小南瓜",
        //       Atime:"2022/10/06",
        //       Answer:"全文通俗易懂，趣味性强。 文章线索明朗主题突出，文章开头与结尾时的诗化语言。充满想象与韵律之美，令人愿读爱读，不忍释手。"
        //     },
        //     {
        //       AnswerName:"大南瓜",
        //       Atime:"2022/10/06",
        //       Answer:"全文通俗易懂，趣味性强。 文章线索明朗主题突出，文章开头与结尾时的诗化语言。充满想象与韵律之美，令人愿读爱读，不忍释手。"
        //     },
        //     {
        //       AnswerName:"南瓜",
        //       Atime:"2022/10/06",
        //       Answer:"好活儿。"
        //     },
        //     // 更多数据...
        //   ]

    },

    async onLoad(options) {
        console.log(options.data)
        let item = options.data;
        itemo=item;
        console.log("++++" + item)
        console.log(options.data)

        //获取点赞
        let Art = await getArticle.getArticle.getArticleMethod(item);
        arti=Art;
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
                    textColor: "rgba(255, 87, 51, 1)"
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
        // let res2 = await addCollect.addCollect.addCollectMethod(this.data.item._id, app.globalData.userInfo[2], this.data.item.articleTitle,this.data.item.articleTag);
        if (res == "点赞成功") {
            this.setData({
                likeNum: this.data.likeNum + 1,
                textColor: "rgba(255, 87, 51, 1)",
                praiseJudge: 1
            })
            wx.cloud.init();
      const db = wx.cloud.database();
      const userList = db.collection("userList");
      userList
        .where({
          _openid: this.data._openid,
        })
        .update({
          // 更新 likeCre的值为+10
          data: {
            //自加10
            // likeCre: db.command.inc(1),
            CollectList: db.command.push(arti),
          },
          success: function (res) {
            console.log(res.data);
          },
        });
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
            let Art = await getArticle.getArticle.getArticleMethod(itemo);
            this.setData({
                likeNum: Art.likeList.length,
                item: Art
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