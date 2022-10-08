/**
 * 删除一篇文章
 * @param {string} id 文章id
 * @param {string} userId 操作者id
 */

wx.cloud.init();
const db = wx.cloud.database();
const articleList = db.collection("articleList");

// 在集合中查找_id为id的文章，如果这篇文章的_openid和userId相同，就删除这篇文章
var deleteArticle = {
  deleteMethod: async function (id, userId) {
    return new Promise((resolve, reject) => {
      articleList.doc(id).get({
        success: function (res) {
          if (res.data._openid == userId) {
            articleList.doc(id).remove({
              success: function (res) {
                console.log("删除成功");
                resolve("删除成功");
              },
              fail: function (res) {
                console.log("删除失败");
                reject("删除失败");
              },
            });
          } else {
            reject("删除失败");
          }
        },
        fail: function (res) {
          console.log(res);
          reject("删除失败");
        },
      });
    });
  },
};

module.exports = {
  deleteArticle: deleteArticle,
};
