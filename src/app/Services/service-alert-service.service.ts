import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ServiceAlertServiceService {

  constructor(private alertController: AlertController, private router: Router) { }
  

  async alerta() {
    const alert = await this.alertController.create({
      header: 'Coming Soon',
      message: 'Esta funcion aun esta en desarrollo, lamentamos las molestias.',
      buttons: ['OK']
    });
    await alert.present();
  }
  regresarHome() {
    this.router.navigate(['/principal']);
  }

}
