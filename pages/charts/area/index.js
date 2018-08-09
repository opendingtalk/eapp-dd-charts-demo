
const chartDataNew = [{
    time: 'Jan.',
    tem: 1000
    }, {
    time: 'Feb.',
    tem: 2200
    }, {
    time: 'Mar.',
    tem: 2000
    }, {
    time: 'Apr.',
    tem: 2600
    }, {
    time: 'May.',
    tem: 2000
    }, {
    time: 'Jun.',
    tem: 2600
    }, {
    time: 'Jul.',
    tem: 2800
    }, {
    time: 'Aug.',
    tem: 2000
    }
]

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
            showCrosshairs: true
        })
        ddChart.scale({
            time: {
                range: [0, 1]
            },
            tem: {
                tickCount: 5,
                min: 0
            }
        })
        ddChart.axis('time', {
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
        ddChart.area().position('time*tem')
        ddChart.line().position('time*tem')
        ddChart.render()
    }
})