import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { StudentsData } from 'src/app/models/students-data';
import { StorageService } from 'src/app/Services/storage.service';
import { StudentsApiService } from 'src/app/Services/students-api.service';

@Component({
  selector: 'app-cambio-contrasena',
  templateUrl: './cambio-contrasena.page.html',
  styleUrls: ['./cambio-contrasena.page.scss'],
})
export class CambioContrasenaPage implements OnInit {
  contra1: string = '';
  contra2: string = '';
  student: StudentsData | null = null;

  constructor(private router: Router, private toastController: ToastController, private storage: StorageService, private students:StudentsApiService ) {}

  ngOnInit() {
    const email = localStorage.getItem('email');
    console.log('Correo almacenado en localStorage:', email);
    if (email) {
      this.students.getStudent(email).subscribe(
        (studentData) => {
          if (studentData.length > 0) {
            this.student = studentData[0];
            console.log('Estudiante encontrado:', this.students);
          } else {
            console.log('No se encontró ningún estudiante con ese correo.');
          }
        },
        (error) => {
          console.error('Error al obtener los datos del estudiante:', error);
        }
      );
    } else {
      console.log('No hay correo almacenado en localStorage.');
    }

  }

  home() {
    this.router.navigate(['/home']);
  }

  btnCancelar() {
    this.home();
  }

  async cambiar() {
    const mensaje = await this.toastController.create({
      message: 'Se cambió su contraseña',
      duration: 2000,
      color: 'success',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            console.log('Cambio correcto');
          }
        }
      ]
    });
    await mensaje.present();
  }

  async cambiarDenegado() {
    const mensaje2 = await this.toastController.create({
      message: 'Error al cambiar su contraseña, deben ser iguales',
      duration: 2000,
      color: 'danger',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            console.log('Error al cambiar contraseña');
          }
        }
      ]
    });
    await mensaje2.present();
  }

  btnCambiar() {
    if (this.contra1 === this.contra2) {
      this.cambiar();
      this.router.navigate(['/home']);
    } else {
      this.cambiarDenegado();
    }
  }
}
