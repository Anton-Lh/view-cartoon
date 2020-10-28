// pages/my/my.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickname: '请登录',
    fontStatus: '登录',
    headImg: '../icon/timg.jpg',
    status: false
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
    var that = this;
    if(app.globalData.userInfo != null){
      that.setData({
        nickname: app.globalData.userInfo.user_phone,
        fontStatus: '退出',
        headImg: app.globalData.userInfo.user_headimg,
        status: true
      })
    }
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

  },
  clickStatus: function(){
    if(!this.data.status){
      wx.navigateTo({
        url: '../login/login'
      })
    }else{
      app.globalData.userInfo == null;
      wx.reLaunch({
        url: '../home/home'
      })
    }
  },
  clickTucao: function(){
    if(app.globalData.userInfo == null){
      wx.showToast({
        title: '吐槽前请登录！',
        icon: 'none',
        duration: 1500
      });
      wx.navigateTo({
        url: '../login/login'
      })
    }else{
      //进入吐槽界面

    }
  }
})