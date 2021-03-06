var app = getApp();
var http = require('../../utils/request'); 
import { search } from  '../../utils/api';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mainWidth: 0,  //dom的高度
    mainBoxWidth: 0, //dom的高度
    marginLF: 0, 
    mainPadding: 0, //dom的padding
    dataArr: [],
    searchValue: '',
    user_id: "11"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
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
      if(app.globalData.userInfo != null){
        that.setData({
          user_id: app.globalData.userInfo.user_id
        })
      }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getSearch();
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
  getSearch: function(value){
    var that = this;
    if(value){
      http.post(search,{
        "search_info": value, //搜索内容
        "user_id": that.data.user_id
        },
        function(res){
          if(res.message.length != 0){
            that.setData({
              dataArr: res.message
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
    }else{
      that.setData({
        dataArr: []
      })
    } 
    
  },
  clickSearch: function(){
    this.getSearch(this.data.searchValue)
  },
  searchInput: function(e){
    this.setData({
      searchValue: e.detail.value
    })
  },
  clickResult: function(row){
    const rows = row.currentTarget.dataset.id
      wx.navigateTo({
        url: '../detail/detail?comic_id=' + rows.search_id
      })
  }
})