// 用于向集合 userList 添加一条用户信息
wx.cloud.init();
const db = wx.cloud.database()
const userList = db.collection('userList')

var addUser = {
    addMethod: async function (uName, uAvater, uID) {
        return new Promise((resolve, reject) => {
            var d1 = new Date("2022-10-09");
            var d2 = new Date("2024-10-09");
            userList.add({
                data: {
                    userName: uName,  // 用户昵称
                    userAvater: uAvater,  // 用户头像链接
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
                        endDate: d2
                    }
                },
                success: function (res) {
                    // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
                    console.log(res);
                    resolve(res) ;
                }
            })
        });
    }

}

module.exports = {
    addUser: addUser
}