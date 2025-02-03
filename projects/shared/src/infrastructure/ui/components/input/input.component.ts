import { Component, input, OnChanges, output, SimpleChanges } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { IInput } from '../../interfaces/input.interface';

@Component({
  selector: 'app-input',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent implements OnChanges{
  inputData = input<IInput>();
  formGroup = input<FormGroup>();
  outputData = output<string>();
  formControl!: FormControl;

  inputEvent(event: Event) {
    if(this.formGroup()) {
      let textType = this.formGroup()!.get(this.inputData()?.formControlName!)?.value;
      return this.outputData.emit(textType);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['controlName'] && this.formGroup()) {
      this.formControl = this.formGroup()!.get(this.inputData()?.formControlName!) as FormControl;
    }
  }

}