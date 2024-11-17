import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { noAuthenticatorGuardGuard } from './no-authenticator-guard.guard';
import { AuthenticatorGuardGuard } from './authenticator-guard.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
    canActivate: [noAuthenticatorGuardGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'recuperar',
    loadChildren: () => import('./pages/recuperar/recuperar.module').then(m => m.RecuperarPageModule),
    canActivate: [noAuthenticatorGuardGuard]
  },
  {
    path: 'ingreso',
    loadChildren: () => import('./pages/ingreso/ingreso.module').then(m => m.IngresoPageModule),
    canActivate: [noAuthenticatorGuardGuard]
  },
  {
    path: 'principal',
    loadChildren: () => import('./pages/principal/principal.module').then(m => m.PrincipalPageModule),
    canActivate: [AuthenticatorGuardGuard]
  },
  {
    path: 'teacher-principal',
    loadChildren:()=> import('./pages/teacher-principal/teacher-principal.module').then(m => m.TeacherPrincipalPageModule),
    canActivate: [AuthenticatorGuardGuard]
  },
  {
    path: 'soporte',
    loadChildren: () => import('./pages/soporte/soporte.module').then(m => m.SoportePageModule),
    canActivate: [AuthenticatorGuardGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule),
    canActivate: [AuthenticatorGuardGuard]
  },
  {
    path: 'asistencia-page',
    loadChildren: () => import('./pages/asistencia-page/asistencia-page.module').then( m => m.AsistenciaPagePageModule),
    canActivate: [AuthenticatorGuardGuard]
  },
  {
    path: '**',
    loadChildren: () => import('./pages/error-404/error-404.module').then( m => m.Error404PageModule),
    canActivate: [noAuthenticatorGuardGuard]
  },
  {
    path: 'teacher-principal',
    loadChildren: () => import('./pages/teacher-principal/teacher-principal.module').then( m => m.TeacherPrincipalPageModule)
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
