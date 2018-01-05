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
    this.loadTips();  //加载“热门搜索”函数
    var searchData = wx.getStorageSync('searchData'); //获取缓存里的”历史搜索”数组，分别在clickTip、clickTitle、clickSearchData、searchTitle的函数里设置wx.setStorageSync
    searchData.reverse()  //数组顺序颠倒（反转）
    this.setData({
      searchData: searchData,
    })
  },
  loadTips:function(e){
    var that = this;
    var word = [];
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
    var out = [];
    for(var i=0; i<10; i++){
      var temp = (Math.random()*word.length)>>0; //随机产生0-word.length的数字。其中Math.random()是js方法，随机产生0-1的数。
      out.push(word[temp]); //把word[temp]放在out数组的最右边，组成新的out数组
    }
    this.setData({out: out})
  },
  clickTip:function(e){
    var name = e.currentTarget.dataset.title
    if (!name) {
      return;
    }
    var searchData = wx.getStorageSync('searchData') || []
    searchData.push(name)
    wx.setStorageSync('searchData', searchData)
    wx.showToast({ //显示”加载中“”的动画效果
      title: "加载中..",
      icon: "loading",
      duration: 10000
    });
    var that = this; //保存this的数据
    var utf = encodeURI(name)
    wx.request({
      url: API_URL + utf + "&commit=Search",
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.hideToast(); //隐藏”加载中“”的动画效果
        that.setData({
          cakes: res.data.data,
          name: name,
          word: '' //小技巧，word清空，意味着wxml不会显示wx:for的数据。
        })
      }
    })
  },
  clickSearchData:function(e){
    var name = e.currentTarget.dataset.title //通过console.log获得e的散列，展开得到tilte的写法
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
          word: '' //小技巧，清空，意味着wxml不会显示wx:for的数据。
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
        wx.setStorageSync('e',res.data.data)  //在api回调函数里设置缓存数组，目的是拿到数组里的title。
      }
    })
    var goods = wx.getStorageSync('e');
    var titles = [];
    for (var i = 0; i < goods.length; i++) { //循环拿到title数组
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
        if (good.indexOf(name) > -1) {  //js的indexOf()方法，看输入值name是否在标题库title中，-1表示检索的字符串值没有出现，0表示匹配且从第0个字符就匹配。
          result.push(good);
        }
      }
      this.setData({ result: result });
      var searchData = wx.getStorageSync('searchData') || [] //以下三行缓存，同上几个click函数
      searchData.push(name)
      wx.setStorageSync('searchData', searchData)
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
          'content-type': 'application/json'
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
    var name = e.currentTarget.dataset.title
    if (!name) {
      return;
    }
    var searchData = wx.getStorageSync('searchData') || []  //缓存输入值，同上几个click函数
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
          result: '' //小技巧，清空，意味着wxml不会显示wx:for的数据。
        })
      }
    })
  },
  resetSearch: function () {
    var result = [];
    this.setData({ result: result, name: '' }); //清空匹配输入值，清空输入值
  },






  switchAll: function (e) { //排序-所有
    var inputValue = this.data.name
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
        that.setData({
          cakes: res.data.data,
          currentTab: 0
        })
      }
    })
  },
  switchPrice:function(e){ //排序-价格
    var inputValue = this.data.name
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
        that.setData({
          cakes: res.data.data,
          currentTab: 1
        })
      }
    })
  },
  switchTime: function (e) { //排序-时间
    var inputValue = this.data.name
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
        that.setData({
          cakes: res.data.data,
          currentTab: 2
        })
      }
    })
  },
  switchTest:function(e){ //排序-测试
    var inputValue = this.data.name
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
        that.setData({
          cakes: res.data.data,
          currentTab: 3
        })
      }
    })
  }
})
