//获取应用实例
const app = getApp();


Page({
  data: {
    isActive: false,
    currentCity: ''
  },
  onLoad: function (options) {
    
  },
  handleClick: function () {
    this.setData({
      isActive: true
    });
  },
  handleSelect: function (event) {
    console.log(event.detail);
    this.setData({
      isActive: false,
      currentCity: event.detail.fullname
    });
  }
})
