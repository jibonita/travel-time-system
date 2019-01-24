import { Component, OnInit } from '@angular/core';
declare let L;

@Component({
  selector: 'app-street-map',
  templateUrl: './street-map.component.html',
  styleUrls: ['./street-map.component.css']
})
export class StreetMapComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const map = L.map('mapid').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const mapBoxToken =        'pk.eyJ1Ijoiamlib25pdGEiLCJhIjoiY2pyYW1sZGphMDJsMjQ2bXJwcXMxNjZkeiJ9.Bq8DniBup0gVphk00oFt5Q';
    const mapBoxTokenDefault = 'pk.eyJ1Ijoiamlib25pdGEiLCJhIjoiY2pyYW1ndnJkMGdobjN5cDg5aW40eWZuZCJ9.FM_p6c5qLi6gD8Tem-88MA';
    const secondToken =        'pk.eyJ1Ijoiamlib25pdGEiLCJhIjoiY2pyYW1ydnUxMHJ2YjQ0bDh1cjllazQ4ayJ9.Yy7row2YHGvKUxrOgv-fgA';
    // L.tileLayer(`https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=${mapBoxToken}`, {
    //     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    //     maxZoom: 18,
    //     id: 'mapbox.streets',
    //     accessToken: 'your.mapbox.access.token'
    // }).addTo(map);
  }

  

  // L.Routing.control({
  //     waypoints: [
  //         L.latLng(57.74, 11.94),
  //         L.latLng(57.6792, 11.949)
  //     ]
  // }).addTo(map);

}
