import { ServiceAlertServiceService } from './../service-alert-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-soporte',
  templateUrl: './soporte.page.html',
  styleUrls: ['./soporte.page.scss'],
})
export class SoportePage implements OnInit {

  constructor(private ServiceAlertServiceService: ServiceAlertServiceService) { }

  ngOnInit() {
  }

  alertaError() { 
    this.ServiceAlertServiceService.alerta();
  }
}
