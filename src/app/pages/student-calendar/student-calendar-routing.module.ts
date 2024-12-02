import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentCalendarPage } from './student-calendar.page';

const routes: Routes = [
  {
    path: '',
    component: StudentCalendarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentCalendarPageRoutingModule {}
