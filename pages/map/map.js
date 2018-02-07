//获取应用实例
const app = getApp();

Page({
  data: {
    mapInfo: {},
    controls: [],
    currentCity: '' 
  },
  onLoad: function (options) {
    let _self = this;
    let params = options.params;
    // 使用 wx.createMapContext 获取 map 上下文
    this.mapCtx = wx.createMapContext('listMap');

    this.setMapControls();
    if (params){
      let paraObj = JSON.parse(params);
      let centerPoint = {
        latitude: paraObj.location.lat,
        longitude: paraObj.location.lng
      };
      _self.setData({
        mapInfo: centerPoint,
        currentCity: paraObj.fullname
      })
    } else {
      let centerPoint = {
        latitude: 39.90469,
        longitude: 116.40717
      };
      _self.setData({
        mapInfo: centerPoint,
        currentCity: '北京市'
      })
    }
  },
  // 处理控件点击事件
  controlTap() {
    wx.navigateTo({
      url: '/pages/select/select'
    });
  },
  // 设置地图控件
  setMapControls: function () {
    let controls = [
      {
        id: 1,
        iconPath: '/assets/img/controls.png',
        position: {
          left: app.globalData.systemInfo.windowWidth - 85,
          top: 10,
          width: 75,
          height: 24
        },
        clickable: true
      }
    ];
    this.setData({
      controls: controls
    })
  }
})
