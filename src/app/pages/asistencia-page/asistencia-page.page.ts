import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { StudentsApiService } from 'src/app/Services/students-api.service';
import { StudentsData, ClassData } from 'src/app/models/students-data';
import { AlertController } from '@ionic/angular';
import { StorageService } from 'src/app/Services/storage.service';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asistencia-page',
  templateUrl: './asistencia-page.page.html',
  styleUrls: ['./asistencia-page.page.scss'],
})
export class AsistenciaPagePage implements OnInit {
  student: StudentsData | null = null;
  clases: string[] = [];
  claseSeleccionada: ClassData | null = null;
  correo = '';
  horario: string[] = [];
  horarioSeleccionado: string | null = null;
  hayHorariosDisponibles: boolean = true;
  hayHorarioDisponible: boolean = false;
  desabilitarSelectClases: boolean = false;
  isSupported = false;
  barcodes: Barcode[] = [];
  constructor(
    private studentsApiService: StudentsApiService,
    private storage: Storage,
    private alertController: AlertController,
    private Storage: StorageService, private router: Router
  ) { }

 async  ngOnInit() {
      //scanner QR
      BarcodeScanner.isSupported().then((result)=>{
        this.isSupported = result.supported;
      })

      //recupero correo formateado del storage
      await this.Storage.init();
      const formattedCorreo = await this.Storage.getCorreo();
      if (formattedCorreo) {
        const correoCompleto = `${formattedCorreo}@duocuc.cl`;
        console.log(`Correo formateado recuperado: ${formattedCorreo}`);
        const userData = await this.storage.get(`user_data_${correoCompleto}`);
        if (userData) {
          this.correo = userData.correo.split('@')[0]; 
          console.log(`Correo del usuario: ${this.correo}`);
        } else {
          console.log('No se encontraron datos de usuario en el almacenamiento.');
        }
      } else {
        console.log('No se encontró un correo formateado en el almacenamiento.');
      }
      //recupero el correo del storage 
    const email = localStorage.getItem('email'); 
    console.log('Correo almacenado en localStorage:', email);
    if (email) {
      this.studentsApiService.getStudent(email).subscribe(
        (studentData) => {
          if (studentData.length > 0) { 
            this.student = studentData[0];
            console.log('Estudiante encontrado:', this.student);
            this.cargarClases();
          } else {
            console.log('No se encontró ningún estudiante con ese correo.');
          }
        },
        (error) => {
          console.error('Error al obtener los datos del estudiante:', error);
        }
      );
    }
  }

  cargarClases() {
    if (this.student && this.student.clases) {
      this.clases = this.student.clases.map(clase => clase.nombre);
      const horarios = this.student.clases.map(clase => clase.horarios);
    } else {
    }
  }

  async registrarAsistencia() {
    console.log('Clase seleccionada:', this.claseSeleccionada);
    const alert = await this.alertController.create({
      header: 'Asistencia registrada',
      message: `Has registrado asistencia para la clase ${this.claseSeleccionada?.nombre}`,
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            this.router.navigate(['/principal'])
          }
        }
      ]
    });
    await alert.present();
  }

  cambiarSelectedMode() {
    if (this.claseSeleccionada) {
      if (!this.claseSeleccionada.yaPaso) {
        this.hayHorariosDisponibles = true; 
        this.desabilitarSelectClases = true; 
      } else {
        this.hayHorariosDisponibles = false; 
        this.horarioSeleccionado = null; 
        this.desabilitarSelectClases = false; 
      }
    } else {
      this.hayHorariosDisponibles = false; 
      this.desabilitarSelectClases = false; 
    }
  
    this.hayHorario(); 
  }
  
  hayHorario() {
    this.hayHorarioDisponible = !!this.horarioSeleccionado;
  }
  
  //modulo para leer qr

  async scan(): Promise<void>{
    const granted = await this.requestPermission();
    if(!granted){
      this.presentAlert();
      return;
    }
    const {barcodes} = await BarcodeScanner.scan();
    this.barcodes.push(...barcodes);
    console.log('scaneando....')
    return this.registrarAsistencia();
  }

  async requestPermission(): Promise<boolean>{
    const {camera} = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void>{
    const alert = await this.alertController.create({
      header: 'Permisos denegados',
      message: 'Por favor acepta los permisos de la camara para usar el escaner QR',
      buttons: ['Aceptar']
    });
    await alert.present();
  }



}
