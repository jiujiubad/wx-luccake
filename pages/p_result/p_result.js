Page({
  data:{
    cakes: [],
  },
  onLoad:function(e){
    var cakes = JSON.parse(e.arr);
    this.setData({
      cakes: cakes
    })
    console.log("成功传递",this.data)
  }
})