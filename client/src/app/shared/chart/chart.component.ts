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
  axesColor = '#e59165';

  constructor(private zone: NgZone) {}

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
 
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

      const chart = this.initChart('chartdiv', data, allEntryData);
   
      this.chart = chart;

    });
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

  initChart(chartId, data, allEntryData) {
    const chart = am4core.create(chartId, am4charts.XYChart);

      chart.paddingRight = 20;

      chart.data = data;

      const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;
      dateAxis.renderer.labels.template.fill = am4core.color(this.axesColor);

      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      valueAxis.renderer.labels.template.fill = am4core.color(this.axesColor);
      valueAxis.renderer.minWidth = 60;

      let series;
      allEntryData.forEach((_, index) => {
        series = this.drawOneChartGraphic(chart, index);
      });

      chart.cursor = new am4charts.XYCursor();

      const scrollbarX = new am4charts.XYChartScrollbar();
      scrollbarX.series.push(series);
      chart.scrollbarX = scrollbarX;

      chart.legend = new am4charts.Legend();
      chart.legend.parent = chart.plotContainer;
      chart.legend.zIndex = 100;

      dateAxis.renderer.grid.template.strokeOpacity = 0.07;
      valueAxis.renderer.grid.template.strokeOpacity = 0.07;

      return chart;
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


}
