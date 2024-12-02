import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { StorageService } from 'src/app/Services/storage.service';
import { StudentsApiService } from 'src/app/Services/students-api.service';
import { StudentsData } from 'src/app/models/students-data';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {
  recuperacionCorreo: string = '';
  contra1: string = '';
  contra2: string = '';
  estudiante: StudentsData | null = null; 
  passwordChangeEnabled: boolean = false; 

  constructor(
    private toastController: ToastController, 
    private router: Router,  
    private storageService: StorageService,
    private StudentsApiService: StudentsApiService,
    private alercontroller: AlertController
  ) {}

  async ngOnInit() {
    await this.storageService.init();
  }

  validacionCredenciales() {
    if (this.recuperacionCorreo === '') {
      this.denegarVacio();
      return;
    }
    this.StudentsApiService.getStudents(this.recuperacionCorreo).subscribe(
      (data) => {
        if (data) {
          this.estudiante = data; 
          this.passwordChangeEnabled = true; 
        } else {
          this.denegar();
        }
      },
      (error) => console.error('Error al buscar el estudiante:', error)
    );
  }



  async denegar() {
    const mensaje = await this.alercontroller.create({
      header: 'ATENCIÓN',
      message: 'El correo ingresado no se encuentra registrado, ingresa un correo válido, o habla con el soporte',
      buttons: [{ text: 'Aceptar' }]
    });
    await mensaje.present();
  }
  async denegarVacio() {
    const mensaje = await this.alercontroller.create({
      header: 'ATENCIÓN',
      message: 'No puedes dejar el campo vacío. Ingresa un correo válido.',
      buttons: [{ text: 'Aceptar' }]
    });
    await mensaje.present();
  }

  cambiarContrasena() {
    if (this.contra1 === this.contra2 && this.estudiante) {
      this.estudiante.password = this.contra1;
      this.StudentsApiService.updateStudent(this.estudiante).then(
        async () => {
          const mensajeToast = await this.toastController.create({
            message: 'Contraseña actualizada correctamente.',
            duration: 2000,
            color: 'success'
          });
          mensajeToast.present();
          this.router.navigate(['/home']); 
        },
        async (error) => {
          const mensaje = await this.toastController.create({
            message: 'Error al actualizar la contraseña.',
            duration: 2000,
            color: 'danger'
          });
          mensaje.present();
          console.error('Error en la actualización:', error);
        }
      );
    } else {
      this.mostrarErrorContrasenas();
    }
  }

  async mostrarErrorContrasenas() {
    const mensaje = await this.alercontroller.create({
      header: 'Error',
      message: 'Las contraseñas no coinciden. Inténtalo de nuevo.',
      buttons: [{ text: 'Aceptar' }]
    });
    await mensaje.present();
  }
  async btnCancelar() {
    const vueltaAlHome = await this.alercontroller.create({
      message: 'Regresando al inicio',
    });
    await vueltaAlHome.present();
    this.envioAlHome();
  }

  envioAlHome() {
    this.router.navigate(['/home']);
}
}
