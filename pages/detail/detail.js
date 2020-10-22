// pages/detai/detail.js
var http = require('../../utils/request');
import { cartoonDetails, comment } from '../../utils/api'
Page({
  data: {
    objectArray: [],
    commentList:[],
    coverPic:'',
    comicTitle:'',
    updateNum:'',
    //  文本框
    height: 20,
    hideShare: false,
    formValue:''
  },
  // 关闭遮罩
  chooseShare: function () {
    this.setData({ hideShare: false })
  },
  chooseForm:function(){
    this.setData({ hideShare: true })
  },
  // 表单框内容

  bindFormSubmit: function (e) {
    this.setData({
      formValue: e.detail.value,
      hideShare: false
    })
    console.log(this.data.formValue)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    var that = this
    http.post(cartoonDetails, {
      "comic_id": 241,
      "user_id":13669,
    },
      function (res) {
        that.setData({
          objectArray: res.message.comicDetialsList,
          coverPic: res.message.cover_pic,
          comicTitle: res.message.comic_title,
          updateNum: res.message.update_num
        })
        console.log('成功的参数', res.message)
        
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
      "comic_id": 241,
      "pageNum":1,
      "pageSize":'100',
      "user_id": 13669,
    },
      function (res) {
        that.setData({
          commentList: res.message,
        })
        console.log('成功的参数', res.message)

      },
      function (err) {
        wx.showToast({
          title: '请求失败',
          icon: 'none'
        })
      })
  }
})
