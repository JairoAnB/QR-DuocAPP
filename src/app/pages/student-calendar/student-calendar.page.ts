import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { ClassData, StudentsData } from 'src/app/models/students-data';
import { ServiceAlertServiceService } from 'src/app/Services/service-alert-service.service';
import { StorageService } from 'src/app/Services/storage.service';
import { StudentsApiService } from 'src/app/Services/students-api.service';

@Component({
  selector: 'app-student-calendar',
  templateUrl: './student-calendar.page.html',
  styleUrls: ['./student-calendar.page.scss'],
})
export class StudentCalendarPage implements OnInit {

  constructor(
    private alertController: AlertController,
    private router: Router,
    private storage: StorageService,
    private serviceAlert: ServiceAlertServiceService,
    private navCtrl: NavController,
    private Students: StudentsApiService
  ) { }
  correo: string = "";
  diaSeleccionado: string = "";
  student: StudentsData | null = null;
  clases: ClassData[] = [];
  clasesFiltradas: any[] = [];
  async ngOnInit() {
    await this.storage.init();
    const formattedCorreo = await this.storage.getCorreo();
    if (formattedCorreo) {
      const correoCompleto = `${formattedCorreo}@duocuc.cl`;
      const userData = await this.storage.get(`user_data_${correoCompleto}`);
      if (userData) {
        this.correo = userData.correo.split('@')[0];
      } else {
        console.log('No se encontraron datos de usuario en el almacenamiento.');
      }
    } else {
      console.log('No se encontró un correo formateado en el almacenamiento.');
    }
    const email = localStorage.getItem('email');
    console.log('Correo almacenado en localStorage:', email);
    if (email) {
      this.Students.getStudents(email).subscribe(
        (studentData) => {
          if (studentData) {
            this.student = studentData;
            console.log('Estudiante encontrado:', this.student);

            this.Students.getClasses(this.student.id!).subscribe(
              (classData: ClassData[]) => { 
                this.clases = classData;
                console.log('Clases encontradas:', this.clases);
              }
            )
          } else {
            console.log('No se encontró ningún estudiante con ese correo.');
          }
        },
        (error) => {
          console.error('Error al obtener los datos del estudiante:', error);
        }
      );
    }
    const fechaactual = new Date();
    this.diaSeleccionado = fechaactual.toISOString();
  }

//Funcion para activar el evento al seleccionar alguna fecha
  cambioCalendario(event: any) {
    //Obtengo la fecha seleccionada y la guardo en una constante
    const selectedDate = new Date(event.detail.value);
    //Formateo el dia de la semana, agarrando la constante anterior y la formeateo al idioma español, chile.
    const diaSemana = selectedDate.toLocaleDateString('es-CL', { weekday: 'long' });

    const studentID = this.student?.id;

    if (studentID) {
      this.Students.getClassesByDay(studentID, diaSemana).subscribe(
        (clases: ClassData[]) => {
          this.clasesFiltradas = clases;
        }
      )
    }

  }

  //Filtro la clase por dia
  filtrarClasesPorDia(dia: string) {
    this.diaSeleccionado = dia;
    this.clasesFiltradas = this.clases.filter((clase) => 
      clase.dia.includes(dia)
    )
  }
  //selecciono el dia de la semana formateado
  selectedDay(dia: string) {
    this.diaSeleccionado = dia;
    
    // Obtengo el ID del estudiante
    const studentID = this.student?.id;
    //Si hay un id valido, obtengo las clases del dia seleccionado, por medio del consumo del servicio
    if (studentID) {
      this.Students.getClassesByDay(studentID, dia).subscribe(
        (data: ClassData[]) => {
          this.clasesFiltradas = data;
        },
        (error) => {
          console.error('Error al obtener clases:', error);
        }
      );
    } else {
      console.error('No se encontró el ID del estudiante.');
    }
  }


  logout() {
    localStorage.removeItem('email');
    this.navCtrl.navigateRoot('home'); 
  }
}
