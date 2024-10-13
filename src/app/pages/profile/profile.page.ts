import { Storage } from '@ionic/storage-angular';
import { StudentsApiService } from './../../Services/students-api.service';
import { Component, OnInit } from '@angular/core';
import { StudentsData } from 'src/app/models/students-data';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  student: StudentsData | null = null;

  constructor(private studentsApiService: StudentsApiService, private storage: Storage) { }

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
  
}
