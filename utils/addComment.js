/**
 * 为文章增加一个评论
 * @param {string} articleId 文章id
 * @param {string} userId 发生点赞行为的用户id
 * @param {string} comment 评论内容
 * @param {string} commentUserName 评论用户
 */
wx.cloud.init();
const db = wx.cloud.database();
const userList = db.collection("articleList");
// 在集合中查找_id为articleId的文章，将其中的commentList字段加上一个comment对象对象包含userID、userName、content、time字段，其中time为现在的时间
var date = new Date();
let etYear = new Date(date).getFullYear();
// 获取 et 的年
let etMon = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
let etDay=date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
var thisTime=etYear+"-"+etMon+"-"+etDay;
var addComment = {
  addMethod: async function (articleId, userId, comment, commentUserName) {
    return new Promise((resolve, reject) => {
      userList.doc(articleId).update({
        data: {
          commentList: db.command.push({
            userId: userId,
            userName: commentUserName,
            content: comment,
            time: thisTime,
          }),
        },
        success: function (res) {
          console.log("评论成功");
          resolve("评论成功");
        },
        fail: function (res) {
          console.log(res);
          reject("评论失败");
        },
      });
    });
  },
};

module.exports = {
  addComment: addComment,
};
