Page({
  data: {
    goods: [],
    selected: true,
    selectedAll: true,
    totalPrice: 0
  },
  onLoad: function () {
    this.loadGoods();
  },
  loadGoods: function () {
    var goods = wx.getStorageSync("goods");
    var totalPrice = 0;
    for (var i = 0; i < goods.length; i++) {
      var good = goods[i];
      totalPrice += good.price * good.count;
    }
    this.setData({ goods: goods, totalPrice: totalPrice });
  },
  checkboxChange: function (e) {
    var ids = e.detail.value;
    if (ids.length == 0) {
      this.setData({ selectedAll: false, totalPrice: 0 });
    } else {
      var goods = wx.getStorageSync("goods");
      var totalPrice = 0;
      for (var i = 0; i < goods.length; i++) {
        var good = goods[i];
        for (var j = 0; j < ids.length; j++) {
          if (good.id == ids[j]) {
            totalPrice += good.price * good.count;
          }
        }
      }
      this.setData({ selectedAll: true, totalPrice: totalPrice });
    }
  },
  checkAll: function (e) {
    var selected = this.data.selected;
    var result = selected == true ? false : true;
    this.setData({ selected: result });
    if (result == false) {
      this.setData({ totalPrice: 0 });
    } else {
      this.loadGoods();
    }
  },
  addGoods: function (e) {
    var id = e.currentTarget.id;
    var goods = wx.getStorageSync("goods");
    var addGoods = new Array();
    for (var i = 0; i < goods.length; i++) {
      var good = goods[i];
      if (good.id == id) {
        good.count = good.count + 1;
      }
      addGoods.push(good);
    }
    wx.setStorageSync("goods", addGoods);
    this.loadGoods();
  },
  minusGoods: function (e) {
    var id = e.currentTarget.id;
    var goods = wx.getStorageSync("goods");
    var addGoods = new Array();
    for (var i = 0; i < goods.length; i++) {
      var good = goods[i];
      if (good.id == id) {
        var count = good.count;
        if (count >= 2) {
          good.count = good.count - 1;
        }
      }
      addGoods.push(good);
    }
    wx.setStorageSync("goods", addGoods);
    this.loadGoods();
  }
})