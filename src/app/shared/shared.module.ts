import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './modules/material.module';
import { PrimeModule } from './modules/primeng.module';

import * as all_components from './components/exported'

@NgModule({
  declarations: [
    ...all_components.components
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PrimeModule
  ],
  exports: [
    ...all_components.components
  ]
})
export class SharedModule { }
