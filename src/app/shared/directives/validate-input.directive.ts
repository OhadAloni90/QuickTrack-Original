import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appValidateInput]'
})
export class ValidateInputDirective {
  @Input() maxLength: number = Infinity;
  @Input() allowSymbols: boolean = true;

  private errorMessageElement: HTMLElement;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.errorMessageElement = this.renderer.createElement('div');
    this.renderer.setStyle(this.errorMessageElement, 'color', 'red');
    this.renderer.setStyle(this.errorMessageElement, 'fontSize', '12px');
    this.renderer.setStyle(this.errorMessageElement, 'marginTop', '5px');
    this.renderer.setStyle(this.errorMessageElement, 'display', 'none');
    this.renderer.appendChild(this.el.nativeElement.parentNode, this.errorMessageElement);
  }

  @HostListener('input', ['$event']) onInputChange(event: Event): void {
    const input = this.el.nativeElement as HTMLInputElement;
    let value = input.value;
    let errorMessage = '';

    if (value.length > this.maxLength) {
      errorMessage = `Maximum length of ${this.maxLength} exceeded.`;
      value = value.substring(0, this.maxLength);
    }

    if (!this.allowSymbols && /[^a-zA-Z0-9 ]/.test(value)) {
      errorMessage = 'Illegal character detected.';
      value = value.replace(/[^a-zA-Z0-9 ]/g, '');
    }

    this.renderer.setProperty(input, 'value', value);

    if (errorMessage) {
      this.renderer.setProperty(this.errorMessageElement, 'innerText', errorMessage);
      this.renderer.setStyle(this.errorMessageElement, 'display', 'block');
    } else {
      this.renderer.setStyle(this.errorMessageElement, 'display', 'none');
    }
  }
}
