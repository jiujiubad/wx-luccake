var API_URL = 'https://luccake.top/api/v1/products?utf8=%E2%9C%93&q%5Btitle_or_description_cont%5D='

Page({
  data: {
    cakes: [],
    result: [],
    name: '',
  },
  onLoad:function(){
    this.loadTips();
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
    var name = e.currentTarget.dataset.title
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
  }
})
