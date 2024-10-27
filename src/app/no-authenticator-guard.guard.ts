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
  ): boolean {
    const email = localStorage.getItem('email');
    if (email) {
      this.navCtrl.navigateRoot('principal'); 
      return false; 
    }
    return true; 
  }
}

