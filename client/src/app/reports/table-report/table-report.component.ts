import { TableReportModel } from './../models/table-report.model';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { TableReportService } from '../services/table-report.service';
import { RequesterService } from 'src/app/core/requester.service';

@Component({
  selector: 'app-table-report',
  templateUrl: './table-report.component.html',
  styleUrls: ['./table-report.component.css']
})
export class TableReportComponent implements OnInit, OnDestroy {
  

  @Input() report;
  public data: any = [];
  public devices: string[] = [];
  private tableReport;

  constructor(
    private http: HttpClient,
    private readonly tableReportService: TableReportService,
    private readonly requester: RequesterService
  ) {  }


  ngOnInit() {
    console.log('report init')
    
    this.tableReportService.loadTableReports(this.report).subscribe(
      (data) => {
        this.tableReport = data;
      }
    );

    
  }

  ngOnDestroy(): void {
    console.log('report destroy')
  }

  loadChart(item, b) {
    console.log('load chart', item, b)
  }
}
