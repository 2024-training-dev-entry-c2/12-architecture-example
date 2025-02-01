import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IClient } from '../../../../domain/model/clients.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-client-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.scss'
})
export class ClientFormComponent {
private readonly fb = inject(FormBuilder);

  @Input() isEditForm: boolean = false;
  @Input() currentClientName: string = '';

  public form: FormGroup = this.fb.group({
    clientName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', Validators.required],
    address: ['', Validators.required],
    registrationDate: ['', Validators.required],
    frequentUser: [false],
    vip: [false]
  });

  ngOnChanges(): void {
    if (this.isEditForm && this.currentClientName) {
      this.form.patchValue({ clientName: this.currentClientName });
    }
  }

  getFormData(): IClient | null {
    if (!this.form.valid) {
      return null;
    }
    const formData = this.form.getRawValue();
    return formData;
  }
  
  resetForm(): void {
    this.form.reset();
  }
}
