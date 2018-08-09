
const chartDataNew = [
    { name: 'activity1', percent: 2370, color: '#1ad5de', icon: 'stand.png', bgColor: '#183C3D' },
    { name: 'activity2', percent: 80, color: '#a0ff03', icon: 'walk.png', bgColor: '#324214' },
    { name: 'activity3', percent: 65, color: '#e90b3a', icon: 'run.png', bgColor: '#40131D' }
]

let app = getApp()

Page({
    data:{
       width:200,
       height:200,
       chart: null,
    },
    defineCustom(F2) {
        F2.Shape.registerShape('interval', 'tick', {
            draw(cfg, container) {
            const points = this.parsePoints(cfg.points);
            const style = F2.Util.mix({
                stroke: cfg.color
            }, F2.Global.shape.interval, cfg.style);
            if (cfg.isInCircle) {
                let newPoints = points.slice(0);
                if (this._coord.transposed) {
                newPoints = [points[0], points[3], points[2], points[1]];
                }

                const { x, y } = cfg.center;
                const v = [1, 0];
                const v0 = [newPoints[0].x - x, newPoints[0].y - y];
                const v1 = [newPoints[1].x - x, newPoints[1].y - y];
                const v2 = [newPoints[2].x - x, newPoints[2].y - y];

                let startAngle = F2.G.Vector2.angleTo(v, v1);
                let endAngle = F2.G.Vector2.angleTo(v, v2);
                const r0 = F2.G.Vector2.length(v0);
                const r = F2.G.Vector2.length(v1);

                if (startAngle >= 1.5 * Math.PI) {
                startAngle = startAngle - 2 * Math.PI;
                }

                if (endAngle >= 1.5 * Math.PI) {
                endAngle = endAngle - 2 * Math.PI;
                }

                const coord = this._coord;

                const lineWidth = r - r0;
                const newRadius = r - (lineWidth / 2);

                return container.addShape('Arc', {
                className: 'interval',
                attrs: F2.Util.mix({
                    x,
                    y,
                    startAngle,
                    endAngle,
                    r: newRadius,
                    lineWidth,
                    lineCap: 'round',
                    shadowColor: "rgba(0, 0, 0, 0.6)",
                    shadowOffsetX: 0,
                    shadowOffsetY: -5,
                    shadowBlur: 50
                }, style)
                });
            }
            }
        })

        F2.Animate.registerAnimation('waveIn', function (shape, animateCfg, coord) {
            const startAngle = shape.attr('startAngle');
            const endAngle = shape.attr('endAngle');
            shape.attr('endAngle', startAngle);
            shape.animate().to(F2.Util.mix({
            attrs: {
                endAngle: endAngle
            }
            }, animateCfg));
        })
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
        this.defineCustom(F2)
        ddChart.clear()
        ddChart.source(chartDataNew, {
            percent: {
                max: 100
            }
        })
        ddChart.legend(false)
        ddChart.coord('polar', {
            transposed: true,
            innerRadius: 0.382
        })
        ddChart.axis(false)
        ddChart.interval()
            .position('name*percent')
            .color('color', val => {
            return val;
            })
            .shape('tick')
            .size(26)
            .animate({
            appear: {
                animation: 'waveIn',
                duration: 1500,
                easing: 'elasticOut'
            },
            update: {
                duration: 1500,
                easing: 'elasticOut'
            }
            });
        
        chartDataNew.map((obj, index) => {
            ddChart.guide().arc({
                start: [obj.name, 0],
                end: [obj.name, 99.98],
                top: false,
                style: {
                    lineWidth: 26,
                    stroke: obj.bgColor
                }
            })
        })
        ddChart.render()
    }
})