var API_URL = 'https://luccake.top/v2/products/search'
Page({
  data: {
    cakes: []
  },
  search: function (e) {
    var aaa = API_URL + "?utf8=✓&q=" + e.detail.value
    console.log(aaa)
    if (!e.detail.value) {
      return;
    }
    wx.showToast({ //加载中的动画效果
      title: "加载中..",
      icon: "loading",
      duration: 10000
    });
    var that = this; //保存this的数据
    wx.request({
      url: API_URL + "?utf8=✓&q=" + e.detail.value,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        wx.hideToast();
        that.setData({
          cakes: res.data.data
        })
      }
    })
  }
})