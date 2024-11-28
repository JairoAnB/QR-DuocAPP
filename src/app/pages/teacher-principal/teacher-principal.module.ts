import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeacherPrincipalPageRoutingModule } from './teacher-principal-routing.module';

import { TeacherPrincipalPage } from './teacher-principal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeacherPrincipalPageRoutingModule
  ],
  declarations: [TeacherPrincipalPage]
})
export class TeacherPrincipalPageModule {}
