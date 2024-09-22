import { ServiceAlertServiceService } from './../service-alert-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  constructor(private alertController: AlertController, private router: Router, private ServiceAlertServiceService: ServiceAlertServiceService ) { }

  ngOnInit() {
  }

  alertaError() {
    this.ServiceAlertServiceService.alerta();
  }

  regresarHome() {
    this.ServiceAlertServiceService.regresarHome();
  }
  funcionNoValida() {
    this.alertaError();
    this.regresarHome();
  }
}
