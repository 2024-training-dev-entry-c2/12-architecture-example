import { Component, inject, Input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IClient } from '../../../../domain/model/client.model';


@Component({
  selector: 'lib-add-client-form',
  imports: [ReactiveFormsModule],
  templateUrl: './add-client-form.component.html',
  styleUrl: './add-client-form.component.scss'
})
export class AddClientFormComponent {
  private readonly formBuilder = inject(FormBuilder);
  public onSubmit = output<IClient>();

  @Input()
  set client(value: IClient) {
    if (value && value.id) {
      this.clientForm.patchValue(value);
    } else {
      this.clientForm.reset({
        name: '',
        email: '',
        numberPhone: '',
        id: null,
        isFrecuent: false
      });
    }
  }

  public clientForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.email]],
    numberPhone: ['', [Validators.required]],
    id: [null],
    isFrecuent: [false]
  });

  submit(): void {
    if (!this.clientForm.valid) return
    this.onSubmit.emit(this.clientForm.getRawValue());

  }
}
