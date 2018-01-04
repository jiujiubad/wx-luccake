var app = getApp();
Page({
  data: {
   movies:[
   {url:'https://ws2.sinaimg.cn/large/006tNc79gy1fmizuzzadzj30ku0km0u5.jpg'} ,
   {url:'https://ws4.sinaimg.cn/large/006tNc79gy1fmizuz16u0j30u00u1405.jpg'} ,
   {url:'https://ws4.sinaimg.cn/large/006tNc79gy1fmizus0vlkj30qm0qmdib.jpg'}
   ]
  },
  search: function () {
    wx.navigateTo({
      url: '../p_search/p_search'
    })
  },
  onShow: function () {
    var that = this;
    wx.request({
      url: 'https://luccake.top/api/v1/products',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          weldata: res.data.data
        })
      }
    })
  }
})
