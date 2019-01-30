import { Component, OnInit, Output, EventEmitter, OnDestroy, AfterViewInit, DoCheck, Input } from '@angular/core';
import { MapService } from '../../core/map.service';

@Component({
  selector: 'app-street-map',
  templateUrl: './street-map.component.html',
  styleUrls: ['./street-map.component.css']
})
export class StreetMapComponent implements  DoCheck, OnDestroy {

  @Input() mapid: string;

  streetmap;
  isLoaded = false;

  constructor(private readonly mapService: MapService) {}


  ngDoCheck(): void {

    const mapId  = 'mapid' + this.mapid;
    if (document.getElementById(mapId) && !this.isLoaded) {
      this.isLoaded = true;

      if (!this.mapService.getMap) {
        this.mapService.initMap(mapId, [], 13);
       }

    }
  }

  ngOnDestroy(): void {
    this.mapService.destroy();
  }

}
