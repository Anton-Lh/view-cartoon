var app = getApp();
var http = require('../../utils/request'); 
import { collection } from  '../../utils/api';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mainWidth: 0,  //dom的高度
    mainBoxWidth: 0, //dom的高度
    mainPadding: 0, //dom的padding
    noLoginDisply: 'none', //dom的display
    dataArr: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    app.globalData.userInfo = {"user_id":"13667"} //测试代码,上线时删除
    if(app.globalData.userInfo != null){
      wx.getSystemInfo({
        success: (result) => {
          let sw = result.screenWidth - 30;
          let mbw = sw / 3 - 10;
          let mp = 15;
          that.setData({
            mainWidth: sw,
            mainBoxWidth: mbw,
            mainPadding: mp
          }) 
        },
      })
    }else{
      that.setData({
        noLoginDisply: 'flex'
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getCollection();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
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
  clickLogin: function(){
    wx.redirectTo({
      url: '../login/login'
    })
  },
  getCollection: function(){
    http.post(collection,{
      "pageNum": 1,
      "pageSize": 10,
      "user_id": app.globalData.userInfo.user_id
      },
      function(res){
        console.log(res)
      },
      function(err){
        wx.showToast({
          title: '请求失败',
          duration: 3000,
          image:'../icon/fail.png'
        })
      }
    )
  }
})