import { Component, NgZone, AfterViewInit, OnDestroy, Input, OnInit } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() compareData;
  @Input() chartId;

  private chart: am4charts.XYChart;

  apiGraphicTitles = [];
  apiGraphicData = [];
  graphicColor = ['#e59165', '#ff0000', '#0000ff', '#dfcc64', '#19b14c', '#f04de2'];
  axesColor = '#e59165';

  constructor(private zone: NgZone) {}

  ngOnInit(): void {
     this.apiGraphicTitles.push((<any>Object).keys(this.compareData));

    const apiGrData = [];
    apiGrData.push((<any>Object).values(this.compareData));
    apiGrData[0].forEach((value) => {
      this.apiGraphicData.push(value);
    });

  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {

      const data = this.fillDataToDataArray(this.apiGraphicData);
      const chart = this.initChart(`chartdiv${this.chartId}`, data, this.apiGraphicData);

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

  fillDataToDataArray(allEntryData) {
    const data = [];
    const firstDataSet = allEntryData[0];
    allEntryData.map( (graphicData, graphIndex) => {
      const index = graphIndex + 1;
      graphicData.forEach((value: {x: number, y: number}, ind) => {

        const jsonVar = {};
        jsonVar['date' + index] = firstDataSet[ind].x;  //value.x;
        jsonVar['time' + index] = value.y;

        data.push(jsonVar);
      });
    });

    return data;
  }
}
