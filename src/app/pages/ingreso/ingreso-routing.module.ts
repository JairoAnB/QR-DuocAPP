import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IngresoPage } from './ingreso.page';

const routes: Routes = [
  {
    path: '',
    component: IngresoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IngresoPageRoutingModule {}
