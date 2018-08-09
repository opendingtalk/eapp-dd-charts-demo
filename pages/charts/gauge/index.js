
const chartDataNew = [{
  pointer: '当前收益',
  value: 5,
  length: 2,
  y: 1.05
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
    defineCustom(F2){
      F2.Shape.registerShape('point', 'dashBoard', {
        getPoints: function getPoints(cfg) {
          var x = cfg.x;
          var y = cfg.y;

          return [{
            x: x,
            y: y
          }, {
            x: x,
            y: 0.4
          }];
        },
        draw: function draw(cfg, container) {
          var point1 = cfg.points[0];
          var point2 = cfg.points[1];
          point1 = this.parsePoint(point1);
          point2 = this.parsePoint(point2);

          var line = container.addShape('Polyline', {
            attrs: {
              points: [point1, point2],
              stroke: '#1890FF',
              lineWidth: 2
            }
          });

          var text = cfg.origin._origin.value.toString();
          var text1 = container.addShape('Text', {
            attrs: {
              text: text + '%',
              x: cfg.center.x,
              y: cfg.center.y,
              fill: '#1890FF',
              fontSize: 24,
              textAlign: 'center',
              textBaseline: 'bottom'
            }
          });
          var text2 = container.addShape('Text', {
            attrs: {
              text: cfg.origin._origin.pointer,
              x: cfg.center.x,
              y: cfg.center.y,
              fillStyle: '#ccc',
              textAlign: 'center',
              textBaseline: 'top'
            }
          });

          return [line, text1, text2];
        }
      })
    },
    onDraw(ddChart, F2){
        
        //dd-charts组件内部会回调此方法，返回图表实例ddChart
        //提示：可以把异步获取数据及渲染图表逻辑放onDraw回调里面

        this.defineCustom(F2)
        ddChart.clear()
        ddChart.source(chartDataNew,{
          value: {
            type: 'linear',
            min: 0,
            max: 15,
            ticks: [0, 5, 7.5, 10, 15],
            nice: false
          },
          length: {
            type: 'linear',
            min: 0,
            max: 10
          },
          y: {
            type: 'linear',
            min: 0,
            max: 1
          }
        })
        ddChart.coord('polar', {
          inner: 0,
          startAngle: -1.25 * Math.PI,
          endAngle: 0.25 * Math.PI
        })

        //配置value轴刻度线
        ddChart.axis('value', {
          tickLine: {
            strokeStyle: '#ccc',
            lineWidth: 2,
            length: -5
          },
          label: null,
          grid: null,
          line: null
        })

        ddChart.axis('y', false)

        //绘制仪表盘辅助元素
        ddChart.guide().arc({
          start: [0, 1.05],
          end: [4.8, 1.05],
          style: {
            strokeStyle: '#1890FF',
            lineWidth: 5,
            lineCap: 'round'
          }
        })
        ddChart.guide().arc({
          start: [5.2, 1.05],
          end: [9.8, 1.05],
          style: {
            strokeStyle: '#ccc',
            lineWidth: 5,
            lineCap: 'round'
          }
        })
        ddChart.guide().arc({
          start: [10.2, 1.05],
          end: [15, 1.05],
          style: {
            strokeStyle: '#ccc',
            lineWidth: 5,
            lineCap: 'round'
          }
        });
        ddChart.guide().arc({
          start: [0, 1.2],
          end: [15, 1.2],
          style: {
            strokeStyle: '#ccc',
            lineWidth: 1
          }
        })

        ddChart.guide().text({
          position: [-0.5, 1.3],
          content: '0.00%',
          style: {
            fillStyle: '#ccc',
            font: '18px Arial',
            textAlign: 'center'
          }
        })
        ddChart.guide().text({
          position: [7.5, 0.7],
          content: '7.50%',
          style: {
            fillStyle: '#ccc',
            font: '18px Arial',
            textAlign: 'center'
          }
        })
        ddChart.guide().text({
          position: [15.5, 1.3],
          content: '15.00%',
          style: {
            fillStyle: '#ccc',
            font: '18px Arial',
            textAlign: 'center'
          }
        })

        ddChart.point().position('value*y').size('length').color('#1890FF').shape('dashBoard')
        ddChart.render()
    }
})