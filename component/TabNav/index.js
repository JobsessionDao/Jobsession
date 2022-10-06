// component/TabNav/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        title: {
            type: String,
            value: "默认标题"
        },
        navBgColor: { // 导航颜色 默认黑色
            type: String,
            value: 'rgba(255,255,255,0)'
        },
        backPath: { // 返回页面路径
            type: String,
            default: ''
        },
        backDelta: { // 返回页面层数
            type: Number,
            default: 1
        },
        ifBack:{
            // 是否返回
            type:Boolean,
            default:true
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        navHeight: 0,
        top: 0,
        stateHeight: 0
    },
    lifetimes: {
        attached: function () {
            // 在组件实例进入页面节点树时执行
            this.fn();
        },
        detached: function () {
            // 在组件实例被从页面节点树移除时执行
        },
    },
    /**
     * 组件的方法列表
     */
    methods: {
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
        navBack: function () {
            if (this.properties.backPath === '') {
                wx.navigateBack({
                    delta: this.properties.backDelta
                })
            } else {
                wx.redirectTo({
                    url: this.properties.backPath
                })
            }
            this.triggerEvent('backEvent', {}) // 可绑定点击返回时的事件
        }
    }
})
