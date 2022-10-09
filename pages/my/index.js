// pages/my/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        Usre:0,
        Username:'王裎🐟',
        touxiang:"https://i.imgtg.com/2022/10/08/pLjut.png"

    },
    // 用于我的经验，我的问答，职业测评，我的目标，收藏 页面函数
    jump1:function()
    {
      wx.switchTab({
        url: '/pages/index/index'
      })
    },
    jump2:function()
    {
      wx.switchTab({
        url: '/pages/index/index'
      })
    },
    jump3:function()
    {
      wx.switchTab({
        url: '/pages/index/index'
      })
    },
    jump4:function()
    {
      wx.switchTab({
        url: '/pages/index/index'
      })
    },
    collection:function()
    {
      wx.switchTab({
        url: '/pages/index/index'
      })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

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