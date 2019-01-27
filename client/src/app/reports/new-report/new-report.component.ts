import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { МodalComponent } from 'src/app/shared/modal/modal.component';
import { DevicesService } from 'src/app/admin/devices/services/devices.service';

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
    {name: '15 minutes',  millisec: this.inMilliseconds(15)},
    {name: '30 minutes',  millisec: this.inMilliseconds(30)},
    {name: '45 minutes',  millisec: this.inMilliseconds(45)},
    {name: '1 hour ',     millisec: this.inMilliseconds(0, 1)},
    {name: '2 hours',     millisec: this.inMilliseconds(0, 2)},
    {name: '4 hours',     millisec: this.inMilliseconds(0, 4)},
    {name: '8 hours',     millisec: this.inMilliseconds(0, 8)},
    {name: '12 hours',    millisec: this.inMilliseconds(0, 12)},
    {name: '24 hours',    millisec: this.inMilliseconds(0, 24)},
];

  @ViewChild(МodalComponent) public modal: МodalComponent;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly devicesService: DevicesService) { }

  ngOnInit() {
    this.devicesService.getAllDevices().subscribe(
      (result) => {
        this.deviceList = result;

        this.addTableReportForm.removeControl('selectedDevices');
        this.addTableReportForm.addControl('selectedDevices',
            new FormArray(
              this.deviceList.map(c => new FormControl(false))
            )
        );
    });

    const name = this.formBuilder.control('', [Validators.required]);
    const period = this.formBuilder.control(this.periods[1], [Validators.required]);
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
    const selectedDevicesIds = this.addTableReportForm.value.selectedDevices
    .map((v, i) => v ? this.deviceList[i].id : null)
    .filter(v => v !== null);

  console.log(selectedDevicesIds);

  }

  inMilliseconds(m, h= 0) {
    return ( h * 60 + m ) * 60 * 1000;
  }
}
