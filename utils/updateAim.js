/**
 * 修改用户的aim
 * @param {string} userID 用户id
 * @param {string} title 目标标题
 * @param {string} desc 目标内容
 * @param {string} beginDate 目标开始日期
 * @param {string} endDate 目标结束日期
 */

wx.cloud.init();
const db = wx.cloud.database();
const userList = db.collection("userList");

// 在集合中查找_openid为userID的用户，修改其aim字段为上面传来的参数

var updateAim = {
  updateAimMethod: async function (userID, title, desc, beginDate, endDate) {
    return new Promise((resolve, reject) => {
      userList
        .where({
          _openid: userID,
        })
        .update({
          data: {
            aim: {
              aimTitle: title,
              aimDesc: desc,
              beginDate: beginDate,
              endDate: endDate,
            },
          },
          success: function (res) {
            console.log("修改成功");
            resolve("修改成功");
          },
          fail: function (res) {
            console.log("修改失败");
            reject("修改失败");
          },
        });
    });
  },
};

module.exports = {
  updateAim: updateAim,
};
