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
    wx.navigateTo({
      url: '../p_result/p_result?arr='+JSON.stringify(that.data.cakes),
    })
    console.log("ff", that.data.cakes)
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


