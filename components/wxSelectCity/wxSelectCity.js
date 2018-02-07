// 导入城市列表
const { provinceList, cityList } = require('./cityList.js')

Component({
  properties: {
    openStatus: {
      type: Boolean,
      value: false,
      observer: function (newVal) {
        this.setData({
          isActive: newVal,
          isProvinceSelected: false,
        });
      }
    }
  },
  data: {
    // 这里是一些组件内部数据
    isActive: false,
    isProvinceSelected: false,
    isCitySelected: false,
    provinceList: [],
    cityList: []
  },
  methods: {
    // 处理点击省份列表事件
    selectProvince: function (event) {
      let proId = event.target.dataset.id;
      this.data.provinceList.forEach((value) => {
        if (value.id === proId){
          let tempCity = cityList.slice(value.cidx[0], value.cidx[1]+1);
          this.setData({
            cityList: tempCity,
            isProvinceSelected: true
          });
        }
      });
    },
    // 处理返回省份列表事件
    backToProvince: function () {
      this.setData({
        cityList: [],
        isProvinceSelected: false
      });    
    },
    // 处理点击城市列表事件
    selectCity: function (event) {
      let { index } = event.target.dataset;
      // 触发自定义事件，传递选中的城市名称
      this.triggerEvent('handleSelect', this.data.cityList[index]);
    }
  },
  ready: function () {
    this.setData({
      provinceList: provinceList
    });
  }
})