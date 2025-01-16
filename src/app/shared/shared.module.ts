import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedInputComponent } from './components/shared-input/shared-input.component';

@NgModule({
  declarations: [
    SharedInputComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SharedInputComponent
  ]
})
export class SharedModule { }
