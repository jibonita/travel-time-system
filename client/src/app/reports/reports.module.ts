import { ListReportsComponent } from './list-reports/list-reports.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NewReportComponent } from './new-report/new-report.component';
import { TableReportComponent } from './table-report/table-report.component';

@NgModule({
  declarations: [ListReportsComponent, NewReportComponent, TableReportComponent],
  imports: [
    CommonModule,
    SharedModule, ReactiveFormsModule
  ],
  exports: [NewReportComponent, ListReportsComponent]
})
export class ReportsModule { }
