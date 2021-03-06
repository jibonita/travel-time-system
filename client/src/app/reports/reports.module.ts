import { DevicesService } from 'src/app/admin/devices/services/devices.service';
import { ListReportsComponent } from './list-reports/list-reports.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NewReportComponent } from './new-report/new-report.component';
import { TableReportComponent } from './table-report/table-report.component';
import { TableReportService } from './services/table-report.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartReportComponent } from './chart-report/chart-report.component';
import { ListChartReportComponent } from './list-chart-report/list-chart-report.component';
import { ReportOptionsComponent } from './report-options/report-options.component';
import { AddChartTableComponent } from './add-chart-table/add-chart-table.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { FormsModule } from '@angular/forms';
import { StreetRouteComponent } from './street-route/street-route.component';
import { ReportDataListenerService } from './services/report-data-listener.service';

@NgModule({
  declarations: [
    ListReportsComponent,
    NewReportComponent,
    TableReportComponent,
    ChartReportComponent,
    ListChartReportComponent,
    ReportOptionsComponent,
    AddChartTableComponent,
    StreetRouteComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    NgbModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    FormsModule],
  providers: [DevicesService, TableReportService, ReportDataListenerService],
  exports: [NewReportComponent, ListReportsComponent, StreetRouteComponent]
})
export class ReportsModule { }
