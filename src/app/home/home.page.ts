import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { VariableSaludoService } from '../Services/variable-saludo.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
correo: string ='';
password: string ='';

  constructor(private toastController: ToastController, private router: Router, private services:VariableSaludoService ) {}

  guardarCorreo() {
    const correo = this.correo.trim();
    const formateo = correo.split('@')[0];
    this.services.setCorreo(formateo);

  }  
  async mostrarError(){
    const error= await this.toastController.create({
      message: 'Verifica que tu contraseña sea valida o que tu correo sea de DUOC UC',
      duration: 3000,
      color: 'danger'
    });
    error.present();
  }
  async mostrarValidacion(){
    const validacion= await this.toastController.create({
      message: 'Correo y contraseña validos, siga con su camino, bienvenid@!',
      duration: 3000,
      color: 'success'
    });
    validacion.present();
  }

  verificarDatos(){
    const correoL = this.correo.trim().toLowerCase().replace(/\s+/g, "");
    const passwordL = this.password.trim().toLowerCase().replace(/\s+/g, "");
    if(correoL.includes("@duocuc") && passwordL.length >= 6){
      this.mostrarValidacion();
      this.guardarCorreo();
      this.router.navigate(['/principal'])
    }else{
      this.mostrarError();
    }
  }
 btnOlvido(){
   this.router.navigate(['/recuperar'])
   console.log('apretado');
 }
  btnRegistrarse(){
    this.router.navigate(['/registro'])
  }

}
