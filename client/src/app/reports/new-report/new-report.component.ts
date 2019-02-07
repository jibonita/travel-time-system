import { TableReportService } from './../services/table-report.service';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, ValidatorFn } from '@angular/forms';
import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { МodalComponent } from 'src/app/shared/modal/modal.component';
import { DevicesService } from 'src/app/admin/devices/services/devices.service';
import { TableReportModel } from '../models/table-report.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-report',
  templateUrl: './new-report.component.html',
  styleUrls: ['./new-report.component.css']
})
export class NewReportComponent implements OnInit {
  addTableReportForm: FormGroup;
  title = 'Travel Time Route';
  deviceList = [];
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

  @ViewChild(МodalComponent) public modal: МodalComponent;


  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly notificator: ToastrService,
    private readonly devicesService: DevicesService,
    private readonly tableReportService: TableReportService) { }

  ngOnInit() {
    this.devicesService.getAllDevices().subscribe(
      (result) => {
        this.deviceList = result;

        this.addTableReportForm.removeControl('selectedDevices');
        this.addTableReportForm.addControl('selectedDevices',
            new FormArray(
              this.deviceList.map(c => new FormControl(false), this.minSelectedCheckboxes(2))
            )
        );
    });

    const name = this.formBuilder.control('', [Validators.required]);
    const period = this.formBuilder.control('', [Validators.required]);
    const deviceSearch = this.formBuilder.control('');

    const selectedDevices = new FormArray(
         this.deviceList.map(c => new FormControl(false))
    );

    this.addTableReportForm = this.formBuilder.group({
      name,
      period,
      deviceSearch,
      selectedDevices
    });
  }

  public showNewReportForm(): void {

    this.modal.open();
  }

  createReport() {
    const tableReport = this.getFormData();

    this.modal.close();
    this.addTableReportForm.reset();

    this.tableReportService.createTableReport(tableReport).subscribe(
      (data) => {
        this.notificator.success('Report created successfully!');
        this.tableReportService.changeTableListState(data);
      },
      error => {
        this.notificator.error(error.message, 'Report creation failed!');
      }
    );
  }

  getFormData(): TableReportModel {
    const selectedDevicesIds = this.addTableReportForm.value.selectedDevices
    .map((v, i) => v ? this.deviceList[i].id : null)
    .filter(v => v !== null);

    const tableReport: TableReportModel = {
      name: this.addTableReportForm.value['name'],
      period: this.addTableReportForm.value['period'].hours,
      deviceIDs: selectedDevicesIds
    };

    return tableReport;
  }

  inMilliseconds(m, h= 0) {
    return ( h * 60 + m ) * 60 * 1000;
  }

  minSelectedCheckboxes(min = 1) {
    const validator: ValidatorFn = (formArray: FormArray) => {
      const totalSelected = formArray.controls
        // get a list of checkbox values (boolean)
        .map(control => control.value)
        // total up the number of checked checkboxes
        .reduce((prev, next) => next ? prev + next : prev, 0);

      // if the total is not greater than the minimum, return the error message
      return totalSelected >= min ? null : { required: true };
    };

    return validator;
  }

  filterList(value) {
    value = value.toLowerCase();
    // .filter() is not working
    const names = document.getElementsByClassName('device-name');
    for (let i = 0; i < names.length; i++) {
      const name = names[i];
      $(name).toggle(
          $(name).text().toLowerCase().indexOf(value) > -1
        );

    }
   }
}
