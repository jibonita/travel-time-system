import { Component, OnInit, Output, EventEmitter, OnDestroy, AfterViewInit, DoCheck, Input } from '@angular/core';
import { MapService } from '../../core/map.service';

@Component({
  selector: 'app-street-map',
  templateUrl: './street-map.component.html',
  styleUrls: ['./street-map.component.css']
})
export class StreetMapComponent implements OnInit, AfterViewInit, DoCheck, OnDestroy {

 @Input() mapid: string;

  defaultLatLon = [42.698289, 23.324640]; // Sofia by default
  streetmap;
  isLoaded = false;

  constructor(private readonly mapService: MapService) {}

  ngOnInit() {
    // console.log('street-map-c: ima li map? ',document.getElementById('mapid'+this.mapid));
    // const mapId  = 'mapid'+this.mapid;
    // if (!this.mapService.getMap) {
    //   console.log('prez init na street-map');

      // this.streetmap = this.mapService.initMap(mapId, this.defaultLatLon, 13);
    // }
    // else {
    //   this.mapService.getMap.invalidateSize();
    // }
   }
  ngAfterViewInit(): void {
    // console.log("ngAfterViewInit");
    // console.log(document.getElementById('mapid'))
  }
  ngDoCheck(): void {

    const mapId  = 'mapid' + this.mapid;
    if (document.getElementById(mapId) && !this.isLoaded) {
      this.isLoaded = true;

      if (!this.mapService.getMap) {
        this.mapService.initMap(mapId, this.defaultLatLon, 13);
       }

    }
  }

  ngOnDestroy(): void {
    this.mapService.destroy();
  }

}
