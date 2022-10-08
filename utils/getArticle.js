/**
 * 查询一篇文章
 * @param {string} id 文章id
 */

wx.cloud.init();
const db = wx.cloud.database();
const articleList = db.collection("articleList");

// 在集合中查找_id为id的文章，并返回它

var getArticle = {
  getArticleMethod: async function (id) {
    return new Promise((resolve, reject) => {
      articleList.doc(id).get({
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
  getArticle: getArticle,
};
