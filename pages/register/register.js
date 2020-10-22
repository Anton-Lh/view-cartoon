var http = require('../../utils/request'); 
import { register,cheackUser } from  '../../utils/api';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneValue: '',
    passwordValue: '',
    cheackPhone: false
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
    //判断手机号是否存在
    this.phoneValidate();
    //进入注册接口
    this.registerRequest();
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
  },
  phoneValidate: function(){
    var that = this
    http.post(cheackUser,{
      "user_id": 11,
      "user_phone": this.data.phoneValue
      },
      function(res){
        if(!res.message){
          that.setData({
            cheackPhone: true
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
  registerRequest: function(){
    if(!this.data.cheackPhone){
      wx.showToast({
        title: '号码已存在',
        duration: 3000,
        image:'../icon/fail.png'
      })
    }else{
      http.post(register,{
        "user_headimg": "http://cbheaderimg.uvogin.xyz/1557995360693",
        "user_id": 11,
        "user_phone": this.data.phoneValue,
        "user_password": this.data.passwordValue
        },
        function(res){
          console.log('成功：' + JSON.stringify(res))
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
    }
  }
})