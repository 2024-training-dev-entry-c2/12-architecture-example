import { Component, inject, Input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ICustomer } from '../../../../domain/models/customer.model';

@Component({
  selector: 'lib-customer-form',
  imports: [ReactiveFormsModule],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.scss',
})
export class CustomerFormComponent {
  private readonly _fb = inject(FormBuilder);
  public onSubmit = output<ICustomer>();

  @Input()
  set customer(value: ICustomer) {
    this.form.patchValue(value);
  }

  public form = this._fb.group({
    name: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: [
      '',
      [
        Validators.required,
        Validators.minLength(10),
        Validators.pattern('^[0-9#+\\-\\s]+$'),
      ],
    ],
    orderIds: [[] as number[]],
    customerId: [null as number | null],
  });

  submit() {
    if (!this.form.valid) return;
    this.onSubmit.emit(this.form.getRawValue());
  }
}