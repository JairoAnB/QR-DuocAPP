import { Injectable } from '@angular/core';
import { TeachersData, ClassData, CarreraData } from '../models/teachers-data';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeachersApiService {
  //SE CREA UN ATRIBUTO PRIVADO LLAMADO TEACHERSCOLLECTION QUE ES LA COLECCION(ID UNICO) DONDE ESTA ALMACENADA LA INFORMACION DE LOS PROFESORES
  private teachersCollection = 'teachers';

  constructor(
    private firestore: AngularFirestore
  ) { }

  //FUNCION PARA CONSEGUIR DATOS DEL PROFESOR, SE PIDE POR CORREO Y POR DATOS DE TEACHERSDATA, CUAL SE ENVIA A FIRESTORE, MEDIANTE LA COLECCION, CUAL BUSCA LA REFERENCIA QUE TENGA EL CORREO
  getTeachers(correo: string): Observable<TeachersData[] | undefined> {
    return this.firestore
      .collection<TeachersData>(this.teachersCollection, ref => ref.where('email', '==', correo))
      .valueChanges()
      .pipe(map(teachers => teachers.length > 0 ? teachers : undefined));
  }

  
  //FUNCION PARA INICIAR SESION, PRACTICAMENTE LO MISMO QUE EL OTRO SOLO QUE FUNCIONA PARA EL LOGIN PRINCIPALMENTE, YA QUE PIDE CORREO Y PASSWORD.
  loginTeachers(correo: string, password: string): Observable<TeachersData | undefined> {
    return this.firestore
      .collection<TeachersData>(this.teachersCollection, ref => 
        //BUSCA DENTRO DE LA COLECCION EN FIRESTONE DONDE, EL EMAIL ENTREGADO Y EL PASSWORD, SEAN IGUALES A LOS DE LA BASE DE DATOS
        ref.where('email', '==', correo).where('password', '==', password))
      .valueChanges()
      .pipe(map(teachers => teachers.length > 0 ? teachers[0] : undefined)); 
  }
  //FUNCION PARA ACTUALIZAR UN PROFESOR, SE PIDE COMO PARAMETRO TEACHERSDATA Y SE ACTUALIZA EN FIRESTORE MEDIANTE LA COLECCION Y EL ID DEL PROFESOR
  updateTeachers(teachers: TeachersData): Promise<void> {
    return this.firestore
      //BUSCA LA COLECCION MEDIANTE EL ID DEL PROFESOR Y ACTUALIZA LOS DATOS
      .doc(`${this.teachersCollection}/${teachers.id}`)
      .update(teachers);
  }
  async updateClassAttendance(teachersId: string, classId: string, asistio: boolean): Promise<void> {
    try {
      const docRef = this.firestore
        .collection('teachers')
        .doc(teachersId)
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
//FUNCION PARA CONSEGUIR LAS CLASES DE UN PROFESOR, SE PIDE EL ID DEL PROFESOR Y SE BUSCA EN LA COLECCION DE CLASES, SE FILTRA POR EL ID DEL PROFESOR Y SE DEVUELVE UNA LISTA DE CLASES
  getClassesByDay(teachersId: string, dia: string): Observable<any[]>{
    return this.firestore.collection(`teachers/${teachersId}/clases`, (ref) => ref.where('dia', 'array-contains', dia)).valueChanges();
  }
  //FUNCION PARA CONSEGUIR LAS CLASES DE UN PROFESOR, AQUI BUSCA MEDIANTE EL TEACHERSID DENTRO DE LAS COLECCIONES DE FIRESTORE, MAPEA TODOS LOS ATRIBUTOS DE CLASSDATA Y DEVUELVE LOS VALORES DE LA BASE DE DATOS.
  getClasses(teachersId: string): Observable<ClassData[]> {
    return this.firestore
      .collection(`teachers/${teachersId}/clases`)
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