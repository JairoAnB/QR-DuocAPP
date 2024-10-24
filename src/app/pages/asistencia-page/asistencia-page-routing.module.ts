import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsistenciaPagePage } from './asistencia-page.page';

const routes: Routes = [
  {
    path: '',
    component: AsistenciaPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsistenciaPagePageRoutingModule {}
