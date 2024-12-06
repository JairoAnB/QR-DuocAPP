import { Injectable } from '@angular/core';
import { ClassData, StudentsData } from '../models/students-data';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentsApiService {
  //SE CREA UN ATRIBUTO PRIVADO LLAMADO STUDENTSCOLLECTION QUE ES LA COLECCION(ID UNICO) DONDE ESTA ALMACENADA LA INFORMACION DE LOS ESTUDIANTES
  private studentsCollection = 'students';
  constructor(
    private firestore: AngularFirestore
  ) { }

  //FUNCION PARA CONSEGUIR DATOS DEL ESTUDIANTE, SE PIDE POR CORREO Y POR DATOS DE STUDENTSDATA, CUAL SE ENVIA A FIRESTORE, MEDIANTE LA COLECCION, CUAL BUSCA LA REFERENCIA QUE TENGA EL CORREO
  getStudents(correo: string): Observable<StudentsData | undefined> {
    return this.firestore
      .collection<StudentsData>(this.studentsCollection, ref => ref.where('email', '==', correo))
      .valueChanges()
      .pipe(map(students => students.length > 0 ? students[0] : undefined));
  }
  //FUNCION PARA INICIAR SESION, PRACTICAMENTE LO MISMO QUE EL OTRO SOLO QUE FUNCIONA PARA EL LOGIN PRINCIPALMENTE, YA QUE PIDE CORREO Y PASSWORD.
  loginStudents(correo: string, password: string): Observable<StudentsData | undefined> {
    return this.firestore
      .collection<StudentsData>(this.studentsCollection, ref => 
        //BUSCA DENTRO DE LA COLECCION EN FIRESTONE DONDE, EL EMAIL ENTREGADO Y EL PASSWORD, SEAN IGUALES A LOS DE LA BASE DE DATOS
        ref.where('email', '==', correo).where('password', '==', password))
      .valueChanges()
      .pipe(map(students => students.length > 0 ? students[0] : undefined)); 
  }
  //FUNCION PARA ACTUALIZAR UN ESTUDIANTE, SE PIDE COMO PARAMETRO STUDENSDATA Y SE ACTUALIZA EN FIRESTORE MEDIANTE LA COLECCION Y EL ID DEL ESTUDIANTE
  updateStudent(student: StudentsData): Promise<void> {
    return this.firestore
      //BUSCA LA COLECCION MEDIANTE EL ID DEL ESTUDIANTE Y ACTUALIZA LOS DATOS
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
      //SE CREA UNA CONSTANTE CON EL DOCUMENTO ACTUALIZADO Y SE DEVUELVE UNA PROMESA CON EL RESULTADO DE LA ACTUALIZACION
      const docSnapshot = await docRef.get().toPromise();
      //SE VERIFICA SI EXISTE EL DOCUMENTO, SI EXISTE SE ACTUALIZA EL DOCUMENTO EN EL PARAMETRO ASISTIO, SI NO EXISTE SE LANZA UN ERROR
      if (docSnapshot!.exists) {
        await docRef.update({ asistio });
      } else {
        throw new Error(`No existe ${classId}`);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
//FUNCION PARA CONSEGUIR LAS CLASES DE UN ESTUDIANTE, SE PIDE EL ID DEL ESTUDIANTE Y SE BUSCA EN LA COLECCION DE CLASES, SE FILTRA POR EL ID DEL ESTUDIANTE Y SE DEVUELVE UNA LISTA DE CLASES
  getClassesByDay(studentId: string, dia: string): Observable<any[]>{
    return this.firestore.collection(`students/${studentId}/clases`, (ref) => ref.where('dia', 'array-contains', dia)).valueChanges();
  }
  //FUNCION PARA CONSEGUIR LAS CLASES DE UN ESTUDIANTE, AQUI BUSCA MEDIANTE EL STUDENTID DENTRO DE LAS COLECCIONES DE FIRESTORE, MAPEA TODOS LOS ATRIBUTOS DE CLASSDATA Y DEVUELVE LOS VALORES DE LA BASE DE DATOS.
  getClasses(studentId: string): Observable<ClassData[]> {
    return this.firestore
    .collection<ClassData>(`${this.studentsCollection}/${studentId}/clases`)
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
