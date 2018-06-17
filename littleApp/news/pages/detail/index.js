// pages/detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsId: 0,
    activePage: 0, // 记录跳转之前的新闻类别
    title: '',
    source: '',
    time: '',
    readCount: 0,
    content: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      newsId: options.newsId,
      activePage: options.activePage
    })
    this.getNewsDetail(options.newsId)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getNewsDetail(this.data.newsId, () => {
      wx.stopPullDownRefresh()
    })
  },
  // 获取详细新闻数据
  getNewsDetail(newsId, callback){
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: {
        id: newsId
      },
      success: res => {
        let result = res.data.result
        this.setData({
          title: result.title,
          readCount: result.readCount,
          source: result.source,
          time: /T(\d+:\d+)/.exec(result.date)[1],
          content: result.content
        })
      },
      complete: () => {
        callback && callback()
      }
    })
  },
  // 自定义导航栏的返回事件
  onTapBack(){
    wx.navigateTo({
      url: '/pages/index/index?activePage=' + this.data.activePage,
    })
  }
})