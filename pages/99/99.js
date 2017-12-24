// pages/cata88/cata88.js
Page({
  data: {
    orientationlist: [
      { id: "01", region: "东北" },
      { id: "02", region: "华北" },
      { id: "03", region: "华东" },
      { id: "04", region: "华南" },
      { id: "05", region: "华中" }
    ],
    act_addlist: [
      {
        id: "01", region: "东北地区",
        city: [
          { id: "0101", name: "白山市" },
          { id: "0102", name: "汕头市" },
          { id: "0103", name: "深圳市" },
          { id: "0104", name: "广州市" },
          { id: "0105", name: "测试1" },
          { id: "0106", name: "测试2" },
          { id: "0107", name: "测试3" },
          { id: "0108", name: "测试4" },
          { id: "0109", name: "测试5" },
          { id: "0110", name: "测试1" },
          { id: "0111", name: "测试2" },
          { id: "0112", name: "测试3" },
          { id: "0113", name: "测试4" },
          { id: "0114", name: "测试5" },
          { id: "0115", name: "测试1" },
          { id: "0116", name: "测试2" },
          { id: "0117", name: "测试3" },
          { id: "0118", name: "测试4" },
          { id: "0119", name: "测试5" }
        ]
      },
      {
        id: "02", region: "华北地区",
        city: [
          { id: "0201", name: "包头市" },
          { id: "0202", name: "大庆" },
          { id: "0203", name: "保定" },
          { id: "0205", name: "测试1" },
          { id: "0206", name: "测试2" },
          { id: "0207", name: "测试3" },
          { id: "0208", name: "测试4" },
          { id: "0209", name: "测试5" },
          { id: "0210", name: "测试6" }
        ]
      },
      {
        id: "03", region: "华东地区",
        city: [
          { id: "0301", name: "东东市" },
          { id: "0302", name: "东东" },
          { id: "0303", name: "咚咚咚" },
          { id: "0305", name: "测试1" },
          { id: "0306", name: "测试2" },
          { id: "0307", name: "测试3" },
          { id: "0308", name: "测试4" },
          { id: "0309", name: "测试5" },
          { id: "0310", name: "测试6" }
        ]
      },
      {
        id: "04", region: "华南地区",
        city: [
          { id: "0401", name: "东东市" },
          { id: "0402", name: "东东" },
          { id: "0403", name: "咚咚咚" },
          { id: "0405", name: "测试1" },
          { id: "0406", name: "测试2" },
          { id: "0407", name: "测试3" },
          { id: "0408", name: "测试4" },
          { id: "0409", name: "测试5" },
          { id: "0410", name: "测试6" }
        ]
      },
      {
        id: "05", region: "华中地区",
        city: [
          { id: "0501", name: "东东市" },
          { id: "0502", name: "东东" },
          { id: "0503", name: "咚咚咚" },
          { id: "0505", name: "测试1" },
          { id: "0506", name: "测试2" },
          { id: "0507", name: "测试3" },
          { id: "0508", name: "测试4" },
          { id: "0509", name: "测试5" },
          { id: "0510", name: "测试6" }
        ]
      }
    ],
    classifySelected: ''
  },
  onLoad: function (options) {
    this.setData({
      classifySelected: this.data.orientationlist[0]['id']
    })
  },
  //右边点击事件
  right_fl: function (e) {
    console.log(e)
    var _id = e.currentTarget.dataset.id;
    console.log(_id)
    this.setData({
      vieid: _id
    })
  },
  //滚动触发
  gdcf: function (e) {
    console.log(e)
    var that = this;
    var scrollTop = e.detail.scrollTop * 2, //高度单位换算，detail.scrollTop是从console知道的。
      h = 0, //默认高度0
      classifySelected;
    that.data.orientationlist.forEach(function (classify, i) {  //javascript的forEach()方法，自己百度。
      // var _h = 76 + ?*88; //这里的小分类数量计算见下面length:function()
      console.log(classify.id);//看不懂的值，console.log一下就知道这个其实是id
      var _h = 76 + that.length(classify['id']) * 88;
      if (scrollTop >= h) {
        classifySelected = classify['id'];
      }
      console.log(_h)
      h += _h;
      console.log(h)
    },
    );
    that.setData({
      classifySelected: classifySelected
    })
  },
  //计算当前大分类下有多少个小分类
  length: function (e) {
    var that = this;
    var act_addlist = that.data.act_addlist; //然后进行下面的循环
    for (var i = 0; i < act_addlist.length; i++) {
      if (act_addlist[i]['id'] == e) {
        return act_addlist[i]['city'].length;
      }
    }
  }
})