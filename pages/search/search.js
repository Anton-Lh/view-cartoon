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
    marginLF: 0, 
    mainPadding: 0, //dom的padding
    moreDisplay: 'block',
    dataArr: [],
    pageNum: 1, //页数
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
          let marginLF = (sw - (mbw*3))/6;
          that.setData({
            mainWidth: sw,
            mainBoxWidth: mbw,
            marginLF: marginLF,
            mainPadding: mp
          }) 
        },
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
  getCollection: function(){
    var that = this;
    http.post(collection,{
      "pageNum": that.data.pageNum,
      "pageSize": 10,
      "user_id": app.globalData.userInfo.user_id
      },
      function(res){
        if(res.message.length != 0){
          if(that.data.pageNum == 1){
            that.setData({
              dataArr: res.message
            })
          }else{
            var dataArr = that.data.dataArr;
            var arr2 = res.message;
            dataArr = dataArr.concat(arr2);
            that.setData({
              dataArr: dataArr
            })
          }
        }else{
          that.setData({
            moreDisplay: 'none'
          })
          wx.showToast({
            title: '没有更多收藏啦~~',
            icon: 'none',
            duration: 3000
          })
        }
      },
      function(err){
        wx.showToast({
          title: '请求失败',
          duration: 3000,
          image:'../icon/fail.png'
        })
      }
    )
  },
})