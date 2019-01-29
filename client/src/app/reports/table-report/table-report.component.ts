import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table-report',
  templateUrl: './table-report.component.html',
  styleUrls: ['./table-report.component.css']
})
export class TableReportComponent implements OnInit {
  public data: any = [];
  public test: any;
  @Input() reportID: any;


  tablereport: any;
  constructor(private http: HttpClient) {
    const devices: string[] = ['2222', 'testingggggdw', 'teqwdqwdqw1', 'dasdqwdqwdqwdqwd'];
    // tslint:disable-next-line:object-literal-key-quotes
    const period = `{"from": 20000,"to": 20000}`;
    const url = `http://ec2-35-158-53-19.eu-central-1.compute.amazonaws.com:8080/api/travelTimeTableData?devices=${devices}&date=${period}`;
    this.data =  this.http.get(url).toPromise();
  }

  getTableReports(id) {
  }

  ngOnInit() {
    console.log(this.data);
  }



}
