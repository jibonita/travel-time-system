import { TableReportService } from './../services/table-report.service';
import { TableReportModel } from './../models/table-report.model';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-chart-report',
  templateUrl: './chart-report.component.html',
  styleUrls: ['./chart-report.component.css']
})
export class ChartReportComponent implements OnInit {
  data;
  message: string;
  isChartDataLoaded = false;
  @Input() chartData;
  
  constructor(
    private readonly notificator: ToastrService,
    private readonly tableReportService: TableReportService) { }

  ngOnInit() {

    this.tableReportService.currentChartDevices$.subscribe(
        message => {
          this.message = message;
          const [origin, destination] = message.split(',');
          const period = this.chartData.periodInMilliseconds;
          const startDates = [];
          this.chartData.startDates.map(date => {
            startDates.push(date.dateInMilliseconds);
          });
          
          const compareChartData = {
            'originID': origin,
            'destinationID': destination,
            'startDates': startDates.join(','),
            'period': period
            };
          
            this.tableReportService.getCompareChartData(compareChartData).subscribe(
                data => {
                    this.data = data;
                    // console.log(data)
                    // console.log('doidoha dannite');
                    this.isChartDataLoaded = true;
                    
                },
                (error) => {
                  this.notificator.error(error.message, 'Unable to get data!');
                  
                },
            );
        },
        (error) => {
          this.notificator.error(error.message, 'Something goes wrong!');
          
        },
        );
    
    // get chart comparison data
    //this.data = this.pesho;


    // const compareChartData = {
    //     'originID': compareData,
    //     'destinationID': compareData,
    //     'startDates': compareData,
    //     'period': compareData
    //   };
      
    // this.tableReportService.getCompareChartData(compareChartData).subscribe(

    //);
  }

}
