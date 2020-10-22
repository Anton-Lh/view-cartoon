var http = require('../../utils/request'); 
import { register } from  '../../utils/api';
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
  clickRegister: function(){
    if(this.data.phoneValue == "" || this.data.passwordValue == ""){
      wx.showToast({
        title: '请输入完整',
        duration: 1500,
        image:'../icon/fail.png'
      })
      return;
    }else if(this.data.phoneValue.length != 11 ){
      wx.showToast({
        title: '手机号不正确',
        duration: 1500,
        image:'../icon/fail.png'
      })
      return;
    }
    
    //进入注册接口
    http.post(getAllCartoon,{
      "user_headimg": "http://cbheaderimg.uvogin.xyz/1557995360693",
      "user_id": 11,
      "user_phone": this.data.phoneValue,
      "user_password": this.data.passwordValue
      },
      function(res){
        //注册成功
        wx.showToast({
          title: '注册成功',
          icon: 'success',
          duration: 2000,
          success: function(){
            wx.redirectTo({
              url: '../login/login'
            })
          }
        })
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
  clickLogin: function(){
    wx.redirectTo({
      url: '../login/login'
    })
  },
  phoneInput: function (e){
    this.setData({
      phoneValue: e.detail.value
    })
  },
  passwordInput: function(e){
    this.setData({
      passwordValue: e.detail.value
    })
  }
})