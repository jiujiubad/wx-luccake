//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var goods = []
    goods = this.loadGoods();
    wx.setStorageSync('goods', goods)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  },
  loadGoods: function () {

    var goods = new Array();
    var good = new Object();
    good.id = "0"
    good.pic = '/images/order/1.jpg';
    good.name = '粉红女孩';
    good.price = '298.00';
    good.weight = '女孩';
    good.spec = '4寸';
    good.count = 1;
    goods[0] = good;

    var good1 = new Object();
    good1.id = "1"
    good1.pic = '/images/order/2.jpg';
    good1.name = '男生户外';
    good1.price = '429.00';
    good1.weight = '男孩';
    good1.spec = '8寸';
    good1.count = 1;
    goods[1] = good1;

    var good2 = new Object();
    good2.id = "2";
    good2.pic = '/images/order/3.jpg';
    good2.name = '海贼王路飞';
    good2.price = '348.00';
    good2.weight = '男生';
    good2.spec = '6寸';
    good2.count = 1;
    goods[2] = good2;
    return goods;

  }
})
