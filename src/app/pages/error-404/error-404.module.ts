import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Error404PageRoutingModule } from './error-404-routing.module';

import { Error404Page } from './error-404.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Error404PageRoutingModule
  ],
  declarations: [Error404Page]
})
export class Error404PageModule {}
