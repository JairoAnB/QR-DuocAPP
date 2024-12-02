export interface StudentsData { 
    id?: string;
    picture?: string;
    name?: string;
    username?: string;
    lastname?: string;
    email?: string;
    password?: string;
    birthdate?: string;
    carrera?: string;
    gender?: string;
    sede?: string;
    identificador?: string;
    telefono?: string;
    address?: string;
    clases?: ClassData[];
}
export interface ClassData {
    nombre: string;
    horarios?: string[];
    seccion: string;
    yaPaso: boolean;
    classId: string;
    asistio?: boolean;
    sala: string;
    dia: string[];
}