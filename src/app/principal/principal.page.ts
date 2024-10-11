import { ServiceAlertServiceService } from '../Services/service-alert-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { VariableSaludoService } from '../Services/variable-saludo.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  correo: string = "";
  constructor(private alertController: AlertController, private router: Router, private ServiceAlertServiceService: ServiceAlertServiceService, 
    private Services: VariableSaludoService ) { }

  ngOnInit() {
    this.correo = this.Services.getCorreo();
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
