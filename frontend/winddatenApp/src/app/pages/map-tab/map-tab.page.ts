import { Component, OnInit } from '@angular/core';
import * as Leaflet from 'leaflet';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-map-tab',
  templateUrl: './map-tab.page.html',
  styleUrls: ['./map-tab.page.scss'],
})
export class MapTabPage {
  map: Leaflet.Map;

  ionViewDidEnter() {
    this.initMap();
  }

  initMap() {
    // Instantiate new Map with RLP in View
    this.map = new Leaflet.Map('map').setView([49.84847790390487, 7.376896872850395], 8.8);

    // Add OpenStreetMap as a Layer
    Leaflet.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png').addTo(this.map);
  
    // Get User Coordinates and add a Marker to the Map
    this.getCoordinates()
    .then((coordinates) => {
      const icon = Leaflet.icon({
        iconUrl: 'assets/marker-icon-2x.png',
        iconSize: [15, 24],
        riseOnHover: true
      });
      this.addMarker([coordinates.latitude, coordinates.longitude], { icon });
    })
  }


  // Adds a Marker to the Map
  private addMarker(coordinates: number[], options?: Object) {
    Leaflet.marker(coordinates, options).addTo(this.map);
  }

  // Returns Coordinates of Device
  private async getCoordinates() {
    return await (await Geolocation.getCurrentPosition()).coords;
  }

  ionViewWillLeave() {
    this.map.remove();
  }
}
