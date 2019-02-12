import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TableReportModel } from '../models/table-report.model';

@Injectable()
export class ReportDataListenerService {

    private routeDrawSourse$ = new BehaviorSubject([]);
    currentRouteDraw$ = this.routeDrawSourse$.asObservable();

    changeRouteToDraw(coords: []) {
        this.routeDrawSourse$.next(coords);
    }

    private tableListStateSource$ = new BehaviorSubject(null);
    currentTableListState$ = this.tableListStateSource$.asObservable();

    changeTableListState(state: TableReportModel[]) {
        this.tableListStateSource$.next(state);
    }

    private chartDevicesSourse$ = new BehaviorSubject('');
    currentChartDevices$ = this.chartDevicesSourse$.asObservable();

    changeDevices(message: string) {
        this.chartDevicesSourse$.next(message);
    }
}
