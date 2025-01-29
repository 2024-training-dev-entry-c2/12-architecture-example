import { Component, EventEmitter, inject, Output, output } from '@angular/core';
import { IClient, IClientRequest } from '../../../../domain/model/client.model';
import { FormComponent, FormField, PaginationComponent } from 'shared';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'lib-create-client-form',
  imports: [PaginationComponent, FormComponent, ReactiveFormsModule],
  templateUrl: './create-client-form.component.html',
  styleUrl: './create-client-form.component.scss',
})
export class CreateClientFormComponent {
  @Output() newClient = new EventEmitter<IClientRequest>();
  private formBuilder = inject(FormBuilder);
  onSubmit = output<IClientRequest>();

  tabsList = [
    {
      title: 'Add client',
      tabContent: '"assets/icons/form-svgrepo-com.svg#icon-twitter"',
      link: '/client/add',
    },
    {
      title: 'List',
      tabContent: '"assets/icons/form-svgrepo-com.svg#icon-list"',
      link: '/client',
    },
  ];
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
    console.log('Form valid');
    if (this.clientForm.valid) {
      console.log('Form valid');
      this.onSubmit.emit(
        this.clientForm.getRawValue() as unknown as IClientRequest
      );
    }
    else {
      console.log(this.clientForm);
    }
  }
}
