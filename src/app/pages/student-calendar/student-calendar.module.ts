import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentCalendarPageRoutingModule } from './student-calendar-routing.module';

import { StudentCalendarPage } from './student-calendar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentCalendarPageRoutingModule
  ],
  declarations: [StudentCalendarPage]
})
export class StudentCalendarPageModule {}
