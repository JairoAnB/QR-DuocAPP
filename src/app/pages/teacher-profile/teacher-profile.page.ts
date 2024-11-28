import { Storage } from '@ionic/storage-angular';
import { TeachersApiService } from 'src/app/Services/teachers-api.service';
import { Component, OnInit } from '@angular/core';
import { TeachersData } from 'src/app/models/teachers-data';
import { AlertController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular'; 
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.page.html',
  styleUrls: ['./teacher-profile.page.scss'],
})
export class TeacherProfilePage implements OnInit {
  teacher: TeachersData | null = null;
  originalTeacher: TeachersData | null = null;
  editMode = false;

  constructor(
    private teacherApiService: TeachersApiService,
    private storage: Storage,
    private alertController: AlertController,
    private router: Router,
    private navCtrl: NavController 
  ) {}

  ngOnInit() {
    const email = localStorage.getItem('email');
    console.log('Correo almacenado en localStorage:', email);
    if (email) {
      this.teacherApiService.getTeacher(email).subscribe(
        (teacherData) => {
          if (teacherData && Array.isArray(teacherData) && teacherData.length > 0) {
            // Aquí asumimos que la respuesta es un array y tomamos el primer elemento.
            this.originalTeacher = { ...teacherData[0] };  // Accedemos al primer elemento
            this.teacher = teacherData[0];  // Asignamos el primer docente a teacher
            console.log('Docente encontrado:', this.teacher);
          } else {
            console.log('No se encontró ningún docente con ese correo.');
          }
        },
        (error) => {
          console.error('Error al obtener los datos del docente:', error);
        }
      );
    } else {
      console.log('No hay correo almacenado en localStorage.');
    }
  }

  // Verifica si hay cambios en los datos del perfil
  hasChanges(): boolean {
    return JSON.stringify(this.teacher) !== JSON.stringify(this.originalTeacher);
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
          if (this.teacher) {
            this.teacher.picture = image.webPath!;  // Asegúrate de que 'picture' esté definido en tu modelo
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
            if (this.teacher) {
              this.teacher.picture = imageUrl;
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
    if (this.teacher != null) {
      this.teacherApiService.updateTeacher(this.teacher).then(
        (teacherData) => {
          console.log('Docente actualizado:', teacherData);
          this.cambiarEditMode();
        }
      ).catch(
        (error) => {
          console.error('Error al actualizar el docente:', error);
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
      this.teacher = { ...this.originalTeacher }; 
    } else {
      this.editMode = true;  
    }
  }

  logout() {
    localStorage.removeItem('email');
    this.navCtrl.navigateRoot('home');
  }
}
