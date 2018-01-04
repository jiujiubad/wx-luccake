var API_URL = 'https://luccake.top/api/v1/products?utf8=%E2%9C%93&q%5Btitle_or_description_cont%5D='

Page({
  data:{
    cakes: [],
    result: [],
    name: '',
  },
  onLoad:function(e){
    var inputValue = e.arr
    console.log("成功传递",e.arr)
    if (!inputValue) {
      return;
    }
    wx.showToast({ //加载中的动画效果
      title: "加载中..",
      icon: "loading",
      duration: 10000
    });
    var that = this; //保存this的数据
    var utf = encodeURI(inputValue)
    wx.request({
      url: API_URL + utf + "&commit=Search",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        wx.hideToast();
        that.setData({
          cakes: res.data.data
        })
      }
    })
  },
  search2: function (e) {
    console.log("结果",e)
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
        wx.hideToast();
        that.setData({
          cakes: res.data.data
        })
      }
    })
  },
  resetSearch2: function () {
    var result = new Array();
    this.setData({ result: result, name: '' });
  }
})