import { Storage } from '@ionic/storage-angular';
import { StudentsApiService } from './../../Services/students-api.service';
import { Component, OnInit } from '@angular/core';
import { StudentsData } from 'src/app/models/students-data';
import { AlertController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular'; 
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  student: StudentsData | null = null;
  originalStudent: StudentsData | null = null;
  editMode = false;

  constructor(
    private studentsApiService: StudentsApiService,
    private storage: Storage,
    private alertController: AlertController,
    private router: Router,
    private navCtrl: NavController 
  ) {}

  ngOnInit() {
    const email = localStorage.getItem('email');
    console.log('Correo almacenado en localStorage:', email);
    if (email) {
      this.studentsApiService.getStudents(email).subscribe(
        (studentData) => {
          if (studentData) {
            this.student = studentData;
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

  // Verifica si hay cambios en los datos del perfil
  hasChanges(): boolean {
    return JSON.stringify(this.student) !== JSON.stringify(this.originalStudent);
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

  // Selecciona la imagen de perfil desde el PC o la cámara
  async selectProfilePicture() {
    try {
      if (Capacitor.isNativePlatform()) {
        const image = await Camera.getPhoto({
          quality: 90,
          allowEditing: true,
          resultType: CameraResultType.Uri,
          source: CameraSource.Photos, 
        });
  
        if (image && image.webPath) {
          if (this.student) {
            this.student.picture = image.webPath!;
          }
        }
      } else {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';  
        input.onchange = async (event: any) => {
          const file = event.target.files[0]; 
          if (file) {
            const imageUrl = URL.createObjectURL(file); 
            if (this.student) {
              this.student.picture = imageUrl;
            }
          }
        };
        input.click();  
      }
    } catch (error) {
      console.error('Error', error);
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
      message: 'Ha ocurrido un problema al actualizar. Inténtalo de nuevo',
      buttons: ['OK'],
    });
    await alertError.present();
  }
  async alertaNoCambios() {
    const alertError = await this.alertController.create({
      header: 'Alerta',
      message: 'Necesitas hacer cambios para guardar',
      buttons: ['OK'],
    });
    await alertError.present();
  }

  guardarPerfil() {
    if (this.student != null) {
      this.studentsApiService.updateStudent(this.student.id).subscribe(
        (studentData) => {
          console.log('Estudiante actualizado:', studentData);
          this.alertaCambiosRealizados();
          this.editMode = false;
        },
        (error) => {
          console.error('Error al actualizar el estudiante:', error);
          this.alertaCambiosNoRealizados();
        }
      );
    } else {
      this.alertaNoCambios();
      this.editMode = true;

    }
  }

  cambiarEditMode() {
    if (this.editMode) {
      this.editMode = false; 
      this.student = { ...this.originalStudent }; 
    } else {
      this.editMode = true;  
    }
  }

  logout() {
    localStorage.removeItem('email');
    this.navCtrl.navigateRoot('home');
  }
}
