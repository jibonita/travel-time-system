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

  deleteReport(reportId) {
    console.log('in delete ');
    
    
    this.tableReportService.deleteTableReport(reportId).subscribe(
      (data) => {
        this.notificator.success('Deleted table report');
        
        const index = this.reportsList.indexOf(reportId);
        this.reportsList.splice(index, 1);
        console.log(this.reportsList)
      },
      error => {
        console.log(error);
      
        //this.notificator.error(error.message, 'Could not delete the report!');
      }
    );
  }

  viewRoute(reportId){
    console.log('view report map'+ reportId)
  }


}
