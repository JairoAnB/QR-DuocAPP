export interface TeachersData {
    id?: string;
    picture?: string;
    name?: string;
    username?: string;
    lastname?: string;
    email?: string;
    password?: string;
    birthdate?: string;
    gender?: string;
    carrera?: CarreraData[];
    sede?: string;
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
    nombre: string;
    horarios?: string[];
    seccion: string;
    classId: string;
  }
  