import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  async getCoordinates() {
    return await (await Geolocation.getCurrentPosition()).coords;
  }
}
