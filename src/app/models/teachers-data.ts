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
    carreras?: CarreraData[];
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
    id?: string;
    classId: string;
    nombre: string;
    horario: string;
  }
  