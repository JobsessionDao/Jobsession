/**
 * 获取用户的目标
 * @param {string} userID 用户id
 */

wx.cloud.init();
const db = wx.cloud.database();
const userList = db.collection("userList");

// 在集合中查找_openid为userID的用户，返回其aim字段
var getAim = {
  getAimMethod: async function (userID) {
    return new Promise((resolve, reject) => {
      userList
        .where({
          _openid: userID,
        })
        .get({
          success: function (res) {
            console.log("获取成功");
            resolve(res.data[0].aim);
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
  getAim: getAim,
};
