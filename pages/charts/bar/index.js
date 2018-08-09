
const chartDataNew = [{
  country: '巴西',
  population: 18203
}, {
  country: '印尼',
  population: 23489
}, {
  country: '美国',
  population: 29034
}, {
  country: '印度',
  population: 104970
}, {
  country: '中国',
  population: 131744
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
    onDraw(ddChart,F2){
        //dd-charts组件内部会回调此方法，返回图表实例ddChart
        //提示：可以把异步获取数据及渲染图表逻辑放onDraw回调里面
        ddChart.clear()
        ddChart.source(chartDataNew, {
          population: {
            tickCount: 5
          }
        })
        ddChart.coord({
          transposed: true
        })
        ddChart.axis('country', {
          line: F2.Global._defaultAxis.line,
          grid: null
        })
        ddChart.axis('population', {
          line: null,
          grid: F2.Global._defaultAxis.grid,
          label: function label(text, index, total) {
            var textCfg = {};
            if (index === 0) {
              textCfg.textAlign = 'left';
            } else if (index === total - 1) {
              textCfg.textAlign = 'right';
            }
            return textCfg;
          }
        })
        ddChart.interval().position('country*population')
        ddChart.render()
    }
})