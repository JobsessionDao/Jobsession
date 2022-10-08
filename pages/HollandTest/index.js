var app = getApp();
Page({
  data:{
    index:0,        //index变量
    realIndex:0,
    optionA: "A",
    optionB: "B",
    A: 0,
    B: 0,
    xianshixing:0,//现实型
    yanjiuxing:0,//研究型
    yishuxing:0,//艺术型
    shehuixing:0,//社会型
    qiyexing:0,//企业型
    changguixing:0,//常规型
    questionDetail:'强壮而敏捷的身体对我很重要',
    answerA:'对',
    answerB:'错',
    //题序
    list:[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
    20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,
    46,47,48,49,50,51,52,53,54,55,56,57,58,59,60],
    listAB : ['A','B'],
    aa:[{question:"强壮而敏捷的身体对我很重要",option:{A:"对",B:"错"}},{question:"我必须彻底地了解事情的真相",option:{A:"对",B:"错"}}
    ,{question:"我的心情受音乐、色彩和美丽事物的影响很大",option:{A:"对",B:"错"}},{question:"和他人的关系丰富了我的生命并使它有意义",option:{A:"对",B:"错"}}
    ,{question:"我相信我会成功",option:{A:"对",B:"错"}},{question:"我做事必须有清楚的指引",option:{A:"对",B:"错"}}
    ,{question:"我擅长自己创作、修理东西",option:{A:"对",B:"错"}},{question:"我可以花很长时间去想通事情的道理",option:{A:"对",B:"错"}}
    ,{question:"我重视美丽的环境",option:{A:"对",B:"错"}},{question:"我愿意花时间帮别人解决个人危机",option:{A:"对",B:"错"}}
    ,{question:"我喜欢竞争",option:{A:"对",B:"错"}},{question:"我在开始一个计划前会花很多时间去计划",option:{A:"对",B:"错"}}
    ,{question:"我喜欢用双手做事",option:{A:"对",B:"错"}},{question:"探索新构思使我满意",option:{A:"对",B:"错"}}
    ,{question:"我寻求新方法来发挥我的创造力",option:{A:"对",B:"错"}},{question:"我认为能把自己的焦虑和别人分担是很重要的",option:{A:"对",B:"错"}}
    ,{question:"成为群体中的关键任务执行者，对我来说很重要",option:{A:"对",B:"错"}},{question:"我对于自己能重视工作中的所有细节感到骄傲",option:{A:"对",B:"错"}}
    ,{question:"我不在意工作时把手弄脏",option:{A:"对",B:"错"}},{question:"我认为教育是个发展及磨练脑力的终身学习过程",option:{A:"对",B:"错"}}
    ,{question:"我喜欢非正式的穿着，尝试新颜色和款式",option:{A:"对",B:"错"}},{question:"我常能体会到某人想要和他人沟通的需要",option:{A:"对",B:"错"}}
    ,{question:"我喜欢帮助别人不断改进",option:{A:"对",B:"错"}},{question:"我在决策时，通常不愿冒险",option:{A:"对",B:"错"}}
    ,{question:"我喜欢购买小零件，做成成品",option:{A:"对",B:"错"}},{question:"有时我长时间阅读，玩拼图游戏，冥想生命的本质",option:{A:"对",B:"错"}}
    ,{question:"我有很强的想象力",option:{A:"对",B:"错"}},{question:"我喜欢帮助别人发挥天赋和才能",option:{A:"对",B:"错"}}
    ,{question:"我喜欢监督事情直至完工",option:{A:"对",B:"错"}},{question:"如果我面对一个新场景，会在事前做充分的准备",option:{A:"对",B:"错"}}
    ,{question:"我喜欢独立完成一项任务",option:{A:"对",B:"错"}},{question:"我渴望阅读或思考任何可以引发我好奇心的东西",option:{A:"对",B:"错"}}
    ,{question:"我喜欢尝试创新的概念",option:{A:"对",B:"错"}},{question:"如果我和别人摩擦，我会不断尝试化干戈为玉帛",option:{A:"对",B:"错"}}
    ,{question:"要成功就必须定高目标",option:{A:"对",B:"错"}},{question:"我喜欢为重大决策负责",option:{A:"对",B:"错"}}
    ,{question:"我喜欢直言不讳，不喜欢转弯抹角",option:{A:"对",B:"错"}},{question:"我在解决问题前必须把问题分析彻底",option:{A:"对",B:"错"}}
    ,{question:"我喜欢重新布置我的环境，使它们与众不同",option:{A:"对",B:"错"}},{question:"我经常借着和别人交谈来解决自己的问题",option:{A:"对",B:"错"}}
    ,{question:"我常常想要起草一个计划，而由别人的完成细节",option:{A:"对",B:"错"}},{question:"准时对我来说非常重要",option:{A:"对",B:"错"}}
    ,{question:"从事户外活动使我神清气爽",option:{A:"对",B:"错"}},{question:"我不断的问自己：为什么",option:{A:"对",B:"错"}}
    ,{question:"我喜欢自己的工作能够抒发我的情绪和感觉",option:{A:"对",B:"错"}},{question:"我喜欢帮助别人找可以和他人相互关注的方法",option:{A:"对",B:"错"}}
    ,{question:"能够参与重大决策是令人兴奋的事情",option:{A:"对",B:"错"}},{question:"我经常保持清洁，喜欢有条不紊",option:{A:"对",B:"错"}}
    ,{question:"我喜欢周边环境简单而实际",option:{A:"对",B:"错"}},{question:"我会不断地思索一个问题，直到找出答案为止",option:{A:"对",B:"错"}}
    ,{question:"大自然的美深深地触动我的灵魂",option:{A:"对",B:"错"}},{question:"亲密的人际关系对我很重要",option:{A:"对",B:"错"}}
    ,{question:"升迁和进步对我极其重要",option:{A:"对",B:"错"}},{question:"当我把每日学习计划好时，我会比较有安全感",option:{A:"对",B:"错"}}
    ,{question:"我不害怕过重的学习负荷，且知道学习的重点",option:{A:"对",B:"错"}},{question:"我喜欢能使我思考，给我新观念的书",option:{A:"对",B:"错"}}
    ,{question:"我希望能够看到艺术表演、戏剧和好的电影",option:{A:"对",B:"错"}},{question:"我对别人的情绪低潮相当地敏感",option:{A:"对",B:"错"}}
    ,{question:"能影响别人使我感到兴奋",option:{A:"对",B:"错"}},{question:"当我答应一件事时，我会尽力监督所有的细节",option:{A:"对",B:"错"}}
    ,{question:"当我答应一件事时，我会尽力监督所有细节",option:{A:"对",B:"错"}}]    
  },
  onLoad: function () {
    
    // this.setData({
    //   questionDetail:this.aa[0].question
    // })
    // console.log("rxfygg")
    // this.setData({
    //   answerA: this.aa[0].option.A
    // })
    // this.setData({
    //   answerB: this.aa[0].option.B
    // })
    // console.log("erf",questionDetail)
  },
  answerClickA: function () {
    
    if (this.data.listAB[0] == 'A') {
      this.setData({
        A: this.data.A + 1
      })
    }//data中的A+1



    //一下实现做60题，每一题对应某一类型的人分数+1
    if(this.data.index == 0 ){
      this.setData({
        xianshixing: this.data.xianshixing +1
      })
    }

    if(this.data.index == 1){
      this.setData({
        yanjiuxing: this.data.yanjiuxing +1
      })
    }
    if(this.data.index == 2){
      this.setData({
        yishuxing: this.data.yishuxing +1
      })
    }
    if(this.data.index == 3){
      this.setData({
        shehuixing: this.data.shehuixing +1
      })
    }if(this.data.index == 4){
      this.setData({
        qiyexing: this.data.qiyexing +1
      })
    }if(this.data.index == 5){
      this.setData({
        changguixing: this.data.changguixing +1
      })
    }if(this.data.index == 6){
      this.setData({
        xianshixing: this.data.xianshixing +1
      })
    }if(this.data.index == 7){
      this.setData({
        yanjiuxing: this.data.yanjiuxing +1
      })
    }if(this.data.index == 8){
      this.setData({
        yishuxing: this.data.yishuxing +1
      })
    }if(this.data.index == 9){
      this.setData({
        shehuixing: this.data.shehuixing +1
      })
    }if(this.data.index == 10){
      this.setData({
        qiyexing: this.data.qiyexing +1
      })
    }if(this.data.index == 11){
      this.setData({
        changguixing: this.data.changguixing +1
      })
    }if(this.data.index == 12){
      this.setData({
        xianshixing: this.data.xianshixing +1
      })
    }if(this.data.index == 13){
      this.setData({
        yanjiuxing: this.data.yanjiuxing +1
      })
    }if(this.data.index == 14){
      this.setData({
        yishuxing: this.data.yishuxing +1
      })
    }if(this.data.index == 15){
      this.setData({
        shehuixing: this.data.shehuixing +1
      })
    }if(this.data.index == 16){
      this.setData({
        qiyexing: this.data.qiyexing +1
      })
    }if(this.data.index == 17){
      this.setData({
        changguixing: this.data.changguixing +1
      })
    }if(this.data.index == 18){
      this.setData({
        xianshixing: this.data.xianshixing +1
      })
    }if(this.data.index == 19){
      this.setData({
        yanjiuxing: this.data.yanjiuxing +1
      })
    }if(this.data.index == 20){
      this.setData({
        yishuxing: this.data.yishuxing +1
      })
    }if(this.data.index == 21){
      this.setData({
        shehuixing: this.data.shehuixing +1
      })
    }if(this.data.index == 22){
      this.setData({
        qiyexing: this.data.qiyexing +1
      })
    }if(this.data.index == 23){
      this.setData({
        changguixing: this.data.changguixing +1
      })
    }if(this.data.index == 24){
      this.setData({
        xianshixing: this.data.xianshixing +1
      })
    }if(this.data.index == 25){
      this.setData({
        yanjiuxing: this.data.yanjiuxing +1
      })
    }if(this.data.index == 26){
      this.setData({
        yishuxing: this.data.yishuxing +1
      })
    }if(this.data.index == 27){
      this.setData({
        shehuixing: this.data.shehuixing +1
      })
    }if(this.data.index == 28){
      this.setData({
        qiyexing: this.data.qiyexing +1
      })
    }if(this.data.index == 29){
      this.setData({
        changguixing: this.data.changguixing +1
      })
    }if(this.data.index == 30){
      this.setData({
        xianshixing: this.data.xianshixing +1
      })
    }if(this.data.index == 31){
      this.setData({
        yanjiuxing: this.data.yanjiuxing +1
      })
    }if(this.data.index == 32){
      this.setData({
        yishuxing: this.data.yishuxing +1
      })
    }if(this.data.index == 33){
      this.setData({
        shehuixing: this.data.shehuixing +1
      })
    }if(this.data.index == 34){
      this.setData({
        qiyexing: this.data.qiyexing +1
      })
    }if(this.data.index == 35){
      this.setData({
        changguixing: this.data.changguixing +1
      })
    }if(this.data.index == 36){
      this.setData({
        xianshixing: this.data.xianshixing +1
      })
    }if(this.data.index == 37){
      this.setData({
        yanjiuxing: this.data.yanjiuxing +1
      })
    }if(this.data.index == 38){
      this.setData({
        yishuxing: this.data.yishuxing +1
      })
    }if(this.data.index == 39){
      this.setData({
        shehuixing: this.data.shehuixing +1
      })
    }if(this.data.index == 40){
      this.setData({
        qiyexing: this.data.qiyexing +1
      })
    }if(this.data.index == 41){
      this.setData({
        changguixing: this.data.changguixing +1
      })
    }if(this.data.index == 42){
      this.setData({
        xianshixing: this.data.xianshixing +1
      })
    }if(this.data.index == 43){
      this.setData({
        yanjiuxing: this.data.yanjiuxing +1
      })
    }if(this.data.index == 44){
      this.setData({
        yishuxing: this.data.yishuxing +1
      })
    }if(this.data.index == 45){
      this.setData({
        shehuixing: this.data.shehuixing +1
      })
    }if(this.data.index == 46){
      this.setData({
        qiyexing: this.data.qiyexing +1
      })
    }if(this.data.index == 47){
      this.setData({
        changguixing: this.data.changguixing +1
      })
    }if(this.data.index == 48){
      this.setData({
        xianshixing: this.data.xianshixing +1
      })
    }if(this.data.index == 49){
      this.setData({
        yanjiuxing: this.data.yanjiuxing +1
      })
    }if(this.data.index == 50){
      this.setData({
        yishuxing: this.data.yishuxing +1
      })
    }if(this.data.index == 51){
      this.setData({
        shehuixing: this.data.shehuixing +1
      })
    }if(this.data.index == 52){
      this.setData({
        qiyexing: this.data.qiyexing +1
      })
    }if(this.data.index == 53){
      this.setData({
        changguixing: this.data.changguixing +1
      })
    }if(this.data.index == 54){
      this.setData({
        xianshixing: this.data.xianshixing +1
      })
    }if(this.data.index == 55){
      this.setData({
        yanjiuxing: this.data.yanjiuxing +1
      })
    }if(this.data.index == 56){
      this.setData({
        yishuxing: this.data.yishuxing +1
      })
    }if(this.data.index == 57){
      this.setData({
        shehuixing: this.data.shehuixing +1
      })
    }if(this.data.index == 58){
      this.setData({
        qiyexing: this.data.qiyexing +1
      })
    }if(this.data.index == 59){
      this.setData({
        changguixing: this.data.changguixing +1
      })
    }
    this.setData({
      index: this.data.index + 1,
      realIndex: this.data.list[this.data.index+1],
    })
   var k1=this.data.realIndex;
   var k2=this.data.listAB[0];
   var k3=this.data.listAB[1];
    this.setData({
      'questionDetail': this.data.aa[k1].question,
      'answerA': this.data.aa[k1].option[k2],
      'answerB': this.data.aa[k1].option[k3],
    })


    // ????????
    //调用result函数
    if (this.data.index == 60) {
      wx.redirectTo({
        url: '../HollandResult/index?xianshixing='+this.data.xianshixing+'&yanjiuxing='+this.data.yanjiuxing+'&yishuxing='+this.data.yishuxing+'&shehuixing='+this.data.shehuixing+'&qiyexing='+this.data.qiyexing+'&changguixing='+this.data.changguixing,
      })
    }
  },
  answerClickB: function () {
    if (this.data.listAB[0] == 'B') {
      this.setData({
        B: this.data.B + 1
      })
    }
    this.setData({
      index: this.data.index + 1,
      realIndex: this.data.list[this.data.index+1],
    })
    console.log("ertfg",this.data.questionDetail);
    var k1=this.data.realIndex;
    var k2=this.data.listAB[0];
    var k3=this.data.listAB[1];
     this.setData({
       'questionDetail': this.data.aa[k1].question,
       'answerA': this.data.aa[k1].option[k2],
       'answerB': this.data.aa[k1].option[k3],
     })
    console.log("etfg",this.data.questionDetail);
    //保留当前页面，跳转到应用内的result页面
    if (this.data.index == 60) {
      wx.redirectTo({
        url: '../HollandResult/index',
      })
    }
  },



  /**
   * 生命周期函数--监听页面加载
   */
  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})