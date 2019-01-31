import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequesterService } from './../../core/requester.service';
import { TableReportModel } from '../models/table-report.model';

@Injectable()
export class TableReportService {
  public constructor(private readonly requester: RequesterService) {}

  public createTableReport(tableReport: TableReportModel): Observable<TableReportModel[]> {
    return this.requester.post('http://localhost:3000/table-reports', JSON.stringify(tableReport));
  }

  public getTableReports(): Observable<TableReportModel[]> {
    return this.requester.get('http://localhost:3000/table-reports');
  }

  public getTableReportById(id): Observable<any> {
    return this.requester.get('http://localhost:3000/table-reports' + id);
  }

  public loadTableReports(report): Observable<any> {
    const devices: string[] = [];
    report.devices.forEach(element => {
      devices.push(element.name);
    });
    const period = `{"from": ${report.startDateInMilliseconds},"to": ${report.endDateInMilliseconds}}`;
    const url = `http://ec2-35-158-53-19.eu-central-1.compute.amazonaws.com:8080/api/travelTimeTableData?devices=${devices}&date=${period}`;
    return this.requester.get(url);
  }
}
