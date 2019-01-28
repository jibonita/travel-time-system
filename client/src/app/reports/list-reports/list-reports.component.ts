import { TableReportModel } from './../models/table-report.model';
import { TableReportService } from './../services/table-report.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-reports',
  templateUrl: './list-reports.component.html',
  styleUrls: ['./list-reports.component.css']
})
export class ListReportsComponent implements OnInit {
  reportsList: TableReportModel[];

  constructor(
    private readonly tableReportService: TableReportService
  ) { }

  ngOnInit() {

      this.tableReportService.getTableReports().subscribe(
        (data) => {
          this.reportsList = data;
        }
      );
  }

}
