var API_URL = 'https://luccake.top/api/v1/products?utf8=%E2%9C%93&q%5Btitle_or_description_cont%5D='
Page({
  data: {
    cakes: [],
    result: [],
    name: ''
  },
  onLoad:function(){
    this.loadTips();
  },
  search: function (e) {
    if (!e.detail.value) {
      return;
    }
    wx.showToast({ //加载中的动画效果
      title: "加载中..",
      icon: "loading",
      duration: 10000
    });
    var that = this; //保存this的数据
    var utf = encodeURI(e.detail.value)
    wx.request({
      url: API_URL + utf + "&commit=Search",
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
  },
  loadGoods: function () {
    var goods = ['奶粉成人', '奶粉3段', '奶粉1段', '奶粉2段', '奶粉京东自营', '奶粉4段', '奶粉盒', '咖啡机', '咖啡杯', '咖啡豆', '咖啡伴侣', '咖啡机家用'];
    return goods;
  },
  searchGoods: function (e) {
    var name = e.detail.value;
    var goods = this.loadGoods();
    var result = new Array();
    if (name != '') {
      for (var i = 0; i < goods.length; i++) {
        var good = goods[i];
        if (good.indexOf(name) > -1) {
          result.push(good);
        }
      }
    }
    this.setData({ result: result });
  },
  resetSearch: function () {
    var result = new Array();
    this.setData({ result: result, name: '' });
  },
  loadTips:function(e){
    var that = this;
    var word = [];
    wx.request({
      url: 'https://luccake.top/api/v1/products', 
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          word: res.data.data
        })
      }
    })
  },
  clickTip:function(e){
    console.log(e.currentTarget.dataset.title)
    var name = e.currentTarget.dataset.title
    this.setData({
      name: name
    })
    var that = this; //保存this的数据
    var utf = encodeURI(name)
    wx.request({
      url: API_URL + utf + "&commit=Search",
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


