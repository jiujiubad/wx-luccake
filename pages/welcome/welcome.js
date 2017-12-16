var app = getApp();
Page({
  data: {
  },
  onShow: function () {
    var that = this;
    wx.request({
      url: 'https://wx-luccake.herokuapp.com/api/v1/products',
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
