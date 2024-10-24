import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsistenciaPagePageRoutingModule } from './asistencia-page-routing.module';

import { AsistenciaPagePage } from './asistencia-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsistenciaPagePageRoutingModule
  ],
  declarations: [AsistenciaPagePage]
})
export class AsistenciaPagePageModule {}
