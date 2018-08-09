
const chartDataNew = [{
  name: 'London',
  月份: 'Jan.',
  月均降雨量: 18.9
}, {
  name: 'London',
  月份: 'Feb.',
  月均降雨量: 28.8
}, {
  name: 'London',
  月份: 'Mar.',
  月均降雨量: 39.3
}, {
  name: 'London',
  月份: 'Apr.',
  月均降雨量: 81.4
}, {
  name: 'London',
  月份: 'May.',
  月均降雨量: 47
}, {
  name: 'London',
  月份: 'Jun.',
  月均降雨量: 20.3
}, {
  name: 'London',
  月份: 'Jul.',
  月均降雨量: 24
}, {
  name: 'London',
  月份: 'Aug.',
  月均降雨量: 35.6
}, {
  name: 'Berlin',
  月份: 'Jan.',
  月均降雨量: 12.4
}, {
  name: 'Berlin',
  月份: 'Feb.',
  月均降雨量: 23.2
}, {
  name: 'Berlin',
  月份: 'Mar.',
  月均降雨量: 34.5
}, {
  name: 'Berlin',
  月份: 'Apr.',
  月均降雨量: 99.7
}, {
  name: 'Berlin',
  月份: 'May.',
  月均降雨量: 52.6
}, {
  name: 'Berlin',
  月份: 'Jun.',
  月均降雨量: 35.5
}, {
  name: 'Berlin',
  月份: 'Jul.',
  月均降雨量: 37.4
}, {
  name: 'Berlin',
  月份: 'Aug.',
  月均降雨量: 42.4
}]

let app = getApp()

Page({
    data:{
       width:200,
       height:200,
       chart: null,
    },
    onLoad(){
        let sysInfo = app.globalData.sysInfo
        this.setData({
            width: sysInfo.screenWidth,
            height: sysInfo.screenHeight,
        })
    },
    onReady(){
       
    },
    onDraw(ddChart){
        //dd-charts组件内部会回调此方法，返回图表实例ddChart
        //提示：可以把异步获取数据及渲染图表逻辑放onDraw回调里面
        ddChart.clear()
        ddChart.source(chartDataNew)
        ddChart.tooltip({

          custom: true, // 自定义 tooltip 内容框
          onChange: function onChange(obj) {
            var legend = chart.get('legendController').legends.top[0];
            var tooltipItems = obj.items;
            var legendItems = legend.items;
            var map = {};
            legendItems.map(function(item) {
              map[item.name] = _.clone(item);
            });
            tooltipItems.map(function(item) {
              var name = item.name;
              var value = item.value;
              if (map[name]) {
                map[name].value = value;
              }
            });
            legend.setItems(_.values(map));
          },
          onHide: function onHide() {
            var legend = chart.get('legendController').legends.top[0];
            legend.setItems(chart.getLegendItems().country);
          }
        })
        ddChart.axis('date', {
            label(text, index, total) {
            const textCfg = {};
            if (index === 0) {
                textCfg.textAlign = 'left';
            }
            if (index === total - 1) {
                textCfg.textAlign = 'right';
            }
            return textCfg;
            }
        })
        ddChart.interval().position('月份*月均降雨量').color('name').adjust({
          type: 'dodge',
          marginRatio: 0.05 // 设置分组间柱子的间距
        })
        ddChart.render()
    }
})