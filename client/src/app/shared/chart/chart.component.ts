import { Component, NgZone,  AfterViewInit, OnDestroy  } from '@angular/core';
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

  constructor(private zone: NgZone) {}

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      const chart = am4core.create('chartdiv', am4charts.XYChart);

      // ... chart code goes here ...
      chart.paddingRight = 20;

      const data = [
        {
        'x': 1539129600000,
        'y': 18
        },
        {
        'x': 1539130500000,
        'y': 33
        },
        {
        'x': 1539131400000,
        'y': 18
        },
        {
        'x': 1539132300000,
        'y': 33
        },
        ];
      const data2 =  [
        {
        'x': 1539180000000,
        'y': 57
        },
        {
        'x': 1539180900000,
        'y': 37
        },
        {
        'x': 1539181800000,
        'y': 97
        },
        {
        'x': 1539182700000,
        'y': 52
        },
        ];

        chart.data = data;
        this.drawOneChartGraphic(chart);

        // chart.data = data2;
        // this.drawOneChartGraphic(chart);

      
      // end chart code

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

  drawOneChartGraphic(chart){
      const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;

      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      valueAxis.renderer.minWidth = 35;

      const series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.dateX =  'x'; // 'date';
      series.dataFields.valueY =  'y'; // 'value';

      series.tooltipText = '{valueY.value}';
      chart.cursor = new am4charts.XYCursor();

      const scrollbarX = new am4charts.XYChartScrollbar();
      scrollbarX.series.push(series);
      chart.scrollbarX = scrollbarX;


  }
}
