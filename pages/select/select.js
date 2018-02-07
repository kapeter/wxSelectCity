//select.js
Page({
  handleSelect (event) {
    let params = JSON.stringify(event.detail);
    wx.redirectTo({
      url: '/pages/map/map?params=' + params
    });
  }
})