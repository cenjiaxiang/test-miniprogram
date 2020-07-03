var postData = require('../../../data/post-data')
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postId = options.id;
    this.data.currentPostId = postId
    var postDetailData = postData.postList[postId]
    // this.data.postDetailData = postDetailData
    this.setData({
      postDetailData: postDetailData
    })
    // var postsCollected = { // 假设我的缓存里面有这么一个数组
    //   1: true,  文字序号：是否收藏
    //   2: false,
    //   3: true,
    // }
  // 从缓存里面读取这么一个列表状态
    var postsCollected = wx.getStorageSync('posts_collected')
    if (postsCollected) {
      var postCollected = postsCollected[postId] // 获取当前文章是否被收藏
      // 数据更新
      this.setData({
        collected: postCollected
      })
    } else { // 如果这个值不存在
      var postsCollected = {}
      postsCollected[postId] = false
      wx.setStorageSync('posts_collected', postsCollected)
    }
  },
  // 点击收藏按钮
  onColletionTap: function(event) {
    // 获取当前是否已经被收藏
    var postsCollected = wx.getStorageSync('posts_collected');
    console.log('获取当前是否已经被收藏', postsCollected)
    var postCollected = postsCollected[this.data.currentPostId];
    // 
    postCollected = !postCollected; // 取反
    postsCollected[this.data.currentPostId] = postCollected
    this.showToast(postCollected)
    // 更新文字是否被收藏的缓存值
    wx.setStorageSync('posts_collected', postsCollected)
    // 更新数据绑定变量，从而实现切换图片
    this.setData({
      collected: postCollected
    })
    this.showToast(postCollected)
  },
  showModal: function(postCollected, postsCollected) {
    var that = this;
    wx.showModal({
      title: '收藏',
      content: postCollected ? '收藏文章？' : '取消收藏文章？',
      cancelText: '取消',
      confirmText: '确认',
      success: function(res) {
        if (res.confirm) {
          // 更新文字是否被收藏的缓存值
          wx.setStorageSync('posts_collected', postsCollected)
          // 更新数据绑定变量，从而实现切换图片
          that.setData({
            collected: postCollected
          })
        }
      }
    })
  },
  showToast: function(postCollected) {
    wx.showToast({
      title: postCollected ? '收藏成功' : '取消收藏',
      duration: 1000,
      icon: 'success'
    })
  },
  onShareTap: function(event) {
    var itemList = [
      "分享给微信好友",
      "分享到朋友圈",
      "分享到微博"
    ]
    wx.showActionSheet({
      itemList: itemList,
      itemColor: '#405f80',
      success:function(res) {
        // res.cancel 用户是不是点击了取消按钮
        // res.tapIndex 数组元素的序号，从0开始
        wx.showModal({
          title: '用户' + itemList[res.tapIndex],
          // content
        })
      }
    })
  },
  onMusitTap: function(event) {
    console.log('aaaa')
    wx.playBackgroundAudio({
      dataUrl: 'http://ws.stream.qqmusic.qq.com/C100002mWVx72p8Ugp.m4a?fromtag=38',
      title: '夜夜夜夜-齐秦',
      coverImgUrl: 'http://y.gtimg.cn/music/photo_new/T002R150x150M000001TEc6V0kjpVC.jpg?max_age=2592000'
    })
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
    
  }
})