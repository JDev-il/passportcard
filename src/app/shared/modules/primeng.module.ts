import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {AccordionModule} from 'primeng/accordion'
import {ButtonModule} from 'primeng/button'
import {FieldsetModule} from 'primeng/fieldset';
import {AutoFocusModule} from 'primeng/autofocus';
import {VirtualScrollerModule} from 'primeng/virtualscroller';
import {ProgressSpinnerModule} from 'primeng/progressspinner';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    FieldsetModule,
    AutoFocusModule,
    VirtualScrollerModule,
    ProgressSpinnerModule
  ],
  exports: [
    ButtonModule,
    AccordionModule,
    FieldsetModule,
    AutoFocusModule,
    VirtualScrollerModule,
    ProgressSpinnerModule
  ]
})
export class PrimeModule { }
