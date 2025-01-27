import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedInputComponent } from './components/shared-input/shared-input.component';

@NgModule({
  declarations: [
    SharedInputComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    SharedInputComponent
  ]
})
export class SharedModule { }