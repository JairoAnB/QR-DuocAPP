import { StudentsApiService } from './../../Services/students-api.service';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { VariableSaludoService } from '../../Services/variable-saludo.service'; 
import { StorageService } from '../../Services/storage.service'; 
import { UserData } from '../../models/user-data';
import { TeachersApiService } from 'src/app/Services/teachers-api.service';
import { TeachersData } from '../../models/teachers-data';
import { StudentsData } from '../../models/students-data';

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
    private storageService: StorageService,
    private studentsApiService: StudentsApiService,
    private teachersApiService: TeachersApiService
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
      localStorage.setItem('email', this.correo);
      localStorage.setItem('password', this.password);
      this.storageService.set(`user_data_${this.correo}`, userData)
      this.storageService.set(`user_data_${this.password}`, userData)
        .then(() => {
          console.log(`Datos guardados para la clave user_data_${this.correo}:`, userData);
          this.router.navigate(['/principal']);
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
      await this.storageService.set(`user_data_${this.password}`, userData);
    } catch (error) {
      console.log('Error al guardar los datos del usuario:', error);
    }
  }

  async mostrarError() {
    const error = await this.toastController.create({
      message: 'Correo o contraseña inválidos, intente nuevamente o contactate con soporte técnico.',
      duration: 3000,
      color: 'danger'
    });
    error.present();
  }

  async mostrarValidacion() {
    const validacion = await this.toastController.create({
      message: 'Bienvenido/a a registro de asistencia DuocUC',
      duration: 3000,
      color: 'success'
    });
    validacion.present();
  }

  validacionCredenciales() {
    // Verifica si el correo es de profesor
    if (this.correo.endsWith('@profesor.duoc.cl')) {
      this.teachersApiService.loginTeacher(this.correo, this.password).subscribe(
        (data: TeachersData[]) => {
          if (data.length > 0) {
            console.log('Profesor encontrado:', data);
            this.mostrarValidacion();
            this.guardarUsuarioCompleto();
            this.guardarDatos();
            this.router.navigate(['/principal']);
          } else {
            console.error('Profesor no encontrado');
            this.mostrarError();
          }
        },
        (error: any) => {
          console.error('Error en la solicitud:', error);
          this.mostrarError();
        }
      );
    } else if (this.correo.endsWith('@duocuc.cl')) {
      // Verifica si el correo es de estudiante
      this.studentsApiService.loginStudent(this.correo, this.password).subscribe(
        (data: StudentsData[]) => {
          if (data.length > 0) {
            console.log('Estudiante encontrado:', data);
            this.mostrarValidacion();
            this.guardarUsuarioCompleto();
            this.guardarDatos();
            this.router.navigate(['/principal']);
          } else {
            console.error('Estudiante no encontrado');
            this.mostrarError();
          }
        },
        (error: any) => {
          console.error('Error en la solicitud:', error);
          this.mostrarError();
        }
      );
    } else {
      // Si el correo no es válido para profesores ni estudiantes
      this.mostrarError();
    }
  }

  verificarDatos() {
    const correoL = this.correo.trim().toLowerCase().replace(/\s+/g, "");
    const passwordL = this.password.trim().replace(/\s+/g, "");

    if ((correoL.includes("@") && passwordL.length >= 4) || correoL.endsWith("@duocuc.cl") || correoL.endsWith("@profesor.duoc.cl")) {
      this.validacionCredenciales();
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
