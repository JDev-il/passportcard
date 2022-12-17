import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './modules/material.module';
import { PrimeModule } from './modules/primeng.module';
import * as all_components from './components/exported';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SearchPostComponent } from './components/posts/search-post/search-post.component';

@NgModule({
  declarations: [
    ...all_components.components,
    SearchPostComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    PrimeModule,
    InfiniteScrollModule
  ],
  exports: [
    ...all_components.components,
    MaterialModule,
    PrimeModule
  ]
})
export class SharedModule { }
