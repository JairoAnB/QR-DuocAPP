import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ServiceAlertServiceService } from 'src/app/Services/service-alert-service.service';
import { StorageService } from 'src/app/Services/storage.service';
import { WeatherService } from 'src/app/Services/weather.service';

 
@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  correo: string = "";
  weatherData: any;
  
  constructor(
    private weatherservice : WeatherService,
    private alertController: AlertController,
    private router: Router,
    private serviceAlert: ServiceAlertServiceService, 
    private storage: StorageService
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
      this.getWeather('Santiago', 'cl');
  }

  getWeather(cityName: string, countryCode: string){
    this.weatherservice.getWeather(cityName , countryCode).subscribe( data => {
      this.weatherData = data;
      console.log(this.weatherData)
    },
    error => {console.error('Error al obtener los datos del clima', error);

    }
  );
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