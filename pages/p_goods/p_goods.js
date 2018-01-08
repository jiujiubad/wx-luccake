// pages/goods/goods.js
Page({

  data: {

  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading();// 显示导航栏loading
    this.onLoad();// 调用接口加载数据
    wx.hideNavigationBarLoading();// 隐藏导航栏loading
    wx.stopPullDownRefresh();// 当处理完数据刷新后，停止当前页面的下拉刷新
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
