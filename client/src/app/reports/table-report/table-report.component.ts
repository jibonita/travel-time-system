import { TableReportModel } from './../models/table-report.model';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { TableReportService } from '../services/table-report.service';
import { RequesterService } from 'src/app/core/requester.service';

@Component({
  selector: 'app-table-report',
  templateUrl: './table-report.component.html',
  styleUrls: ['./table-report.component.css']
})
export class TableReportComponent implements OnInit {

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
    // const devices: string[] = [];
    // this.report.devices.forEach(element => {
    //   devices.push(element.name);
    // });
    // const period = `{"from": ${this.report.startDateInMilliseconds},"to": ${this.report.endDateInMilliseconds}}`;
    // const url = `http://ec2-35-158-53-19.eu-central-1.compute.amazonaws.com:8080/api/travelTimeTableData?devices=${devices}&date=${period}`;
    // this.data = this.requester.get(url).subscribe(data => {
    //   this.tableReport = data;
    // });

    this.tableReportService.loadTableReports(this.report).subscribe(
      (data) => {
        this.tableReport = data;
      }
    );

    
  }

 


}
