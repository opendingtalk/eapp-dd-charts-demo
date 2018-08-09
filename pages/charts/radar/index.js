
const chartDataNew = [{
  item: 'Design',
  user: '用户 A',
  score: 70
}, {
  item: 'Design',
  user: '用户 B',
  score: 30
}, {
  item: 'Development',
  user: '用户 A',
  score: 60
}, {
  item: 'Development',
  user: '用户 B',
  score: 70
}, {
  item: 'Marketing',
  user: '用户 A',
  score: 50
}, {
  item: 'Marketing',
  user: '用户 B',
  score: 60
}, {
  item: 'Users',
  user: '用户 A',
  score: 40
}, {
  item: 'Users',
  user: '用户 B',
  score: 50
}, {
  item: 'Test',
  user: '用户 A',
  score: 60
}, {
  item: 'Test',
  user: '用户 B',
  score: 70
}, {
  item: 'Language',
  user: '用户 A',
  score: 70
}, {
  item: 'Language',
  user: '用户 B',
  score: 50
}, {
  item: 'Technology',
  user: '用户 A',
  score: 70
}, {
  item: 'Technology',
  user: '用户 B',
  score: 40
}, {
  item: 'Support',
  user: '用户 A',
  score: 60
}, {
  item: 'Support',
  user: '用户 B',
  score: 40
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
        ddChart.coord('polar')
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
        ddChart.axis('score', {
          label: function label(text, index, total) {
            if (index === total - 1) {
              return null;
            }
            return {
              top: true
            };
          },
          grid: {
            lineDash: null,
            type: 'arc' // 弧线网格
          }
        })
        ddChart.axis('item', {
          grid: {
            lineDash: null
          }
        })
        ddChart.line().position('item*score').color('user');
        ddChart.point().position('item*score').color('user').style({
          stroke: '#fff',
          lineWidth: 1
        })
        ddChart.render()
    }
})