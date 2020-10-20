var http = require('../../utils/request'); 
import { banner,getAllCartoon } from  '../../utils/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    rightHight: 0
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
            image.push(res.message[i].banner_pic)
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
      "pageNum":this.data.pageNum,
      "pageSize":this.data.pageSize,
      "user_id":"11"
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
  }
})