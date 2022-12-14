import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import * as all_components from './components/exported'
import { MaterialModule } from './modules/material.module';

@NgModule({
  declarations: [
    ...all_components.components
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    ...all_components.components
  ]
})
export class SharedModule { }
