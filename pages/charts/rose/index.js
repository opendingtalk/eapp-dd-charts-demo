
const map = {
  '芳华': '40%',
  '妖猫传': '20%',
  '机器之血': '18%',
  '心理罪': '15%',
  '寻梦环游记': '5%',
  '其他': '2%'
}

const chartDataNew = [{
  year: '2001',
  population: 41.8
}, {
  year: '2002',
  population: 25.8
}, {
  year: '2003',
  population: 31.7
}, {
  year: '2004',
  population: 46
}, {
  year: '2005',
  population: 28
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
        ddChart.legend({
          position: 'right'
        })
        ddChart.axis(false)
        ddChart.interval().position('year*population').color('year').style({
          lineWidth: 1,
          stroke: '#fff'
        })
        ddChart.render()
    }
})