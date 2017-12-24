Page({
  data: {
    navList: [],
    left_id: '',
  },
  onLoad: function (options) {
    this.getCategory();
  },
  getCategory: function () {
    var that = this;
    wx.showLoading({
      title: '加载中...',
    });
    wx.request({
      url: 'https://luccake.top/api/v1/categories',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log(res.data)
        that.setData({
          navList: res.data.categories
        });
        wx.hideLoading();
      }
    })
  },
  switch_1: function(e){
    console.log(e)
    var _id = e.currentTarget.dataset.id
    console.log(_id)
    this.setData({
      left_id: _id
    })
  }
})
