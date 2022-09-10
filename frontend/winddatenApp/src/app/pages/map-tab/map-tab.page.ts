import { Component, OnInit } from '@angular/core';
import * as Leaflet from 'leaflet';

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
    this.map = new Leaflet.Map('map').setView([49.84847790390487, 7.376896872850395], 8.7);

    Leaflet.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
      attribution: ''
    }).addTo(this.map);

  }

  ionViewWillLeave() {
    this.map.remove();
  }
}
