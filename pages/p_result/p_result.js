var API_URL = 'https://luccake.top/api/v1/products?utf8=%E2%9C%93&q%5Btitle_or_description_cont%5D='
var API_URL2 = 'https://luccake.top/api/v1/products?commit=Search&q%5Bs%5D='
var API_com1 = '&q%5Btitle_or_description_cont%5D='
var API_com2 = '&utf8=%E2%9C%93'

Page({
  data:{
    cakes: [],
    result: [],
    name: '',
    currentTab: 0,
  },
  onLoad:function(e){
    var inputValue = e.str
    wx.setStorageSync('inputValue', inputValue);
    console.log("成功传递",e.str)
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
          cakes: res.data.data,
          name: e.str
        })
      }
    })
  },
  search: function (e) {
    var inputValue = e.detail.value
    console.log("重新搜索", inputValue)
    wx.setStorageSync('inputValue', inputValue);
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
          cakes: res.data.data,
          currentTab: 0,
          name: inputValue
        })
      }
    })
  },
  resetSearch: function () {
    var result = new Array();
    this.setData({ result: result, name: '' });
  },

  switchAll: function (e) {
    var inputValue = this.data.name
    console.log(inputValue)
    if (!inputValue) {
      return;
    }
    var that = this; //保存this的数据
    var utf = encodeURI(inputValue)
    wx.request({
      url: API_URL + utf + "&commit=Search",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          cakes: res.data.data,
          currentTab: 0
        })
      }
    })
  },
  switchPrice:function(e){
    var inputValue = this.data.name
    console.log(inputValue)
    if (!inputValue) {
      return;
    }
    var that = this; //保存this的数据
    var utf = encodeURI(inputValue)
    wx.request({
      url: API_URL2+'price+asc'+API_com1+utf+API_com2,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          cakes: res.data.data,
          currentTab: 1
        })
      }
    })
  },
  switchTime: function (e) {
    var inputValue = this.data.name
    console.log("按时间排序", inputValue)
    if (!inputValue) {
      return;
    }
    var that = this; //保存this的数据
    var utf = encodeURI(inputValue)
    wx.request({
      url: API_URL2 + 'created_at+desc' + API_com1 + utf + API_com2,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          cakes: res.data.data,
          currentTab: 2
        })
      }
    })
  },
  switchTest:function(e){
    var inputValue = this.data.name
    console.log("按时间排序", inputValue)
    if (!inputValue) {
      return;
    }
    var that = this; //保存this的数据
    var utf = encodeURI(inputValue)
    wx.request({
      url: API_URL2 + 'quantity+desc' + API_com1 + utf + API_com2,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          cakes: res.data.data,
          currentTab: 3
        })
      }
    })
  }
})