import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightDirective } from './directives/highlight.directive';
import { ReversePipe } from './pipes/reverse.pipe';



@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ReversePipe,
    HighlightDirective,
  ],
  exports: [
    ReversePipe,
    HighlightDirective,
  ]
})
export class SharedModule { }
