import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { TeachersApiService } from 'src/app/Services/teachers-api.service';
import { TeachersData, ClassData } from 'src/app/models/teachers-data';
import { AlertController, NavController } from '@ionic/angular';
import { StorageService } from 'src/app/Services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-asistencia',
  templateUrl: './teacher-asistencia.page.html',
  styleUrls: ['./teacher-asistencia.page.scss'],
})
export class TeacherAsistenciaPage implements OnInit {
  teacher: TeachersData | null = null;
  clases: ClassData[] = [];
  claseSeleccionada: ClassData | null = null;
  correo: string = '';
  horarioSeleccionado: string | null = null;
  hayHorarioDisponible: boolean = false;

  constructor(
    private teachersApiService: TeachersApiService,
    private storage: Storage,
    private alertController: AlertController,
    private storageService: StorageService,
    private router: Router,
    private navCtrl: NavController
  ) {}

  async ngOnInit() {
    try {
      await this.storageService.init();

      const formattedCorreo = await this.storageService.getCorreo();
      if (!formattedCorreo) {
        console.error('No se encontró un correo formateado en el almacenamiento.');
        return;
      }

      const correoCompleto = `${formattedCorreo}@profesor.duoc.cl`;
      const userData = await this.storage.get(`user_data_${correoCompleto}`);
      if (!userData) {
        console.error('No se encontraron datos de usuario en el almacenamiento.');
        return;
      }

      this.correo = userData.correo.split('@')[0];
      await this.cargarClases();
    } catch (error) {
      console.error('Error al inicializar TeacherAsistenciaPage:', error);
    }
  }

  async cargarClases() {
    try {
      if (!this.correo) return;

      const teacherData = await this.teachersApiService.getTeacher(this.correo).toPromise();
      if (Array.isArray(teacherData) && teacherData.length > 0) {
        this.teacher = teacherData[0];
        this.clases = this.teacher.clases || [];
      } else {
        console.warn('No se encontraron clases para este docente.');
      }
    } catch (error) {
      console.error('Error al cargar las clases:', error);
    }
  }

  onClaseChange() {
    console.log('Clase seleccionada:', this.claseSeleccionada);
  }

  generarQR() {
    console.log('Generar QR para:', this.claseSeleccionada, this.horarioSeleccionado);
    // Implementa la lógica para generar el código QR aquí.
  }

  logout() {
    localStorage.removeItem('email');
    this.navCtrl.navigateRoot('home');
  }
}
