var API_URL = 'https://luccake.top/api/v1/products?utf8=%E2%9C%93&q%5Btitle_or_description_cont%5D='
var API_URL2 = 'https://luccake.top/api/v1/products?commit=Search&q%5Bs%5D='
var API_com1 = '&q%5Btitle_or_description_cont%5D='
var API_com2 = '&utf8=%E2%9C%93'

Page({
  data: {
    cakes: [],
    result: [],
    name: '',
    currentTab: 0,
  },
  onLoad:function(){
    this.loadTips();
    var searchData = wx.getStorageSync('searchData');
    searchData.reverse()
    this.setData({
      searchData: searchData,
    })
    console.log('sea',searchData)
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
        that.setData({
          word: res.data.data
        })
      }
    })
  },
  clickTip:function(e){
    var name = e.currentTarget.dataset.title
    if (!name) {
      return;
    }
    var searchData = wx.getStorageSync('searchData') || []
    searchData.push(name)
    wx.setStorageSync('searchData', searchData)
    console.log('ffff',searchData)
    wx.showToast({ //加载中的动画效果
      title: "加载中..",
      icon: "loading",
      duration: 10000
    });
    var that = this; //保存this的数据
    var utf = encodeURI(name)
    wx.request({
      url: API_URL + utf + "&commit=Search",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        wx.hideToast();
        that.setData({
          cakes: res.data.data,
          name: name,
          word: ''
        })
      }
    })
  },
  clickSearchData:function(e){
    console.log(e)
    var name = e.currentTarget.dataset.title
    if (!name) {
      return;
    }
    var searchData = wx.getStorageSync('searchData') || []
    searchData.push(name)
    wx.setStorageSync('searchData', searchData)
    console.log('ffff',searchData)
    wx.showToast({ //加载中的动画效果
      title: "加载中..",
      icon: "loading",
      duration: 10000
    });
    var that = this; //保存this的数据
    var utf = encodeURI(name)
    wx.request({
      url: API_URL + utf + "&commit=Search",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        wx.hideToast();
        that.setData({
          cakes: res.data.data,
          name: name,
          word: ''
        })
      }
    })
  },
  loadTitles:function(e){
    var that = this; //保存this的数据
    wx.request({
      url: 'https://luccake.top/api/v1/products',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          goods: res.data.data,
        })
        wx.setStorageSync('e',res.data.data)
      }
    })
    var goods = wx.getStorageSync('e');
    var titles = [];
    for (var i = 0; i < goods.length; i++) {
      var title = goods[i].title;
      titles.push(title);
    }
    this.setData({ titles: titles })
    return titles
  },
  searchTitle: function (e) {
    var name = e.detail.value;
    var titles = this.loadTitles();
    var result = [];
    if (name != '') {
      for (var i = 0; i < titles.length; i++) {
        var good = titles[i];
        if (good.indexOf(name) > -1) {
          result.push(good);
        }
      }
      this.setData({ result: result });
      var searchData = wx.getStorageSync('searchData') || []
      searchData.push(name)
      wx.setStorageSync('searchData', searchData)
      console.log('dad',searchData)
    }
    if (result == ''){
      if (!name) {
        return;
      }
      wx.showToast({ //加载中的动画效果
        title: "加载中..",
        icon: "loading",
        duration: 10000
      });
      var that = this; //保存this的数据
      var utf = encodeURI(name)
      wx.request({
        url: API_URL + utf + "&commit=Search",
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          wx.hideToast();
          that.setData({
            cakes: res.data.data,
            name: name
          })
        }
      })
    }
  },
  clickTitle:function(e){
    console.log(e)
    var name = e.currentTarget.dataset.title
    console.log(e.currentTarget.dataset.title)
    if (!name) {
      return;
    }
    var searchData = wx.getStorageSync('searchData') || []
    searchData.push(name)
    wx.setStorageSync('searchData', searchData)
    wx.showToast({ //加载中的动画效果
      title: "加载中..",
      icon: "loading",
      duration: 10000
    });
    var that = this; //保存this的数据
    var utf = encodeURI(name)
    wx.request({
      url: API_URL + utf + "&commit=Search",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        wx.hideToast();
        that.setData({
          cakes: res.data.data,
          name: name,
          result: ''
        })
      }
    })
  },
  resetSearch: function () {
    var result = [];
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
