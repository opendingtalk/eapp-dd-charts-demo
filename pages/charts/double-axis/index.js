
const chartDataNew = [{
  time: '周一',
  tem: 6.9,
  rain: 10
}, {
  time: '周二',
  tem: 9.5,
  rain: 13
}, {
  time: '周三',
  tem: 14.5,
  rain: 14
}, {
  time: '周四',
  tem: 18.2,
  rain: 10
}, {
  time: '周五',
  tem: 21.5,
  rain: 12
}, {
  time: '周六',
  tem: 25.2,
  rain: 16
}, {
  time: '周日',
  tem: 26.5,
  rain: 13
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
      ddChart.source(chartDataNew, {
        tem: {
          min: 0,
          max: 30,
          tickInterval: 10,
          nice: false
        },
        rain: {
          min: 0,
          max: 30,
          tickInterval: 10,
          nice: false
        }
      })
      ddChart.axis('time', {
        grid: null
      });

      ddChart.interval().position('time*tem');
      ddChart.line().position('time*rain').color('#5ed470').shape('smooth');
      ddChart.point().position('time*rain').style({
        stroke: '#5ed470',
        fill: '#fff',
        lineWidth: 2
      })

      // 绘制辅助线
      ddChart.guide().line({
        start: function start(xScale, yScales) {
          var sum = 0;
          var yScale = yScales[1];
          yScale.values.forEach(function(v) {
            sum += v;
          });
          return ['min', sum / yScale.values.length];
        },
        end: function end(xScale, yScales) {
          var sum = 0;
          var yScale = yScales[1];
          yScale.values.forEach(function(v) {
            sum += v;
          });

          return ['max', sum / yScale.values.length];
        },
        style: {
          stroke: '#5ed470', // 线的颜色
          lineDash: [0, 2, 2], // 虚线的设置
          lineWidth: 1 // 线的宽度
          // 图形样式配置
        }
      })
      ddChart.guide().text({
        position: function position(xScale, yScales) {
          var sum = 0;
          var yScale = yScales[1];
          yScale.values.forEach(function(v) {
            sum += v;
          });
          return ['max', sum / yScale.values.length];
        },
        content: '平均降雨量',
        style: {
          textAlign: 'end',
          textBaseline: 'top',
          fill: '#5ed470'
        },
        offsetY: 5
      })
      ddChart.render()
    }
})