import { TableReportModel } from './../models/table-report.model';
import { TableReportService } from './../services/table-report.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-reports',
  templateUrl: './list-reports.component.html',
  styleUrls: ['./list-reports.component.css']
})
export class ListReportsComponent implements OnInit {
  reportsList: TableReportModel[];

  constructor(
    private readonly notificator: ToastrService,
    private readonly tableReportService: TableReportService
  ) { }

  ngOnInit() {
console.log('init');

      this.tableReportService.getTableReports().subscribe(
        (data) => {
          this.reportsList = data;
         }
      );
  }

  viewRoute(reportId) {
    console.log('view report map' + reportId);
  }


}
