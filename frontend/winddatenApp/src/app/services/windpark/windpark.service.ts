import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Windpark, WindparkDetails } from 'src/app/models/windpark/windpark';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WindparkService {

  private apiUrl = environment.backendUrl;

  constructor(private http: HttpClient) { }

  public getWindparks(): Observable<Windpark[]> {
    return this.http.get<Windpark[]>(`${this.apiUrl}/anlagen`);
  }

  public getWindpark(id: number): Observable<WindparkDetails> {
    return this.http.get<WindparkDetails>(`${this.apiUrl}/anlagen/${id}`)
  }
}
