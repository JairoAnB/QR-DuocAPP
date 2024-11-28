import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ServiceAlertServiceService } from './../../Services/service-alert-service.service';

@Component({
  selector: 'app-soporte',
  templateUrl: './soporte.page.html',
  styleUrls: ['./soporte.page.scss'],
})
export class SoportePage implements OnInit {

  constructor(
    private navCtrl: NavController, // Añadido NavController
    private serviceAlert: ServiceAlertServiceService // Usar un nombre más corto
  ) { }

  ngOnInit() {
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

  logout() {
    localStorage.removeItem('email');
    this.navCtrl.navigateRoot('home'); 
  }
}
