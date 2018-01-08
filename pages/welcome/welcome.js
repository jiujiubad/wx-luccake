var app = getApp();
Page({
  data: {
    intros:[{url:'https://ws3.sinaimg.cn/large/006tNc79gy1fn8bq2pse2j30gw08g3zq.jpg'},
    {url:'https://ws3.sinaimg.cn/large/006tNc79gy1fn8bq4h8tkj30gw08gwgm.jpg'},
    {url:'https://ws1.sinaimg.cn/large/006tNc79gy1fn8bq1wwbnj30gw08g0ta.jpg'},
    {url:'https://ws2.sinaimg.cn/large/006tNc79gy1fn8bq0r1u3j30gw08gab6.jpg'},
    {url:'https://ws1.sinaimg.cn/large/006tNc79gy1fn8bq1dpiqj30gw08gjso.jpg'}
    ],
    icons:[{url:'../../images/icon/w-girl.png',log:'女孩'},
    {url:'../../images/icon/w-boy.png',log:'男孩'},
    {url:'../../images/icon/w-mother.png',log:'父母'},
    {url:'../../images/icon/w-single.png',log:'单层'},
    {url:'../../images/icon/w-double.png',log:'多层'}
    ],
    discount:[{text:'“满减再送券”'},
    {text:'“399减20”'},
    {text:'“自营更放心”'},
    {text:'“爆款直降”'},
    {text:'“199减100”'},
    {text:'“抢千元神器”'},
    {text:'“在线咨询”'},
    {text:'“好评送礼”'},
    {text:'“299减10”'},
    {text:'“满500送”'},
    {text:'“优质精选”'}
    ],
  },
  search: function () {
    wx.navigateTo({
      url: '../p_search/p_search'
    })
  },
  onShow: function () {
    var that = this;
    wx.request({
      url: 'https://luccake.top/api/v1/products',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          weldata: res.data.data
        })
      }
    })
  }
})
