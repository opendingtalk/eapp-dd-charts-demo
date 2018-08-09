
const map = {
  '芳华': '40%',
  '妖猫传': '20%',
  '机器之血': '18%',
  '心理罪': '15%',
  '寻梦环游记': '5%',
  '其他': '2%'
}

const chartDataNew = [{
  name: '芳华',
  percent: 0.4,
  a: '1'
}, {
  name: '妖猫传',
  percent: 0.2,
  a: '1'
}, {
  name: '机器之血',
  percent: 0.18,
  a: '1'
}, {
  name: '心理罪',
  percent: 0.15,
  a: '1'
}, {
  name: '寻梦环游记',
  percent: 0.05,
  a: '1'
}, {
  name: '其他',
  percent: 0.02,
  a: '1'
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
          percent: {
            formatter: function formatter(val) {
              return val * 100 + '%';
            }
          }
        })
        ddChart.legend({
          position: 'right',
          itemFormatter: function itemFormatter(val) {
            return val + '  ' + map[val];
          }
        })
        ddChart.tooltip(false)
        ddChart.coord('polar', {
          transposed: true,
          radius: 0.85
        })
        ddChart.axis(false);
        ddChart.interval().position('a*percent').color('name', ['#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864', '#8543E0']).adjust('stack').style({
          lineWidth: 1,
          stroke: '#fff',
          lineJoin: 'round',
          lineCap: 'round'
        }).animate({
          appear: {
            duration: 1200,
            easing: 'bounceOut'
          }
        })
        ddChart.render();
    }
})