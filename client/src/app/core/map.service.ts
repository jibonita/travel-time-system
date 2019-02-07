import { Injectable, OnInit } from '@angular/core';
 // declare let L;
// import * as L from 'leaflet';
// import {Map} from 'leaflet';
import * as L from 'leaflet';
import 'leaflet-routing-machine';

@Injectable()
export class MapService {
  private defaultLatLon = [42.698289, 23.324640]; // Sofia by default

  private streetMap;
  private marker;
  private routeControl: L.Routing.Control;

  public get getMap() {
    return this.streetMap;
  }
  public initMap(mapId, latLang, zoom): any {
    if (document.getElementById(mapId)) {
      if (latLang.length === 0) {
        latLang = this.defaultLatLon;
      }
      const myMap = L.map(mapId).setView(latLang, zoom);

      const mapBoxToken =
        'pk.eyJ1Ijoiamlib25pdGEiLCJhIjoiY2pyYW1sZGphMDJsMjQ2bXJwcXMxNjZkeiJ9.Bq8DniBup0gVphk00oFt5Q';
      const mapBoxTokenDefault =
        'pk.eyJ1Ijoiamlib25pdGEiLCJhIjoiY2pyYW1ndnJkMGdobjN5cDg5aW40eWZuZCJ9.FM_p6c5qLi6gD8Tem-88MA';
      const secondToken =
        'pk.eyJ1Ijoiamlib25pdGEiLCJhIjoiY2pyYW1ydnUxMHJ2YjQ0bDh1cjllazQ4ayJ9.Yy7row2YHGvKUxrOgv-fgA';
      // L.tileLayer(
      //   `https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=${mapBoxToken}`,
      //   {
      //     attribution: "",
      //     maxZoom: 18,
      //     id: 'mapbox.streets',
      //     accessToken: mapBoxToken
      //   }
      // ).addTo(myMap);

      // L.tileLayer(`https://api.mapbox.com/styles/v1/mapbox/mapbox.streets/tiles/{z}/{x}/{y}?access_token=${mapBoxToken}`).addTo(myMap);

      L.tileLayer(
        `https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=${mapBoxToken}`,
        {
          attribution: '',
          maxZoom: 18,
        }
      ).addTo(myMap);


      this.streetMap = myMap;

    } else {
      this.streetMap = null;
    }

    return this.streetMap;
  }

  showRoute(coords) {
    this.clearRoutes();

    const points = coords.map(L.latLng);
    // console.log(points);

    try {
      this.routeControl = L.Routing.control({
        waypoints: points,

      }).addTo(this.streetMap);

      this.routeControl.hide();
    } catch (error) {
      console.log('Error in OSRM API');
    }

  }

  clearRoutes() {
    if (this.routeControl) {
      this.routeControl.getPlan().setWaypoints([]);
    }
  }

  getMapLatLon(e) {
    try {
      return [e.latlng.lat, e.latlng.lng];
    } catch (error) {
      return error.message;
    }
  }

  addMarker(latlon) {
    if (this.marker) {
      this.streetMap.removeLayer(this.marker); // other: removeControl(marker);
    }

    const circle = L.circle(latlon, {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 5
    }).addTo(this.streetMap);

    this.marker = circle;
  }

  destroy() {
    if (this.streetMap) {
      this.streetMap.off();
      this.streetMap.remove();
      this.streetMap = null;
    }
  }
}
