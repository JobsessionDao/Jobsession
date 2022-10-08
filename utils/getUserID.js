// 获取用户的 openid

let myAppID = "wx9b0cc3d86ccee149";
let mySecret = "0aaa5f580db0693bb5d7e19521f339a0";
let result=[];
// let idValue = "";
// let avatar="";
var getui = {
    getUserID: async function () {
        return new Promise((resolve, reject) => {
          
          wx.getUserProfile({
                desc: '用于完善会员资料',
                //成功后会返回
                success: (res) => {
                    console.log(res);
                    // 把你的用户信息存到一个变量中方便下面使用
                    let userInfo = res.userInfo
                    result[1]=userInfo.avatarUrl;
                    result[0]=userInfo.nickName;
                    //获取openId（需要code来换取）这是用户的唯一标识符
                    // 获取code值
                    wx.login({
                        //成功放回
                        success: (res) => {
                            console.log(res);
                            
                            let code = res.code
                            // 通过code换取openId
                            wx.request({
                                url: `https://api.weixin.qq.com/sns/jscode2session?appid=${myAppID}&secret=${mySecret}&js_code=${code}&grant_type=authorization_code`,
                                success: (res) => {
                                    userInfo.openid = res.data.openid
                                    result[2] = userInfo.openid;
                                    resolve(result)
                                    // return idValue;
                                }
                            })
                        }
                    })

                }
            })
        });
    }
}

module.exports = {
    getui: getui
}