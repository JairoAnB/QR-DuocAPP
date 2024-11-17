import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TeachersData } from '../models/teachers-data';

@Injectable({
  providedIn: 'root'
})
export class TeachersApiService {

  constructor(
    private http: HttpClient
  ) { }

  getTeacher(correo: string){
    return this.http.get<TeachersData[]>(`http://localhost:3000/teacher?email=${correo}`);
  }

  loginTeacher(correo: string, password: string){
    return this.http.get<TeachersData[]>(`http://localhost:3000/teacher?email=${correo}&password=${password}`);
  }

  actualizarTeacher(teacher: TeachersData) { 
    return this.http.put(`http://localhost:3000/teacher/${teacher.id}`, teacher);
  }
}