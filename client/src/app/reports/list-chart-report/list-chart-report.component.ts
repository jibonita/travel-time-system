import { ChartReportComponent } from './../chart-report/chart-report.component';
import { Component, OnInit, Input,  AfterViewInit } from '@angular/core';
import { TableReportService } from '../services/table-report.service';

@Component({
  selector: 'app-list-chart-report',
  templateUrl: './list-chart-report.component.html',
  styleUrls: ['./list-chart-report.component.css']
})
export class ListChartReportComponent implements OnInit {
  message: string;
  isChartLoaded = false;
  @Input() chartsList;

  constructor(
    private readonly tableReportService: TableReportService,
  ) { }

  ngOnInit() {
     this.tableReportService.currentChartDevices$.subscribe(
      message => {
        this.message = message;
        this.isChartLoaded = message.length > 0;
        //console.log('V chart list nov message: '+ message)
      }
      );
  }

}
