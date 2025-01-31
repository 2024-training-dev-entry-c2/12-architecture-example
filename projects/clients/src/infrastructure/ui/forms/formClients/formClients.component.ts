import { Component, inject, Input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Iclient } from '../../../../domain/model/client.model';

@Component({
  selector: 'lib-form-clients',
  imports: [ReactiveFormsModule],
  templateUrl: './formClients.component.html',
  styleUrl: './formClients.component.scss',
})
export class FormClientsComponent {
  private readonly _fb = inject(FormBuilder);
  public onSubmit = output<Iclient>();

  @Input()
  set clients(value: Iclient) {
    this.form.patchValue(value);
  }

  public form = this._fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    phone: [0, Validators.required],
    address: ['', Validators.required],
    isFrequent: [false, Validators.required],

    id: [null],
    fechaCreacion: [null]
  });

  submit() {
    if (!this.form.valid) return;
    this.onSubmit.emit(this.form.getRawValue());
    console.log(this.form.value);

  }
 }

