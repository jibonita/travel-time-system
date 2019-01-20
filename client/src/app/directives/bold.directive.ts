import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appBoldMe]'
})
export class BoldMeDirective {
  constructor(private elRef: ElementRef, private renderer: Renderer2) {
    const el = this.elRef.nativeElement;
    this.renderer.setStyle(el, 'font-weight', 'bold');
    // this.elRef.nativeElement.style = 'font-weight: bold';

    console.log(this.elRef);
  }

  @HostListener('mouseenter')
  in() {
    const el = this.elRef.nativeElement;
    this.renderer.setStyle(el, 'background-color', 'red');
    this.renderer.setStyle(el, 'color', 'white');
  }

  @HostListener('mouseleave')
  out() {
    const el = this.elRef.nativeElement;
    this.renderer.setStyle(el, 'background-color', 'white');
    this.renderer.setStyle(el, 'color', 'black');
  }

}
