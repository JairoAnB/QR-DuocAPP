import { Storage } from '@ionic/storage-angular';
import { StudentsApiService } from './../../Services/students-api.service';
import { Component, OnInit } from '@angular/core';
import { StudentsData } from 'src/app/models/students-data';
import { AlertController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular'; // Asegúrate de que esta importación sea correcta

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  student: StudentsData | null = null;
  editMode = false;

  constructor(
    private studentsApiService: StudentsApiService,
    private storage: Storage,
    private alertController: AlertController,
    private router: Router,
    private navCtrl: NavController // Corrige la inyección aquí
  ) {}

  ngOnInit() {
    const email = localStorage.getItem('email');
    console.log('Correo almacenado en localStorage:', email);
    if (email) {
      this.studentsApiService.getStudent(email).subscribe(
        (studentData) => {
          if (studentData.length > 0) {
            this.student = studentData[0];
            console.log('Estudiante encontrado:', this.student);
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

  async alertaCambios() {
    const alert = await this.alertController.create({
      header: 'Precaución',
      message: '¿Desea guardar los cambios?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.cambiarEditMode();
          },
        },
        {
          text: 'Guardar',
          handler: () => {
            this.guardarPerfil();
          },
        },
      ],
    });
    await alert.present();
  }

  async permission() {
    const result = await Camera.requestPermissions();
    if (result) {
      console.log('Permiso concedido');
    }
  }

  async takePicture() {
    await this.permission();
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos,
    });

    if (image) {
      console.log('Imagen obtenida: ' + image);
      if (this.student) {
        this.student!.picture = image.webPath!;
      }
    }
  }

  async alertaCambiosRealizados() {
    const alertCambios = await this.alertController.create({
      header: 'Cambios realizados',
      message: 'Los cambios se han realizado con éxito',
      buttons: ['OK'],
    });
    await alertCambios.present();
  }

  async alertaCambiosNoRealizados() {
    const alertError = await this.alertController.create({
      header: 'Alerta',
      message: 'Los cambios no se han realizado con éxito',
      buttons: ['OK'],
    });
    await alertError.present();
  }

  guardarPerfil() {
    if (this.student != null) {
      this.studentsApiService.actualizarStudent(this.student).subscribe(
        (studentData) => {
          console.log('Estudiante actualizado:', studentData);
          this.alertaCambiosRealizados();
          this.cambiarEditMode();
        },
        (error) => {
          console.error('Error al actualizar el estudiante:', error);
          this.alertaCambiosNoRealizados();
        }
      );
    }
  }

  cambiarEditMode() {
    this.editMode = !this.editMode;
    this.router.navigate(['/profile']);
  }

  guardarProfile() {
    this.editMode = false;
  }


  logout() {
    localStorage.removeItem('email');
    this.navCtrl.navigateRoot('home');
  }
}
