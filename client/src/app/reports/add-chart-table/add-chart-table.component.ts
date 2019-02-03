import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TableReportService } from '../services/table-report.service';

@Component({
  selector: 'app-add-chart-table',
  templateUrl: './add-chart-table.component.html',
  styleUrls: ['./add-chart-table.component.css']
})
export class AddChartTableComponent implements OnInit {
  addChartForm: FormGroup;
  public startDateTime: Date;
  public newDates: Date;
  public allDates: string[] = [];
  public allDatesMs: any[] = [];
  @Input() reportId: string;
  periods = [
    {name: '15 minutes', hours: 0.25, millisec: this.inMilliseconds(15)},
    {name: '30 minutes', hours: 0.5,  millisec: this.inMilliseconds(30)},
    {name: '45 minutes', hours: 0.75, millisec: this.inMilliseconds(45)},
    {name: '1 hour ',    hours: 1,    millisec: this.inMilliseconds(0, 1)},
    {name: '2 hours',    hours: 2,    millisec: this.inMilliseconds(0, 2)},
    {name: '4 hours',    hours: 4,    millisec: this.inMilliseconds(0, 4)},
    {name: '8 hours',    hours: 8,    millisec: this.inMilliseconds(0, 8)},
    {name: '12 hours',   hours: 12,   millisec: this.inMilliseconds(0, 12)},
    {name: '24 hours',   hours: 24,   millisec: this.inMilliseconds(0, 24)},
];

  constructor(
    private readonly modalService: NgbModal,
    private readonly formBuilder: FormBuilder,
    private readonly notificator: ToastrService,
    private readonly tableReportService: TableReportService
  ) { }

  ngOnInit() {
    const name = this.formBuilder.control('', [Validators.required]);
    const period = this.formBuilder.control('', [Validators.required]);

    this.addChartForm = this.formBuilder.group({
      name,
      period
    });
  }

  addNewDate(newDates) {
    this.allDates.push(newDates);
    console.log(this.allDates);
    
  }

  convertToMs(date) {
    const ms = date.getTime();
    this.allDatesMs.push(ms);
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      // this.closeResult = `Dismissed`;
    });
  }

  inMilliseconds(m, h= 0) {
    return ( h * 60 + m ) * 60 * 1000;
  }

  AddChartReportToDB(id, tablereport) {
    this.tableReportService.createChartReport(id, tablereport).subscribe(
      (data) => {
        this.notificator.success('Chart created successfully!');
        // TODO: UPDATE TABLE REPORT LIST WITH THE NEW REPORT
        console.log(data);
      },
      error => {
        this.notificator.error(error.message, 'Chart creation failed!');
      }
    );

  }

  createChartReport() {
    const startDateInMs = this.startDateTime.getTime();
    this.allDatesMs.unshift(startDateInMs);
    const chartReport: any = {
      name: this.addChartForm.value['name'],
      periodInMilliseconds: this.addChartForm.value['period'].millisec,
      startDates: this.allDatesMs
    };
    return this.AddChartReportToDB(this.reportId, chartReport);

  }

  deleteDate(date) {
    const index = this.allDates.indexOf(date);
    if (index > -1) {
      this.allDates.splice(index, 1);
    }
  }
}
