import { Component, OnInit } from '@angular/core';
import {  Router} from '@angular/router';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-cambio-contrasena',
  templateUrl: './cambio-contrasena.page.html',
  styleUrls: ['./cambio-contrasena.page.scss'],
})
export class CambioContrasenaPage implements OnInit {
  contra1: string = '';
  contra2: string = '';

  constructor( private router: Router, private toastController : ToastController) { }
  
  ngOnInit() {
  }
  home(){
    this.router.navigate(['/home'])

  }
  btnCancelar(){
    this.home();
  }
  cambiarContraseña(){}

  async btnCambiar(){
    if(this.contra1 === this.contra2){
      const mensaje = await this.toastController.create({
        message: 'Se cambio su contraseña',
        duration: 2000,
        color: 'success',
        buttons: [
          {
            text: 'Aceptar',
            handler: () => {
              console.log('cambio correcto');
            }
          }
        ]
      });
      await mensaje.present();
    }else{
const mensaje2 = await this.toastController.create({
  message: 'Sus contraseñas no son iguales',
  duration:2000,
  color: 'danger'
});
await mensaje2.present();
  }
 }
}
