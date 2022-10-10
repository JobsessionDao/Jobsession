/**
 * 为文章增加一个点赞或插眼
 * @param {string} articleId 文章id
 * @param {string} userId 发生点赞行为的用户id
 */

wx.cloud.init();
const db = wx.cloud.database();
const userList = db.collection("articleList");

// 查找集合中_id为articleId的文章，检查其likeList字段是否有和userId相同的值，如果有就删除这个数组中的这个值，如果没有就为其中的字段likeList加上一个userId值构成的对象
var addLike = {
  addMethod: async function (articleId, userId) {
    return new Promise((resolve, reject) => {
      userList.doc(articleId).get({
        success: function (res) {
          console.log(res);
          var likeList = res.data.likeList;
          var flag = false;
          for (var i = 0; i < likeList.length; i++) {
            if (likeList[i] == userId) {
              flag = true;
              break;
            }
          }
          if (flag) {
            userList.doc(articleId).update({
              data: {
                likeList: db.command.pull(userId),
                number: db.command.inc(-1),
              },
              success: function (res) {
                console.log("取消点赞成功");
                resolve("取消点赞成功");
              },
              fail: function (res) {
                console.log(res);
                reject("取消点赞失败");
              },
            });
          } else {
            userList.doc(articleId).update({
              data: {
                likeList: db.command.push(userId),
                number: db.command.inc(1),
              },
              success: function (res) {
                console.log("点赞成功");
                resolve("点赞成功");
              },
              fail: function (res) {
                console.log(res);
                reject("点赞失败");
              },
            });
          }
        },
        fail: function (res) {
          console.log(res);
          reject(res);
        },
      });
    });
  },
};

module.exports = {
  addLike: addLike,
};

// var addLike = {
//   addMethod: async function (articleId, userId) {
//     return new Promise((resolve, reject) => {
//       userList.doc(articleId).update({
//         data: {
//           likeList: db.command.push({
//             userId: userId,
//           }),
//         },
//         success: function (res) {
//           console.log(res);
//           resolve(res);
//         },
//         fail: function (res) {
//           console.log(res);
//           reject(res);
//         },
//       });
//     });
//   },
// };
