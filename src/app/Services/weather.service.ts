
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs'; 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  URI: string = '';
  apiKey: String = 'd1bb71ed1150e258dace9a340aae1baf';

  constructor( private httpClient : HttpClient) {
    this.URI = 'https://api.openweathermap.org/data/2.5/weather';
   }
   getWeather(cityName: string, countryCode: string): Observable<any> {
    const url = `${this.URI}?q=${cityName},${countryCode}&appid=${this.apiKey}&units=metric`;
    return this.httpClient.get(url);
   }
}