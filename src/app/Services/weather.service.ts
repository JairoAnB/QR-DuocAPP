import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  URI: string = '';

  constructor( private httpClient : HttpClient) {
    this.URI = 'https://api.openweathermap.org/data/2.5/weather?q=Santiago,cl&appid=54ba61327fb06e2e60425c909f531ef6'
   }
   getWeather(){
    return this.httpClient.get(this.URI)
   }
}
