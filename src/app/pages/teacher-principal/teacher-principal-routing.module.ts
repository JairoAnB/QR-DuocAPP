import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeacherPrincipalPage } from './teacher-principal.page';

const routes: Routes = [
  {
    path: '',
    component: TeacherPrincipalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherPrincipalPageRoutingModule {}
