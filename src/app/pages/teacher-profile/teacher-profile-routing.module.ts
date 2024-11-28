import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeacherProfilePage } from './teacher-profile.page';

const routes: Routes = [
  {
    path: '',
    component: TeacherProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherProfilePageRoutingModule {}
