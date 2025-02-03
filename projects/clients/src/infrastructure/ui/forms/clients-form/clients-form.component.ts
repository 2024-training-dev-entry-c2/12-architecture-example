import { Component, inject, Input, Output, EventEmitter, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IClient } from '../../../../domain/model/clients.model';

@Component({
  selector: 'lib-clients-form',
  imports: [ReactiveFormsModule],
  templateUrl: './clients-form.component.html',
  styleUrl: './clients-form.component.scss',
})
export class ClientsFormComponent {
  private readonly _fb = inject(FormBuilder);
  
  public onSubmit = output<IClient>();

  @Input()
  set client(client: IClient) {
    this.form.patchValue(client);
  }

  public form = this._fb.group({
    name: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.pattern('^[0-9]*$')],
    type: [''],
    //---------------campos logicos y utiles para ingresar informació en el front
    id: [null],
  });

  submit() {
    if (!this.form.valid) return;
    this.onSubmit.emit(this.form.getRawValue() as IClient);
  }
}
