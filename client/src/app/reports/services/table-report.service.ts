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
}
