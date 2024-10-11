import { ServiceAlertServiceService } from '../Services/service-alert-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { StorageService } from '../Services/storage.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  correo: string = "";

  constructor(
    private alertController: AlertController,
    private router: Router,
    private serviceAlert: ServiceAlertServiceService, 
    private storage: StorageService
  ) {}

  async ngOnInit() {
    const formattedCorreo = await this.storage.getCorreo();

    if (formattedCorreo) {
      const userData = await this.storage.get(`user_data_${formattedCorreo}`);
      
      if (userData) {
        this.correo = userData.correo; 
      } else {
        console.log('No se encontraron datos de usuario en el almacenamiento.');
      }
    } else {
      console.log('No se encontró un correo formateado en el almacenamiento.');
    }
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
