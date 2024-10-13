import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { VariableSaludoService } from '../Services/variable-saludo.service'; 
import { StorageService } from '../Services/storage.service'; 
import { UserData } from '../models/user-data/user-data';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  correo: string = '';
  password: string = '';

  constructor(
    private toastController: ToastController, 
    private router: Router, 
    private services: VariableSaludoService, 
    private storageService: StorageService 
  ) {}

  async ngOnInit() {
    await this.storageService.init();
    const formateo = await this.storageService.get('correo_formateado');
    if (formateo) {
      this.correo = formateo;
      const data = await this.storageService.get(`user_data_${formateo}`);
      if (data) {
        this.correo = data.correo;
        this.password = data.password;
      }
    }
  }
  guardarDatos() {
    const userData = new UserData(this.correo, this.password);
    if (this.storageService) {
      this.storageService.set(`user_data_${this.correo}`, userData)
        .then(() => {
          console.log(`Datos guardados para la clave user_data_${this.correo}:`, userData);
        })
        .catch(error => {
          console.error('Error al guardar los datos del usuario:', error);
        });
    }
  }
  
  
  async guardarUsuarioCompleto() {
    try {
      const correoFormateado = this.correo.trim().split('@')[0];
      const userData = new UserData(this.correo, this.password);
      await this.storageService.set('correo_formateado', correoFormateado);
      await this.storageService.set(`user_data_${this.correo}`, userData);
    } catch (error) {
      console.log('Error al guardar los datos del usuario:', error);
    }
  }

  async mostrarError() {
    const error = await this.toastController.create({
      message: 'Verifica que tu contraseña sea válida o que tu correo sea de DUOC UC',
      duration: 3000,
      color: 'danger'
    });
    error.present();
  }

  async mostrarValidacion() {
    const validacion = await this.toastController.create({
      message: 'Correo y contraseña válidos, siga con su camino, ¡bienvenid@!',
      duration: 3000,
      color: 'success'
    });
    validacion.present();
  }

  verificarDatos() {
    const correoL = this.correo.trim().toLowerCase().replace(/\s+/g, "");
    const passwordL = this.password.trim().replace(/\s+/g, "");

    if (correoL.includes(".") && passwordL.length >= 4 && correoL.endsWith("@duocuc.cl")) {
      this.mostrarValidacion();
      this.guardarUsuarioCompleto();
      this.guardarDatos();
      this.router.navigate(['/principal']);
    } else {
      this.mostrarError();
    }
  }

  btnOlvido() {
    this.router.navigate(['/recuperar']);
  }

  btnRegistrarse() {
    this.router.navigate(['/registro']);
  }
}
