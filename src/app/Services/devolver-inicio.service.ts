import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DevolverInicioService {

  constructor(private router: Router) { }

  devolverInicio() {
    this.router.navigate(['/home']);
  }
}
