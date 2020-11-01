// pages/detai/detail.js
var app = getApp();
var http = require('../../utils/request');
import { cartoonDetails, comment, addComment } from '../../utils/api'
Page({
  data: {
    objectArray: [],
    commentList:[],
    coverPic:'',
    comic_id: '',
    comicTitle:'',
    updateNum:'',
    //  文本框
    height: 20,
    hideShare: false,
    user_id: "11",
    isComicCol: false,
    shoucang: '收藏',
    user_id: "11"
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(app.globalData.userInfo != null){
      var uid = app.globalData.userInfo.user_id;
      this.setData({
        user_id: uid
      })
    }
    this.setData({
      comic_id: options.comic_id
    })
    this.getDetails()
    this.getComment()
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
  
  },
  // 获取详情页数据
  getDetails: function () {
    var that = this;
    http.post(cartoonDetails, {
      "comic_id": that.data.comic_id,
      "user_id": that.data.user_id,
    },
      function (res) {
        console.log(res.message)
        that.setData({
          objectArray: res.message.comicDetialsList,
          coverPic: res.message.cover_pic,
          comicTitle: res.message.comic_title,
          updateNum: res.message.update_num
        })
        if(that.data.user_id != 11 && res.message.is_ComicCol){
          that.setData({
            isComicCol: res.message.is_ComicCol,
            shoucang: '已收藏'
          })
        }
      },
      function (err) {
        wx.showToast({
          title: '请求失败',
          icon: 'none'
        })
      })
  },
  // 获取评论
  getComment:function(){
    var that = this
    http.post(comment, {
      "comic_id": that.data.comic_id,
      "pageNum":1,
      "pageSize":'100',
      "user_id": that.data.user_id,
    },
      function (res) {
        that.setData({
          commentList: res.message,
        })

      },
      function (err) {
        wx.showToast({
          title: '请求失败',
          icon: 'none'
        })
      })
  },
  // 关闭遮罩
  chooseShare: function () {
    this.setData({ hideShare: false })
  },
  chooseForm:function(){
    if(app.globalData.userInfo == null){
      wx.showToast({
        title: '发帖前请登录！',
        icon: 'none',
        duration: 1500
      });
      wx.navigateTo({
        url: '../login/login'
      })
      return;
    }
    this.setData({ hideShare: true })
  },
  // 跳转对应集数
  bindViewNum:function(row){
    const rows = row.currentTarget.dataset.id
    console.info('跳转对应集数',rows.detial_id)
    wx.navigateTo({
      url: '../cartoondeatil/cartoondeatil?detial_id=' + rows.detial_id
    })
  },
  clickZank: function(){
    if(app.globalData.userInfo != null){
      
    }
  },
  // 表单框内容
  bindFormSubmit: function (e) {
    var that = this
    if(e.detail.value.textarea == ""){
      wx.showToast({
        title: '请输入',
        icon: 'none'
      })
    }else{
      console.info('sadasd',e.detail.value.textarea)
      http.post(addComment, {
        "cc_info": e.detail.value.textarea,
        "cc_type": 0,
        "comic_id": that.data.comic_id,
        "user_id": that.data.user_id,
      },
      function (res) {
        that.setData({
          hideShare: false,
        })
        wx.showToast({
          title: '评论成功',
          icon: 'success',
          duration: 2000
        })
        that.getComment()
      },
      function (err) {
        wx.showToast({
          title: '请求失败',
          icon: 'none'
        })
      })
    }
    
  }
  
})
