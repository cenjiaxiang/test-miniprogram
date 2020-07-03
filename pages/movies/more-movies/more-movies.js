// pages/movies/more-movies/more-movies.js
var app = getApp();
var util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categoryTitle: "",
    movies: {},
    requestUrl: "",
    totalCount: 0,
    isEmpty: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var category = options.category
    this.data.categoryTitle = category
    var baseUrl = "";
    switch (category) {
      case "正在热映":
        baseUrl = app.globalData.doubanBase + "/v2/movie/in_theaters?apikey=0b2bdeda43b5688921839c8ecb20399b"
        break;
      case "即将上映":
        baseUrl = app.globalData.doubanBase + "/v2/movie/coming_soon?apikey=0b2bdeda43b5688921839c8ecb20399b"
        break;
      case "豆瓣Top250":
        baseUrl = app.globalData.doubanBase + "/v2/movie/top250?apikey=0b2bdeda43b5688921839c8ecb20399b"
        break;
    }
    var httpData = {
      "start": 0,
      "count": 20
    }
    util.http(baseUrl, httpData, this.processDouban)
    this.data.requestUrl = baseUrl
  },
  processDouban: function (moviesData) {
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
    var totalmovies = {};
    if (!this.data.isEmpty) {
      totalmovies = this.data.movies.concat(movies)
    } else {
      totalmovies = movies
      this.data.isEmpty = false;
    }
    this.setData({
      movies: totalmovies
    })
    this.data.totalCount += 20;
    wx.hideNavigationBarLoading();
  },
  onScrollLower: function(event) {
    var nextUrl = this.data.requestUrl
    var totalCount = this.data.totalCount
    var httpData = {
        "start": totalCount,
        "count": 20
    }
    wx.showNavigationBarLoading();
    util.http(nextUrl, httpData, this.processDouban)
  },
  onTopScroll: function(event) {
    console.log('下拉刷新---')
    var refreshUrl = this.data.requestUrl
    var httpData = {
        "start": 0,
        "count": 20
    }
    this.data.movies = {};
    this.data.isEmpty = true;
    util.http(refreshUrl, httpData, this.processDouban)
    wx.showNavigationBarLoading();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.categoryTitle,
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  }
})