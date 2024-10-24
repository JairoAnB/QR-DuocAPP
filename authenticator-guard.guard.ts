import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatorGuardGuard implements CanActivate {

  constructor(public navCtrl: NavController) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const email = localStorage.getItem('email');
    if (email) {
      return true; // Permite acceso si el usuario está autenticado
    } else {
      this.navCtrl.navigateRoot('home'); // Redirige al login si no está autenticado
      return false;
    }
  }
}
