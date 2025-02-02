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
    this.form.patchValue(value as any);
  }

  public form = this._fb.group({
    name: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    phone: ['', Validators.required, Validators.pattern('^[0-9#+\\-\\s]+$')],
    orderIds: [[]],
    // --------------------------------
    customerId: [null],
  });

  submit() {
    if (!this.form.valid) return;
    this.onSubmit.emit(this.form.getRawValue());
  }
}
