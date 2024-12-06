import { StudentsApiService } from './../../Services/students-api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { WeatherService } from 'src/app/Services/weather.service';
import { StorageService } from 'src/app/Services/storage.service';
import { ServiceAlertServiceService } from 'src/app/Services/service-alert-service.service';
import { NavController } from '@ionic/angular';
import { ClassData, StudentsData } from 'src/app/models/students-data';
import { TeachersApiService } from 'src/app/Services/teachers-api.service';
import { TeachersData } from 'src/app/models/teachers-data';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  correo: string = "";
  weatherData: any;
  weatherIcon: string = "";
  showDetails: boolean = false;
  student: StudentsData | null = null;
  teachers: TeachersData | null = null;
  BotonContenido: boolean = false;
  BtnClima: boolean = false;
  clases: ClassData[] = [];
  todayClasses: ClassData[] = [];
  today: string = '';
  todayDate: string = '';


  constructor(
    private weatherservice: WeatherService,
    private alertController: AlertController,
    private router: Router,
    private storage: StorageService,
    private serviceAlert: ServiceAlertServiceService,
    private navCtrl: NavController,
    private Students: StudentsApiService,
    private Teachers: TeachersApiService,
    private studentsApiService: StudentsApiService
  ) {}

  async ngOnInit() {
    console.log('Inicializando almacenamiento...');
    await this.storage.init();
    const formattedCorreo = await this.storage.getCorreo();
    if (formattedCorreo) {
      const correoCompletoEstudiante = `${formattedCorreo}@duocuc.cl`;
      const correoCompletoProfesor = `${formattedCorreo}@profesor.duoc.cl`;
      const userDataEstudiante = await this.storage.get(`user_data_${correoCompletoEstudiante}`);
      const userDataProfesor = await this.storage.get(`user_data_${correoCompletoProfesor}`);
      
      if (userDataEstudiante) {
        this.correo = userDataEstudiante.correo.split('@')[0];
        this.student = userDataEstudiante;
        this.today = this.getToday(); // Asegúrate de obtener el día actual antes de cargar el horario
        this.todayDate = this.getTodayDate();
        this.cargarHorario();
      } else if (userDataProfesor) {
        this.correo = userDataProfesor.correo.split('@')[0];
      } else {
        console.log('No se encontraron datos de usuario en el almacenamiento.');
      }
    } else {
      console.log('No se encontró un correo formateado en el almacenamiento.');
    }
    
    this.getLocation();
    
    const email = localStorage.getItem('email');
    if (email) {
      this.Students.getStudents(email).subscribe(
        (studentData) => {
          if (studentData) {
            this.student = studentData;
            this.today = this.getToday(); // Asegúrate de obtener el día actual antes de cargar el horario
            this.todayDate = this.getTodayDate();
            this.cargarHorario();
          } else {
            console.log('No se encontró ningún estudiante con ese correo.');
            this.Teachers.getTeachers(email).subscribe(
              (teacherData) => {
                if (teacherData) {
                  this.teachers = teacherData.length > 0 ? teacherData[0] : null;
                } else {
                  console.log('No se encontró ningún profesor con ese correo.');
                }
              },
              (error) => {
                console.error('Error al obtener los datos del profesor:', error);
              }
            );
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

  cargarHorario() {
    if (this.student && this.student.id) {
      this.studentsApiService.getClasses(this.student.id).subscribe(
        (data: ClassData[]) => {
          this.clases = data;
          this.todayClasses = this.getClasesByDay(this.today);
          console.log('Datos de las clases:', this.clases); // Verifica que los datos se obtengan correctamente
        },
        (error) => {
          console.error('Error al obtener los datos de las clases:', error);
        }
      );
    }
  }

  getToday(): string {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const todayIndex = new Date().getDay();
    return days[todayIndex];
  }

  getTodayDate(): string {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1; // Los meses empiezan en 0
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  }

  getClasesByDay(day: string): ClassData[] {
    return this.clases.filter(clase => clase.dia.includes(day));
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        this.getWeatherByCoordinates(lat, lon);
      });
    } else {
      console.error("Geolocation no está soportado por este navegador.");
    }
  }

  
  getWeatherByCoordinates(lat: number, lon: number) {
    this.weatherservice.getWeatherByCoordinates(lat, lon).subscribe(
      data => {
        this.weatherData = data;
        this.weatherIcon = this.weatherData.weather[0].icon;
        console.log(this.weatherData);
      },
      error => {
        console.error('Error al obtener los datos del clima', error);
      }
    );
  }
  traductor(description: string): string {
    const translations: { [key: string]: string } = {
      "clear sky": "Cielo Despejado",
      "few clouds": "Pocas Nubes",
      "scattered clouds": "Nubes Dispersas",
      "broken clouds": "Nubes Rotas",
      "shower rain": "Chubascos",
      "rain": "Lluvia",
      "thunderstorm": "Tormenta",
      "snow": "Nieve",
      "mist": "Neblina"
    };
    return translations[description] || description; 
  }

  botonClima() {
    this.BtnClima = !this.BtnClima;
  }
  botonMostrador() { 
    this.BotonContenido = !this.BotonContenido;
  }


  
  redirectUser(email: string) {
    let role: string;

    if (email.endsWith('@profesor.duoc.cl')) {
      role = 'teacher';
    } else if (email.endsWith('@duocuc.cl')) {
      role = 'student';
    } else {
      role = 'unknown';
    }

    if (role === 'teacher') {
      this.navCtrl.navigateRoot('/principal');
    } else if (role === 'student') {
      this.navCtrl.navigateRoot('/principal');
    } else {
      console.log('Correo no reconocido.');
    }
  }

  alertaError() {
    this.serviceAlert.alerta();
  }

  regresarHome() {
    this.serviceAlert.regresarHome();
  }

  funcionNoValida() {
    this.alertaError();
    this.regresarHome();
  }

  logout() {
    localStorage.removeItem('email');
    this.navCtrl.navigateRoot('home'); 
  }
}
