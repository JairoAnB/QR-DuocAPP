import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentsData } from '../models/students-data';

@Injectable({
  providedIn: 'root'
})
export class StudentsApiService {

  constructor(
    private http: HttpClient
  ) { }

  getStudent(correo: string){
    return this.http.get<StudentsData[]>(`http://localhost:3000/students?email=${correo}`);
  }

  loginStudent(correo: string, password: string){
    return this.http.get<StudentsData[]>(`http://localhost:3000/students?email=${correo}&password=${password}`);
  }

}
