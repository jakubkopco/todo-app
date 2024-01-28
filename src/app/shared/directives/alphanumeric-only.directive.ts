import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appAlphanumericOnly]',
  standalone: true
})
export class AlphanumericOnlyDirective {
  @HostListener('input', ['$event']) onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const originalValue = input.value;
    input.value = originalValue.replace(/[^a-zA-Z0-9 ]*/g, '');

    if (originalValue !== input.value) {
      event.stopPropagation();
    }
  }
}
