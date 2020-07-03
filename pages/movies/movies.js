// pages/movies/movies.js
var app = getApp();
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters: {},
    comingSoon: {},
    top250: {},
    searchResult: {},
    containerShow: true,
    searchPanelShow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var inTheatersUrl = app.globalData.doubanBase + "/v2/movie/in_theaters?apikey=0b2bdeda43b5688921839c8ecb20399b"
    var comingSoonUrl = app.globalData.doubanBase +  "/v2/movie/coming_soon?apikey=0b2bdeda43b5688921839c8ecb20399b"
    var top250Url = app.globalData.doubanBase +  "/v2/movie/top250?apikey=0b2bdeda43b5688921839c8ecb20399b"
    var urlData = {
      "start": 0,
      "count": 3
    }
    this.getMovieListData(inTheatersUrl, "inTheaters", "正在热映", urlData)
    this.getMovieListData(comingSoonUrl, "comingSoon", "即将上映", urlData)
    this.getMovieListData(top250Url, "top250", "豆瓣Top250", urlData)
  },
  getMovieListData: function(url, settedKey, categoryTitle, urlData) {
    var that = this
    wx.request({
      url: url,
      data: urlData,
      method: 'GET',
      header: {
        "Content-Type": "application/xml"
      },
      success: function(res){
        that.processDouban(res.data, settedKey, categoryTitle)
      },
      fail: function(error) {
        console.log(error)
      }
    })
  },
  processDouban: function(moviesData, settedKey, categoryTitle) {
    var movies = [];
    for (var inx in moviesData.subjects) {
      var subject = moviesData.subjects[inx]
      var title = subject.title
      if (title.length >= 6) {
        title = title.substring(0, 6) + '...'
      }
      var temp = {
        stars: util.convertToStarsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp)
    }
    var readyData = {};
    readyData[settedKey] = {
      categoryTitle: categoryTitle,
      movies: movies
    };
    this.setData(readyData)
  },
  onMoreTap: function(event) {
    var category = event.currentTarget.dataset.category
    wx.navigateTo({
      url: 'more-movies/more-movies?category=' + category,
    })
  },
  
  onBindfocus: function(event) {
    console.log('获取焦点')
    this.setData({
      containerShow: false,
      searchPanelShow: true
    })
  },
  onCancelImgTap: function(event) {
    this.setData({
      containerShow: true,
      searchPanelShow: false
    })
  },
  onBindChange: function(event) {
    var text = event.detail.value;
    var urlData = {
      // q: text
    }
    // var searchUrl = app.globalData.doubanBase + "/v2/movie/search?apikey=0b2bdeda43b5688921839c8ecb20399b"
    var searchUrl = 'https://api.douban.com/v2/book/search?q=我是传奇&start=1'
    this.getMovieListData(searchUrl, "searchResult", "", urlData)
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