// pages/posts/posts.js
var postData = require('../../data/post-data') // 只能用相对路径
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 小程序总会读取data对象来做数据绑定，这个动作我们称为动作a，在onload事件执行之后发生
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.data.postList = postData.postList   ?????
    // setData 是更新数据
    this.setData({
      postList: postData.postList
    })
  },
  onPostTap: function(event) {
    var postId = event.currentTarget.dataset.postid;
    var viewNum = event.currentTarget.dataset.viewid;
    console.log('viewNum', viewNum)
    viewNum++
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId
    })
  },
  // onSwiperItemTap: function(event) {
  //   var postId = event.currentTarget.dataset.postid;
  //   wx.navigateTo({
  //     url: 'post-detail/post-detail?id=' + postId
  //   })
  // },
  onSwiperTap: function(event) {
    // target 指的是当前点击的组件, currentTarget 指的是事件捕获组件
    var postId = event.target.dataset.postid;
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  }
})