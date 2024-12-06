export interface TeachersData {
    id?: string;
    picture?: string;
    name?: string;
    userName?: string;
    lastname?: string;
    email?: string;
    password?: string;
    birthdate?: string;
    gender?: string;
    carreras: Array<{ carreraId: string; nombre: string }>;
    sedes?: string;
    identificador?: string;
    telefono?: string;
    address?: string;
    clases?: ClassData[];
  }
  
  export interface CarreraData {
    carreraId: string;
    nombre: string;
  }
  

  export interface ClassData {
    id?: string;
    classId: string;
    nombre: string;
    horarios?: string[];
    seccion?: string;
    yaPaso?: boolean;
    asistio?: boolean;
    sala?: string;
    dia?: string[];

}
  