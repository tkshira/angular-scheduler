import {
  Component,
  ElementRef,
  forwardRef,
  HostListener,
  OnInit,
  Renderer2,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const CUSTOM_CONTROL_INPUT_TIME_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputTimeComponent),
  multi: true,
};

@Component({
  selector: 'app-input-time',
  templateUrl: './input-time.component.html',
  styleUrls: ['./input-time.component.css'],
  providers: [CUSTOM_CONTROL_INPUT_TIME_ACCESSOR],
})
export class InputTimeComponent implements ControlValueAccessor {
  @HostListener('blur', []) onTouched: any = () => {};
  @HostListener('input', ['$event']) onChange: any = () => {};
  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  registerOnChange(fn: () => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  writeValue(value: string | Date) {
    console.log(value);
    this.renderer.setProperty(this.elementRef.nativeElement, 'value', value);
  }

  ngOnInit() {}
}
