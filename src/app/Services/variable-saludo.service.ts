import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VariableSaludoService {

  private correo: string = "";

  constructor() { }

  getCorreo(){
    return this.correo;
  }

  setCorreo(correo: string){
    this.correo = correo;
  }
}
