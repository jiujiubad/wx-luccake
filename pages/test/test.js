var API_URL = 'https://luccake.top/api/v1/products/search?q=翻糖'
Page({
  data: {
    cakes: []
  },
  onShow: function (e) {
    var that = this; //保存this的数据
    console.log(typeof(API_URL))
    wx.request({
      url: "https://luccake.top/api/v1/products/search?q=翻糖",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(typeof(res.data))
        wx.hideToast();
        that.setData({
          cakes: res.data.data
        })
      }
    })
  }
})