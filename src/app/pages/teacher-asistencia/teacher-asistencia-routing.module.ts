import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeacherAsistenciaPage } from './teacher-asistencia.page';

const routes: Routes = [
  {
    path: '',
    component: TeacherAsistenciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherAsistenciaPageRoutingModule {}
