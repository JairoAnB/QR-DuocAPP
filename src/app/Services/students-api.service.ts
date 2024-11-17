import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentsData } from '../models/students-data';

@Injectable({
  providedIn: 'root'
})
export class StudentsApiService {
  [x: string]: any;

  constructor(
    private http: HttpClient
  ) { }

  getStudent(correo: string){
    return this.http.get<StudentsData[]>(`http://localhost:3000/students?email=${correo}`);
  }

  loginStudent(correo: string, password: string){
    return this.http.get<StudentsData[]>(`http://localhost:3000/students?email=${correo}&password=${password}`);
  }

  actualizarStudent(student: StudentsData) { 
    return this.http.put(`http://localhost:3000/students/${student.id}`, student);
  }
}
