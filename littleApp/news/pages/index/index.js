const typeMap = {
  '国内': 'gn',
  '国际': 'gj',
  '财经': 'cj',
  '娱乐': 'yl',
  '军事': 'js',
  '体育': 'ty',
  '其他': 'other'
}
// todo: 列表项默认图标
Page({
  data: {
    typeLst: ['国内', '国际', '财经', '娱乐', '军事', '体育', '其他'],
    activePage: 0,
    newsLst: []
  },
  onLoad(){
    this.getNews()
  },
  getNews(callback){  
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: typeMap[this.data.typeLst[this.data.activePage]]
      },
      success: res => {
        let result = res.data.result
        result.forEach(item => {
          item.time = /T(\d+:\d+)/.exec(item.date)[1]
        })
        this.setData({
          newsLst: result
        })
      },
      complete: () => {
        callback && callback()
      }
    })
  },
  onTapType(params){
    this.setData({
      activePage: params.currentTarget.dataset.index
    })
  },
  onTapDetail(params){
    let newsId = params.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/detail/index?newsId=' + newsId,
    })
  }
})
