import { Injectable, OnInit } from "@angular/core";
// declare let L;
import * as L from "leaflet";

@Injectable()
export class MapService {
  private streetMap;
  private marker: any;

  public get getMap() {
    return this.streetMap;
  }
  public initMap(mapId, latLang, zoom): any {
    if (document.getElementById(mapId)) {
      const myMap = L.map(mapId).setView(latLang, zoom);
      // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      //   attribution:
      //     '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      // }).addTo(streetMap);

      const mapBoxToken =
        "pk.eyJ1Ijoiamlib25pdGEiLCJhIjoiY2pyYW1sZGphMDJsMjQ2bXJwcXMxNjZkeiJ9.Bq8DniBup0gVphk00oFt5Q";
      const mapBoxTokenDefault =
        "pk.eyJ1Ijoiamlib25pdGEiLCJhIjoiY2pyYW1ndnJkMGdobjN5cDg5aW40eWZuZCJ9.FM_p6c5qLi6gD8Tem-88MA";
      const secondToken =
        "pk.eyJ1Ijoiamlib25pdGEiLCJhIjoiY2pyYW1ydnUxMHJ2YjQ0bDh1cjllazQ4ayJ9.Yy7row2YHGvKUxrOgv-fgA";
      L.tileLayer(
        `https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=${mapBoxToken}`,
        {
          attribution: `Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>
                          contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,
                          Imagery © <a href="https://www.mapbox.com/">Mapbox</a>`,
          maxZoom: 18,
          id: "mapbox.streets",
          accessToken: mapBoxToken
        }
      ).addTo(myMap);

      this.streetMap = myMap;
    } else {
      this.streetMap = null;
    }

    return this.streetMap;
  }

  public getMapLatLon(e) {
    try {
      return [e.latlng.lat, e.latlng.lng];
    } catch (error) {
      return error.message;
    }
  }

  public addMarker(latlon) {
    if (this.marker) {
      this.streetMap.removeLayer(this.marker); // other: removeControl(marker);
    }

    const circle = L.circle(latlon, {
      color: "red",
      fillColor: "#f03",
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
