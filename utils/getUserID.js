// 获取用户的 openid
// 获取 gloablData
const app = getApp();
let myAppID = "";
let mySecret = "";
let result = [];
// let idValue = "";
// let avatar="";
var getui = {
  getUserID: async function () {
    return new Promise((resolve, reject) => {
      wx.cloud.init();
      let db = wx.cloud.database();
      let settings = db.collection("settings");
      // 获取settings 中 type 为 config 的数据
      settings
        .where({
          type: "config",
        })
        .get({
          success: (res) => {
            // 获取 res 中的config数据
            myAppID = res.data[0].appID;
            mySecret = res.data[0].mySecret;
          },
        });
      wx.getUserProfile({
        desc: "用于完善会员资料",
        //成功后会返回
        success: (res) => {
          console.log(res);
          // 把你的用户信息存到一个变量中方便下面使用
          let userInfo = res.userInfo;
          result[1] = userInfo.avatarUrl;
          result[0] = userInfo.nickName;
          //获取openId（需要code来换取）这是用户的唯一标识符
          // 获取code值
          wx.login({
            //成功放回
            success: (res) => {
              console.log(res);

              let code = res.code;
              // 通过code换取openId
              wx.request({
                url: `https://api.weixin.qq.com/sns/jscode2session?appid=${myAppID}&secret=${mySecret}&js_code=${code}&grant_type=authorization_code`,
                success: (res) => {
                  userInfo.openid = res.data.openid;
                  result[2] = userInfo.openid;
                  resolve(result);
                  // return idValue;
                },
              });
              //   wx.showToast({
              //     title: "获取成功",
              //     icon: "success",
              //     duration: 2000,
              //   });
            },
            fail: function (err) {
              wx.showToast({
                title: "网络错误",
                icon: "error",
              });
            },
          });
        },
      });
    });
  },
};

module.exports = {
  getui: getui,
};
