import { Component, inject, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'lib-form-by-id-dish',
  imports: [ReactiveFormsModule],
  templateUrl: './form-by-id-dish.component.html',
  styleUrl: './form-by-id-dish.component.scss'
})
export class FormByIdDishComponent {
  private formBuilder = inject(FormBuilder);

  @Output() public dishSubmit = new EventEmitter<number>();

  public form = this.formBuilder.group({
    id: [0, [Validators.required, Validators.pattern(/^[0-9]+$/)]]
  });

  Submit(event: Event) {
    event.preventDefault(); // Prevenir el evento nativo
    if (!this.form.valid) return;
    const idValue = this.form.get('id')?.value;
    this.dishSubmit.emit(idValue);
  }
}
