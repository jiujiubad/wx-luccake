// pages/goods/goods.js
Page({

  data: {
    goods:[]
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading();// 显示导航栏loading
    this.onLoad();// 调用接口加载数据
    wx.hideNavigationBarLoading();// 隐藏导航栏loading
    wx.stopPullDownRefresh();// 当处理完数据刷新后，停止当前页面的下拉刷新
  },
  onLoad: function (options) {
    var p_id = options.id
    var that = this
    wx.request({
      url: 'https://luccake.top/api/v1/products/' + p_id,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          picdata: res.data.photos,
          goods: res.data
        })
      }
    })
    that.random_8()
  },
  random_8:function(e){ //加载“热门搜索”
    var that = this;
    wx.request({
      url: 'https://luccake.top/api/v1/products',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.setStorageSync('word',res.data.data)  //success function等回调函数是不能return返回数据的，可以通过缓存的方法拿到数据。
      }
    })
    var word = wx.getStorageSync('word');
    var ran = [];
    for(var i=0; i<10; i++){
      var temp = (Math.random()*word.length)>>0; //随机产生0-word.length的数字。其中Math.random()是js方法，随机产生0-1的数。
      ran.push(word[temp]); //把word[temp]放在out数组的最右边，组成新的out数组
    }
    this.setData({ran:ran})
  },
})
