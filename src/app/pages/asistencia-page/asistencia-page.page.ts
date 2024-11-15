import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { StudentsApiService } from 'src/app/Services/students-api.service';
import { StudentsData, ClassData } from 'src/app/models/students-data';
import { AlertController, isPlatform, NavController } from '@ionic/angular';
import { StorageService } from 'src/app/Services/storage.service';
import { CapacitorBarcodeScanner, CapacitorBarcodeScannerTypeHint, CapacitorBarcodeScannerTypeHintALLOption } from '@capacitor/barcode-scanner';
import { Geolocation } from '@capacitor/geolocation';
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
  result = '';
  NoDisponible: boolean = false;
  universidadLatitud: number = -33.4999912338583;
  universidadLongitud: number = -70.6160540863554;
  radio: number = 100;
  estaEnSede: boolean = false;

  constructor(
    private studentsApiService: StudentsApiService,
    private storage: Storage,
    private alertController: AlertController,
    private Storage: StorageService,
    private router: Router,
    private navCtrl: NavController,
    private geolocation: Geolocation
  ) { }
  
  async ngOnInit() {

    // Recupero correo formateado del storage
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

    // Recupero el correo del storage
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
    this.obtenerUbicacion();
  }


  ionViewWillEnter(){
    this.clasesTerminadas();
  }
  reloadPage() {
    this.router.navigateByUrl('/asistencia-page', { skipLocationChange: true }).then(() => {
      this.router.navigate([this.router.url]);
    });}

  clasesTerminadas(){
    let clasesTerminadas = this.student?.clases?.every(clase => clase.asistio) || false;
    if(clasesTerminadas){
      this.NoDisponible = true;
      this.reloadPage();
    }else{
      this.NoDisponible = false;
    }
  }


  cargarClases() {
    if (this.student && this.student.clases) {
      this.clases = this.student.clases.map(clase => clase.nombre);
    } else {
      console.log('No hay clases disponibles.');
    }
  }

  async registrarAsistencia() {
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
  async DenegarAsistencia() {
    const alert = await this.alertController.create({
      header: 'Error al registrar la asistencia',
      message: `Ha ocurrido un error al intentar registrar la asistencia.`,
      buttons: ['Aceptar']
    });
    await alert.present();
  }

  cambiarSelectedMode() {
    if (this.claseSeleccionada) {
      if(!this.claseSeleccionada.asistio){
        this.desabilitarSelectClases = true;
      }
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

  async obtenerUbicacion() {

    try {
      if (isPlatform('hybrid')) {
        await Geolocation.requestPermissions();

        //Obtengo la posicion actual
        const position = await Geolocation.getCurrentPosition();
        const latitud = position.coords.latitude;
        const longitud = position.coords.longitude;
  
        console.log('Ubicación actual:', latitud, longitud);
      } else {
        navigator.geolocation.getCurrentPosition((position => {
          const latitud = position.coords.latitude;
          const longitud = position.coords.longitude;
          console.log('Ubicación actual:', latitud, longitud);
        }))
      }
    } catch (error) {
      console.error('Error obteniendo la ubicación', error);
    }
  }




  // Módulo para leer QR
  async scan(): Promise<void> {
    const result = await CapacitorBarcodeScanner.scanBarcode({
        hint: CapacitorBarcodeScannerTypeHint.ALL
    });
    this.result = result.ScanResult;

    // Evaluar los datos del JSON entregado por el QR
    let data;
    try {
        data = JSON.parse(this.result);
    } catch (e) {
        console.error("Error al parsear el JSON del QR:", e);
        return;
    }

    // Evaluar si el alumno se encuentra en la sede
    
    // Evaluar si el QR corresponde a la clase seleccionada
    if (data.id === this.student?.id &&
        data.nombre === this.claseSeleccionada?.nombre &&
        data.horario === this.horarioSeleccionado &&
        data.classId === this.claseSeleccionada?.classId) {

        try {
            if (this.student && this.student.clases) {
                const claseEncontrada = this.student.clases.find(clase => clase.classId === data.classId);
                
                if (claseEncontrada) {
                    claseEncontrada.asistio = true; 
                    const response = await this.studentsApiService.actualizarStudent(this.student!).toPromise();

                    if (this.claseSeleccionada) {
                        this.claseSeleccionada.asistio = true;
                        this.registrarAsistencia();
                        this.clasesTerminadas();
                    }
                }
            }
        } catch (error) {
            this.DenegarAsistencia();
        }
    } else {
        this.DenegarAsistencia();
    }
}


  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permisos denegados',
      message: 'Por favor acepta los permisos de la cámara para usar el escáner QR',
      buttons: ['Aceptar']
    });
    await alert.present();
  }

  logout() {
    localStorage.removeItem('email');
    this.navCtrl.navigateRoot('home');
  }



  
}
