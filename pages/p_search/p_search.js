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
    var inputValue = e.detail.value
    wx.navigateTo({
      url: '../p_result/p_result?arr=' + inputValue,
    })
    console.log("ff", this.data)
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
    wx.navigateTo({
      url: '../p_result/p_result?arr=' + name,
    })
  }
})


