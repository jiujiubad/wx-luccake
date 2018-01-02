// pages/goods/goods.js
Page({

  data: {

  },

  onLoad: function (options) {
    console.log(options)
    var p_id = options.id
    var that = this
    wx.request({
      url: 'https://luccake.top/api/v1/products/' + p_id,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          picdata: res.data.photos,
          goods: res.data
        })
      }
    })
  }

})