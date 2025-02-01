import { Component, EventEmitter, inject, Output, output } from '@angular/core';
import { IClient, IClientRequest } from '../../../../domain/model/client.model';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormComponent, FormField } from 'shared';
// import { FormComponent, FormField, PaginationComponent } from '../../../../../../shared/src/public-api';


@Component({
  selector: 'lib-create-client-form',
  imports: [ FormComponent, ReactiveFormsModule],
  templateUrl: './create-client-form.component.html',
  styleUrl: './create-client-form.component.scss',
})
export class CreateClientFormComponent {
  @Output() newClient = new EventEmitter<IClientRequest>();
  private formBuilder = inject(FormBuilder);
  onSubmit = output<IClientRequest>();

  public fields: FormField[] = [
    {
      label: 'Email',
      type: 'email',
      name: 'email',
      validators: [Validators.required, Validators.email],
      value: '',
      disable: false,
    },
    {
      label: 'Name Client',
      type: 'text',
      name: 'name',
      validators: [Validators.required, Validators.minLength(8)],
      value: '',
      disable: false,
    },
  ];

  public clientForm = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    name: ['', [Validators.minLength(2), Validators.required]],
    isOften: false,
  });

  submit() {
    console.log(this.clientForm.getRawValue());
    
    if (this.clientForm.valid) {
      this.onSubmit.emit(
        this.clientForm.getRawValue() as unknown as IClientRequest
      );
      alert('Client Created');
      
    } else {
      console.log(this.clientForm);
    }
    setTimeout(() => {
      this.clientForm.reset();
    }, 1000);
    
  }

}
