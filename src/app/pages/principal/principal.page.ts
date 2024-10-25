import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { WeatherService } from 'src/app/Services/weather.service';
import { StorageService } from 'src/app/Services/storage.service';
import { ServiceAlertServiceService } from 'src/app/Services/service-alert-service.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})

export class PrincipalPage implements OnInit {
  correo: string = "";
  weatherData: any;
  weatherIcon: string = "";
  showDetails: boolean = false;

  constructor(
    private weatherservice: WeatherService,
    private alertController: AlertController,
    private router: Router,
    private storage: StorageService,
    private serviceAlert: ServiceAlertServiceService
  ) {}

  async ngOnInit() {
    console.log('Inicializando almacenamiento...');
    await this.storage.init();
    const formattedCorreo = await this.storage.getCorreo();
    if (formattedCorreo) {
      const correoCompleto = `${formattedCorreo}@duocuc.cl`;
      console.log(`Correo formateado recuperado: ${formattedCorreo}`);
      const userData = await this.storage.get(`user_data_${correoCompleto}`);
      if (userData) {
        this.correo = userData.correo.split('@')[0];
        console.log(`Correo del usuario: ${this.correo}`);
      } else {
        console.log('No se encontraron datos de usuario en el almacenamiento.');
      }
    } else {
      console.log('No se encontró un correo formateado en el almacenamiento.');
    }
    this.getLocation(); 
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        this.getWeatherByCoordinates(lat, lon);
      });
    } else {
      console.error("Geolocation no está soportado por este navegador.");
    }
  }

  getWeatherByCoordinates(lat: number, lon: number) {
    this.weatherservice.getWeatherByCoordinates(lat, lon).subscribe(
      data => {
        this.weatherData = data;
        this.weatherIcon = this.weatherData.weather[0].icon;
        console.log(this.weatherData);
      },
      error => {
        console.error('Error al obtener los datos del clima', error);
      }
    );
  }

  toggleDetails() { 
    this.showDetails = !this.showDetails;
  }
  traductor(description: string):string{
    const translations: { [key: string]: string} ={
        "clear sky": "Cielo despejado",
        "few clouds": "Pocas nubes",
        "scattered clouds": "Nubes dispersas",
        "broken clouds": "Nubes rotas",
        "shower rain": "Chubascos",
        "rain": "lluvia",
        "thunderstorm": "Tormenta",
        "snow": "Nieve",
        "mist": "Neblina"
    };
    return translations[description] || description; 
  }

  alertaError() {
    this.serviceAlert.alerta();
  }

  regresarHome() {
    this.serviceAlert.regresarHome();
  }

  funcionNoValida() {
    this.alertaError();
    this.regresarHome();
  }
}