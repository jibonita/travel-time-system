import { Directive, Input, ElementRef, ViewContainerRef, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appLength]'
})
export class LengthDirective {

  hasView = false;
  minLength = 5;

  constructor(
    private readonly templateRef: TemplateRef<any>,
    private readonly vcRef: ViewContainerRef,
  ) { }

  @Input()
  set appLength(value) {
    if (value > this.minLength && !this.hasView) {
      this.vcRef.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (value <= this.minLength) {
      this.vcRef.clear();
      this.hasView = false;
    }
  }
}
