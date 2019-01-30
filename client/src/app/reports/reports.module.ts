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

@NgModule({
  declarations: [ListReportsComponent, NewReportComponent, TableReportComponent],
  imports: [
    CommonModule,
    SharedModule, ReactiveFormsModule, NgbModule
  ],
  providers: [DevicesService, TableReportService],
  exports: [NewReportComponent, ListReportsComponent]
})
export class ReportsModule { }
