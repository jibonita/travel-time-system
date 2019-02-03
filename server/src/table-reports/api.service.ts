import { HttpService, Injectable } from '@nestjs/common';
import { TableReport } from '../data/entities/table-report.entity';
import { ChartReport } from '../data/entities/chart-report.entity';
import { CompareChartDTO } from 'src/models/table-report/chart-report/compare-chart.dto';

@Injectable()
export class ApiService {
  constructor(
    private readonly httpService: HttpService,
  ) { }

  async tableReport(report: TableReport) {
    const devices: string = report.devices.map(x => x.name).join(',');
    // tslint:disable-next-line:object-literal-key-quotes
    const period = `{"from": ${report.startDateInMilliseconds},"to": ${report.endDateInMilliseconds}}`;
    const url = `http://ec2-35-158-53-19.eu-central-1.compute.amazonaws.com:8080/api/travelTimeTableData?devices=${devices}&date=${period}`;
    const result = await this.httpService.get(url).toPromise();
    return result.data;
  }

  // async chartReport(originID, destinationID, chart: ChartReport) {
    // const startDates: string = chart.startDates.join(',');
    // const period: number = chart.periodInMilliseconds;
  async chartReport(compareChartDTO: CompareChartDTO) {
    const originID = compareChartDTO.originID;
    const destinationID = compareChartDTO.destinationID;
    const startDates: string = compareChartDTO.startDates;
    const period: number = compareChartDTO.period;
     // tslint:disable-next-line:max-line-length
    const url = `http://ec2-35-158-53-19.eu-central-1.compute.amazonaws.com:8080/api/comparePeriods?originDeviceId=${originID}&destinationDeviceId=${destinationID}&startDates=${startDates}&periodLength=${period}`;
    const result = await this.httpService.get(url).toPromise();
    return result.data;
  }
}
