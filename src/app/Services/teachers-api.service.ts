import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TeachersData } from '../models/teachers-data';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeachersApiService {
  private teachersCollection = 'teachers'; // Nombre de la colección en Firebase

  constructor(
    private http: HttpClient, 
    private firestore: AngularFirestore
  ) { }

  //json-server
  getTeacher(correo: string) {
    return this.http.get<TeachersData[]>(`http://localhost:3000/teachers?email=${correo}`);
  }

  loginTeacher(correo: string, password: string) {
    return this.http.get<TeachersData[]>(`http://localhost:3000/teachers?email=${correo}&password=${password}`);
  }

  actualizarTeacher(teacher: TeachersData) {
    return this.http.put(`http://localhost:3000/teachers/${teacher.id}`, teacher);
  }

  //firebase

  // Obtener datos de profesor usando su correo
  getTeacherByEmail(correo: string): Observable<TeachersData | undefined> {
    return this.firestore
      .collection<TeachersData>(this.teachersCollection, ref => ref.where('email', '==', correo))
      .valueChanges()
      .pipe(map(teachers => teachers.length > 0 ? teachers[0] : undefined));
  }

  // Iniciar sesión del profesor con correo y contraseña
  loginTeacherWithCredentials(correo: string, password: string): Observable<TeachersData | undefined> {
    return this.firestore
      .collection<TeachersData>(this.teachersCollection, ref => 
        ref.where('email', '==', correo).where('password', '==', password))
      .valueChanges()
      .pipe(map(teachers => teachers.length > 0 ? teachers[0] : undefined));
  }

  // Actualizar los datos del profesor
  updateTeacher(teacher: TeachersData): Promise<void> {
    return this.firestore
      .doc(`${this.teachersCollection}/${teacher.id}`)
      .update(teacher);
  }
}
