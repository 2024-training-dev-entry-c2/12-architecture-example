import { Component, EventEmitter, inject, Input, output, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IClient } from '../../../../domain/model/client.model';
import { ModalComponent } from 'shared';

@Component({
  selector: 'lib-add-client-form',
  imports: [ReactiveFormsModule, ModalComponent],
  templateUrl: './add-client-form.component.html',
  styleUrl: './add-client-form.component.scss'
})
export class AddClientFormComponent {
 private readonly formBuilder = inject(FormBuilder);
  public onSubmit = output<IClient>();

  @Input()
  set client(value: IClient) {
    this.clientForm.patchValue(value);
  }

  public clientForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required]],
    numberPhone: ['', [Validators.required]],
    id: [null],
    isFrecuent: [false]
  });

  submit(): void {
    if (!this.clientForm.valid) return

    this.onSubmit.emit(this.clientForm.getRawValue());
    this.clientForm.reset();

  }
}
