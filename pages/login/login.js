var app = getApp();
var http = require('../../utils/request'); 
import { login } from  '../../utils/api';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneValue: '',
    passwordValue: ''
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
  phoneInput: function(e){
    this.setData({
      phoneValue: e.detail.value
    })
  },
  passwordInput: function(e){
    this.setData({
      passwordValue: e.detail.value
    })
  },
  clickLogin: function(){
    if(this.data.phoneValue == ""){
      wx.showToast({
        title: '请输入手机号',
        duration: 1500,
        image:'../icon/fail.png'
      })
    }else if(this.data.passwordValue == ""){
      wx.showToast({
        title: '请输入密码',
        duration: 1500,
        image:'../icon/fail.png'
      })
    }else{
      //进入登录接口
    http.post(login,{
      "user_id": 11,
      "user_phone": this.data.phoneValue,
      "user_password": this.data.passwordValue
      },
      function(res){
        if(res.result == 0){
          //登录成功，跳转
          app.globalData.userInfo = res.message
          wx.reLaunch({
            url: '../home/home'
          })
        }else{
          wx.showToast({
            title: '登录失败',
            duration: 3000,
            image:'../icon/fail.png'
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
    }
  },
  clickRegister: function(){
    wx.redirectTo({
      url: '../register/register'
    })
  }
})