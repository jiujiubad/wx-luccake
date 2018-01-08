var app = getApp();
Page({
  data: {
   intros:[
   {url:'https://ws3.sinaimg.cn/large/006tNc79gy1fn8bq2pse2j30gw08g3zq.jpg'},
   {url:'https://ws3.sinaimg.cn/large/006tNc79gy1fn8bq4h8tkj30gw08gwgm.jpg'},
   {url:'https://ws1.sinaimg.cn/large/006tNc79gy1fn8bq1wwbnj30gw08g0ta.jpg'},
   {url:'https://ws2.sinaimg.cn/large/006tNc79gy1fn8bq0r1u3j30gw08gab6.jpg'},
   {url:'https://ws1.sinaimg.cn/large/006tNc79gy1fn8bq1dpiqj30gw08gjso.jpg'}
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
