import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CambioContrasenaPage } from './cambio-contrasena.page';

const routes: Routes = [
  {
    path: '',
    component: CambioContrasenaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CambioContrasenaPageRoutingModule {}
