/**
 * 添加一个收藏
 * @param {string} articleID 收藏的文章id
 * @param {string} userID 收藏者id
 * @param {string} title 收藏的文章标题
 * @param {number} type 收藏的文章类型
 */

wx.cloud.init();
const db = wx.cloud.database();
const userList = db.collection("userList");

// 在集合中查找_openid为userID的用户，如果这个用户的collect数组中的所有对象中articleID字段没有与传进来的articleID字段匹配的，就添加这个文章作为对象（包含articleID、articleTitle、type）到collect数组，若有就忽略
var addCollect = {
  addCollectMethod: async function (articleID, userID, title, type) {
    return new Promise((resolve, reject) => {
      userList
        .where({
          _openid: userID,
        })
        .get({
          success: function (res) {
            var CollectList = res.data[0].CollectList;
            var flag = true;
            for (var i = 0; i < CollectList.length; i++) {
              if (CollectList[i].articleID == articleID) {
                flag = false;
                break;
              }
            }
            if (flag) {
              userList
                .where({
                  _openid: userID,
                })
                .update({
                  data: {
                    CollectList: db.command.push({
                      articleID: articleID,
                      articleTitle: title,
                      type: type,
                    }),
                  },
                  success: function (res) {
                    console.log("收藏成功");
                    resolve("收藏成功");
                  },
                  fail: function (res) {
                    console.log(res);
                    reject("收藏失败");
                  },
                });
            } else {
              console.log("已收藏");
              resolve("已收藏");
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
  addCollect: addCollect,
};
