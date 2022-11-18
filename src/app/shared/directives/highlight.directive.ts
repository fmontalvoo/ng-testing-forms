import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[highlight]'
})
export class HighlightDirective implements OnChanges {

  @Input('highlight') bgColor = '';

  defaultColor = 'yellow';

  constructor(private elRef: ElementRef) {
    elRef.nativeElement.style.backgroundColor = this.defaultColor;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.elRef.nativeElement.style.backgroundColor = this.bgColor || this.defaultColor;
  }

}
