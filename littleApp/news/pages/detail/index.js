// pages/detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsId: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      newsId: options.newsId
    })
    this.getNewsDetail(options.newsId)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },
  getNewsDetail(newsId){
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: {
        id: newsId
      },
      success: res => {
        console.log(res)
      }
    })
  }
})