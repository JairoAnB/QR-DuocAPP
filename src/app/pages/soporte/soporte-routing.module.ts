import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SoportePage } from './soporte.page';

const routes: Routes = [
  {
    path: '',
    component: SoportePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SoportePageRoutingModule {}
