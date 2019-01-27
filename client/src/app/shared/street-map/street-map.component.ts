import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MapService } from 'src/app/core/map.service';

@Component({
  selector: 'app-street-map',
  templateUrl: './street-map.component.html',
  styleUrls: ['./street-map.component.css']
})
export class StreetMapComponent implements OnInit {
  defaultLatLon = [42.698289, 23.324640]; // Sofia by default

  constructor(private readonly mapService: MapService) {}

  ngOnInit() {
    if (!this.mapService.getMap){
      this.mapService.initMap(this.defaultLatLon, 13);
    }
  }

}
