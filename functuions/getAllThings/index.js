// 云函数入口文件
const cloud = require("wx-server-sdk");

cloud.init({
  // 初始化云开发环境
  env: cloud.DYNAMIC_CURRENT_ENV, // 当前环境的常量
});

// 云函数入口函数
exports.main = async (event) => {
  const db = cloud.database();
  let count = await db.collection("articleList").count();
  count = count.total;
  let all = [];
  console.log(event);
  for (let i = 0; i < count; i += 100) {
    let list = await db
      .collection("articleList")
      .where({
        _openid:event._openid,
        type:event.type
      })
      .skip(i)
      .get();
    all = all.concat(list.data);
  }
  console.log(all)
  return all;
};
