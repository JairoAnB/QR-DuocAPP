import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeacherAsistenciaPageRoutingModule } from './teacher-asistencia-routing.module';

import { TeacherAsistenciaPage } from './teacher-asistencia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeacherAsistenciaPageRoutingModule
  ],
  declarations: [TeacherAsistenciaPage]
})
export class TeacherAsistenciaPageModule {}
