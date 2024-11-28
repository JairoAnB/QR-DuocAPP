import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeacherProfilePageRoutingModule } from './teacher-profile-routing.module';

import { TeacherProfilePage } from './teacher-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeacherProfilePageRoutingModule
  ],
  declarations: [TeacherProfilePage]
})
export class TeacherProfilePageModule {}
