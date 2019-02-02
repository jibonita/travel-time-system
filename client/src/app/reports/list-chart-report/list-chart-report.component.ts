import { Component, OnInit, Input } from '@angular/core';
import { TableReportService } from '../services/table-report.service';

@Component({
  selector: 'app-list-chart-report',
  templateUrl: './list-chart-report.component.html',
  styleUrls: ['./list-chart-report.component.css']
})
export class ListChartReportComponent implements OnInit {
  message: string;
  @Input() chartsList;

  constructor(
    private readonly tableReportService: TableReportService,
  ) { }

  ngOnInit() {
    console.log(this.chartsList);

    this.tableReportService.currentChartDevices$.subscribe(
      message => {
        this.message = message;
        console.log('V chart list nov message: '+ message)
      }
      );
  }

}
