import { Component, inject, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'lib-form-by-id-order',
  imports: [ReactiveFormsModule],
  templateUrl: './form-by-id-order.component.html',
  styleUrl: './form-by-id-order.component.scss'
})
export class FormByIdOrderComponent {
  private formBuilder = inject(FormBuilder);

  @Output() public orderSubmit = new EventEmitter<number>();

  public form = this.formBuilder.group({
    id: [0, [Validators.required, Validators.pattern(/^[0-9]+$/)]]
  });

  Submit(event: Event) {
    event.preventDefault(); 
    if (!this.form.valid) return;
    const idValue = this.form.get('id')?.value;
    this.orderSubmit.emit(idValue);
  }
}
