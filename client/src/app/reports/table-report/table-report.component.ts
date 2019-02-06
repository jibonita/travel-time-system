import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { TableReportService } from '../services/table-report.service';
import { ReportDataListenerService } from '../services/report-data-listener.service';
import { MapService } from 'src/app/core/map.service';
import { SearchBarComponent } from 'src/app/shared/search-bar/search-bar.component';

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

  cellClickedActions(origin, destination) {
    this.viewOnMap(origin, destination);
    
    this.loadChart(origin, destination)
  }

  viewOnMap(origin, destination){
    const devices = this.report.devices
        .filter(this.searchDevicesByName(origin, destination))
        .map(this.getLatLonPair);
    
    this.mapService.showRoute(devices);
  }

  loadChart(origin, destination) {
    this.tableReportService.changeDevices(`${origin},${destination}`);
  };

  getLatLonPair(device){
    return [+device.latitude, +device.longitude];
  }

  searchDevicesByName(origin, destination) {
      const searchDevice = (device) => {
        return [origin, destination].indexOf(device.name) >-1;
      }
      
      return searchDevice;
  }

}
