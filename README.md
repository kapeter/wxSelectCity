# 微信小程序选择城市组件wxSelectCity

## 1.基础使用

> 小程序基础库版本 > 1.6.3

![基础使用效果图](https://github.com/kapeter/wxSelectCity/blob/master/assets/img/map1.jpg)

第一步，将components目录下的wxSelectCity文件夹拷贝到自己的项目中。

第二步，在要使用组件的页面中加载该组件。
	
	// 在页面的json文件中加入以下语句
	"usingComponents": {
		"select-city": "../../components/wxSelectCity/wxSelectCity"
	}

第三步，在页面中调用组件。属性open-status用于控制组件是否展示。handleSelect事件为选择城市后的回调函数。

	<button class="btn" bindtap="handleClick">选择城市</button>
	<select-city bind:handleSelect="handleSelect" open-status="{{ isActive }}"></select-city>

第四步, 设置回调函数。

	// 处理按钮事件
	handleClick: function () {
		this.setData({
		  isActive: true  // 打开组件
		});
	},
	// 选择城市后的回调函数
	handleSelect: function (event) {
		console.log(event.detail);   // 通过 event.detail 获取城市信息
		this.setData({
		  isActive: false,  // 关闭组件
		  currentCity: event.detail.fullname
		});
	}

event.detail的基本结构:

	{
        "id": "110101",
        "name": "东城",
        "fullname": "东城区",
        "pinyin": [
            "dong",
            "cheng"
        ],
        "location": {
            "lat": 39.92855,
            "lng": 116.41637
        }
    }

## 2.在Map组件中使用

![在Map组件中使用](https://github.com/kapeter/wxSelectCity/blob/master/assets/img/map2.jpg)

> map 组件是由客户端创建的原生组件，它的层级是最高的，不能通过 z-index 控制层级。

上面是来自开发文档中的一句话，意味着如何在有Map组件的页面中使用组件，我们的组件会被Map覆盖住，因此我们通过一个中间页面来实现。

第一步，在Map组件中设置控件，跳转到中间页面，详见pages目录下的map文件夹。
	
	// map.wxml
	<map id="listMap" how-location="true" latitude="{{mapInfo.latitude}}" longitude="{{mapInfo.longitude}}" controls="{{controls}}" bindcontroltap="controlTap"></map>

	//map.js
	controlTap() {
		wx.navigateTo({
		  url: '/pages/select/select'
		});
	}

第二步，设置中间页面，详见pages目录下的select文件夹。

	// 选择城市后的回调函数
	handleSelect (event) {
	    let params = JSON.stringify(event.detail);
	    wx.redirectTo({
	      url: '/pages/map/map?params=' + params    // 使用页面参数将城市传递回去。
	    });
	}

第三步，获取页面参数，控制地图。

	onLoad: function (options) {
	    let _self = this;
	    let params = options.params;
	    
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
	    }
	}

## 3.城市数据来源

通过腾讯地图微信小程序JavaScript SDK中的[getCityList()方法](http://lbs.qq.com/qqmap_wx_jssdk/method-getcitylist.html)获取，当前版本：20171212。


## 4.联系我

博客：[https://www.kapeter.com/](https://www.kapeter.com/)