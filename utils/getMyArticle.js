/**
 * 获取我的所有贴子
 * @param {string} uid 用户id
 * @param {number} type 贴子类型,1为经验，2为回答
 */

wx.cloud.init();
const db = wx.cloud.database();
const articleList = db.collection("articleList");

// 在集合中查找_openid为uid的文章，如果这篇文章的type和传入的type相同，就resolve为一个数组
var getMyArticle = {
  getMyArticleMethod: async function (uid, type) {
    return new Promise((resolve, reject) => {
      articleList
        .where({
          _openid: uid,
          type: type,
        })
        .get({
          success: function (res) {
            console.log("获取成功");
            resolve(res.data);
          },
          fail: function (res) {
            console.log("获取失败");
            reject("获取失败");
          },
        });
    });
  },
};

module.exports = {
  getMyArticle: getMyArticle,
};
