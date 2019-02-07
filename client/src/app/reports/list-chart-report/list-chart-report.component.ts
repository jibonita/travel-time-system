import { ChartReportComponent } from './../chart-report/chart-report.component';
import { Component, OnInit, Input,  OnDestroy } from '@angular/core';
import { TableReportService } from '../services/table-report.service';

@Component({
  selector: 'app-list-chart-report',
  templateUrl: './list-chart-report.component.html',
  styleUrls: ['./list-chart-report.component.css']
})
export class ListChartReportComponent implements OnInit, OnDestroy {
  message: string;
  isChartLoaded = false;
  devicesToCompare;
  @Input() chartsList;

  constructor(
    private readonly tableReportService: TableReportService,
  ) { }

  ngOnInit() {
     this.tableReportService.currentChartDevices$.subscribe(
      devices => {
        // this.message = devices;
        if (devices.length > 0) {
          this.isChartLoaded = true;
          this.devicesToCompare = `( ${devices.split(',').join(' - ')} )`;
        } else {
          this.devicesToCompare = '';
        }
        // this.isChartLoaded = devices.length > 0;
        // this.devicesToCompare = `( ${devices.split(',').join(' - ')} )`;
      }
      );
  }

  ngOnDestroy() {
    this.devicesToCompare = '';
  }

  deleteChart(chartIdToDelete) {
    this.tableReportService.deleteChartReport(chartIdToDelete).subscribe(
      (data) => {
        this.chartsList = this.chartsList.filter((chart) => chart.id !== chartIdToDelete);
      },
      (error) => {

      }
    );
  }

}
