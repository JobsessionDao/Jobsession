// 用于向集合 userList 添加一条用户信息

/**
 * 用于向集合 userList 添加一条用户信息
 * 参数列表，必须按顺序传入
 * @param {string} name 用户名
 * @param {string} avatar 用户的头像
 * @param {string} id 用户的ID
 */

wx.cloud.init();
const db = wx.cloud.database();
const userList = db.collection("userList");

var addUser = {
  addMethod: async function (uName, uAvater, uID) {
    return new Promise((resolve, reject) => {
      var d1 = new Date("2022-10-09");
      var d2 = new Date("2024-10-09");
      userList.add({
        data: {
          userName: uName, // 用户昵称
          userAvater: uAvater, // 用户头像链接
          userID: uID, // 用户唯一标识符（openid）
          expCre: 0, // 用户的经验积分
          likeCre: 0, // 用户的赞赏值
          collectNum: 0, // 用户的收藏数
          CollectList: [],
          CreateList: [],
          aim: {
            aimTitle: "我的目标",
            aimDesc: "我的目标描述",
            beginDate: d1,
            endDate: d2,
          },
        },
        success: function (res) {
          // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
          console.log(res);
          wx.showToast({
            title: '向数据库添加成功',
          })
          resolve("添加成功");
        },
        fail: function (res) {
          console.log(res);
          wx.showToast({
            title: '向数据库添加失败',
          })
          reject("添加失败");
        },
      });
    });
  },
};

module.exports = {
  addUser: addUser,
};
