// index.js
Page({
    data: {
        navHeight: 0,
        top: 0,
        stateHeight: 0
    },
    onLoad: function (options) {
        this.fn();
    },
    onLaunch: function () {
  
        // this.getMenuButtonBound();
    },
    //  获取状态栏信息
    fn() {
        let stateHeight = 0;		//  接收状态栏高度
        let navHeight = wx.getMenuButtonBoundingClientRect().height;	//  获取胶囊高度
        let top = 0;
        wx.getSystemInfo({
            success(res) {
                console.log("状态栏：" + res.statusBarHeight)
                stateHeight = res.statusBarHeight;
            }
        })
        top = wx.getMenuButtonBoundingClientRect().top - stateHeight;	//  获取top值
        //  然后将取到的值返回在data里面
        this.setData({
            navHeight: navHeight + top * 2,		//  导航栏高度
            stateHeight: stateHeight			//  状态栏高度
        })
    },
})
