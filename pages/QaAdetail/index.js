// pages/QaAdetail/QaAdetail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    //   title:"北航考研保护第一志愿吗？",
    //   author:"@swfoodt",
    //   time:"2022-10-05",
    //   detail:"如题，希望考研北京理工大学，请问学长学姐它是否会保护第一志愿？",
    //   viewed:"15",
     
    //   cyAnswers: [
    //     {
    //       AnswerName:"杰出青年",
    //       Atime:"2022/10/06",
    //       Answer:"全文通俗易懂，趣味性强。 文章线索明朗主题突出，文章开头与结尾时的诗化语言。充满想象与韵律之美，令人愿读爱读，不忍释手。"
    //     },
    //     {
    //       AnswerName:"小南瓜",
    //       Atime:"2022/10/06",
    //       Answer:"全文通俗易懂，趣味性强。 文章线索明朗主题突出，文章开头与结尾时的诗化语言。充满想象与韵律之美，令人愿读爱读，不忍释手。"
    //     },
    //     {
    //       AnswerName:"大南瓜",
    //       Atime:"2022/10/06",
    //       Answer:"全文通俗易懂，趣味性强。 文章线索明朗主题突出，文章开头与结尾时的诗化语言。充满想象与韵律之美，令人愿读爱读，不忍释手。"
    //     },
    //     {
    //       AnswerName:"南瓜",
    //       Atime:"2022/10/06",
    //       Answer:"好活儿。"
    //     },
    //     // 更多数据...
    //   ]
  
    },
  
    onLoad(options) {
        console.log(options.data)
        let item = options.data
        item = JSON.parse(item)
        console.log("++++" + item)
        this.setData({
            item: item
        })
        for (var a = 0; a < this.data.item.time.length; a++) {
            var unixTimestamp = new Date(this.data.item.time)

            var datestr = unixTimestamp.getFullYear() + "-" + (unixTimestamp.getMonth() + 1) + "-" + unixTimestamp.getDate();

            this.data.item.time = datestr;

        }
        console.log(this.data)
    },
  

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
  
    },
  
    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
  
    },
  
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {
  
    },
  
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {
  
    },
  
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {
  
    },
  
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {
  
    },
  
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {
  
    }
  })