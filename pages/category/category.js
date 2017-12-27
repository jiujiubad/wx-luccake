Page({
  data: {
    navLeftList: [],
    categoryList: [],
    left_id: 1,
    curIndex: 0,
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
          navLeftList: res.data.data,
          navRightList: res.data.data
        });
        wx.hideLoading();
      }
    })
  },

  switch_right: function(e){
    console.log(e)
    var _id = e.currentTarget.dataset.id,
    index = e.currentTarget.dataset.index;
    console.log(_id)
    console.log(index)
    this.setData({
      left_id: _id,
      curIndex: index
    })
  }
})
