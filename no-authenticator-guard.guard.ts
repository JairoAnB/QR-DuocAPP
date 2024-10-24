import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class noAuthenticatorGuardGuard implements CanActivate {

  constructor(public navCtrl: NavController) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const email = localStorage.getItem('email');  // Usamos 'email' para verificar si ya está autenticado
    if (email) {
      this.navCtrl.navigateRoot('principal');  // Redirige a la página principal si ya está autenticado
      return false;
    } else {
      return true;  // Permite el acceso si no está autenticado
    }
  }
}
