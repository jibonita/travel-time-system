import { Component, OnInit, OnDestroy } from '@angular/core';
import { MapService } from 'src/app/core/map.service';
import { ReportDataListenerService } from '../services/report-data-listener.service';

@Component({
  selector: 'app-street-route',
  templateUrl: './street-route.component.html',
  styleUrls: ['./street-route.component.css']
})
export class StreetRouteComponent implements OnInit, OnDestroy {

  reportDataListenerSubscriber;

  constructor(
    private readonly mapService: MapService,
    private readonly reportDataListenerService: ReportDataListenerService
  ) { }

  ngOnInit() {

    this.reportDataListenerSubscriber =
      this.reportDataListenerService.currentRouteDraw$.subscribe(
        (data) => {
            if (data.length > 0) {
              this.mapService.clearRoutes();

              this.mapService.showRoute(data);
            }

        }
      );
  }


  ngOnDestroy() {

  }
}
