// pages/EXPdetail/EXPdetail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //   title:"字节跳动面试上岸经验",
        //   author:"@swfoodt",
        //   time:"2022-10-05",
        //   ContentTest:"1. 一面，1小时。一面表现不好，以为自己跪了，没想到还能进二面。就自我介绍、聊了聊项目。写个VUE的拖拽组件（vue的api徒手撸不出来，写了个原生的拖拽，不记得属性名用了伪代码，末了加了个节流）好像有问到VUEX和VUE的双向绑定？（不记得一面有没有问后者了）。让介绍下promise，写了写promise的代码。介绍下promise还有什么api，说了下all，说了race这个api，但是名字一下子想不起来了。让实现一下all，当时忘了（不知道）可以用计数法，写了个setInterval的…问线性表和链表的区别，写个链表反转，说了可以用递归和非递归，非递归版本写了半天，貌似写的还有bug，写完之后意犹未尽打算写递归版的，面试官说好了就这样吧。2. 二面，约1小时。聊了双向绑定的问题，面试官问VUE双向绑定的实现，讲了defineProperty和Proxy，面试官出了几个更改数据的情形，问当前版本的VUE能否监听到改的再给了个原型链的题，也是基本对了，但是和上题一样有个地方搞混了，不过一边做题的时候一边仔细地和面试官讲了下js里面new的过程。",


        //   imageList:[
        //      "https://img.js.design/assets/smartFill/img364164da74c4b8.jpg",
        //      "https://img.js.design/assets/smartFill/img364164da74c4b8.jpg",
        //      "https://img.js.design/assets/smartFill/img364164da74c4b8.jpg",
        //      "https://img.js.design/assets/smartFill/img364164da74c4b8.jpg",
        //   ],

        //   cyComments: [
        //     {
        //       CommentName:"杰出青年",
        //       Ctime:"2022/10/06",
        //       Comment:"全文通俗易懂，趣味性强。 文章线索明朗主题突出，文章开头与结尾时的诗化语言。充满想象与韵律之美，令人愿读爱读，不忍释手。"
        //     },
        //     {
        //       CommentName:"小南瓜",
        //       Ctime:"2022/10/06",
        //       Comment:"全文通俗易懂，趣味性强。 文章线索明朗主题突出，文章开头与结尾时的诗化语言。充满想象与韵律之美，令人愿读爱读，不忍释手。"
        //     },
        //     {
        //         CommentName:"南瓜",
        //         Ctime:"2022/10/06",
        //         Comment:"好活儿。"
        //       },
        //     // 更多数据...
        //   ],

        //   viewed:"15",

    },

    /**
     * 生命周期函数--监听页面加载
     */
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
        console.log(this.data.item.time)
        console.log(this.data.item.imageList)
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