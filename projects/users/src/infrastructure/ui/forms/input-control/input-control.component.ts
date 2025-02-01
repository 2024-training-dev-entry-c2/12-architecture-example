import { Component, input, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'lib-input-control',
  imports: [ReactiveFormsModule],
  templateUrl: './input-control.component.html',
  styleUrl: './input-control.component.scss'
})
export class InputControlComponent {

  label = input<string>('');
  controlName = input<string>('');
  type = input<string>('text');
  formGroup = input<FormGroup>();
  formControl!: FormControl;
  fieldType = input<string>();
  options = input<{ label: string, value: string }[]>();


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['controlName'] && this.formGroup()) {
      this.formControl = this.formGroup()!.get(this.controlName()) as FormControl;
    }
  }

}
