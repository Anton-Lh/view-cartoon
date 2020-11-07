var app = getApp();
var http = require('../../utils/request'); 
import { banner,getAllCartoon } from  '../../utils/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headImg: '../icon/timg.jpg',
    backgroundImg:[],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 800,
    pageNum:1,
    pageSize:10,
    //实现瀑布流
    noramalData: [],
    leftList: [],
    rightList: [],
    leftHight: 0,
    rightHight: 0,
    beforeColor: "white",
    afterColor: "coral",
    user_id: "11"
  },
  // 跳转详情页
  bindViewTap: function (row) {
    const rows = row.currentTarget.dataset.id
    wx.navigateTo({
      url: '../detail/detail?comic_id=' + rows.comic_id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //获取滚动栏
    http.post(banner,{},
        function(res){
          var image = [];
          for(var i=0;i<res.message.length;i++){
            image.push(res.message[i])
          }
          that.setData({
            backgroundImg:image
          })
        },
        function(err){
          wx.showToast({
            title: '请求失败',
            icon: 'none'
          })
        })
      //获取漫画
      that.getCartoon()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    if(app.globalData.userInfo != null){
      that.setData({
        user_id: app.globalData.userInfo.user_id,
        headImg: app.globalData.userInfo.user_headimg
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
    var that = this;
    var pagenum = that.data.pageNum + 1;
    that.setData({
      pageNum:pagenum
    })
    that.getCartoon()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getCartoon: function(){
    var that = this
    http.post(getAllCartoon,{
      "pageNum":that.data.pageNum,
      "pageSize":that.data.pageSize,
      "user_id":that.data.user_id
    },
      function(res){
        var cartoonAll = that.data.noramalData;
        Array.prototype.push.apply(cartoonAll, res.message);
        that.setData({
          noramalData: cartoonAll
        })
      },
      function(err){
        wx.showToast({
          title: '请求失败',
          icon: 'none'
        })
      })
  },
  entrySearch: function(){
    wx.navigateTo({
      url: '../search/search'
    })
  },
  clickSwiper: function(e){
    wx.navigateTo({
      url: '../detail/detail?comic_id=' + e.currentTarget.dataset.id
    })
  }
})