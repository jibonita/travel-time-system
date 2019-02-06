import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ReportDataListenerService {

    private routeDrawSourse$ = new BehaviorSubject([]);
    currentRouteDraw$ = this.routeDrawSourse$.asObservable();

    changeRouteToDraw(coords: []) {
        this.routeDrawSourse$.next(coords);
    }
}