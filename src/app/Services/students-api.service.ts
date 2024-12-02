import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClassData, StudentsData } from '../models/students-data';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentsApiService {
  private studentsCollection = 'students';
  constructor(
    private http: HttpClient, private firestore: AngularFirestore
  ) { }
  //json-server
  getStudent(correo: string){
    return this.http.get<StudentsData[]>(`http://localhost:3000/students?email=${correo}`);
  }

  loginStudent(correo: string, password: string){
    return this.http.get<StudentsData[]>(`http://localhost:3000/students?email=${correo}&password=${password}`);
  }

  actualizarStudent(student: StudentsData) { 
    return this.http.put(`http://localhost:3000/students/${student.id}`, student);
  }

  //firebase

  getStudents(correo: string): Observable<StudentsData | undefined> {
    return this.firestore
      .collection<StudentsData>(this.studentsCollection, ref => ref.where('email', '==', correo))
      .valueChanges()
      .pipe(map(students => students.length > 0 ? students[0] : undefined));
  }
  loginStudents(correo: string, password: string): Observable<StudentsData | undefined> {
    return this.firestore
      .collection<StudentsData>(this.studentsCollection, ref => 
        ref.where('email', '==', correo).where('password', '==', password))
      .valueChanges()
      .pipe(map(students => students.length > 0 ? students[0] : undefined)); 
  }
  updateStudent(student: StudentsData): Promise<void> {
    return this.firestore
      .doc(`${this.studentsCollection}/${student.id}`)
      .update(student);
  }
  async updateClassAttendance(studentId: string, classId: string, asistio: boolean): Promise<void> {
    try {
      const docRef = this.firestore
        .collection('students')
        .doc(studentId)
        .collection('clases')
        .doc(classId);
  
      const docSnapshot = await docRef.get().toPromise();
  
      if (docSnapshot!.exists) {
        await docRef.update({ asistio });
        console.log(`Asistencia actualizada para la clase ${classId} del estudiante ${studentId}`);
      } else {
        console.error(`No se encontró el documento con ID ${classId} para el estudiante ${studentId}`);
        throw new Error(`No existe un documento con el ID ${classId}`);
      }
    } catch (error) {
      console.error('Error al actualizar la asistencia:', error);
      throw error;
    }
  }

  getClassesByDay(studentId: string, dia: string): Observable<any[]>{
    return this.firestore.collection(`students/${studentId}/clases`, (ref) => ref.where('dia', 'array-contains', dia)).valueChanges();
  }
  
  getClasses(studentId: string): Observable<ClassData[]> {
    return this.firestore
      .collection(`students/${studentId}/clases`)
      .valueChanges({ idField: 'classId' })
      .pipe(
        map((classes: any[]) =>
          classes.map((clase) => ({
            classId: clase.classId,
            nombre: clase.nombre || '',
            horarios: Array.isArray(clase.horarios) ? clase.horarios : [clase.horario], 
            seccion: clase.seccion || 'Sin sección', 
            yaPaso: clase.yaPaso || false,
            asistio: clase.asistio || false,
            sala: clase.sala || 'Sin sala',
            dia: Array.isArray(clase.dia) ? clase.dia : [clase.dia]
          }))
        )
      );
  }
}
