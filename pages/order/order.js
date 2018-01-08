Page({
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading();// 显示导航栏loading
    this.onLoad();// 调用接口加载数据
    wx.hideNavigationBarLoading();// 隐藏导航栏loading
    wx.stopPullDownRefresh();// 当处理完数据刷新后，停止当前页面的下拉刷新
  },
  onLoad(){

  },
  loadCoupon: function () {
    wx.navigateTo({
      url: '../coupon/coupon'
    })
  }
})
