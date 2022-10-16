// 用于向集合 articleList 添加一条文章信息

/**
 * 用于向集合 articleList 添加一条文章信息
 * 参数列表，必须按顺序传入
 * @param {string} title 文章标题
 * @param {string} tag 文章标签
 * @param {string} content 文章内容
 * @param {string} type 文章类型
 * @param {List} images 图片列表
 * @param {string} author 文章作者
 * @param {string} authorID 文章作者ID
 * @param {string} authorAvatar 文章作者头像
 */

wx.cloud.init();
const db = wx.cloud.database();
const userList = db.collection("articleList");
// 获取当前时间
var date = new Date();
let etYear = new Date(date).getFullYear();
// 获取 et 的年
let etMon = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
let etDay=date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
var thisTime=etYear+"-"+etMon+"-"+etDay;
var addArticle = {
  addMethod: async function (
    aTitle, // 文章标题
    aTag, // 文章标签
    aDesc, // 文章内容
    aType, // 文章类型
    aImages, // 文章图片列表
    aAuthor, // 文章作者
    aAuthorID, // 文章作者ID
    aAuthorAvater // 文章作者头像
  ) {
    return new Promise((resolve, reject) => {
      userList.add({
        data: {
          anthor: aAuthor,
          anthorID: aAuthorID,
          anthorAvater: aAuthorAvater,
          articleTitle: aTitle, // 文章标题
          articleTag: aTag, // 文章标签
          desc: aDesc, // 文章内容
          time: thisTime, // 文章发布日期
          type: aType, // 文章类型
          number: 0, // 文章点赞、回答数
          commentList: [], // 文章评论列表
          likeList: [],
          imageList: aImages, // 文章图片列表
        },
        success: function (res) {
          // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
          console.log(res);
          resolve("添加成功");
        },
        fail: function (res) {
          console.log(res);
          reject("添加失败");
        },
      });
    });
  },
};

module.exports = {
  addArticle: addArticle,
};
