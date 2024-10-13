import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'recuperar',
    loadChildren: () => import('./pages/recuperar/recuperar.module').then(m => m.RecuperarPageModule)
  },
  {
    path: 'ingreso',
    loadChildren: () => import('./pages/ingreso/ingreso.module').then(m => m.IngresoPageModule)
  },
  {
    path: 'cambio-contrasena',
    loadChildren: () => import('./pages/cambio-contrasena/cambio-contrasena.module').then(m => m.CambioContrasenaPageModule)
  },
  {
    path: 'principal',
    loadChildren: () => import('./pages/principal/principal.module').then(m => m.PrincipalPageModule)
  },
  {
    path: 'soporte',
    loadChildren: () => import('./pages/soporte/soporte.module').then(m => m.SoportePageModule)
  },  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
