import { Component } from '@angular/core';
import * as Leaflet from 'leaflet';
import 'leaflet.heat';
import { GeolocationService } from 'src/app/services/geolocation/geolocation.service';
import { WindparkService } from 'src/app/services/windpark/windpark.service';
import { Windpark } from 'src/app/models/windpark/windpark';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-map-tab',
  templateUrl: './map-tab.page.html',
  styleUrls: ['./map-tab.page.scss'],
})
export class MapTabPage {
  map: Leaflet.Map;
  heatMap;
  windparks: Windpark[];
  // Used to prevent Memory Leaks
  private ngUnsubscribe: Subject<boolean> = new Subject<boolean>();

  constructor(private geolocationService: GeolocationService, private windparkService: WindparkService) {}

  // Inits Map when Page gets opened
  ionViewDidEnter(): void {
    this.initMap();
  }

  initMap(): void {
    // Instantiate new Map with RLP in View
    this.map = new Leaflet.Map('map').setView([49.84847790390487, 7.376896872850395], 8.8);

    // Add OpenStreetMap as a Layer
    Leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
    // Get User Coordinates and add a Marker to the Map
    this.geolocationService.getCoordinates()
    .then((coordinates) => {
      // customize icon
      const icon = Leaflet.icon({
        iconUrl: 'assets/marker-icon-2x.png',
        iconSize: [15, 24],
        riseOnHover: true
      });
      this.addMarker([coordinates.latitude, coordinates.longitude], { icon }, "This is you");
    });

    // Get all Windparks and render them
    this.windparkService.getWindparks()
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((windparks: Windpark[]) => {
      this.windparks = windparks;
      this.renderWindparks(windparks);
    })
  }

  removeHeatmap() {
    this.map.removeLayer(this.heatMap);
  }

  addHeatmap() {
    let values = this.windparks.map((windpark: Windpark) => [windpark.latitude, windpark.longitude, windpark.currentPerformance]);
    this.heatMap = Leaflet.heatLayer(values, { radius: 50, blur: 50 }).addTo(this.map);
  }

  toggleChange(event) {
    console.log(event.detail);
    if(event.detail.checked) {
      this.addHeatmap();
    } else {
      this.removeHeatmap();
    }
  }


  // Adds a Marker to the Map
  private addMarker(coordinates: number[], options?: Object, popupText?: string): void {
    Leaflet.marker(coordinates, options).addTo(this.map).bindPopup(popupText, { options: { autoPan: true, autoClose: true, closeButton: true} });
  }

  private renderWindparks(windparks: Windpark[]): void {
    const icon = Leaflet.icon({
      iconUrl: 'assets/windrad.png',
      iconSize: [35, 40],
      riseOnHover: true,
    });
    // Add Each windpark to the map as Marker
    windparks.forEach((windpark: Windpark) => {
      this.addMarker([windpark.latitude, windpark.longitude], { icon }, this.createPopupText(windpark.name, windpark.currentPerformance, windpark.id));
    });
  }

  private createPopupText(name: string, currentPerformance: number, id: number): string {
    if(currentPerformance) {
      return `${name} <br>Aktuelles Erzeugnis: ${currentPerformance} kW/h<br><a href='/details/${id}'>Details >>></a>`
    }
    return `${name} <br><a href='/details/${id}'>Details >>></a>`
  }

  // Destroy Map when leaving Page and unsubscribe all Observables
  ionViewWillLeave(): void {
    this.map.remove();
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}