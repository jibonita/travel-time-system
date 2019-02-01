import { Component, NgZone, AfterViewInit, OnDestroy } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements AfterViewInit, OnDestroy {
  private chart: am4charts.XYChart;

  graphicColor = ['#e59165', '#ff0000', '#0000ff', '#dfcc64'];

  constructor(private zone: NgZone) {}

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {

      const axesColor = '#e59165';
      
      const chart = am4core.create('chartdiv', am4charts.XYChart);

      chart.paddingRight = 20;

      const data1 = [
        {
          x: 1539129600000,
          y: 18
        },
        {
          x: 1539130500000,
          y: 33
        },
        {
          x: 1539131400000,
          y: 18
        },
        {
          x: 1539132300000,
          y: 33
        }
      ];
      const data2 = [
        {
          x: 1539180000000,
          y: 57
        },
        {
          x: 1539180900000,
          y: 37
        },
        {
          x: 1539181800000,
          y: 97
        },
        {
          x: 1539182700000,
          y: 52
        }
      ];
      const data3 = [
        {
          x: 1539180000000,
          y: 47
        },
        {
          x: 1539180900000,
          y: 18
        },
        {
          x: 1539181800000,
          y: 90
        },
        {
          x: 1539182700000,
          y: 12
        }
      ];
      const allEntryData = [data1, data2, data3];

      const data = [];
      for (let i = 0; i < data1.length; i++) {
        data.push({ date1: data1[i].x, time1: data1[i].y });
        data.push({ date2: data1[i].x, time2: data2[i].y });
        data.push({ date3: data1[i].x, time3: data3[i].y });
      }

      chart.data = data;

      const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;
      dateAxis.renderer.labels.template.fill = am4core.color(axesColor);

      // const dateAxis2 = chart.xAxes.push(new am4charts.DateAxis());
      // dateAxis2.renderer.grid.template.location = 0;
      // dateAxis2.renderer.labels.template.fill = am4core.color('#dfcc64');

      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      valueAxis.renderer.labels.template.fill = am4core.color(axesColor);
      valueAxis.renderer.minWidth = 60;

      // const valueAxis2 = chart.yAxes.push(new am4charts.ValueAxis());
      // valueAxis2.tooltip.disabled = true;
      // valueAxis2.renderer.grid.template.strokeDasharray = '2,3';
      // valueAxis2.renderer.labels.template.fill = am4core.color('#dfcc64');
      // valueAxis2.renderer.minWidth = 60;

      let series;
      allEntryData.forEach((_, index) => {
        series = this.drawOneChartGraphic(chart, index);
      });
//--------------------
      // const series = chart.series.push(new am4charts.LineSeries());
      // // series.name = null;
      // series.dataFields.dateX = 'date1';
      // series.dataFields.valueY = 'time1';
      // series.tooltipText = '{valueY.value}';
      // series.fill = am4core.color('#e59165');
      // series.stroke = am4core.color('#e59165');
      // // series.strokeWidth = 3;

      // const series2 = chart.series.push(new am4charts.LineSeries());
      // // series2.name = '2017';
      // series2.dataFields.dateX = 'date2';
      // series2.dataFields.valueY = 'time2';
      // series2.tooltipText = '{valueY.value}';
      // series2.fill = am4core.color('#dfcc64');
      // series2.stroke = am4core.color('#dfcc64');
      // // series2.strokeWidth = 3;
//----------------------
      chart.cursor = new am4charts.XYCursor();
      // chart.cursor.xAxis = dateAxis2;

      const scrollbarX = new am4charts.XYChartScrollbar();
      scrollbarX.series.push(series);
      chart.scrollbarX = scrollbarX;

      chart.legend = new am4charts.Legend();
      chart.legend.parent = chart.plotContainer;
      chart.legend.zIndex = 100;

      // valueAxis2.renderer.grid.template.strokeOpacity = 0.07;
      // dateAxis2.renderer.grid.template.strokeOpacity = 0.07;
      dateAxis.renderer.grid.template.strokeOpacity = 0.07;
      valueAxis.renderer.grid.template.strokeOpacity = 0.07;

      // const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      // dateAxis.renderer.grid.template.location = 0;

      // const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      // valueAxis.tooltip.disabled = true;
      // valueAxis.renderer.minWidth = 35;

      // chart.data = data;
      // this.drawOneChartGraphic(chart);

      // chart.data = data2;
      // this.drawOneChartGraphic(chart);

      this.chart = chart;

      {
        /********************
      // const container = am4core.create('chartdiv', am4core.Container);
      // container.width = am4core.percent(100);
      // container.height = am4core.percent(100);
      // container.layout = 'vertical';

      // const chartCount = 3;
      // const charts = [];
      // let cursorShowDisposers = [];

      // // create chart instances
      // for (let i = 0; i < chartCount; i++) {
      //   makeChart();
      // }

      // initCursorListeners();

      // // after the charts are made, add scrollbar to the first one
      // const firstChart = charts[0];
      // firstChart.scrollbarX = new am4core.Scrollbar();
      // firstChart.zoomOutButton.disabled = false;

      // // enable date axis labels for the last one
      // const lastChart = charts[charts.length - 1];
      // const lastDateAxis = lastChart.xAxes.getIndex(0);
      // lastDateAxis.renderer.labels.template.disabled = false;
      // lastDateAxis.cursorTooltipEnabled = true;

      // // generate data (although it would be possible to use one data provider for all of the charts, we would need to use different field name for each value)
      // function generateData() {
      //   const data = [];
      //   let value = 10;
      //   for (let i = 1; i < 366; i++) {
      //     value += Math.round(
      //       (Math.random() < 0.5 ? 1 : -1) * Math.random() * 10
      //     );
      //     data.push({
      //       date: new Date(2018, 0, i),
      //       name: 'name' + i,
      //       value: value
      //     });
      //   }
      //   return data;
      // }

      // // create chart
      // function makeChart() {
      //   const chart = container.createChild(am4charts.XYChart);
      //   charts.push(chart);

      //   chart.data = generateData();
      //   chart.zoomOutButton.disabled = true;
      //   chart.padding(10, 15, 10, 15);

      //   const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      //   dateAxis.renderer.grid.template.location = 0;
      //   dateAxis.renderer.labels.template.disabled = true;
      //   dateAxis.tooltip.animationDuration = 0;
      //   dateAxis.cursorTooltipEnabled = false;

      //   const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      //   valueAxis.tooltip.disabled = true;
      //   valueAxis.tooltip.disabled = true;
      //   valueAxis.renderer.minWidth = 60;

      //   const series = chart.series.push(new am4charts.LineSeries());
      //   series.dataFields.dateX = 'date';
      //   series.dataFields.valueY = 'value';
      //   series.interpolationDuration = 0;
      //   series.strokeWidth = 2;
      //   series.tooltipText = '{valueY.value}';

      //   const cursor = new am4charts.XYCursor();
      //   cursor.lineY.disabled = true;
      //   cursor.xAxis = dateAxis;
      //   chart.cursor = cursor;

      //   // whenever any of the charts is zoomed, we should zoom all other charts
      //   dateAxis.events.on('selectionextremeschanged', function(event) {
      //     syncDateAxes(event.target);
      //   });
      // }

      // function initCursorListeners() {
      //   cursorShowDisposers = [];
      //   for (let i = 0; i < charts.length; i++) {
      //     const chart = charts[i];
      //     const cursor = chart.cursor;
      //     cursor.interactionsEnabled = true;

      //     cursorShowDisposers.push(
      //       cursor.events.on('shown', function(event) {
      //         handleShowCursor(event.target);
      //       })
      //     );
      //   }
      // }

      // let shownCursorChangeDisposer;
      // let shownCursorZoomStartedDisposer;
      // let shownCursorZoomEndedDisposer;

      // function handleShowCursor(shownCursor) {
      //   // disable mouse for all other cursors
      //   for (let i = 0; i < charts.length; i++) {
      //     const chart = charts[i];
      //     const cursor = chart.cursor;
      //     if (cursor !== shownCursor) {
      //       cursor.interactionsEnabled = false;
      //     }
      //     // remove show listener
      //     cursorShowDisposers[i].dispose();
      //   }

      //   // add change disposer to the hovered chart cursor
      //   shownCursorChangeDisposer = shownCursor.lineX.events.on(
      //     'positionchanged',
      //     function(event) {
      //       syncCursors(shownCursor);
      //     }
      //   );

      //   shownCursorZoomStartedDisposer = shownCursor.events.on(
      //     'zoomstarted',
      //     function(event) {
      //       for (let i = 0; i < charts.length; i++) {
      //         const chart = charts[i];
      //         const cursor = chart.cursor;
      //         if (cursor !== event.target) {
      //           const point = { x: event.target.point.x, y: 0 };
      //           cursor.triggerDown(point);
      //         }
      //       }
      //     }
      //   );

      //   shownCursorZoomEndedDisposer = shownCursor.events.on(
      //     'zoomended',
      //     function(event) {
      //       for (let i = 0; i < charts.length; i++) {
      //         const chart = charts[i];
      //         const cursor = chart.cursor;
      //         if (cursor !== event.target) {
      //           const point = { x: event.target.point.x, y: 0 };
      //           cursor.triggerUp(point);
      //         }
      //       }
      //     }
      //   );

      //   shownCursor.events.once('hidden', function(event) {
      //     shownCursorChangeDisposer.dispose();
      //     shownCursorZoomStartedDisposer.dispose();
      //     shownCursorZoomEndedDisposer.dispose();

      //     for (let i = 0; i < charts.length; i++) {
      //       const chart = charts[i];
      //       const cursor = chart.cursor;
      //       cursor.hide(0);

      //       cursorShowDisposers[i].dispose();
      //     }

      //     initCursorListeners();
      //   });
      // }

      // function syncCursors(syncWithCursor) {
      //   for (let i = 0; i < charts.length; i++) {
      //     const chart = charts[i];
      //     const cursor = chart.cursor;

      //     const point = { x: syncWithCursor.point.x, y: 0 };

      //     if (cursor !== syncWithCursor) {
      //       cursor.triggerMove(point);
      //     }
      //   }
      // }

      // function syncDateAxes(syncWithAxis) {
      //   for (let i = 0; i < charts.length; i++) {
      //     const chart = charts[i];
      //     const dateAxis = chart.xAxes.getIndex(0);
      //     if (dateAxis !== syncWithAxis) {
      //       dateAxis.events.disableType('selectionextremeschanged');
      //       dateAxis.start = syncWithAxis.start;
      //       dateAxis.end = syncWithAxis.end;
      //       dateAxis.events.enableType('selectionextremeschanged');
      //     }
      //   }
      // }
**********/
      }
    });
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

  drawOneChartGraphic(chart, index) {
    const series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = 'date' + (index + 1);
    series.dataFields.valueY = 'time' + (index + 1);
    series.tooltipText = '{valueY.value}';
    series.fill = am4core.color(this.graphicColor[index]);
    series.stroke = am4core.color(this.graphicColor[index]);
    // series.strokeWidth = 3;
    // series.name = '';

    return series;
  }

  drawOneChartGraphic1(chart) {
    // const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    // dateAxis.renderer.grid.template.location = 0;

    // const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    // valueAxis.tooltip.disabled = true;
    // valueAxis.renderer.minWidth = 35;

    const series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = 'x'; // 'date';
    series.dataFields.valueY = 'y'; // 'value';

    series.tooltipText = '{valueY.value}';
    chart.cursor = new am4charts.XYCursor();

    // const scrollbarX = new am4charts.XYChartScrollbar();
    // chart.scrollbarX = scrollbarX;
    // scrollbarX.series.push(series);
  }
}
