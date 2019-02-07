import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TableReportService } from '../services/table-report.service';
import { TableReportModel } from '../models/table-report.model';
import { ReportDataListenerService } from '../services/report-data-listener.service';

@Component({
  selector: 'app-report-options',
  templateUrl: './report-options.component.html',
  styleUrls: ['./report-options.component.css']
})
export class ReportOptionsComponent implements OnInit {
  reportsList: TableReportModel[];
  @Input() report: string;

  constructor(
    private readonly notificator: ToastrService,
    private readonly tableReportService: TableReportService,
    private readonly reportDataListenerService: ReportDataListenerService
  ) { }

  ngOnInit() {
    this.tableReportService.getTableReports().subscribe(
      (data) => {
        this.reportsList = data;
      }
    );
  }

  deleteReport(reportId) {
    this.tableReportService.deleteTableReport(reportId).subscribe(
      (data) => {
        this.notificator.success('Deleted table report');
        const index = this.reportsList.indexOf(reportId);
        this.reportsList.splice(index, 1);
        console.log(this.reportsList);
      },
      error => {
        console.log(error);
        // this.notificator.error(error.message, 'Could not delete the report!');
      }
    );
  }

  viewRouteOnStreetMap(report){
    const devices = report.devices.map(this.getLatLonPair);

    this.reportDataListenerService.changeRouteToDraw(devices);
  }

  getLatLonPair(device) {
    return [+device.latitude, +device.longitude];
  }

}
