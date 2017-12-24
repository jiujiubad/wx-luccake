// pages/exercies/index.js
Page({
  data: {

  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: 'https://luccake.top/api/v1/categories', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          newsda: res.data.categories
        })
      }
    })
  },
  loadData: function (e) {
    var that = this;
    console.log(e.target.dataset.categoryid); //测试console是否显示id号，这行可删除。
    wx.request({
      url: 'https://luccake.top/api/v1/categories/' + e.target.dataset.categoryid, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          newsdata: res.data.products,
          cur_id: res.data.id,
        })
      }
    })
  }
})