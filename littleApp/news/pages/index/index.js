const typeMap = {
  '国内': 'gn',
  '国际': 'gj',
  '财经': 'cj',
  '娱乐': 'yl',
  '军事': 'js',
  '体育': 'ty',
  '其他': 'other'
}

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
        this.setData({
          newsLst: result
        })
      },
      complete: () => {
        callback && callback()
      }
    })
  }
})
