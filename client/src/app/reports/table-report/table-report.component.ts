import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { TableReportService } from '../services/table-report.service';
import { ReportDataListenerService } from '../services/report-data-listener.service';
import { MapService } from 'src/app/core/map.service';

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
    private readonly mapService: MapService,
    private readonly tableReportService: TableReportService,
    private readonly reportDataListenerService: ReportDataListenerService
  ) {  }


  ngOnInit() {
    this.tableReportService.loadTableReports(this.report).subscribe(
      (data) => {
        this.tableReport = data;

        const devices = this.report.devices.map(this.getLatLonPair);
        this.reportDataListenerService.changeRouteToDraw(devices);
      }
    );



  }

  ngOnDestroy(): void {
    console.log('report destroy');
    this.mapService.clearRoutes();
  }

  loadChart(origin, destination) {
    this.tableReportService.changeDevices(`${origin},${destination}`);

    // console.log('load chart', origin, '=>', destination);
    // 1. check for charts per this  table
    // 2. get data per each chart
  };

  getLatLonPair(device){
    return [+device.latitude, +device.longitude];
  }
}
