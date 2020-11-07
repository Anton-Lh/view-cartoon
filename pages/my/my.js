// pages/my/my.js
var app = getApp();
var http = require('../../utils/request');
import { addTuCao } from '../../utils/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickname: '请登录',
    fontStatus: '登录',
    headImg: '../icon/timg.jpg',
    status: false,
    hideShare: false,
    user_id: ""
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
        status: true,
        user_id: app.globalData.userInfo.user_id
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

  clickStatus: function(){
    if(!this.data.status){
      wx.navigateTo({
        url: '../login/login'
      })
    }else{
      
      getApp().globalData.userInfo = null;
      wx.reLaunch({
        url: '../home/home'
      })
    }
  },
  clickTucao: function(){
    console.log(app.globalData.userInfo)
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
      this.setData({ hideShare: true })
    }
  },
  // 关闭遮罩
  chooseShare: function () {
    this.setData({ hideShare: false })
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
      http.post(addTuCao, {
        "tucao_info": e.detail.value.textarea,
        "user_id": that.data.user_id,
      },
      function (res) {
        that.setData({
          hideShare: false,
        })
        wx.showToast({
          title: '吐槽成功',
          icon: 'success',
          duration: 2000
        })
      },
      function (err) {
        wx.showToast({
          title: '请求失败',
          icon: 'none'
        })
      })
    }
  },
    chooseForm:function(){
      if(app.globalData.userInfo == null){
        wx.showToast({
          title: '吐槽前请登录！',
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
})